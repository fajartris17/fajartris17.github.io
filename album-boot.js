(function () {
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  var desk = document.querySelector('nav .hidden.md\\:flex, nav div.hidden');
  if (desk && !desk.querySelector('[data-win="album"]')) {
    var b = el('<button type="button" data-win="album" class="hover:text-blue-400">Album</button>');
    var after = desk.querySelector('[data-win="freelance"]');
    if (after && after.nextSibling) desk.insertBefore(b, after.nextSibling);
    else desk.appendChild(b);
  }
  var heroBtn = document.querySelector('#win-utama button[data-win="freelance"]');
  if (heroBtn && !document.querySelector('#win-utama button[data-win="album"]')) {
    var hb = el('<button type="button" data-win="album" class="bg-cyan-600 font-medium px-7 py-3 rounded-xl">Album jasa</button>');
    heroBtn.parentNode.insertBefore(hb, heroBtn.nextSibling);
  }
  var bottom = document.querySelector('nav.md\\:hidden, nav.fixed.bottom-0');
  if (bottom && !bottom.querySelector('[data-win="album"]')) {
    bottom.className = bottom.className.replace('grid-cols-5', 'grid-cols-6').replace('text-[11px]', 'text-[10px]');
    var bb = el('<button type="button" data-win="album" class="py-3">Album</button>');
    var bf = bottom.querySelector('[data-win="freelance"]');
    if (bf && bf.nextSibling) bottom.insertBefore(bb, bf.nextSibling);
    else bottom.appendChild(bb);
  }
  if (!document.getElementById('win-album')) {
    var win = el('<div id="win-album" class="win"></div>');
    win.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-5xl mx-auto">' +
      '<p class="text-center text-cyan-400 text-sm font-semibold uppercase mb-3">Album</p>' +
      '<h2 class="text-3xl font-bold text-center mb-3">Video promo & paket harga</h2>' +
      '<p class="text-center text-slate-400 max-w-3xl mx-auto mb-10">Aplikasi UMKM, kasir, dan desain grafis. Harga freelancer — final setelah brief.</p>' +
      '<div class="rounded-2xl border border-slate-800 bg-slate-950 p-6 mb-8"><p class="font-medium">Video promo warung</p>' +
      '<p class="text-slate-400 text-sm mt-2">Kelola warung dengan HP: catat penjualan, kelola stok, terima pesanan.</p>' +
      '<div class="grid sm:grid-cols-3 gap-3 mt-4 text-sm">' +
      '<div class="rounded-xl bg-slate-900 border border-slate-800 p-3">Catat penjualan & stok</div>' +
      '<div class="rounded-xl bg-slate-900 border border-slate-800 p-3">Order menu + WhatsApp</div>' +
      '<div class="rounded-xl bg-slate-900 border border-slate-800 p-3">Kasir, kembalian, omzet</div></div></div>' +
      '<div class="grid md:grid-cols-2 gap-5 mb-10">' +
      '<article class="bg-slate-950 rounded-2xl border border-cyan-500/30 p-6"><p class="text-cyan-400 text-xs uppercase font-semibold">Aplikasi</p><ul class="mt-4 space-y-2 text-sm text-slate-300">' +
      '<li class="flex justify-between gap-3"><span>Aplikasi sederhana (katalog + WA)</span><b>Rp5–15 jt</b></li>' +
      '<li class="flex justify-between gap-3"><span>UMKM standar (keranjang + admin)</span><b>Rp15–40 jt</b></li>' +
      '<li class="flex justify-between gap-3"><span>POS / kasir + laporan</span><b>Rp4–20 jt</b></li>' +
      '<li class="flex justify-between gap-3"><span>E-commerce + payment</span><b>Rp40–100 jt</b></li></ul></article>' +
      '<article class="bg-slate-950 rounded-2xl border border-violet-500/30 p-6"><p class="text-violet-400 text-xs uppercase font-semibold">Desain grafis</p><ul class="mt-4 space-y-2 text-sm text-slate-300">' +
      '<li class="flex justify-between gap-3"><span>Poster / flyer 1 sisi</span><b>Rp50–150 rb</b></li>' +
      '<li class="flex justify-between gap-3"><span>Spanduk / banner</span><b>Rp60–150 rb</b></li>' +
      '<li class="flex justify-between gap-3"><span>Logo UMKM</span><b>Rp50–250 rb</b></li>' +
      '<li class="flex justify-between gap-3"><span>Feed IG / paket 10 feed</span><b>Rp25–750 rb</b></li></ul></article></div>' +
      '<div class="grid md:grid-cols-2 gap-4 mb-10">' +
      '<a class="block bg-slate-950 border border-orange-500/40 rounded-2xl p-5" href="apps/warung.html"><p class="text-orange-400 text-xs font-semibold uppercase">Demo</p><h3 class="font-bold text-lg mt-1">Pesan warung</h3></a>' +
      '<a class="block bg-slate-950 border border-emerald-500/40 rounded-2xl p-5" href="apps/kasir.html"><p class="text-emerald-400 text-xs font-semibold uppercase">Demo</p><h3 class="font-bold text-lg mt-1">Kasir sederhana</h3></a></div>' +
      '<div class="flex flex-wrap justify-center gap-3">' +
      '<a class="bg-emerald-600 font-medium px-7 py-3 rounded-xl" href="https://wa.me/6281356510403?text=Halo%20Fajar%2C%20saya%20lihat%20album%20paket%20harga.%20Ingin%20order%20aplikasi%20atau%20desain.">Order via WhatsApp</a>' +
      '<a class="bg-cyan-700 font-medium px-7 py-3 rounded-xl" href="album.html">Buka album penuh</a>' +
      '<button type="button" data-win="utama" class="bg-slate-800 border border-slate-600 font-medium px-7 py-3 rounded-xl">Kembali</button></div></div></section>';
    var exp = document.getElementById('win-experience');
    if (exp) exp.parentNode.insertBefore(win, exp);
    else document.body.appendChild(win);
  }
  if (typeof buka === 'function') {
    document.querySelectorAll('[data-win]').forEach(function (btn) {
      if (btn.getAttribute('data-bound-album') === '1') return;
      btn.setAttribute('data-bound-album', '1');
      btn.addEventListener('click', function () { buka(btn.getAttribute('data-win')); });
    });
    var h = (location.hash || '').replace('#', '');
    if (h === 'album') buka('album');
  }
})();
