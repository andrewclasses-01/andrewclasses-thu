# andrewclasses-thu — TRANG THỬ của andrewclasses.com (giao diện myNetwork)

⚠ Đây là trang THỬ, KHÔNG phải trang thật. Học sinh dùng https://andrewclasses.com (kho myLesson `web`).

**Quy trình (thầy chốt 24/09/2026):** build các trang myNetwork ở đây, chạy live để thầy thử → thầy chốt "ok" từng chặng → mới đưa chặng đó sang kho `web` thật.
Hồ sơ đầy đủ: `E:\LAP TRINH APP\myNetwork\BAN GIAO.md` (khối 🚀🚀 24/09).

- Đang khớp trang thật **web v1.140.0** `0f54ab9` (đồng bộ 24/09, `ccbe10a`).
- ⛔ KHÔNG chứa dữ liệu học sinh: `data/`, `assets/avatar/`, `tools/` bị .gitignore, KHÔNG có `CNAME`.
  Mọi đường `data/…`, `assets/avatar/…` đã đổi sang `https://andrewclasses.com/…` bằng `thu/doi-duong-du-lieu.py`.
- ⚠ Dùng CHUNG dữ liệu thật (Firestore `aword-70dae`): làm bài ở đây = ghi thật vào tên em đã đăng nhập.
- Đồng bộ lại từ trang thật: `git archive origin/main` của kho `web` → bỏ `data/ assets/avatar/ tools/ CNAME README.md .gitignore` → chép đè vào đây →
  `python thu\doi-duong-du-lieu.py` (phải báo 14/6/1/1) → thử cổng 8825 → push.

## ⛔⛔ Luật chia vùng (thầy chốt tối 24/09/2026)
- **Trang quản lý (`dashboard.html`) + tính năng trong đó**: thầy build THẲNG trên andrewclasses.com (kho `web` thật). Kho này CHỈ NHẬN qua đồng bộ bản vá —
  ⛔ không sửa `dashboard.html` ở đây, ⛔ không bao giờ chép `dashboard.html` từ đây sang thật.
- **Tính năng myNetwork ngoài trang quản lý**: build ở đây → thầy "ok" → đưa sang thật.
- **File chung** (dashboard cũng nạp): `config.js`, `js/chung.js`, `js/chat.js`, `js/thay.js`, `js/nw-thanh.js`, `css/nw-thanh.css` — đưa sang thật chỉ gắn
  ĐOẠN thay đổi lên bản thật mới nhất (không chép cả file), rồi thử lại cả dashboard. Commit sửa file chung ghi "(file chung)".
- Trước khi build: kiểm kho `web` thật có bản mới ⇒ đồng bộ về đây trước. Chi tiết: `myNetwork\BAN GIAO.md` khối "LUẬT CHIA VÙNG".
