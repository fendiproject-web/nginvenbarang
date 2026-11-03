// ============================================================
// STOK GUDANG & KURANGAN STOK DATA
// ============================================================
const inventoryData = [
  { name: "AYAM BESAR CUT 9", baseUnit: "PCS", conversions: { "PACK": 10, "PCS": 1 } },
  { name: "AYAM KECIL CUT 9", baseUnit: "PCS", conversions: { "PACK": 8, "PCS": 1 } },
  { name: "AYAM CUT 14", baseUnit: "PCS", conversions: { "PACK": 14, "PCS": 1 } },
  { name: "BERAS", baseUnit: "GR", conversions: { "ZAK": 25000, "PORSI": 90, "GR": 1 } },
  { name: "TEPUNG BREADER", baseUnit: "GR", conversions: { "DUS": 25000, "PACK": 12500, "GR": 1 } },
  { name: "SAMBAL", baseUnit: "GR", conversions: { "PACK": 1000, "PORSI": 25, "GR": 1 } },
  { 
    name: "CHILLI SACHET", 
    baseUnit: "PCS", 
    conversions: { 
      "DUS (30 PACK / 750 PCS)": 750, 
      "DUS (21 PACK / 462 PCS)": 462, 
      "PACK (25 PCS)": 25, 
      "PACK (22 PCS)": 22, 
      "PCS": 1 
    } 
  },
  { name: "TOMAT SACHET", baseUnit: "PCS", conversions: { "DUS": 750, "PACK": 25, "PCS": 1 } },
  { name: "AIR MINERAL (PRIMA)", baseUnit: "BTL", conversions: { "DUS": 24, "BTL": 1 } },
  { name: "SAOS GANGNAM", baseUnit: "GR", conversions: { "PACK": 1000, "PORSI": 40, "GR": 1 } },
  { name: "LUNCHBOX", baseUnit: "LBR", conversions: { "PACK": 200, "LBR": 1 } },
  { name: "PAPER BAG", baseUnit: "LBR", conversions: { "DUS": 2000, "PACK": 100, "LBR": 1 } },
  { name: "CUP SAMBAL 25GR", baseUnit: "PCS", conversions: { "DUS": 1200, "PACK": 50, "PCS": 1 } },
  { name: "CUP SAOS GANGNAM 35GR", baseUnit: "PCS", conversions: { "DUS": 1000, "PACK": 50, "PCS": 1 } },
  { name: "KERTAS WRAP", baseUnit: "LBR", conversions: { "DUS": 5000, "PACK": 100, "LBR": 1 } },
  { name: "FRENCH FRIES", baseUnit: "GR", conversions: { "PACK": 2000, "PORSI": 90, "GR": 1 } },
  { name: "DIMSUM", baseUnit: "PCS", conversions: { "PACK": 4, "PORSI": 4, "PCS": 1 } },
  { name: "CEKER MERAH", baseUnit: "PCS", conversions: { "PACK": 4, "PORSI": 4, "PCS": 1 } },
  { name: "BOX DIMSUM", baseUnit: "PCS", conversions: { "PACK": 50, "PCS": 1 } },
  { name: "PAPER FRENCH FRIES", baseUnit: "PCS", conversions: { "IKAT": 200, "PCS": 1 } },
  { name: "MINYAK GORENG", baseUnit: "LTR", conversions: { "DUS": 18, "JER": 10, "LTR": 1 } },
  { name: "KRESEK UK 21", baseUnit: "PCS", conversions: { "IKAT": 500, "PACK": 50, "PCS": 1 } },
  { name: "KRESEK UK 28", baseUnit: "PCS", conversions: { "IKAT": 500, "PACK": 50, "PCS": 1 } },
  { name: "KRESEK UK 40", baseUnit: "PCS", conversions: { "IKAT": 250, "PACK": 50, "PCS": 1 } },
  { name: "KRESEK UK 50/55", baseUnit: "PCS", conversions: { "IKAT": 150, "PACK": 30, "PCS": 1 } },
  { name: "KERTAS THERMAL", baseUnit: "PCS", conversions: { "DUS": 100, "PACK": 10, "PCS": 1 } },
  { name: "HAND GLOVE", baseUnit: "PCS", conversions: { "PACK": 100, "PCS": 1 } }
];

