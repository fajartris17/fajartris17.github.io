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

  var bottom = document.querySelector('nav.md\\:hidden, nav.fixed.bottom-0');
  if (bottom && !bottom.getAttribute('data-icon-nav')) {
    bottom.setAttribute('data-icon-nav', '1');
    bottom.className = 'md:hidden fixed bottom-0 inset-x-0 bg-slate-950/95 border-t border-slate-800 grid grid-cols-7 text-center z-50 px-1 py-1';
    bottom.innerHTML =
      '<button type="button" data-win="utama" class="py-2 text-[10px]"><i class="fas fa-house block text-base text-sky-300 mb-0.5"></i>Utama</button>' +
      '<button type="button" data-win="freelance" class="py-2 text-[10px]"><i class="fas fa-briefcase block text-base text-violet-300 mb-0.5"></i>Freelance</button>' +
      '<button type="button" data-win="album" class="py-2 text-[10px]"><i class="fas fa-images block text-base text-cyan-300 mb-0.5"></i>Album</button>' +
      '<button type="button" data-win="payment" class="py-2 text-[10px]"><i class="fas fa-qrcode block text-base text-amber-300 mb-0.5"></i>Pay</button>' +
      '<button type="button" data-win="experience" class="py-2 text-[10px]"><i class="fas fa-helmet-safety block text-base text-blue-300 mb-0.5"></i>Kerja</button>' +
      '<button type="button" data-win="documents" class="py-2 text-[10px]"><i class="fas fa-file-pdf block text-base text-red-300 mb-0.5"></i>CV</button>' +
      '<button type="button" data-win="education" class="py-2 text-[10px]"><i class="fas fa-graduation-cap block text-base text-indigo-300 mb-0.5"></i>Sekolah</button>';
  }

  if (!document.getElementById('win-album')) {
    var win = el('<div id="win-album" class="win"></div>');
    win.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-5xl mx-auto text-center">' +
      '<p class="text-cyan-400 text-sm font-semibold uppercase mb-3">Album</p>' +
      '<h2 class="text-3xl font-bold mb-6">Video promo & paket harga</h2>' +
      '<a class="bg-cyan-600 font-medium px-7 py-3 rounded-xl" href="album.html">Buka album</a></div></section>';
    var exp = document.getElementById('win-experience');
    if (exp) exp.parentNode.insertBefore(win, exp);
    else document.body.appendChild(win);
  }
  if (!document.getElementById('win-payment')) {
    var pay = el('<div id="win-payment" class="win"></div>');
    pay.innerHTML = '<section class="py-16 px-4 min-h-[80vh]"><div class="max-w-md mx-auto text-center">' +
      '<p class="text-amber-400 text-sm font-semibold uppercase mb-2">Payment</p>' +
      '<h2 class="text-3xl font-bold mb-4">Bayar ke Fajar</h2>' +
      '<a class="inline-block bg-amber-600 font-medium px-7 py-3 rounded-xl" href="payment.html">Buka halaman bayar</a>' +
      '<p class="text-slate-300 mt-6 font-mono">Jago 1096 9586 4975</p></div></section>';
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
