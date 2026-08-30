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
  addBtn(desk, '[data-win="kontak"]', '<button type="button" data-win="kontak" class="hover:text-blue-400">Kontak</button>', '[data-win="utama"]');
  addBtn(desk, '[data-win="album"]', '<button type="button" data-win="album" class="hover:text-blue-400">Album</button>', '[data-win="freelance"]');
  addBtn(desk, '[data-win="payment"]', '<button type="button" data-win="payment" class="hover:text-blue-400">Pay</button>', '[data-win="album"]');

  var bottom = document.querySelector('nav.md\\:hidden, nav.fixed.bottom-0');
  if (bottom && !bottom.getAttribute('data-icon-nav')) {
    bottom.setAttribute('data-icon-nav', '1');
    bottom.className = 'md:hidden fixed bottom-0 inset-x-0 bg-slate-950/95 border-t border-slate-800 grid grid-cols-4 text-center z-50 px-1 py-1';
    bottom.innerHTML =
      '<button type="button" data-win="utama" class="py-2 text-[10px]"><i class="fas fa-user block text-base text-sky-300 mb-0.5"></i>Profil</button>' +
      '<button type="button" data-win="kontak" class="py-2 text-[10px]"><i class="fas fa-share-nodes block text-base text-emerald-300 mb-0.5"></i>Kontak</button>' +
      '<button type="button" data-win="album" class="py-2 text-[10px]"><i class="fas fa-images block text-base text-cyan-300 mb-0.5"></i>Album</button>' +
      '<button type="button" data-win="payment" class="py-2 text-[10px]"><i class="fas fa-qrcode block text-base text-amber-300 mb-0.5"></i>Pay</button>';
  }

  if (!document.getElementById('win-kontak')) {
    var k = el('<div id="win-kontak" class="win"></div>');
    k.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-md mx-auto text-center">' +
      '<div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 flex items-center justify-center text-3xl text-emerald-300"><i class="fas fa-share-nodes"></i></div>' +
      '<p class="text-emerald-400 text-sm font-semibold uppercase mt-4">Kontak</p>' +
      '<h2 class="text-3xl font-bold mt-1 mb-3">Share Link-I</h2>' +
      '<p class="text-slate-400 text-sm mb-6">Isi nomor tanpa simpan kontak, atau pilih kontak WhatsApp.</p>' +
      '<a class="inline-block bg-emerald-600 font-medium px-7 py-3 rounded-xl" href="kontak.html">Buka window share</a>' +
      '<p class="mt-6"><a class="text-emerald-400" href="https://wa.me/6281356510403">Chat Fajar 0813-5651-0403</a></p>' +
      '<button type="button" data-win="utama" class="mt-8 bg-slate-800 border border-slate-600 px-7 py-3 rounded-xl">Kembali</button></div></section>';
    var utama = document.getElementById('win-utama');
    if (utama && utama.parentNode) utama.parentNode.insertBefore(k, utama.nextSibling);
    else document.body.appendChild(k);
  }
  if (!document.getElementById('win-album')) {
    var win = el('<div id="win-album" class="win"></div>');
    win.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-5xl mx-auto text-center"><p class="text-cyan-400 text-sm font-semibold uppercase mb-3">Album</p><h2 class="text-3xl font-bold mb-6">Video promo & paket harga</h2><a class="bg-cyan-600 font-medium px-7 py-3 rounded-xl" href="album.html">Buka album</a></div></section>';
    var exp = document.getElementById('win-experience');
    if (exp) exp.parentNode.insertBefore(win, exp); else document.body.appendChild(win);
  }
  if (!document.getElementById('win-payment')) {
    var pay = el('<div id="win-payment" class="win"></div>');
    pay.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-md mx-auto text-center"><p class="text-amber-400 text-sm font-semibold uppercase mb-2">Payment</p><h2 class="text-3xl font-bold mb-4">Bayar ke Fajar</h2><a class="inline-block bg-amber-600 font-medium px-7 py-3 rounded-xl" href="payment.html">Buka halaman bayar</a></div></section>';
    var album = document.getElementById('win-album');
    if (album && album.parentNode) album.parentNode.insertBefore(pay, album.nextSibling); else document.body.appendChild(pay);
  }
  if (typeof buka === 'function') {
    document.querySelectorAll('[data-win]').forEach(function (btn) {
      if (btn.getAttribute('data-bound-album') === '1') return;
      btn.setAttribute('data-bound-album', '1');
      btn.addEventListener('click', function () { buka(btn.getAttribute('data-win')); });
    });
    var h = (location.hash || '').replace('#', '');
    if (h === 'album' || h === 'payment' || h === 'kontak') buka(h);
  }
})();