const ICON_REFRESH = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`;
const ICON_PLUS = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const ICON_TRASH = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;

const kuranganRefs = [];

// ============================================================
// DATA LAPORAN SALES GEPREKINAJA
// ============================================================
let pengeluaranCount = 0;
let pengeluaranCount2 = 0;
const defaultTim = ['Agustin', 'Andika'];

const menuList = [
  '. P. Gangnam Jumbo', '. P. Gangnam Hemat', '. Puas Gangnam',
  '. Geprek hemat ber3', '. Gangnam hemat ber2', '. Crispy hemat ber2',
  '. Gangnam rame²', '. Geprek rame²', '. Geprek ijo rame²',
  '. Doubel geprek', '. Double geprek ijo', '. Gangnam double',
  '. Extra saos gangnam', '. Le Minerale', '. Teh Pucuk'
];

const ecommerceData = [
  { id: 'transferBank', label: 'Transfer bank', icon: 'fa-landmark' },
  { id: 'shopeePay', label: 'ShopeePay', icon: 'fa-mobile-screen' },
  { id: 'shopeeFood', label: 'ShopeeFood', icon: 'fa-utensils' },
  { id: 'gooFood', label: 'GooFood', icon: 'fa-motorcycle' },
  { id: 'tiktokShop', label: 'TIKTOK SHOP', icon: 'fa-video' },
  { id: 'qpon', label: 'Qpon', icon: 'fa-ticket' }
];

let selectedDate = new Date();

document.addEventListener('DOMContentLoaded', () => {
  const inventoryGrid = document.getElementById('inventory-grid');
  const kuranganTbody = document.getElementById('kurangan-tbody');

  // Render Stok Gudang & Kurangan Stok
  renderKuranganTable(kuranganTbody);
  renderStokGrid(inventoryGrid);

  // Switch Tab Bar Bawah
  const navBtns = document.querySelectorAll('.bottom-nav .nav-btn');
  const tabContents = document.querySelectorAll('.app-container > .tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Init Laporan Sales
  generateMenu();
  generateEcommerce();
  generateMenu2();
  generateEcommerce2();
  loadSavedTargets();
  initTim();
  initTim2();
  initTanggal();
});

// ============================================================
// LOGIK STOK & KURANGAN
// ============================================================
function renderStokGrid(container) {
  inventoryData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'neu-card';

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${item.name}</span>
        <div class="header-actions">
          <button class="btn-reset-card" title="Reset Barang Ini">${ICON_REFRESH} Reset</button>
          <span class="card-total-badge">0 ${item.baseUnit}</span>
        </div>
      </div>
      <div class="rows-container"></div>
      <button class="btn-add-row">${ICON_PLUS} Tambah Baris Input</button>
    `;

    container.appendChild(card);

    const rowsContainer = card.querySelector('.rows-container');
    const addRowBtn = card.querySelector('.btn-add-row');
    const resetCardBtn = card.querySelector('.btn-reset-card');

    function createRow(defaultQty = 1) {
      const row = document.createElement('div');
      row.className = 'input-row';

      const standardUnits = Object.keys(item.conversions);
      let optionsHtml = standardUnits
        .map(u => `<option value="${u}">${u} (${item.conversions[u]} ${item.baseUnit})</option>`)
        .join('');

      optionsHtml += `<option value="MANUAL">Masukkan Jumlah Manual (${item.baseUnit})</option>`;

      row.innerHTML = `
        <input type="number" class="qty-input" value="${defaultQty}" step="any" min="0" placeholder="1">
        <select class="unit-select">${optionsHtml}</select>
        <span class="row-subtotal">0 ${item.baseUnit}</span>
        <button class="btn-remove-row" title="Hapus Baris">${ICON_TRASH}</button>
      `;

      rowsContainer.appendChild(row);

      const qtyInput = row.querySelector('.qty-input');
      const unitSelect = row.querySelector('.unit-select');
      const removeBtn = row.querySelector('.btn-remove-row');

      qtyInput.addEventListener('input', () => updateCardTotal(card, item, index));
      unitSelect.addEventListener('change', () => {
        if (!qtyInput.value || parseFloat(qtyInput.value) === 0) qtyInput.value = 1;
        updateCardTotal(card, item, index);
      });

      removeBtn.addEventListener('click', () => {
        if (rowsContainer.children.length > 1) {
          row.remove();
        } else {
          qtyInput.value = 0;
        }
        updateCardTotal(card, item, index);
      });

      updateCardTotal(card, item, index);
    }

    resetCardBtn.addEventListener('click', () => {
      rowsContainer.innerHTML = '';
      createRow(0);
    });

    addRowBtn.addEventListener('click', () => createRow(1));

    createRow(1);
  });
}

