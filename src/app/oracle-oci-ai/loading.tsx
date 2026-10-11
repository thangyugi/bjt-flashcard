// Khung chờ trong lúc bài học đang tải
export default function Loading() {
  return (
    <div className="oci-loading" aria-busy="true" aria-label="Đang tải bài học">
      <div className="oci-skel" style={{ height: 14, width: 180 }} />
      <div className="oci-skel" style={{ height: 40, width: "78%" }} />
      <div className="oci-skel" style={{ height: 28, width: 260, marginBottom: 18 }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="oci-skel" style={{ height: 16, width: `${92 - (i % 3) * 12}%` }} />
      ))}
    </div>
  );
}
