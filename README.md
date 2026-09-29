# andrewclasses-thu — TRANG THỬ của andrewclasses.com

⚠ Đây là trang THỬ, KHÔNG phải trang thật. Học sinh dùng https://andrewclasses.com (kho myLesson `web`).

## ⭐ Từ 29/09/2026 (web v1.178.0): trang thử = BẢN CHÉP Y HỆT trang thật
Thầy chốt: hai trang giống hệt nhau, sửa bên này bên kia y hệt. **Chỉ khác**: trang thật bấm tab myNetwork (bảng tin, tin nhắn,
khám phá, cá nhân…) hiện hộp "ra mắt sau"; trang thử mở luôn. Chỗ khác nằm TRONG code (`config.js` → `AC_THU` theo tên miền
`andrewclasses-01.github.io`, máy cổng 8825) nên file hai bên giống hệt từng chữ.

- ⛔ **KHÔNG sửa tay trong kho này.** Sửa ở kho `web` thật (trang `nw/` đã có cổng: trên andrewclasses.com tự về trang chủ), push,
  rồi trong kho `web` chạy: `python tools/dong-bo-trang-thu.py` (xem trước) → `python tools/dong-bo-trang-thu.py --day` (chép + push).
- Riêng của kho này (công cụ KHÔNG chép đè): `README.md`, `.gitignore`.
- ⛔ KHÔNG chứa dữ liệu học sinh: `data/`, `assets/avatar/`, `tools/`, `CNAME` không chép sang (có lưới chặn). Trang thử đọc dữ liệu +
  ảnh em từ `https://andrewclasses.com/` (`AC_GOC_DL`).
- ⚠ Dùng CHUNG dữ liệu thật (Firestore `aword-70dae`): làm bài / đăng bài ở đây = ghi thật vào tài khoản đã đăng nhập.
- ⚠ Khung AWord ở trang thử KHÔNG nhận vé (AWord chỉ tin andrewclasses.com) ⇒ nộp điểm ở đây nằm hộp chờ.
