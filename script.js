// Database konversi barang gudang persis sesuai gambar tabel & opsi khusus Chili Sachet
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

// SVG Icons
const ICON_REFRESH = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`;
const ICON_PLUS = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const ICON_TRASH = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  const inventoryGrid = document.getElementById('inventory-grid');
  const summaryTextarea = document.getElementById('summary-text');
  const btnCopy = document.getElementById('btn-copy');
  const copyTextBtn = document.getElementById('copy-text-btn');

  inventoryData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'neu-card';
    card.dataset.itemIndex = index;

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${item.name}</span>
        <div class="header-actions">
          <button class="btn-reset-card" title="Reset Barang Ini">
            ${ICON_REFRESH} Reset
          </button>
          <span class="card-total-badge">0 ${item.baseUnit}</span>
        </div>
      </div>
      <div class="rows-container"></div>
      <button class="btn-add-row">
        ${ICON_PLUS} Tambah Baris Input
      </button>
    `;

    inventoryGrid.appendChild(card);

    const rowsContainer = card.querySelector('.rows-container');
    const addRowBtn = card.querySelector('.btn-add-row');
    const resetCardBtn = card.querySelector('.btn-reset-card');

    function createRow(defaultQty = 1) {
      const row = document.createElement('div');
      row.className = 'input-row';

      const standardUnits = Object.keys(item.conversions);
      let optionsHtml = standardUnits
        .map(u => {
          const count = item.conversions[u];
          return `<option value="${u}">${u} (${count} ${item.baseUnit})</option>`;
        })
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

      qtyInput.addEventListener('input', () => {
        updateCardTotal(card, item);
        generateSummaryNotes();
      });

      unitSelect.addEventListener('change', () => {
        if (!qtyInput.value || parseFloat(qtyInput.value) === 0) {
          qtyInput.value = 1;
        }
        updateCardTotal(card, item);
        generateSummaryNotes();
      });

      removeBtn.addEventListener('click', () => {
        if (rowsContainer.children.length > 1) {
          row.remove();
        } else {
          qtyInput.value = 0;
        }
        updateCardTotal(card, item);
        generateSummaryNotes();
      });

      updateCardTotal(card, item);
    }

    resetCardBtn.addEventListener('click', () => {
      rowsContainer.innerHTML = '';
      createRow(0);
      generateSummaryNotes();
    });

    addRowBtn.addEventListener('click', () => {
      createRow(1);
      generateSummaryNotes();
    });

    // Awal langsung bernilai 1 agar terhitung dan terisi ke catatan langsung
    createRow(1);
  });

  // Hitung total per kartu
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
        subtotal = qty;
      } else {
        const multiplier = item.conversions[selectedUnit] || 1;
        subtotal = qty * multiplier;
      }

      totalBase += subtotal;
      row.querySelector('.row-subtotal').textContent = `${formatNumber(subtotal)} ${item.baseUnit}`;
    });

    badge.textContent = `${formatNumber(totalBase)} ${item.baseUnit}`;
    card.dataset.totalVal = totalBase;
  }

  // Buat Catatan Laporan Sisa Stok Otomatis
  function generateSummaryNotes() {
    const cards = document.querySelectorAll('.neu-card[data-item-index]');
    let lines = ["📋 LAPORAN SISA STOK GUDANG", "----------------------------"];
    let hasData = false;

    cards.forEach((card, idx) => {
      const item = inventoryData[idx];
      const totalVal = parseFloat(card.dataset.totalVal) || 0;

      if (totalVal > 0) {
        hasData = true;
        lines.push(`• ${item.name}: ${formatNumber(totalVal)} ${item.baseUnit}`);
      }
    });

    if (!hasData) {
      summaryTextarea.value = "Belum ada sisa stok barang yang diisi.";
    } else {
      summaryTextarea.value = lines.join("\n");
    }
  }

  // Fitur Salin Teks ke Clipboard
  btnCopy.addEventListener('click', () => {
    if (!summaryTextarea.value || summaryTextarea.value.startsWith("Belum ada")) return;

    navigator.clipboard.writeText(summaryTextarea.value).then(() => {
      copyTextBtn.textContent = "Tersalin!";
      btnCopy.style.color = "#059669";

      setTimeout(() => {
        copyTextBtn.textContent = "Salin Catatan";
        btnCopy.style.color = "";
      }, 2000);
    }).catch(() => {
      summaryTextarea.select();
      document.execCommand('copy');
      copyTextBtn.textContent = "Tersalin!";
      setTimeout(() => {
        copyTextBtn.textContent = "Salin Catatan";
        btnCopy.style.color = "";
      }, 2000);
    });
  });

  // Format desimal: memotong 1 digit di belakang koma (misal 17.84692 -> 17,8)
  function formatNumber(val) {
    if (Number.isInteger(val)) return val.toString();
    const truncated = Math.floor(val * 10) / 10;
    return truncated.toString().replace('.', ',');
  }

  // Panggil langsung saat pertama dimuat agar catatan terisi instan
  generateSummaryNotes();
});
