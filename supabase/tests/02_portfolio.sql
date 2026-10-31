-- Kiểm thử portfolio: RLS (mỗi người chỉ thấy / sửa của mình), ràng buộc dữ liệu dự án, anon bị chặn,
-- xuất dữ liệu, xóa tài khoản → xóa dây chuyền.
\set ON_ERROR_STOP 1
begin;

insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-0000000000a1', 'pa@example.com'),
  ('00000000-0000-0000-0000-0000000000b1', 'pb@example.com');

-- ── A tạo portfolio + 2 dự án ──
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a1', true);
select public.save_my_portfolio('{"header":{"name":"A"},"pr":{"sections":[]}}');
select public.save_my_portfolio('{"skills":{"groups":[1]}}');  -- chỉ cập nhật phần được gửi
select public.upsert_my_portfolio_project('40000000-0000-0000-0000-000000000001', 0,
  '{"title":"案件A","from":"2024-04","to":null,"phases":["impl"],"tech":{"lang":["TypeScript"]},"duties":["実装"]}');
select public.upsert_my_portfolio_project('40000000-0000-0000-0000-000000000002', 1,
  '{"title":"案件B","from":"2023-01","to":"2023-12","phases":[],"tech":{},"duties":[]}');
select public.upsert_my_portfolio_project('40000000-0000-0000-0000-000000000001', 0,
  '{"title":"案件A（改）","from":"2024-04","phases":["impl"],"tech":{},"duties":[]}');  -- gửi lại = sửa, không trùng
select public.reorder_my_portfolio_projects(array['40000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001']::uuid[]);

do $$
declare v jsonb := public.get_my_portfolio();
begin
  assert v #>> '{portfolio,header,name}' = 'A', 'đọc lại phần đầu trang';
  assert v #> '{portfolio,pr}' = '{"sections":[]}'::jsonb, 'lưu một phần không xóa phần khác';
  assert jsonb_array_length(v -> 'projects') = 2, 'hai dự án';
  assert v #>> '{projects,0,data,title}' = '案件B', 'thứ tự sau khi sắp xếp lại';
  assert v #>> '{projects,1,data,title}' = '案件A（改）', 'upsert sửa dự án cũ';
  assert v #> '{portfolio,introduce}' = '{}'::jsonb, 'introduce mặc định rỗng (ứng dụng hiện mẫu)';
  assert v #> '{portfolio,interview}' = '{}'::jsonb, 'interview mặc định rỗng (ứng dụng hiện mẫu)';
end $$;

-- Introduce / Interview Q&A: lưu riêng từng phần, không đụng phần khác
select public.save_my_portfolio('{"introduce":{"profile":{"name":"A"},"blocks":[]}}');
select public.save_my_portfolio('{"interview":{"items":[{"id":"q1","cat":"tech","qJa":"質問","qVi":"Câu hỏi","aJa":"回答","aVi":"Trả lời"}]}}');
do $$
declare v jsonb := public.get_my_portfolio();
begin
  assert v #>> '{portfolio,introduce,profile,name}' = 'A', 'đọc lại introduce';
  assert v #>> '{portfolio,interview,items,0,qVi}' = 'Câu hỏi', 'đọc lại interview';
  assert v #>> '{portfolio,header,name}' = 'A', 'lưu introduce / interview không xóa header';
end $$;

-- Ràng buộc dữ liệu: thiếu khóa bắt buộc / sai định dạng tháng / tên trống → lỗi
do $$ begin
  begin
    perform public.upsert_my_portfolio_project(util.uuid_v7(), 0, '{"title":"x","from":"2024-04"}');
    raise exception 'thiếu khóa bắt buộc phải bị chặn';
  exception when check_violation then null;
  end;
  begin
    perform public.upsert_my_portfolio_project(util.uuid_v7(), 0, '{"title":"x","from":"2024/4","phases":[],"tech":{},"duties":[]}');
    raise exception 'tháng sai định dạng phải bị chặn';
  exception when check_violation then null;
  end;
  begin
    perform public.upsert_my_portfolio_project(util.uuid_v7(), 0, '{"title":"  ","from":"2024-04","phases":[],"tech":{},"duties":[]}');
    raise exception 'tên trống phải bị chặn';
  exception when check_violation then null;
  end;
