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
      '<div class="rounded-2xl overflow-hidden border border-slate-800 bg-black mb-8">' +
      '<video class="w-full aspect-video" controls playsinline poster="1788097886220.jpg">' +
      '<source src="gemini_generated_video_1c76450e.mp4" type="video/mp4"></video></div>' +
      '<div class="grid md:grid-cols-2 gap-5 mb-8">' +
      '<a href="1788097886220.jpg" target="_blank"><img src="1788097886220.jpg" alt="Harga aplikasi" class="w-full rounded-2xl border border-cyan-500/30"></a>' +
      '<a href="1788097530299.jpg" target="_blank"><img src="1788097530299.jpg" alt="Harga desain" class="w-full rounded-2xl border border-violet-500/30"></a>' +
      '</div>' +
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
