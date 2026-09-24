import os, glob, sys
D = r'E:\LAP TRINH APP\andrewclasses-thu'
G = 'https://andrewclasses.com/'
THAY = [
    ("lay('data/", "lay('" + G + "data/"),
    ('src="assets/avatar/\'', 'src="' + G + 'assets/avatar/\''),
    ("return 'assets/avatar/'", "return '" + G + "assets/avatar/'"),
    ("fetch(duong + '?t='", "fetch((/^data\\//.test(duong) ? '" + G + "' : '') + duong + '?t='"),
]
tong = {}
for p in glob.glob(D + r'\*.html') + glob.glob(D + r'\js\*.js'):
    with open(p, 'r', encoding='utf-8', newline='') as f:
        s = f.read()
    s0 = s
    for cu, mo in THAY:
        n = s.count(cu)
        if n:
            tong[cu] = tong.get(cu, 0) + n
            s = s.replace(cu, mo)
    if s != s0:
        s.encode('utf-8')
        with open(p + '.tmp', 'w', encoding='utf-8', newline='') as f:
            f.write(s)
        os.replace(p + '.tmp', p)
        print('sua', os.path.basename(p))
for cu, _ in THAY:
    print(tong.get(cu, 0), cu)
if any(tong.get(cu, 0) == 0 for cu, _ in THAY):
    sys.exit('CO MAU KHONG KHOP')
