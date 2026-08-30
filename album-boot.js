(function () {
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  function addBtn(parent, sel, html, afterSel) {
    if (!parent || parent.querySelector(sel)) return;
    var b = el(html);
    var after = afterSel ? parent.querySelector(afterSel) : null;
    if (after && after.nextSibling) parent.insertBefore(b, after.nextSibling);
    else parent.appendChild(b);
  }
  var desk = document.querySelector('nav .hidden.md\\:flex, nav div.hidden');
  addBtn(desk, '[data-win="album"]', '<button type="button" data-win="album" class="hover:text-blue-400">Album</button>', '[data-win="freelance"]');
  addBtn(desk, '[data-win="payment"]', '<button type="button" data-win="payment" class="hover:text-blue-400">Pay</button>', '[data-win="album"]');
  var heroBtn = document.querySelector('#win-utama button[data-win="freelance"]');
  if (heroBtn && heroBtn.parentNode && !document.querySelector('#win-utama button[data-win="album"]')) {
    heroBtn.parentNode.insertBefore(el('<button type="button" data-win="album" class="bg-cyan-600 font-medium px-7 py-3 rounded-xl">Album jasa</button>'), heroBtn.nextSibling);
  }
  var bottom = document.querySelector('nav.md\\:hidden, nav.fixed.bottom-0');
  if (bottom) {
    bottom.className = bottom.className.replace(/grid-cols-\d+/, 'grid-cols-7').replace('text-[11px]', 'text-[10px]');
    addBtn(bottom, '[data-win="album"]', '<button type="button" data-win="album" class="py-3">Album</button>', '[data-win="freelance"]');
    addBtn(bottom, '[data-win="payment"]', '<button type="button" data-win="payment" class="py-3">Pay</button>', '[data-win="album"]');
  }
  if (!document.getElementById('win-album')) {
    var win = el('<div id="win-album" class="win"></div>');
    var src = 'https://fajartris17.github.io/gemini_generated_video_1c76450e.mp4';
    win.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-5xl mx-auto">' +
      '<p class="text-center text-cyan-400 text-sm font-semibold uppercase mb-3">Album</p>' +
      '<h2 class="text-3xl font-bold text-center mb-3">Video promo & paket harga</h2>' +
      '<div class="rounded-2xl overflow-hidden border border-slate-800 bg-black mb-4">' +
      '<video class="w-full aspect-video" controls playsinline webkit-playsinline preload="metadata">' +
      '<source src="' + src + '" type="video/mp4"></video></div>' +
      '<div class="flex flex-wrap justify-center gap-3 mb-8">' +
      '<a class="bg-cyan-600 font-medium px-5 py-2 rounded-xl" href="album.html">Album penuh</a>' +
      '<a class="bg-amber-600 font-medium px-5 py-2 rounded-xl" href="payment.html">Payment</a></div></div></section>';
    var exp = document.getElementById('win-experience');
    if (exp) exp.parentNode.insertBefore(win, exp);
    else document.body.appendChild(win);
  }
  if (!document.getElementById('win-payment')) {
    var pay = el('<div id="win-payment" class="win"></div>');
    pay.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-md mx-auto text-center">' +
      '<p class="text-amber-400 text-sm font-semibold uppercase mb-2">Payment</p>' +
      '<h2 class="text-3xl font-bold mb-2">Bayar ke Fajar</h2>' +
      '<p class="text-slate-400 text-sm mb-6">QRIS, Jago, GoPay, KasPro.</p>' +
      '<a class="inline-block bg-amber-600 font-medium px-7 py-3 rounded-xl" href="payment.html">Buka halaman bayar</a>' +
      '<p class="text-slate-300 mt-6 font-mono">Jago 1096 9586 4975</p>' +
      '<p class="text-slate-400 text-sm">a.n. FAJAR TRI SUHARTONO</p>' +
      '<a class="inline-block mt-4 text-emerald-400" href="https://wa.me/6281356510403?text=Halo%20Fajar%2C%20saya%20sudah%20bayar.">Konfirmasi WA 0813-5651-0403</a>' +
      '</div></section>';
    var album = document.getElementById('win-album');
    if (album && album.parentNode) album.parentNode.insertBefore(pay, album.nextSibling);
    else document.body.appendChild(pay);
  }
  if (typeof buka === 'function') {
    document.querySelectorAll('[data-win]').forEach(function (btn) {
      if (btn.getAttribute('data-bound-album') === '1') return;
      btn.setAttribute('data-bound-album', '1');
      btn.addEventListener('click', function () { buka(btn.getAttribute('data-win')); });
    });
    var h = (location.hash || '').replace('#', '');
    if (h === 'album' || h === 'payment') buka(h);
  }
})();
