const BUILTIN = [
  {id:'rab1', cat:'RAB / BOQ', title:'Susun RAB item kerja', body:`Anda estimator konstruksi Indonesia. Buatkan RAB / BOQ untuk:\nProyek: {{NAMA_PROYEK}}\nLokasi: {{LOKASI}}\nLingkup: {{LINGKUP}}\nMutu beton: {{FC}} MPa\n\nFormat tabel:\nNo | Uraian pekerjaan | Satuan | Volume | Harga satuan (asumsi) | Jumlah | Catatan teknis / acuan SNI\n\nSertakan asumsi harga, breakdown material-upah-alat jika relevan, dan catatan bahwa harga indikatif sampai dikonfirmasi supplier setempat.`},
  {id:'rab2', cat:'RAB / BOQ', title:'Breakdown volume beton & tulangan', body:`Hitung volume beton (m3) dan taksiran tulangan (kg) untuk:\nElemen: {{ELEMEN}} (contoh pile cap / pile / sloof / kolom)\nDimensi: {{DIMENSI}}\nJumlah: {{JUMLAH}}\nMutu beton f'c = {{FC}} MPa, tulangan {{DIA}} mm.\n\nTampilkan rumus, angka, pembulatan lapangan, waste 3-5%, dan acuan SNI 2847 / SNI 2052. Hasil indikatif, bukan shop drawing final.`},
  {id:'ms1', cat:'Method Statement', title:'MS pengecoran beton', body:`Buat Method Statement pengecoran (concrete pouring) untuk {{ELEMEN}} di proyek {{NAMA_PROYEK}}.\n\nIsi wajib:\n1. Tujuan dan lingkup\n2. Referensi: SNI 2847, SNI 1974 / ASTM C39, SNI 03-4814 slump\n3. Material dan peralatan\n4. Urutan kerja (preparation - formwork - rebar check - pour - vibrate - finishing - curing)\n5. Pengendalian mutu (slump, suhu, cube/cylinder)\n6. K3 / HSE\n7. Titik hold dan dokumen (ITP, checklist, BA)\n\nBahasa: campur istilah teknis Inggris + arti Indonesia.`},
  {id:'ms2', cat:'Method Statement', title:'MS pekerjaan pile / pondasi tiang', body:`Buat Method Statement pekerjaan pondasi tiang (pile) {{TIPE_PILE}} diameter {{DIA}} mm, kedalaman rencana {{L}} m, proyek {{NAMA_PROYEK}}.\n\nCakup: mobilisasi, setting out, driving/boring, splicing, cutoff, PDA/SLT jika ada, toleransi, K3, dan kriteria penerimaan. Rujuk SNI/ASTM yang relevan. Hasil siap tempel ke Word.`},
  {id:'ms3', cat:'Method Statement', title:'MS galian & formwork', body:`Method Statement excavation (galian) dan formwork (bekisting) untuk {{ELEMEN}}.\nSebutkan: survey awal, dewatering jika perlu, kemiringan galian, shoring, material bekisting, alignment, release agent, pembongkaran, dan inspeksi sebelum cor.`},
  {id:'lp1', cat:'Laporan', title:'Laporan harian lapangan', body:`Susun Daily Report konstruksi tanggal {{TANGGAL}} proyek {{NAMA_PROYEK}}.\n\nBagian:\n- Cuaca dan jam kerja\n- Manpower (kontraktor / subkon)\n- Alat berat\n- Material masuk\n- Progress item (rencana vs aktual)\n- Kendala dan tindakan\n- K3 / insiden\n- Rencana besok\n- Foto yang perlu dilampirkan\n\nGaya singkat, profesional, siap kirim ke PM/owner.`},
  {id:'lp2', cat:'Laporan', title:'Rekap progres minggu ini', body:`Buat weekly progress report proyek {{NAMA_PROYEK}} periode {{PERIODE}}.\nTampilkan persen complete per item utama, S-curve naratif, bottleneck, request ke owner/pengawas, dan look-ahead 7 hari.`},
  {id:'sd1', cat:'Shop Drawing / RFI', title:'Draft RFI teknis', body:`Tulis RFI (Request for Information) no {{NO_RFI}} proyek {{NAMA_PROYEK}}.\nMasalah: {{MASALAH}}\nGambar/spek terkait: {{REFERENSI}}\n\nStruktur: latar, pertanyaan spesifik, opsi usulan kontraktor, dampak jadwal/biaya jika terlambat dijawab, lampiran.`},
  {id:'sd2', cat:'Shop Drawing / RFI', title:'Catatan shop drawing', body:`Buat daftar catatan shop drawing untuk {{ELEMEN}}: judul gambar, skala, dimensi kritis, bar mark, cover, clash dengan MEP/struktur, dan checklist kelengkapan sebelum submit ke pengawas.`},
  {id:'k31', cat:'K3 & Mutu', title:'Checklist pre-pour beton', body:`Checklist pre-pour concrete {{ELEMEN}} sesuai praktik lapangan + SNI.\nItem: formwork kekakuan dan kebersihan, rebar size/spacing/cover, embed, slump target, akses vibrator, curing plan, APD, izin kerja. Format tabel Ya/Tidak/Keterangan.`},
  {id:'k32', cat:'K3 & Mutu', title:'Toolbox talk 5 menit', body:`Buat naskah toolbox talk 5 menit topik {{TOPIK_K3}} untuk pekerja lapangan Indonesia. Bahasa sederhana, 5 poin bahaya, 5 poin kontrol, 3 pertanyaan cek pemahaman.`},
  {id:'job1', cat:'Lamaran Kerja', title:'Email lamaran Site Manager', body:`Tulis email lamaran singkat (maks 180 kata) ke HRD {{PERUSAHAAN}} untuk posisi {{POSISI}} di {{KOTA}}.\n\nProfil: Fajar Tri Suhartono, Site Manager konstruksi, pengalaman Avindo Energi Nusantara 2024-2026, Action Supervisor Construction RDMP Balikpapan JO 2020-2024, Hyundai Engineering, planner Dizamatra, BUMA Berau. Domisili Balikpapan, siap Kaltim. Lampirkan CV. Nada profesional, tidak berlebihan.`},
  {id:'job2', cat:'Lamaran Kerja', title:'Sesuaikan CV ke lowongan', body:`Berikut teks lowongan:\n{{TEKS_LOWONGAN}}\n\nPetakan 6 bullet pengalaman Fajar (Site Manager / pengawas konstruksi / project control) yang paling cocok. Usulkan judul CV, ringkasan 4 baris, dan kata kunci ATS. Jangan mengarang sertifikat yang tidak ada.`},
  {id:'xl1', cat:'Excel Lapangan', title:'Rumus tabel PDA / pile', body:`Buatkan spesifikasi tabel Excel untuk data pile / PDA:\nKolom: No tiang, diameter, panjang, elevasi cutoff, blow count, hammer, tanggal tes, kapasitas desain, hasil uji, status OK/Not OK, keterangan.\nBerikan rumus status, conditional formatting, dan cara filter rekap D400 vs D500.`},
  {id:'xl2', cat:'Excel Lapangan', title:'Jadwal shift & manpower', body:`Rancang struktur sheet jadwal shift {{PERIODE}} untuk tim lapangan: nama, jabatan, shift, lokasi, hari. Sertakan rumus hitung orang-hari dan peringatan jika overtime berlebih.`},
  {id:'ai1', cat:'Custom', title:'System prompt asisten lapangan', body:`Anda asisten site engineer Indonesia. Jawab campur istilah teknis Inggris + arti Indonesia. Prioritaskan SNI, lalu ASTM/ACI. Jangan mengklaim hitungan struktur final. Jika data kurang, tanya mutu beton, dimensi, dan lokasi proyek dulu. Fokus praktis untuk lapangan, bukan teori panjang.`}
];

