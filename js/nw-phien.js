/* ============================================================
   nw-phien.js — PHIÊN ĐĂNG NHẬP myNetwork của HỌC SINH (Firebase Auth) — trang thử, chặng 1 (24/09/2026)

   Tài khoản do tools/tao-tai-khoan.mjs (repo myNetwork) tạo sẵn cho từng em:
     email giả = sha256(mã đăng nhập)[0..24] + DUOI_EMAIL · uid = hs_<mã số myStudent>
     mật khẩu ban đầu = chính mã đăng nhập · hồ sơ nwUsers/{uid} có phaiDoiMk:true
   ⇒ lần đầu vào, trang bắt em đặt mật khẩu riêng (datMatKhau).
   ⛔ chuanMa + cách băm PHẢI khớp tools/tao-tai-khoan.mjs và js/loi.js của myNetwork.
   ⛔ Dùng CHUNG app Firebase với chat.js/thay.js (ai đến trước tạo, ai đến sau dùng lại) — bẫy duplicate-app v1.17.0.
   ⛔ Cùng một trình duyệt chỉ giữ MỘT phiên: em đăng nhập sẽ đẩy phiên Google của thầy ra (và ngược lại).
   ============================================================ */
(function () {
  'use strict';

  var SDK = 'https://www.gstatic.com/firebasejs/12.9.0';
  var CAU_HINH = {
    apiKey: 'AIzaSyAV_yoyAQM2fKKdOsJyuAxxf4AN7MsF7XY',
    authDomain: 'aword-70dae.firebaseapp.com',
    projectId: 'aword-70dae',
    storageBucket: 'aword-70dae.firebasestorage.app',
    messagingSenderId: '399279049436',
    appId: '1:399279049436:web:b9b34dcfb34732aa744219'
  };
  var DUOI_EMAIL = '@id.andrewclasses.com';

  var _p = null;
  function fb() {
    if (!_p) {
      _p = (async function () {
        var appMod = await import(SDK + '/firebase-app.js');
        var au = await import(SDK + '/firebase-auth.js');
        var fs = await import(SDK + '/firebase-firestore.js');
        var app = (appMod.getApps && appMod.getApps().length) ? appMod.getApp() : appMod.initializeApp(CAU_HINH);
        var auth = au.getAuth(app);
        try { await au.setPersistence(auth, au.browserLocalPersistence); } catch (e) { }
        return { au: au, auth: auth, fs: fs, db: fs.getFirestore(app) };
      })();
      _p['catch'](function () { _p = null; });   // mạng lỗi lúc tải SDK ⇒ lần sau thử lại
    }
    return _p;
  }

  function chuanMa(s) { return String(s || '').replace(/\s+/g, '').toUpperCase(); }
  async function emailTuMa(ma) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(chuanMa(ma)));
    var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    return hex.slice(0, 24) + DUOI_EMAIL;
  }
  function laHocSinh(u) { return !!(u && u.email && u.email.slice(-DUOI_EMAIL.length) === DUOI_EMAIL); }

  // Đợi Firebase khôi phục phiên cũ (nhớ trong máy) rồi mới trả — không nháy "chưa đăng nhập".
  function userHienTai() {
    return fb().then(function (f) {
      if (f.auth.currentUser) return f.auth.currentUser;
      return new Promise(function (res) {
        var stop = f.au.onAuthStateChanged(f.auth, function (u) { stop(); res(u || null); });
      });
    });
  }

  // Phiên HỌC SINH đúng mã này (null nếu chưa đăng nhập / đang là người khác / là thầy).
  async function phienCuaMa(ma) {
    var u = await userHienTai();
    if (!laHocSinh(u)) return null;
    return u.email === await emailTuMa(ma) ? u : null;
  }

  async function dangNhap(ma, mk) {
    var f = await fb();
    var r = await f.au.signInWithEmailAndPassword(f.auth, await emailTuMa(ma), mk);
    return r.user;
  }

  // Hồ sơ nwUsers/{uid} — 1 lượt đọc, chỉ ở màn đăng nhập.
  async function hoSo(u) {
    var f = await fb();
    var s = await f.fs.getDoc(f.fs.doc(f.db, 'nwUsers', u.uid));
    return s.exists() ? s.data() : null;
  }

  async function datMatKhau(mkMoi) {
    var f = await fb();
    var u = f.auth.currentUser;
    if (!u) throw new Error('chua-dang-nhap');
    await f.au.updatePassword(u, mkMoi);
    await f.fs.updateDoc(f.fs.doc(f.db, 'nwUsers', u.uid), { phaiDoiMk: false, capNhat: Date.now() });
  }

  // Chỉ đăng xuất phiên HỌC SINH — không đụng phiên Google của thầy (dashboard).
  async function thoat() {
    var f = await fb();
    if (laHocSinh(f.auth.currentUser)) await f.au.signOut(f.auth);
  }

  // Lỗi Firebase → câu dễ hiểu cho học sinh.
  function chuLoi(e) {
    var c = (e && e.code) || '';
    if (c === 'auth/invalid-credential' || c === 'auth/wrong-password' || c === 'auth/user-not-found' || c === 'auth/invalid-email')
      return 'ID hoặc mật khẩu chưa đúng.';
    if (c === 'auth/too-many-requests') return 'Em nhập sai nhiều lần quá. Đợi vài phút rồi thử lại nhé.';
    if (c === 'auth/user-disabled') return 'Tài khoản này đang bị khoá. Em liên hệ thầy Andrew nhé.';
    if (c === 'auth/network-request-failed') return 'Mạng đang chập chờn. Em thử lại nhé.';
    if (c === 'auth/operation-not-allowed') return 'Đăng nhập chưa được mở. Em báo thầy Andrew nhé.';
    if (c === 'auth/weak-password') return 'Mật khẩu cần ít nhất 6 ký tự.';
    if (c === 'auth/requires-recent-login') return 'Phiên đăng nhập đã cũ. Em đăng nhập lại rồi đặt mật khẩu nhé.';
    return 'Có lỗi, em thử lại nhé.' + (c ? ' (' + c + ')' : '');
  }

  window.NWP = { fb: fb, emailTuMa: emailTuMa, userHienTai: userHienTai, phienCuaMa: phienCuaMa,
    dangNhap: dangNhap, hoSo: hoSo, datMatKhau: datMatKhau, thoat: thoat, chuLoi: chuLoi };
})();
