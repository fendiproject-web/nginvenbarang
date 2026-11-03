// Database konversi barang gudang
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

const ICON_REFRESH = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`;
const ICON_PLUS = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const ICON_TRASH = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  const inventoryGrid = document.getElementById('inventory-grid');
  const shortageGrid = document.getElementById('shortage-grid');

  // Render Grid Stok
  renderGrid(inventoryGrid, false);

  // Render Grid Kurangan (Sama persis list barangnya)
  renderGrid(shortageGrid, true);

  // Tab Switcher Handler
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.dataset.tab;
      document.getElementById(targetTab).classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Fungsi pembuat Kartu Grid (berlaku untuk Stok & Kurangan)
  function renderGrid(containerElement, isKurangan = false) {
    inventoryData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'neu-card';

      const badgeClass = isKurangan ? 'card-total-badge badge-kurangan' : 'card-total-badge';
      const btnAddClass = isKurangan ? 'btn-add-row btn-kurangan' : 'btn-add-row';

      card.innerHTML = `
        <div class="card-header">
          <span class="card-title">${item.name}</span>
          <div class="header-actions">
            <button class="btn-reset-card" title="Reset Barang Ini">
              ${ICON_REFRESH} Reset
            </button>
            <span class="${badgeClass}">0 ${item.baseUnit}</span>
          </div>
        </div>
        <div class="rows-container"></div>
        <button class="${btnAddClass}">
          ${ICON_PLUS} Tambah Baris Input
        </button>
      `;

      containerElement.appendChild(card);

      const rowsContainer = card.querySelector('.rows-container');
      const addRowBtn = card.querySelector('.btn-add-row');
      const resetCardBtn = card.querySelector('.btn-reset-card');

      function createRow(defaultQty = 0) {
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

        const subtotalClass = isKurangan ? 'row-subtotal subtotal-kurangan' : 'row-subtotal';

        row.innerHTML = `
          <input type="number" class="qty-input" value="${defaultQty}" step="any" min="0" placeholder="0">
          <select class="unit-select">${optionsHtml}</select>
          <span class="${subtotalClass}">0 ${item.baseUnit}</span>
          <button class="btn-remove-row" title="Hapus Baris">${ICON_TRASH}</button>
        `;

        rowsContainer.appendChild(row);

        const qtyInput = row.querySelector('.qty-input');
        const unitSelect = row.querySelector('.unit-select');
        const removeBtn = row.querySelector('.btn-remove-row');

        qtyInput.addEventListener('input', () => updateCardTotal(card, item, isKurangan));
        unitSelect.addEventListener('change', () => {
          if (!qtyInput.value || parseFloat(qtyInput.value) === 0) {
            qtyInput.value = 1;
          }
          updateCardTotal(card, item, isKurangan);
        });

        removeBtn.addEventListener('click', () => {
          if (rowsContainer.children.length > 1) {
            row.remove();
          } else {
            qtyInput.value = 0;
          }
          updateCardTotal(card, item, isKurangan);
        });

        updateCardTotal(card, item, isKurangan);
      }

      resetCardBtn.addEventListener('click', () => {
        rowsContainer.innerHTML = '';
        createRow(0);
      });

      addRowBtn.addEventListener('click', () => {
        createRow(1);
      });

      // Default awal: Tab Stok bernilai 1, Tab Kurangan bernilai 0
      createRow(isKurangan ? 0 : 1);
    });
  }

  // Hitung total per kartu
  function updateCardTotal(card, item, isKurangan = false) {
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
  }

  function formatNumber(val) {
    if (Number.isInteger(val)) return val.toString();
    const truncated = Math.floor(val * 10) / 10;
    return truncated.toString().replace('.', ',');
  }
});
