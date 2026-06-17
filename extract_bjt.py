import fitz
import json
import re

PDF_PATH = "/Users/Leonardo Thang/Bjt_flashcard/documents/bjt_1000_vocs.pdf"
OUTPUT_JSON = "/Users/Leonardo Thang/Bjt_flashcard/bjt-flashcard/public/data/bjt-1000.json"

doc = fitz.open(PDF_PATH)
all_items = []

# Keywords for categorization
CATEGORIES = [
    {
        "id": "bjt-g-hop",
        "name": "Họp & Thảo luận",
        "keywords": ["họp", "thảo luận", "thương lượng", "đàm phán", "thuyết trình", "báo cáo", "kết luận", "biên bản", "phát biểu"],
        "icon": "🗣️",
        "color": "#3b82f6"
    },
    {
        "id": "bjt-g-khach",
        "name": "Khách hàng & Đối tác",
        "keywords": ["khách hàng", "đối tác", "tiếp đãi", "giao dịch", "hợp đồng", "thỏa thuận", "chào hỏi", "gặp gỡ", "làm ăn"],
        "icon": "🤝",
        "color": "#10b981"
    },
    {
        "id": "bjt-g-nhansu",
        "name": "Nhân sự & Công việc",
        "keywords": ["nhân sự", "nhân viên", "giám đốc", "cấp trên", "cấp dưới", "tuyển dụng", "nghỉ việc", "làm thêm", "chức vụ", "chỉ thị", "trách nhiệm", "công tác", "đào tạo"],
        "icon": "👔",
        "color": "#8b5cf6"
    },
    {
        "id": "bjt-g-taichinh",
        "name": "Tài chính & Kế toán",
        "keywords": ["tài chính", "kế toán", "tiền", "lợi nhuận", "doanh thu", "lỗ", "lãi", "chi phí", "ngân sách", "thanh toán", "thuế", "giá", "hóa đơn"],
        "icon": "💹",
        "color": "#059669"
    },
    {
        "id": "bjt-g-sanxuat",
        "name": "Sản xuất & Hàng hoá",
        "keywords": ["sản xuất", "hàng", "sản phẩm", "kho", "vận chuyển", "nhà máy", "chất lượng", "đóng gói", "giao hàng"],
        "icon": "📦",
        "color": "#d97706"
    },
    {
        "id": "bjt-g-congty",
        "name": "Công ty & Tổ chức",
        "keywords": ["công ty", "tổ chức", "phòng ban", "doanh nghiệp", "chi nhánh", "trụ sở", "thành lập", "quy định", "chính sách"],
        "icon": "🏢",
        "color": "#4f46e5"
    },
    {
        "id": "bjt-g-hanhchinh",
        "name": "Hành chính & Văn phòng",
        "keywords": ["văn phòng", "giấy tờ", "hồ sơ", "tài liệu", "đóng dấu", "photo", "in ấn", "gửi", "nhận", "mail", "điện thoại"],
        "icon": "🗂",
        "color": "#db2777"
    }
]

def categorize(meaning):
    m = meaning.lower()
    for cat in CATEGORIES:
        for kw in cat["keywords"]:
            if kw in m:
                return cat
    return None

for page_num in range(1, 78):
    try:
        page = doc[page_num]
        blocks = page.get_text("dict")["blocks"]
    except Exception as e:
        print(f"Error reading page {page_num}: {e}")
        continue
        
    spans = []
    for b in blocks:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if text:
                        spans.append({
                            "text": text,
                            "x": s["bbox"][0],
                            "y": s["bbox"][1],
                            "size": s["size"]
                        })
                        
    # Find anchors
    anchors = []
    for s in spans:
        if s["x"] < 100 and re.match(r'^\d+\.', s["text"]):
            anchors.append(s)
            
    anchors.sort(key=lambda a: a["y"])
    
    for i in range(len(anchors)):
        anchor = anchors[i]
        next_anchor_y = anchors[i+1]["y"] if i + 1 < len(anchors) else 9999
        
        row_min_y = anchor["y"] - 15
        row_max_y = next_anchor_y - 5
        
        item_spans = [s for s in spans if row_min_y < s["y"] < row_max_y]
        
        kanji_parts = []
        furigana_parts = []
        meaning_parts = []
        
        for s in item_spans:
            if s["x"] >= 200:
                meaning_parts.append(s["text"])
            else:
                if s["y"] < anchor["y"] - 3:
                    furigana_parts.append(s["text"])
                else:
                    if s == anchor:
                        t = s["text"].split(".", 1)
                        if len(t) > 1 and t[1].strip():
                            kanji_parts.append(t[1].strip())
                    else:
                        kanji_parts.append(s["text"])
                        
        item_id = anchor["text"].split(".")[0]
        kanji = "".join(kanji_parts).strip()
        furigana = "".join(furigana_parts).strip()
        meaning = " ".join(meaning_parts).strip()
        
        if kanji or meaning:
            # Clean up known bad parsing where furigana sometimes sticks to kanji
            # (Heuristic: usually kanji doesn't have hiragana appended directly in this PDF structure if furigana is empty)
            if not furigana and re.search(r'[\u3040-\u309F]+$', kanji):
                # We can't perfectly split them without NLP, but we rely on standard extraction
                pass
                
            all_items.append({
                "id": f"bjt-item-{item_id}",
                "kanji": kanji,
                "hiragana": furigana,
                "meaningVn": meaning,
                "bjtRelevance": True,
                "partOfSpeech": "noun" # Default
            })

# Grouping
groups_dict = {cat["id"]: {
    "id": cat["id"],
    "sourceType": "BJT",
    "sourceName": "BJT 1000 Từ Vựng",
    "name": cat["name"],
    "themeColor": cat["color"],
    "icon": cat["icon"],
    "items": []
} for cat in CATEGORIES}

# Fallback groups for those that don't match any keyword
# We'll chunk them into "BJT Tổng hợp Phần X"
general_items = []

for item in all_items:
    # Build business context automatically
    item["businessContext"] = f"Từ vựng xuất hiện trong tài liệu BJT 1000. Cần lưu ý sử dụng đúng ngữ cảnh văn hóa doanh nghiệp Nhật."
    
    cat = categorize(item["meaningVn"])
    if cat:
        groups_dict[cat["id"]]["items"].append(item)
    else:
        general_items.append(item)

# Chunk general items
CHUNK_SIZE = 50
general_chunks = [general_items[i:i + CHUNK_SIZE] for i in range(0, len(general_items), CHUNK_SIZE)]

final_groups = list(groups_dict.values())
for idx, chunk in enumerate(general_chunks):
    final_groups.append({
        "id": f"bjt-g-general-{idx+1}",
        "sourceType": "BJT",
        "sourceName": "BJT 1000 Từ Vựng",
        "name": f"BJT Tổng hợp (Phần {idx+1})",
        "themeColor": "#6b7280",
        "icon": "🔖",
        "items": chunk
    })

# Filter out empty groups
final_groups = [g for g in final_groups if len(g["items"]) > 0]

# Save to JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(final_groups, f, ensure_ascii=False, indent=2)

print(f"Processed {len(all_items)} items into {len(final_groups)} groups.")