const CATS = ['Semua','RAB / BOQ','Method Statement','Laporan','Shop Drawing / RFI','K3 & Mutu','Lamaran Kerja','Excel Lapangan','Custom'];
let active = 'Semua';

function custom(){ try { return JSON.parse(localStorage.getItem('fts_prompts')||'[]'); } catch(e){ return []; } }
function saveCustom(list){ localStorage.setItem('fts_prompts', JSON.stringify(list)); }
function all(){ return BUILTIN.concat(custom()); }

function renderCats(){
  document.getElementById('cats').innerHTML = CATS.map(c =>
    '<button data-cat="'+c+'" class="shrink-0 px-3 py-1.5 rounded-full border text-xs '+(c===active?'bg-violet-600 border-violet-500':'bg-slate-900 border-slate-700')+'">'+c+'</button>'
  ).join('');
  document.querySelectorAll('#cats button').forEach(b => b.onclick = () => { active=b.dataset.cat; draw(); });
}

function filtered(){
  const q = document.getElementById('q').value.toLowerCase();
  return all().filter(p =>
    (active==='Semua' || p.cat===active) &&
    (!q || (p.title+' '+p.body+' '+p.cat).toLowerCase().includes(q))
  );
}

function draw(){
  renderCats();
  const list = filtered();
  document.getElementById('empty').classList.toggle('hidden', list.length>0);
  document.getElementById('grid').innerHTML = list.map(p =>
    '<article class="card bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col">'+
    '<div class="flex items-start justify-between gap-2"><div>'+
    '<p class="text-[11px] text-violet-400 uppercase tracking-wide">'+esc(p.cat)+'</p>'+
    '<h2 class="font-semibold mt-0.5">'+esc(p.title)+'</h2></div>'+
    (p.custom?'<button data-del="'+p.id+'" class="text-slate-500 hover:text-red-400 text-xs"><i class="fas fa-trash"></i></button>':'')+
    '</div><pre class="mt-3 text-xs text-slate-400 whitespace-pre-wrap flex-1 max-h-40 overflow-auto">'+esc(p.body)+'</pre>'+
    '<button data-copy="'+p.id+'" class="mt-3 bg-slate-800 hover:bg-violet-600 text-sm py-2 rounded-xl">Salin prompt</button></article>'
  ).join('');
  document.querySelectorAll('[data-copy]').forEach(b => b.onclick = () => copy(b.dataset.copy));
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    saveCustom(custom().filter(x => x.id!==b.dataset.del)); draw();
  });
}

function copy(id){
  const p = all().find(x => x.id===id);
  if(!p) return;
  navigator.clipboard.writeText(p.body).then(()=>{
    const t=document.getElementById('toast');
    t.classList.remove('hidden'); t.classList.remove('toast'); void t.offsetWidth; t.classList.add('toast');
    setTimeout(()=>t.classList.add('hidden'), 2200);
  });
}

function esc(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[m])); }

document.getElementById('q').addEventListener('input', draw);
document.getElementById('btnAdd').onclick = () => document.getElementById('modal').classList.remove('hidden');
document.getElementById('btnCancel').onclick = () => document.getElementById('modal').classList.add('hidden');
document.getElementById('form').onsubmit = (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const item = { id:'c'+Date.now(), custom:true, title:fd.get('title'), cat:fd.get('cat'), body:fd.get('body') };
  saveCustom(custom().concat(item));
  e.target.reset();
  document.getElementById('modal').classList.add('hidden');
  active = item.cat; draw();
};
draw();
