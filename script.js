// Database konversi barang gudang persis sesuai gambar tabel
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
  const inventoryGrid = document.getElementById('inventory-grid');

  inventoryData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glass-card';

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${item.name}</span>
        <span class="card-total-badge">0 ${item.baseUnit}</span>
      </div>
      <div class="rows-container"></div>
      <button class="btn-add-row">+ Tambah Baris Input</button>
    `;

    inventoryGrid.appendChild(card);

    const rowsContainer = card.querySelector('.rows-container');
    const addRowBtn = card.querySelector('.btn-add-row');

    function createRow() {
      const row = document.createElement('div');
      row.className = 'input-row';

      // Satuan bawaan tabel gudang
      const standardUnits = Object.keys(item.conversions);
      let optionsHtml = standardUnits
        .map(u => `<option value="${u}">${u}</option>`)
        .join('');

      // Selalu ada opsi "Masukkan Jumlah Manual" di dropdown
      optionsHtml += `<option value="MANUAL">Masukkan Jumlah Manual</option>`;

      row.innerHTML = `
        <input type="number" class="qty-input" value="1" step="any" min="0" placeholder="0">
        <select class="unit-select">${optionsHtml}</select>
        <span class="row-subtotal">0 ${item.baseUnit}</span>
        <button class="btn-remove-row" title="Hapus Baris">✕</button>
      `;

      rowsContainer.appendChild(row);

      const qtyInput = row.querySelector('.qty-input');
      const unitSelect = row.querySelector('.unit-select');
      const removeBtn = row.querySelector('.btn-remove-row');

      // Hitung otomatis saat mengetik jumlah / mengganti opsi dropdown
      qtyInput.addEventListener('input', () => updateCardTotal(card, item));
      unitSelect.addEventListener('change', () => updateCardTotal(card, item));

      removeBtn.addEventListener('click', () => {
        if (rowsContainer.children.length > 1) {
          row.remove();
        } else {
          qtyInput.value = 0;
        }
        updateCardTotal(card, item);
      });

      updateCardTotal(card, item);
    }

    addRowBtn.addEventListener('click', () => createRow());
    
    // Baris default awal
    createRow();
  });

  // Fungsi Kalkulasi Penjumlahan Otomatis Per Kartu Barang
  function updateCardTotal(card, item) {
    const rowsContainer = card.querySelector('.rows-container');
    const badge = card.querySelector('.card-total-badge');
    const rows = rowsContainer.querySelectorAll('.input-row');

    let totalBase = 0;

    rows.forEach(row => {
      const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
      const selectedUnit = row.querySelector('.unit-select').value;
      
      let subtotal = 0;

      if (selectedUnit === "MANUAL") {
        // Jika pilih Manual -> Jumlah langsung dipakai tanpa perkalian konversi
        subtotal = qty;
      } else {
        // Jika memilih unit (misal PACK) -> otomatis dikalikan konversi pcs/dasarnya
        const multiplier = item.conversions[selectedUnit] || 1;
        subtotal = qty * multiplier;
      }

      totalBase += subtotal;
      
      // Update subtotal per baris
      row.querySelector('.row-subtotal').textContent = `${formatNumber(subtotal)} ${item.baseUnit}`;
    });

    // Update total badge gabungan seluruh baris untuk barang ini
    badge.textContent = `${formatNumber(totalBase)} ${item.baseUnit}`;
  }

  // Format desimal: memotong 1 digit di belakang koma jika berantai desimal (contoh: 17.84692 -> 17,8)
  function formatNumber(val) {
    if (Number.isInteger(val)) return val.toString();
    const truncated = Math.floor(val * 10) / 10;
    return truncated.toString().replace('.', ',');
  }
});