function renderKuranganTable(tbody) {
  inventoryData.forEach((item, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="item-name-cell">${item.name}</td>
      <td style="width: 70px;">
        <input type="number" class="val1-input" value="0" step="any" placeholder="0">
      </td>
      <td class="text-center" style="width: 20px; font-weight: 800; color: var(--text-muted);">-</td>
      <td style="width: 70px;">
        <input type="number" class="val2-input" value="0" step="any" placeholder="0" readonly title="Jumlah otomatis dari Stok Gudang">
      </td>
      <td class="text-right">
        <span class="total-kurangan-text">0 ${item.baseUnit}</span>
      </td>
    `;

    tbody.appendChild(tr);

    const val1Input = tr.querySelector('.val1-input');
    const val2Input = tr.querySelector('.val2-input');
    const totalText = tr.querySelector('.total-kurangan-text');

    function calcKurangan() {
      const v1 = parseFloat(val1Input.value) || 0;
      const v2 = parseFloat(val2Input.value) || 0;
      const result = v1 - v2;

      totalText.textContent = `${formatNumber(result)} ${item.baseUnit}`;
    }

    val1Input.addEventListener('input', calcKurangan);

    kuranganRefs[index] = {
      val2Input: val2Input,
      calcKurangan: calcKurangan
    };
  });
}

function updateCardTotal(card, item, itemIndex) {
  const rowsContainer = card.querySelector('.rows-container');
  const badge = card.querySelector('.card-total-badge');
  const rows = rowsContainer.querySelectorAll('.input-row');

  let totalBase = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
    const selectedUnit = row.querySelector('.unit-select').value;

    let subtotal = 0;

    if (selectedUnit === "MANUAL") {
      subtotal = qty;
    } else {
      const multiplier = item.conversions[selectedUnit] || 1;
      subtotal = qty * multiplier;
    }

    totalBase += subtotal;
    row.querySelector('.row-subtotal').textContent = `${formatNumber(subtotal)} ${item.baseUnit}`;
  });

  badge.textContent = `${formatNumber(totalBase)} ${item.baseUnit}`;

  if (kuranganRefs[itemIndex]) {
    kuranganRefs[itemIndex].val2Input.value = totalBase;
    kuranganRefs[itemIndex].calcKurangan();
  }
}

function formatNumber(val) {
  if (Number.isInteger(val)) return val.toString();
  const truncated = Math.floor(val * 10) / 10;
  return truncated.toString().replace('.', ',');
}

// ============================================================
// LOGIK LAPORAN SALES GEPREKINAJA
// ============================================================
function switchSubTab(tabId) {
  document.querySelectorAll('.subtab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sales-container .tab-btn').forEach(el => el.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  document.querySelector(`.sales-container .tab-btn[data-subtab="${tabId}"]`).classList.add('active');

  if (tabId === 'rumus1') updateOutput();
  else updateOutput2();
}

function simpanTarget(inputId, storageKey) {
  const input = document.getElementById(inputId);
  const value = input.value;
  if (value && !isNaN(value) && Number(value) > 0) {
    localStorage.setItem(storageKey, value);
    const displayId = inputId.replace('target', 'targetDisplay');
    const displayEl = document.getElementById(displayId);
    if (displayEl) displayEl.textContent = Number(value).toLocaleString('id-ID');

    const displayId2 = inputId.replace('target', 'targetDisplay') + '2';
    const displayEl2 = document.getElementById(displayId2);
    if (displayEl2) displayEl2.textContent = Number(value).toLocaleString('id-ID');

    showToast('✅ Target berhasil disimpan!');
    if (inputId.includes('2')) updateOutput2();
    else updateOutput();
  } else {
    showToast('⚠️ Masukkan angka yang valid!');
  }
}

function loadSavedTargets() {
  const savedBulanan = localStorage.getItem('targetBulananSaved');
  if (savedBulanan) {
    document.getElementById('targetBulanan').value = savedBulanan;
    document.getElementById('targetBulanan2').value = savedBulanan;
    document.getElementById('targetBulananDisplay').textContent = Number(savedBulanan).toLocaleString('id-ID');
    document.getElementById('targetBulananDisplay2').textContent = Number(savedBulanan).toLocaleString('id-ID');
  }

  const savedHarian = localStorage.getItem('targetHarianSaved');
  if (savedHarian) {
    document.getElementById('targetHarian').value = savedHarian;
    document.getElementById('targetHarian2').value = savedHarian;
    document.getElementById('targetHarianDisplay').textContent = Number(savedHarian).toLocaleString('id-ID');
    document.getElementById('targetHarianDisplay2').textContent = Number(savedHarian).toLocaleString('id-ID');
  }
}

function formatTanggalIndo(date) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const d = new Date(date);
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTanggalShort(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function getTanggalNumber(date) { return new Date(date).getDate(); }
function getJumlahHariBulan(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); }

function initTanggal() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  document.getElementById('tanggalInput').value = `${year}-${month}-${day}`;
  document.getElementById('tanggalDisplay').textContent = formatTanggalIndo(today);
  selectedDate = today;

  const jumlahHari = getJumlahHariBulan(today);
  const tanggal = getTanggalNumber(today);

  document.getElementById('estimasiInput2').value = jumlahHari;
  document.getElementById('avgOmsetInput2').value = tanggal;
  document.getElementById('avgCUInput2').value = tanggal;

  document.getElementById('estimasiInput2_2').value = jumlahHari - tanggal;
  document.getElementById('avgOmsetInput2_2').value = tanggal;
  document.getElementById('avgCUInput2_2').value = tanggal;

  updateOutput();
  updateOutput2();
}

function ubahTanggal() {
  const input = document.getElementById('tanggalInput').value;
  if (input) {
    const parts = input.split('-');
    const newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    document.getElementById('tanggalDisplay').textContent = formatTanggalIndo(newDate);
    selectedDate = newDate;

    const jumlahHari = getJumlahHariBulan(newDate);
    const tanggal = getTanggalNumber(newDate);

    document.getElementById('estimasiInput2').value = jumlahHari;
    document.getElementById('avgOmsetInput2').value = tanggal;
    document.getElementById('avgCUInput2').value = tanggal;

    document.getElementById('estimasiInput2_2').value = jumlahHari - tanggal;
    document.getElementById('avgOmsetInput2_2').value = tanggal;
    document.getElementById('avgCUInput2_2').value = tanggal;

    updateOutput();
    updateOutput2();
  }
}

function formatRupiah(angka) { return 'Rp ' + Number(angka).toLocaleString('id-ID'); }
function formatAngka(angka) { return Number(angka).toLocaleString('id-ID'); }
function formatAngkaNoRp(angka) { return Number(angka).toLocaleString('id-ID'); }

function generateMenu() {
  const container = document.getElementById('menuContainer');
  container.innerHTML = '';
  menuList.forEach((menu, index) => {
    const div = document.createElement('div');
    div.className = 'menu-item-row';
    div.innerHTML = `
      <span class="menu-label"><i class="fas fa-utensil-spoon"></i> ${menu}</span>
      <div class="menu-input-group">
        ${[1,2,3,4].map(i => `<input type="number" id="menu_${index}_${i}" value="0" min="0" oninput="updateMenuTotal(${index}); updateOutput();">`).join('<span class="operator">+</span>')}
        <span class="equals">=</span>
      </div>
      <span class="menu-total" id="menu_total_${index}">0</span>
    `;
    container.appendChild(div);
  });
}

function updateMenuTotal(index) {
  let total = 0;
  for (let i = 1; i <= 4; i++) {
    total += parseFloat(document.getElementById(`menu_${index}_${i}`).value) || 0;
  }
  document.getElementById(`menu_total_${index}`).textContent = formatAngkaNoRp(total);
}

function generateMenu2() {
  const container = document.getElementById('menuContainer2');
  container.innerHTML = '';
  menuList.forEach((menu, index) => {
    const div = document.createElement('div');
    div.className = 'menu-item-row';
    div.innerHTML = `
      <span class="menu-label"><i class="fas fa-utensil-spoon"></i> ${menu}</span>
      <div class="menu-input-group">
        ${[1,2,3,4].map(i => `<input type="number" id="menu2_${index}_${i}" value="0" min="0" oninput="updateMenuTotal2(${index}); updateOutput2();">`).join('<span class="operator">+</span>')}
        <span class="equals">=</span>
      </div>
      <span class="menu-total" id="menu_total2_${index}">0</span>
    `;
    container.appendChild(div);
  });
}

function updateMenuTotal2(index) {
  let total = 0;
  for (let i = 1; i <= 4; i++) {
    total += parseFloat(document.getElementById(`menu2_${index}_${i}`).value) || 0;
  }
  document.getElementById(`menu_total2_${index}`).textContent = formatAngkaNoRp(total);
}

function generateEcommerce() {
  const container = document.getElementById('ecommerceContainer');
  container.innerHTML = '';
  ecommerceData.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'ecommerce-item-row';
    div.innerHTML = `
      <span class="ecom-label"><i class="fas ${item.icon}"></i> ${item.label}</span>
      <div class="ecom-input-group">
        <input type="number" id="${item.id}_1" value="0" oninput="updateEcommerceTotal('${item.id}'); updateOutput();">
        <span class="operator">+</span>
        <input type="number" id="${item.id}_2" value="0" oninput="updateEcommerceTotal('${item.id}'); updateOutput();">
        <span class="equals">=</span>
      </div>
      <span class="ecom-total" id="ecom_total_${item.id}">0</span>
    `;
    container.appendChild(div);
  });
}

function updateEcommerceTotal(id) {
  const v1 = parseFloat(document.getElementById(`${id}_1`).value) || 0;
  const v2 = parseFloat(document.getElementById(`${id}_2`).value) || 0;
  document.getElementById(`ecom_total_${id}`).textContent = formatAngkaNoRp(v1 + v2);
}

function generateEcommerce2() {
  const container = document.getElementById('ecommerceContainer2');
  container.innerHTML = '';
  ecommerceData.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'ecommerce-item-row';
    div.innerHTML = `
      <span class="ecom-label"><i class="fas ${item.icon}"></i> ${item.label}</span>
      <div class="ecom-input-group">
        <input type="number" id="${item.id}_1_2" value="0" oninput="updateEcommerceTotal2('${item.id}'); updateOutput2();">
        <span class="operator">+</span>
        <input type="number" id="${item.id}_2_2" value="0" oninput="updateEcommerceTotal2('${item.id}'); updateOutput2();">
        <span class="equals">=</span>
      </div>
      <span class="ecom-total" id="ecom_total2_${item.id}">0</span>
    `;
    container.appendChild(div);
  });
}

function updateEcommerceTotal2(id) {
  const v1 = parseFloat(document.getElementById(`${id}_1_2`).value) || 0;
  const v2 = parseFloat(document.getElementById(`${id}_2_2`).value) || 0;
  document.getElementById(`ecom_total2_${id}`).textContent = formatAngkaNoRp(v1 + v2);
}

function tambahPengeluaran() {
  pengeluaranCount++;
  const container = document.getElementById('pengeluaranContainer');
  const div = document.createElement('div');
  div.className = 'pengeluaran-item';
  div.id = 'pengeluaran-' + pengeluaranCount;
  div.innerHTML = `
    <i class="fas fa-receipt"></i>
    <input type="text" placeholder="Sayur" oninput="updateOutput()">
    <i class="fas fa-rupiah-sign"></i>
    <input type="number" placeholder="Harga" oninput="updateOutput()">
    <button class="btn-delete" onclick="document.getElementById('${div.id}').remove(); updateOutput();"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
  updateOutput();
}

function tambahPengeluaran2() {
  pengeluaranCount2++;
  const container = document.getElementById('pengeluaranContainer2');
  const div = document.createElement('div');
  div.className = 'pengeluaran-item';
  div.id = 'pengeluaran2-' + pengeluaranCount2;
  div.innerHTML = `
    <i class="fas fa-receipt"></i>
    <input type="text" placeholder="Sayur" oninput="updateOutput2()">
    <i class="fas fa-rupiah-sign"></i>
    <input type="number" placeholder="Harga" oninput="updateOutput2()">
    <button class="btn-delete" onclick="document.getElementById('${div.id}').remove(); updateOutput2();"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
  updateOutput2();
}

function getPengeluaranList(containerId) {
  const items = document.querySelectorAll(`#${containerId} .pengeluaran-item`);
  let list = [];
  let total = 0;
  items.forEach((item, i) => {
    const catatan = item.querySelector('input[type="text"]').value || '-';
    const harga = parseFloat(item.querySelector('input[type="number"]').value) || 0;
    total += harga;
    list.push(`${i+1}. ${catatan} : ${formatAngkaNoRp(harga)}`);
  });
  return { list, total };
}

function saveTimList(containerId, storageKey) {
  const container = document.getElementById(containerId);
  const inputs = container.querySelectorAll('.tim-item input');
  const names = [];
  inputs.forEach(input => { if (input.value.trim()) names.push(input.value.trim()); });
  localStorage.setItem(storageKey, JSON.stringify(names));
}

function loadTimList(containerId, storageKey, defaultNames) {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return defaultNames;
}

function renderTim(containerId, names, isRumus2) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  names.forEach((nama, index) => {
    const div = document.createElement('div');
    div.className = 'tim-item';
    div.id = (isRumus2 ? 'tim2-' : 'tim-') + index;
    div.innerHTML = `
      <i class="fas fa-user"></i>
      <input type="text" value="${nama}" oninput="saveTimList('${containerId}', '${isRumus2 ? 'timList2' : 'timList'}'); ${isRumus2 ? 'updateOutput2()' : 'updateOutput()'};">
      <button class="btn-delete" onclick="document.getElementById('${div.id}').remove(); saveTimList('${containerId}', '${isRumus2 ? 'timList2' : 'timList'}'); ${isRumus2 ? 'updateOutput2()' : 'updateOutput()'};"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(div);
  });
}

function tambahTim() {
  const container = document.getElementById('timContainer');
  const count = container.children.length;
  const div = document.createElement('div');
  div.className = 'tim-item';
  div.id = 'tim-' + count;
  div.innerHTML = `
    <i class="fas fa-user"></i>
    <input type="text" placeholder="Nama tim" oninput="saveTimList('timContainer', 'timList'); updateOutput();">
    <button class="btn-delete" onclick="document.getElementById('${div.id}').remove(); saveTimList('timContainer', 'timList'); updateOutput();"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
}

function tambahTim2() {
  const container = document.getElementById('timContainer2');
  const count = container.children.length;
  const div = document.createElement('div');
  div.className = 'tim-item';
  div.id = 'tim2-' + count;
  div.innerHTML = `
    <i class="fas fa-user"></i>
    <input type="text" placeholder="Nama tim" oninput="saveTimList('timContainer2', 'timList2'); updateOutput2();">
    <button class="btn-delete" onclick="document.getElementById('${div.id}').remove(); saveTimList('timContainer2', 'timList2'); updateOutput2();"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
}

function initTim() { renderTim('timContainer', loadTimList('timContainer', 'timList', defaultTim), false); }
function initTim2() { renderTim('timContainer2', loadTimList('timContainer2', 'timList2', defaultTim), true); }

function getTimListString(containerId) {
  const items = document.querySelectorAll(`#${containerId} .tim-item input`);
  let list = [];
  items.forEach((input, i) => { if (input.value.trim()) list.push(`${i+1}. ${input.value.trim()}`); });
  return list.join('\n');
}

function updateOutput() {
  const targetBulanan = document.getElementById('targetBulanan').value || '0';
  const targetHarian = document.getElementById('targetHarian').value || '0';
  const tanggalShort = formatTanggalShort(selectedDate);
  const tanggalNumber = getTanggalNumber(selectedDate);
  const jumlahHariBulan = getJumlahHariBulan(selectedDate);

  const salesS1 = parseFloat(document.getElementById('salesS1').value) || 0;
  const salesS2 = parseFloat(document.getElementById('salesS2').value) || 0;
  const salesHasil = salesS1 + salesS2;
  document.getElementById('salesHasil').textContent = formatAngkaNoRp(salesHasil);

  const cuS1 = parseFloat(document.getElementById('cuS1').value) || 0;
  const cuS2 = parseFloat(document.getElementById('cuS2').value) || 0;
  const cuHasil = cuS1 + cuS2;
  document.getElementById('cuHasil').textContent = formatAngkaNoRp(cuHasil);

  const avgHasil = cuHasil > 0 ? Math.floor(salesHasil / cuHasil) : 0;
  document.getElementById('avgHasil').textContent = formatAngkaNoRp(avgHasil);

  const totalSales1 = parseFloat(document.getElementById('totalSalesInput1').value) || 0;
  const totalSalesHasil = totalSales1 + salesHasil;
  document.getElementById('totalSalesHasil').textContent = formatAngkaNoRp(totalSalesHasil);

  const totalCU1 = parseFloat(document.getElementById('totalCUInput1').value) || 0;
  const totalCUHasil = totalCU1 + cuHasil;
  document.getElementById('totalCUHasil').textContent = formatAngkaNoRp(totalCUHasil);

  const avgOmsetHasil = tanggalNumber > 0 ? Math.floor(totalSalesHasil / tanggalNumber) : 0;
  document.getElementById('avgOmsetHasil').textContent = formatAngkaNoRp(avgOmsetHasil);

  const avgCUHasil = tanggalNumber > 0 ? Math.floor((totalCUHasil / tanggalNumber) * 10) / 10 : 0;
  document.getElementById('avgCUHasil').textContent = formatAngkaNoRp(avgCUHasil);

  const estimasiHasil = avgOmsetHasil * jumlahHariBulan;
  document.getElementById('estimasiHasil').textContent = formatAngkaNoRp(estimasiHasil);

  const pengeluaranData = getPengeluaranList('pengeluaranContainer');
  document.getElementById('totalPengeluaran').textContent = formatRupiah(pengeluaranData.total);

  let output = `*LAPORAN SALES GEPREKINAJA WARU PAMEKASAN* 🫰🏾🫩
*TGL ${tanggalShort}*
______________________
*Laporan Sales Bulanan*

*-Target Sales Bulanan: ${formatRupiah(targetBulanan)}*
*-Estimasi Sales Bulanan : ${formatAngkaNoRp(estimasiHasil)}*
*-Total Sales Bulanan : ${formatAngkaNoRp(totalSalesHasil)}*
*-Total CU : ${formatAngkaNoRp(totalCUHasil)}*
*-Avg Omset : ${formatAngkaNoRp(avgOmsetHasil)}*
*-Avg CU : ${formatAngkaNoRp(avgCUHasil)}*
______________________

*Laporan Sales Harian:*
*-Target Sales Harian: ${formatRupiah(targetHarian)}*
*Sales : ${formatAngkaNoRp(salesHasil)}*
*CU : ${formatAngkaNoRp(cuHasil)}*
*Avg : ${formatAngkaNoRp(avgHasil)}*
______________________

*MENU BARU*
${menuList.map((m, idx) => {
  let tot = 0;
  for(let i=1;i<=4;i++) tot += parseFloat(document.getElementById(`menu_${idx}_${i}`).value) || 0;
  return `${m} : ${tot > 0 ? formatAngkaNoRp(tot) : ''}`;
}).join('\n')}
______________________

*Ecommerce :*
${ecommerceData.map(item => {
  const tot = (parseFloat(document.getElementById(`${item.id}_1`).value)||0) + (parseFloat(document.getElementById(`${item.id}_2`).value)||0);
  return `${item.label} : ${tot > 0 ? formatAngkaNoRp(tot) : ''}`;
}).join('\n')}
______________________
*Pengeluaran*
${pengeluaranData.list.length > 0 ? pengeluaranData.list.join('\n') + '\n' : ''}*Total Semua : ${formatAngkaNoRp(pengeluaranData.total)}*
______________________
*Waste*
AB : ${document.getElementById('ab').value || ''} pcs
AK : ${document.getElementById('ak').value || ''} pcs
Nasi: ${document.getElementById('nasi').value || ''} porsi
______________________
*Cuaca*
Pagi  : ${document.getElementById('pagi').value || '-'}
Siang : ${document.getElementById('siang').value || '-'}
Sore  : ${document.getElementById('sore').value || '-'}
Malam : ${document.getElementById('malam').value || '-'}
______________________
Tim yang bertugas 
${getTimListString('timContainer') || 'Belum ada tim'}
Terimakasih`;

  document.getElementById('outputText').textContent = output;
}

function updateOutput2() {
  const targetBulanan = document.getElementById('targetBulanan2').value || '0';
  const targetHarian = document.getElementById('targetHarian2').value || '0';
  const tanggalShort = formatTanggalShort(selectedDate);
  const tanggalNumber = getTanggalNumber(selectedDate);
  const jumlahHariBulan = getJumlahHariBulan(selectedDate);
  const sisaHari = jumlahHariBulan - tanggalNumber;

  const salesS1 = parseFloat(document.getElementById('salesS1_2').value) || 0;
  const salesS2 = parseFloat(document.getElementById('salesS2_2').value) || 0;
  const salesHasil = salesS1 + salesS2;
  document.getElementById('salesHasil2').textContent = formatAngkaNoRp(salesHasil);

  const cuS1 = parseFloat(document.getElementById('cuS1_2').value) || 0;
  const cuS2 = parseFloat(document.getElementById('cuS2_2').value) || 0;
  const cuHasil = cuS1 + cuS2;
  document.getElementById('cuHasil2').textContent = formatAngkaNoRp(cuHasil);

  const avgHasil = cuHasil > 0 ? Math.floor(salesHasil / cuHasil) : 0;
  document.getElementById('avgHasil2').textContent = formatAngkaNoRp(avgHasil);

  const salesBulananInput = parseFloat(document.getElementById('totalSalesInput1_2').value) || 0;
  const totalSalesHasil = salesBulananInput + salesHasil;
  document.getElementById('totalSalesHasil2').textContent = formatAngkaNoRp(totalSalesHasil);

  const totalCU1 = parseFloat(document.getElementById('totalCUInput1_2').value) || 0;
  const totalCUHasil = totalCU1 + cuHasil;
  document.getElementById('totalCUHasil2').textContent = formatAngkaNoRp(totalCUHasil);

  const avgOmsetHasil = tanggalNumber > 0 ? Math.floor(totalSalesHasil / tanggalNumber) : 0;
  document.getElementById('avgOmsetHasil2').textContent = formatAngkaNoRp(avgOmsetHasil);

  const avgCUHasil = tanggalNumber > 0 ? Math.floor((totalCUHasil / tanggalNumber) * 10) / 10 : 0;
  document.getElementById('avgCUHasil2').textContent = formatAngkaNoRp(avgCUHasil);

  document.getElementById('estimasiInput1_2').value = salesHasil;
  document.getElementById('estimasiInput2_2').value = sisaHari;
  document.getElementById('estimasiInput3_2').value = salesBulananInput;

  const estimasiHasil = (salesHasil * sisaHari) + salesBulananInput;
  document.getElementById('estimasiHasil2').textContent = formatAngkaNoRp(estimasiHasil);

  const pengeluaranData = getPengeluaranList('pengeluaranContainer2');
  document.getElementById('totalPengeluaran2').textContent = formatRupiah(pengeluaranData.total);

  let output = `*LAPORAN SALES GEPREKINAJA WARU PAMEKASAN* 🫰🏾🫩
*TGL ${tanggalShort}*
______________________
*Laporan Sales Bulanan*

*-Target Sales Bulanan: ${formatRupiah(targetBulanan)}*
*-Estimasi Sales Bulanan : ${formatAngkaNoRp(estimasiHasil)}*
*-Total Sales Bulanan : ${formatAngkaNoRp(totalSalesHasil)}*
*-Total CU : ${formatAngkaNoRp(totalCUHasil)}*
*-Avg Omset : ${formatAngkaNoRp(avgOmsetHasil)}*
*-Avg CU : ${formatAngkaNoRp(avgCUHasil)}*
______________________

*Laporan Sales Harian:*
*-Target Sales Harian: ${formatRupiah(targetHarian)}*
*Sales : ${formatAngkaNoRp(salesHasil)}*
*CU : ${formatAngkaNoRp(cuHasil)}*
*Avg : ${formatAngkaNoRp(avgHasil)}*
______________________

*MENU BARU*
${menuList.map((m, idx) => {
  let tot = 0;
  for(let i=1;i<=4;i++) tot += parseFloat(document.getElementById(`menu2_${idx}_${i}`).value) || 0;
  return `${m} : ${tot > 0 ? formatAngkaNoRp(tot) : ''}`;
}).join('\n')}
______________________

*Ecommerce :*
${ecommerceData.map(item => {
  const tot = (parseFloat(document.getElementById(`${item.id}_1_2`).value)||0) + (parseFloat(document.getElementById(`${item.id}_2_2`).value)||0);
  return `${item.label} : ${tot > 0 ? formatAngkaNoRp(tot) : ''}`;
}).join('\n')}
______________________
*Pengeluaran*
${pengeluaranData.list.length > 0 ? pengeluaranData.list.join('\n') + '\n' : ''}*Total Semua : ${formatAngkaNoRp(pengeluaranData.total)}*
______________________
*Waste*
AB : ${document.getElementById('ab2').value || ''} pcs
AK : ${document.getElementById('ak2').value || ''} pcs
Nasi: ${document.getElementById('nasi2').value || ''} porsi
______________________
*Cuaca*
Pagi  : ${document.getElementById('pagi2').value || '-'}
Siang : ${document.getElementById('siang2').value || '-'}
Sore  : ${document.getElementById('sore2').value || '-'}
Malam : ${document.getElementById('malam2').value || '-'}
______________________
Tim yang bertugas 
${getTimListString('timContainer2') || 'Belum ada tim'}
Terimakasih`;

  document.getElementById('outputText').textContent = output;
}

function copyOutput() {
  const text = document.getElementById('outputText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('✅ Laporan tersalin!');
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('✅ Laporan tersalin!');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#059669;"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
