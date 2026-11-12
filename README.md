# CV site (GitHub Pages)

Satu halaman CV statis. Tanpa build step, tanpa dependency, tanpa framework.

```
index.html          isi CV, ini yang dipakai GitHub Pages
styles.css          tampilan, termasuk aturan khusus print
print.js            tombol "Save as PDF"
template.html       versi kosong dengan placeholder [seperti ini]
cv-standalone.html  hasil generate, semua CSS dan JS inline (1 file)
```

## Mengedit isi

Semua teks ada di `index.html`:

- **Rail kiri**: nama, jabatan, ringkasan, kontak (email, telepon, GitHub, lokasi).
- **01 Experience**: empat entri, tiap entri berisi jabatan, perusahaan, tanggal, dan bullet.
- **02 Skills**: tiga grup (Testing, Automation, Tools).
- **03 Education**: gelar, kampus, tahun, GPA.
- **Footer**: tanggal update terakhir.

Menambah entri pengalaman: copy satu blok `<article class="entry">` lalu ubah isinya.
Nomor section ada di `<span class="num">`, jadi kalau menambah section baru, urutannya
perlu disesuaikan.

Setelah mengedit `index.html` atau `styles.css`, buat ulang versi satu file:

```bash
python3 - <<'PY'
html = open('index.html').read()
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + open('styles.css').read() + '</style>')
html = html.replace('<script src="print.js" defer></script>', '<script>\n' + open('print.js').read() + '</script>')
open('cv-standalone.html', 'w').write(html)
PY
```

## Lihat hasilnya di lokal

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000`. Membuka `index.html` langsung dari file juga bisa,
karena tidak ada fetch atau modul.

## Deploy ke GitHub Pages

Situs sudah live di **https://dikurrrr.github.io/**

| Item | Nilai |
| --- | --- |
| Repo | `dikurrrr/dikurrrr.github.io` (public) |
| Branch | `main` |
| Folder | `/ (root)` |
| HTTPS | enforced |

Nama repo sengaja persis sama dengan username. Itu syarat URL bersih tanpa subfolder:
`https://dikurrrr.github.io/`, bukan `https://dikurrrr.github.io/nama-repo/`.
Kalau repo di-rename, URL-nya ikut berubah dan setting Pages tetap terbawa.

### Update isi

```bash
git add .
git commit -m "Update CV"
git push
```

Pages rebuild otomatis, sekitar 1 menit. Cek status di tab **Actions**, atau:

```bash
gh api repos/dikurrrr/dikurrrr.github.io/pages/builds/latest --jq .status
```

### Kalau perlu setup ulang dari nol

Hanya untuk repo baru. Repo yang sekarang sudah dikonfigurasi, jadi langkah ini
tidak perlu diulang.

1. Buat repo public bernama `dikurrrr.github.io`. Pages gratis tidak jalan di repo private.
2. Push `main` ke repo itu.
3. **Settings > Pages > Build and deployment > Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`, Save.
4. Tunggu 1 sampai 2 menit, lalu buka `https://dikurrrr.github.io/`.

Semua path di halaman ini relatif, jadi situs tetap jalan kalau suatu saat dipindah
ke repo lain dengan URL ber-subfolder.

## Catatan

- Tombol **Save as PDF** memanggil dialog print browser. Pilih "Save as PDF" di dialog itu.
  Layout print otomatis jadi satu kolom, navigasi dan tombol disembunyikan, entri tidak
  terpotong antar halaman. Hasilnya 2 halaman A4.
- Halaman ini sengaja tanpa dark mode: CV dibaca dan dicetak di atas kertas putih,
  jadi tema terang adalah medium aslinya.
- Tidak ada font dari jaringan. Judul memakai serif bawaan sistem, isi memakai sans
  bawaan sistem, jadi halaman tampil instan tanpa FOUT.
- `template.html` adalah versi kosong kalau nanti mau bikin CV kedua.
