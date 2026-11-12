# CV site (GitHub Pages)

CV satu halaman, statis. Tanpa build step, dependency, atau framework.

Live: **https://dikurrrr.github.io/**

| File | Isi |
| --- | --- |
| `index.html` | isi CV, ini yang dipakai GitHub Pages |
| `styles.css` | tampilan, termasuk aturan print |
| `print.js` | tombol "Save as PDF" |
| `template.html` | versi kosong dengan placeholder `[seperti ini]` |
| `cv-standalone.html` | hasil generate, CSS dan JS inline (1 file) |

## Mengedit isi

Semua teks ada di `index.html`: rail kiri (nama, jabatan, ringkasan, kontak), Experience,
Skills, Education, dan footer.

Menambah pengalaman: copy satu blok `<article class="entry">` lalu ubah isinya. Nomor
section ada di `<span class="num">`, jadi sesuaikan kalau menambah section baru.

Setelah mengubah `index.html` atau `styles.css`, buat ulang versi satu file:

```bash
python3 - <<'PY'
html = open('index.html').read()
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + open('styles.css').read() + '</style>')
html = html.replace('<script src="print.js" defer></script>', '<script>\n' + open('print.js').read() + '</script>')
open('cv-standalone.html', 'w').write(html)
PY
```

## Preview lokal

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000`. Membuka `index.html` langsung dari file juga bisa, karena
tidak ada fetch atau modul.

## Deploy

Repo `dikurrrr/dikurrrr.github.io` (public), Pages dari `main` + `/ (root)`, HTTPS enforced.
Nama repo sengaja sama dengan username supaya URL-nya tanpa subfolder.

```bash
git add .
git commit -m "Update CV"
git push
```

Rebuild otomatis sekitar 1 menit. Cek status:

```bash
gh api repos/dikurrrr/dikurrrr.github.io/pages/builds/latest --jq .status
```

Setup dari nol tidak perlu sekarang. Kalau suatu saat perlu: buat repo public bernama
`dikurrrr.github.io`, push `main`, lalu **Settings > Pages > Source: Deploy from a branch**,
branch `main`, folder `/ (root)`. Pages gratis tidak jalan di repo private.

## Catatan

- **Save as PDF** memanggil dialog print browser. Layout print jadi satu kolom, navigasi
  dan tombol disembunyikan, hasilnya 2 halaman A4.
- Tanpa dark mode: CV dibaca dan dicetak di atas kertas putih.
- Font sistem, tanpa request jaringan, jadi tampil instan tanpa FOUT.
- `template.html` untuk kalau nanti mau bikin CV kedua.