end $$;

-- ── B: không thấy, không sửa, không xóa được dữ liệu của A ──
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000b1', true);
do $$
declare n int;
begin
  assert public.get_my_portfolio() -> 'portfolio' = 'null'::jsonb, 'B chưa có portfolio';
  assert jsonb_array_length(public.get_my_portfolio() -> 'projects') = 0, 'B không thấy dự án của A';
  assert (select count(*) from profile.portfolios) = 0, 'RLS: B không đọc bảng của A';
  assert (select count(*) from profile.portfolio_projects) = 0, 'RLS: B không đọc dự án của A';
  update profile.portfolio_projects set data = data || '{"title":"hacked"}' where id = '40000000-0000-0000-0000-000000000001';
  get diagnostics n = row_count;
  assert n = 0, 'RLS: B không sửa được dự án của A';
  assert public.delete_my_portfolio_projects(array['40000000-0000-0000-0000-000000000001']::uuid[]) = 0, 'B không xóa được dự án của A';
  delete from profile.portfolios where user_id = '00000000-0000-0000-0000-0000000000a1';
  get diagnostics n = row_count;
  assert n = 0, 'RLS: B không xóa được portfolio của A';
  begin
    perform public.upsert_my_portfolio_project('40000000-0000-0000-0000-000000000001', 0,
      '{"title":"chiếm","from":"2024-04","phases":[],"tech":{},"duties":[]}');
    raise exception 'B không được ghi đè dự án của A bằng id';
  exception when insufficient_privilege or unique_violation then null;
  end;
  begin
    insert into profile.portfolios (user_id) values ('00000000-0000-0000-0000-0000000000a1');
    raise exception 'B không được tạo portfolio cho A';
  exception when insufficient_privilege or unique_violation then null;
  end;
end $$;
select public.save_my_portfolio('{"header":{"name":"B"}}');
select public.upsert_my_portfolio_project('40000000-0000-0000-0000-0000000000b9', 0,
  '{"title":"案件B1","from":"2022-01","phases":[],"tech":{},"duties":[]}');

-- Xuất dữ liệu có portfolio
do $$ begin
  assert public.export_my_data() #>> '{portfolio,header,name}' = 'B', 'xuất dữ liệu: portfolio';
  assert jsonb_array_length(public.export_my_data() -> 'portfolio_projects') = 1, 'xuất dữ liệu: dự án';
end $$;

-- ── Khách (anon): không có quyền gì ──
reset role;
set local role anon;
do $$ begin
  begin
    perform count(*) from profile.portfolios;
    raise exception 'anon phải bị chặn (bảng)';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.get_my_portfolio();
    raise exception 'anon phải bị chặn (hàm)';
  exception when insufficient_privilege then null;
  end;
end $$;

-- ── A xóa tài khoản → portfolio và dự án của A xóa dây chuyền; của B còn nguyên ──
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a1', true);
select public.delete_my_account();
reset role;
do $$ begin
  assert (select count(*) from profile.portfolios where user_id = '00000000-0000-0000-0000-0000000000a1') = 0, 'xóa portfolio A';
  assert (select count(*) from profile.portfolio_projects where user_id = '00000000-0000-0000-0000-0000000000a1') = 0, 'xóa dự án A';
  assert (select count(*) from profile.portfolios) = 1, 'còn portfolio B';
  assert (select count(*) from profile.portfolio_projects) = 1, 'còn dự án B';
end $$;

select 'ALL TESTS PASSED' as result;
rollback;
