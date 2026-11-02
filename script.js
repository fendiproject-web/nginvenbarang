// Database konversi sesuai data tabel gudang
const inventoryData = [
  { name: "AYAM BESAR CUT 9", baseUnit: "PCS", conversions: { "PACK": 10, "PCS": 1 } },
  { name: "AYAM KECIL CUT 9", baseUnit: "PCS", conversions: { "PACK": 8, "PCS": 1 } },
  { name: "AYAM CUT 14", baseUnit: "PCS", conversions: { "PACK": 14, "PCS": 1 } },
  { name: "BERAS", baseUnit: "GR", conversions: { "ZAK": 25000, "PORSI": 90, "GR": 1 } },
  { name: "TEPUNG BREADER", baseUnit: "GR", conversions: { "DUS": 25000, "PACK": 12500, "GR": 1 } },
  { name: "SAMBAL", baseUnit: "GR", conversions: { "PACK": 1000, "PORSI": 25, "GR": 1 } },
  { name: "CHILLI SACHET", baseUnit: "PCS", conversions: { "DUS": 750, "PACK": 25, "PCS": 1 } },
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

document.addEventListener('DOMContentLoaded', () => {
  const inventoryRows = document.getElementById('inventory-rows');
  const addRowBtn = document.getElementById('add-row-btn');
  const resetBtn = document.getElementById('reset-btn');

  // Tambahkan baris pertama secara otomatis saat aplikasi dimuat
  addRow();

  addRowBtn.addEventListener('click', () => addRow());
  resetBtn.addEventListener('click', () => {
    inventoryRows.innerHTML = '';
    addRow();
    calculateTotals();
  });

  function addRow() {
    const tr = document.createElement('tr');
    
    const itemOptions = inventoryData.map((item, idx) => 
      `<option value="${idx}">${item.name}</option>`
    ).join('');

    tr.innerHTML = `
      <td data-label="Nama Barang">
        <select class="item-select">${itemOptions}</select>
      </td>
      <td data-label="Pilih Satuan">
        <select class="unit-select"></select>
      </td>
      <td data-label="Jumlah">
        <input type="number" class="qty-input" value="1" step="any" min="0">
      </td>
      <td data-label="Hasil Otomatis">
        <span class="converted-result">0</span>
      </td>
      <td data-label="Aksi">
        <button class="btn-delete" title="Hapus Baris">✕</button>
      </td>
    `;

    inventoryRows.appendChild(tr);

    const itemSelect = tr.querySelector('.item-select');
    const unitSelect = tr.querySelector('.unit-select');
    const qtyInput = tr.querySelector('.qty-input');
    const deleteBtn = tr.querySelector('.btn-delete');

    function updateUnits() {
      const selectedItem = inventoryData[itemSelect.value];
      unitSelect.innerHTML = Object.keys(selectedItem.conversions)
        .map(unit => `<option value="${unit}">${unit}</option>`)
        .join('');
      calculateRow(tr);
    }

    itemSelect.addEventListener('change', updateUnits);
    unitSelect.addEventListener('change', () => calculateRow(tr));
    qtyInput.addEventListener('input', () => calculateRow(tr));
    deleteBtn.addEventListener('click', () => {
      tr.remove();
      calculateTotals();
    });

    updateUnits();
  }

  function calculateRow(tr) {
    const itemSelect = tr.querySelector('.item-select');
    const unitSelect = tr.querySelector('.unit-select');
    const qtyInput = tr.querySelector('.qty-input');
    const convertedSpan = tr.querySelector('.converted-result');

    const item = inventoryData[itemSelect.value];
    const unit = unitSelect.value;
    const qty = parseFloat(qtyInput.value) || 0;

    const multiplier = item.conversions[unit] || 1;
    const rawTotal = qty * multiplier;

    convertedSpan.textContent = `${formatDecimal(rawTotal)} ${item.baseUnit}`;
    calculateTotals();
  }

  function calculateTotals() {
    const totals = {};
    const rows = inventoryRows.querySelectorAll('tr');

    rows.forEach(tr => {
      const itemSelect = tr.querySelector('.item-select');
      const unitSelect = tr.querySelector('.unit-select');
      const qtyInput = tr.querySelector('.qty-input');

      if (!itemSelect || !unitSelect || !qtyInput) return;

      const item = inventoryData[itemSelect.value];
      const unit = unitSelect.value;
      const qty = parseFloat(qtyInput.value) || 0;

      if (qty > 0) {
        const multiplier = item.conversions[unit] || 1;
        const totalBase = qty * multiplier;

        if (!totals[item.name]) {
          totals[item.name] = { amount: 0, unit: item.baseUnit };
        }
        totals[item.name].amount += totalBase;
      }
    });

    renderSummary(totals);
  }

  function renderSummary(totals) {
    const summaryList = document.getElementById('summary-list');
    const keys = Object.keys(totals);

    if (keys.length === 0) {
      summaryList.innerHTML = '<p class="empty-state">Belum ada barang yang dicatat.</p>';
      return;
    }

    summaryList.innerHTML = keys.map(name => {
      const item = totals[name];
      return `
        <div class="summary-card">
          <div class="item-title">${name}</div>
          <div class="item-val">${formatDecimal(item.amount)} ${item.unit}</div>
        </div>
      `;
    }).join('');
  }

  // Format angka desimal: dipotong 1 angka di belakang koma (contoh: 17.84692 menjadi 17,8)
  function formatDecimal(val) {
    if (Number.isInteger(val)) return val.toString();
    const truncated = Math.floor(val * 10) / 10;
    return truncated.toString().replace('.', ',');
  }
});
