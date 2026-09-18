# Pile Monitoring — Demo

Demo statis **Pile Monitoring & Daily Planning** untuk NACL Bulk Storage (Site Manager / Digital Engineering).

## Cara membuka

Buka `index.html` lewat GitHub Pages, atau server lokal dari folder ini (CDN Tailwind / Chart.js / SheetJS tetap dibutuhkan).

`index.html` adalah **loader kecil** (~1KB) yang mengambil `parts/0.txt` … `parts/4.txt` lalu menulis HTML lengkap ke dokumen. Aset gambar besar (`drawing.jpg`) dipecah di `assets/drawing_parts/0.txt` … `11.txt` (base64); logo di `assets/*.jpg.b64`.

Tautan kembali ke portfolio: [← Portfolio](../../links.html)

## Fitur

- Status pile & KPI (titik + meter)
- Layout drawing + tanda/marker manual
- Chart.js & import/export SheetJS
- Mode gelap, info hari libur

> Ini demo portofolio — data contoh, bukan sistem produksi.
