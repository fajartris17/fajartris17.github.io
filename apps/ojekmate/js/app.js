const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n) => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
const todayStr = () => new Date().toISOString().slice(0, 10);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const store = {
  get(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
const state = {
  profile: store.get("om_profile", { name: "Mitra", target: 150000, komisi: 8, bbmPerKm: 500, armada: "motor" }),
  orders: store.get("om_orders", []),
  expenses: store.get("om_expenses", []),
  vehicle: store.get("om_vehicle", { km: "", oli: "", servis: "", ban: "", catatan: "" }),
  checklist: store.get("om_check", {})
};
function saveAll() {
  store.set("om_profile", state.profile);
  store.set("om_orders", state.orders);
  store.set("om_expenses", state.expenses);
  store.set("om_vehicle", state.vehicle);
  store.set("om_check", state.checklist);
}
function toast(msg) {
  const t = document.querySelector("#toast");
  t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}
function showPage(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".nav button").forEach((b) => b.classList.toggle("active", b.dataset.page === id));
  document.querySelector("#page-" + id).classList.add("active");
  if (id === "beranda") renderHome();
  if (id === "order") renderOrders();
  if (id === "hitung") renderCalcHint();
  if (id === "motor") renderVehicle();
  if (id === "lain") renderLain();
}
function ordersToday() { const d = todayStr(); return state.orders.filter((o) => o.date === d); }
function expensesToday() { const d = todayStr(); return state.expenses.filter((e) => e.date === d); }
function orderNet(o) {
  const komisi = (o.tarif * (o.komisi ?? state.profile.komisi)) / 100;
  const bbm = (o.km || 0) * (state.profile.bbmPerKm || 0);
  return (o.tarif || 0) + (o.tip || 0) - komisi - bbm;
}
function renderHome() {
  const name = state.profile.name || "Mitra";
  const hour = new Date().getHours();
  const greet = hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";
  document.querySelector("#greet").textContent = greet + ", " + name;
  const ot = ordersToday();
  const gross = ot.reduce((s, o) => s + (o.tarif || 0) + (o.tip || 0), 0);
  const net = ot.reduce((s, o) => s + orderNet(o), 0);
  const exp = expensesToday().reduce((s, e) => s + (e.amount || 0), 0);
  const target = Number(state.profile.target) || 0;
  const pct = target ? Math.min(100, Math.round((net / target) * 100)) : 0;
  document.querySelector("#stat-order").textContent = ot.length;
  document.querySelector("#stat-gross").textContent = fmt(gross);
  document.querySelector("#stat-net").textContent = fmt(net);
  document.querySelector("#stat-exp").textContent = fmt(exp);
  document.querySelector("#stat-target").textContent = fmt(net) + " / " + fmt(target);
  document.querySelector("#target-bar").style.width = pct + "%";
  document.querySelector("#target-pct").textContent = pct + "% dari target harian";
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const ws = weekStart.toISOString().slice(0, 10);
  const weekOrders = state.orders.filter((o) => o.date >= ws);
  document.querySelector("#stat-week").textContent = fmt(weekOrders.reduce((s, o) => s + orderNet(o), 0));
  document.querySelector("#stat-week-n").textContent = weekOrders.length + " order minggu ini";
  const recent = [...state.orders].sort((a, b) => (b.date + b.id).localeCompare(a.date + a.id)).slice(0, 5);
  document.querySelector("#recent-list").innerHTML = recent.length ? recent.map(orderItemHtml).join("") : '<div class="empty">Belum ada order. Catat trip pertama di tab Order.</div>';
}
function orderItemHtml(o) {
  const plat = (o.platform || "lainnya").toLowerCase();
  const arm = o.armada === "mobil" ? "Mobil" : "Motor";
  return '<div class="item"><div><div><span class="badge ' + plat + '">' + o.platform + '</span> <strong>' + fmt(o.tarif) + '</strong></div><div class="meta">' + o.date + ' · ' + arm + ' · ' + (o.km || 0) + ' km · bersih ' + fmt(orderNet(o)) + '</div></div><button class="btn btn-ghost btn-sm" onclick="deleteOrder(\'' + o.id + '\')">Hapus</button></div>';
}
function renderOrders() {
  const list = [...state.orders].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  document.querySelector("#order-list").innerHTML = list.length ? list.map(orderItemHtml).join("") : '<div class="empty">Belum ada catatan order.</div>';
  const fd = document.querySelector("#f-date"); if (fd && !fd.value) fd.value = todayStr();
  const fk = document.querySelector("#f-komisi"); if (fk) fk.value = state.profile.komisi;
  const fa = document.querySelector("#f-armada");
  if (fa && !fa.dataset.touched) fa.value = state.profile.armada === "mobil" ? "mobil" : "motor";
}
function addOrder(e) {
  e.preventDefault();
  const o = {
    id: uid(),
    date: document.querySelector("#f-date").value || todayStr(),
    armada: document.querySelector("#f-armada").value || "motor",
    platform: document.querySelector("#f-platform").value,
    tarif: Number(document.querySelector("#f-tarif").value) || 0,
    tip: Number(document.querySelector("#f-tip").value) || 0,
    km: Number(document.querySelector("#f-km").value) || 0,
    komisi: Number(document.querySelector("#f-komisi").value) || state.profile.komisi,
    note: document.querySelector("#f-note").value.trim()
  };
  if (!o.tarif) return toast("Isi tarif order dulu");
  state.orders.push(o); saveAll();
  e.target.reset();
  document.querySelector("#f-date").value = todayStr();
  document.querySelector("#f-komisi").value = state.profile.komisi;
  document.querySelector("#f-armada").value = o.armada;
  renderOrders(); toast("Order tersimpan");
}
function deleteOrder(id) { state.orders = state.orders.filter((o) => o.id !== id); saveAll(); renderOrders(); renderHome(); toast("Order dihapus"); }
function defaultBbm(armada) { return armada === "mobil" ? (state.profile.bbmPerKmMobil || 1800) : (state.profile.bbmPerKm || 500); }
function renderCalcHint() {
  document.querySelector("#c-komisi").value = state.profile.komisi;
  const arm = state.profile.armada === "mobil" ? "mobil" : "motor";
  const ca = document.querySelector("#c-armada"); if (ca) ca.value = arm;
  document.querySelector("#c-bbm").value = defaultBbm(arm);
}
function hitung() {
  const tarif = Number(document.querySelector("#c-tarif").value) || 0;
  const tip = Number(document.querySelector("#c-tip").value) || 0;
  const km = Number(document.querySelector("#c-km").value) || 0;
  const komisiPct = Number(document.querySelector("#c-komisi").value) || 0;
  const bbmPerKm = Number(document.querySelector("#c-bbm").value) || 0;
  const lain = Number(document.querySelector("#c-lain").value) || 0;
  const komisi = tarif * komisiPct / 100;
  const bbm = km * bbmPerKm;
  const bersih = tarif + tip - komisi - bbm - lain;
  document.querySelector("#calc-result").innerHTML = '<div class="kv"><span>Tarif + tip</span><strong>' + fmt(tarif + tip) + '</strong></div><div class="kv"><span>Komisi ' + komisiPct + '%</span><strong class="warn">- ' + fmt(komisi) + '</strong></div><div class="kv"><span>Estimasi BBM</span><strong class="warn">- ' + fmt(bbm) + '</strong></div><div class="kv"><span>Biaya lain</span><strong class="warn">- ' + fmt(lain) + '</strong></div><div class="muted" style="margin-top:10px">Penghasilan bersih</div><div class="big">' + fmt(bersih) + '</div>';
}
function addExpense(e) {
  e.preventDefault();
  const ex = { id: uid(), date: document.querySelector("#e-date").value || todayStr(), type: document.querySelector("#e-type").value, amount: Number(document.querySelector("#e-amount").value) || 0, note: document.querySelector("#e-note").value.trim() };
  if (!ex.amount) return toast("Isi nominal");
  state.expenses.push(ex); saveAll(); e.target.reset(); document.querySelector("#e-date").value = todayStr(); renderLain(); toast("Pengeluaran dicatat");
}
function renderVehicle() {
  document.querySelector("#v-km").value = state.vehicle.km || "";
  document.querySelector("#v-oli").value = state.vehicle.oli || "";
  document.querySelector("#v-servis").value = state.vehicle.servis || "";
  document.querySelector("#v-ban").value = state.vehicle.ban || "";
  document.querySelector("#v-catatan").value = state.vehicle.catatan || "";
}
function saveVehicle() {
  state.vehicle = { km: document.querySelector("#v-km").value, oli: document.querySelector("#v-oli").value, servis: document.querySelector("#v-servis").value, ban: document.querySelector("#v-ban").value, catatan: document.querySelector("#v-catatan").value };
  saveAll(); toast("Data kendaraan disimpan");
}
const CHECK_ITEMS = [["helm","Helm SNI / sabuk pengaman"],["lampu","Lampu depan, sein, rem"],["ban","Tekanan ban cukup"],["rem","Rem responsif"],["hp","HP charged + powerbank"],["stnk","STNK & SIM dibawa"],["saldo","Saldo e-wallet / e-toll"]];
function renderLain() {
  document.querySelector("#p-name").value = state.profile.name || "";
  const pa = document.querySelector("#p-armada"); if (pa) pa.value = state.profile.armada || "motor";
  document.querySelector("#p-target").value = state.profile.target || "";
  document.querySelector("#p-komisi").value = state.profile.komisi || 8;
  document.querySelector("#p-bbm").value = state.profile.bbmPerKm || 500;
  const d = todayStr(); const todayCheck = state.checklist[d] || {};
  document.querySelector("#check-list").innerHTML = CHECK_ITEMS.map(function(it){ return '<label class="check"><input type="checkbox" ' + (todayCheck[it[0]] ? "checked" : "") + ' onchange="toggleCheck(\'' + it[0] + '\', this.checked)"> ' + it[1] + '</label>'; }).join("");
  const ex = [...state.expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
  document.querySelector("#exp-list").innerHTML = ex.length ? ex.map(function(e){ return '<div class="item"><div><strong>' + e.type + '</strong> · ' + fmt(e.amount) + '<div class="meta">' + e.date + '</div></div><button class="btn btn-ghost btn-sm" onclick="deleteExpense(\'' + e.id + '\')">Hapus</button></div>'; }).join("") : '<div class="empty">Belum ada pengeluaran.</div>';
}
function toggleCheck(k, on) { const d = todayStr(); state.checklist[d] = state.checklist[d] || {}; state.checklist[d][k] = on; saveAll(); }
function saveProfile() {
  state.profile.name = document.querySelector("#p-name").value.trim() || "Mitra";
  const pa = document.querySelector("#p-armada");
  state.profile.armada = pa ? pa.value : "motor";
  state.profile.target = Number(document.querySelector("#p-target").value) || 0;
  state.profile.komisi = Number(document.querySelector("#p-komisi").value) || 8;
  state.profile.bbmPerKm = Number(document.querySelector("#p-bbm").value) || 0;
  saveAll(); toast("Profil disimpan"); renderHome();
}
function deleteExpense(id) { state.expenses = state.expenses.filter((e) => e.id !== id); saveAll(); renderLain(); }
function exportData() {
  const blob = new Blob([JSON.stringify({ profile: state.profile, orders: state.orders, expenses: state.expenses, vehicle: state.vehicle }, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "ojekmate-backup-" + todayStr() + ".json"; a.click();
}
function resetAll() {
  if (!confirm("Hapus semua data di HP ini?")) return;
  ["om_profile","om_orders","om_expenses","om_vehicle","om_check"].forEach((k) => localStorage.removeItem(k));
  location.reload();
}
function installHint() { alert("Chrome HP: titik tiga lalu Tambahkan ke layar utama."); }
window.deleteOrder = deleteOrder; window.deleteExpense = deleteExpense; window.toggleCheck = toggleCheck;
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav button").forEach((b) => b.addEventListener("click", () => showPage(b.dataset.page)));
  const fo = document.querySelector("#form-order"); if (fo) fo.addEventListener("submit", addOrder);
  const fe = document.querySelector("#form-exp"); if (fe) fe.addEventListener("submit", addExpense);
  const bh = document.querySelector("#btn-hitung"); if (bh) bh.addEventListener("click", hitung);
  const bv = document.querySelector("#btn-save-vehicle"); if (bv) bv.addEventListener("click", saveVehicle);
  const bp = document.querySelector("#btn-save-profile"); if (bp) bp.addEventListener("click", saveProfile);
  const be = document.querySelector("#btn-export"); if (be) be.addEventListener("click", exportData);
  const br = document.querySelector("#btn-reset"); if (br) br.addEventListener("click", resetAll);
  const bi = document.querySelector("#btn-install"); if (bi) bi.addEventListener("click", installHint);
  const fd = document.querySelector("#f-date"); if (fd) fd.value = todayStr();
  const ed = document.querySelector("#e-date"); if (ed) ed.value = todayStr();
  const ca = document.querySelector("#c-armada"); if (ca) ca.addEventListener("change", () => { document.querySelector("#c-bbm").value = defaultBbm(ca.value); });
  renderHome();
});
