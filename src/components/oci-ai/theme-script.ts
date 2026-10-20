/** Khóa localStorage lưu nền bài đọc OCI ("dark" hoặc không có) */
export const OCI_THEME_KEY = "oci-ai-theme";

/** Script chạy trước khi trình duyệt vẽ trang để áp nền tối đã chọn cho bài đọc (tránh nháy màu). Mặc định: sáng như cả app. */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem("${OCI_THEME_KEY}")==="dark")document.getElementById("oci-root").setAttribute("data-theme","dark")}catch(e){}`;
