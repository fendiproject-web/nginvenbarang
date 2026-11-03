:root {
  --bg-color: #e0e5ec;
  --text-main: #2d3748;
  --text-muted: #718096;
  
  --accent-blue: #2563eb;
  --accent-blue-hover: #1d4ed8;
  --accent-green: #059669;
  --accent-orange: #dd6b20;
  --accent-red: #ef4444;

  /* Bayangan Neumorphism Presisi & Halus */
  --neu-shadow-flat: 6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff;
  --neu-shadow-hover: 9px 9px 16px #98a7bd, -9px -9px 16px #ffffff;
  --neu-shadow-inset: inset 2px 2px 5px #b8c5d6, inset -2px -2px 5px #ffffff;
  --neu-shadow-btn: 4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff;
  --neu-shadow-btn-pressed: inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  padding: 16px 12px;
}

.app-container {
  max-width: 1280px;
  margin: 0 auto;
}

/* Container Banner Ramping */
.banner-header {
  width: 100%;
  height: 160px;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--neu-shadow-flat);
  background: var(--bg-color);
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 16px;
}

/* Compact Grid Layout */
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 16px;
}

/* Neumorphic Card Component */
.neu-card {
  background: var(--bg-color);
  border-radius: 16px;
  padding: 14px;
  box-shadow: var(--neu-shadow-flat);
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
}

.neu-card:hover {
  box-shadow: var(--neu-shadow-hover);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(163, 177, 198, 0.3);
}

.card-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: #1a202c;
  text-transform: uppercase;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-total-badge {
  background: var(--bg-color);
  color: var(--accent-green);
  box-shadow: var(--neu-shadow-btn);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 800;
  white-space: nowrap;
}

.btn-reset-card {
  background: var(--bg-color);
  color: var(--accent-orange);
  box-shadow: var(--neu-shadow-btn);
  border: none;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.btn-reset-card:hover {
  color: var(--accent-red);
}

.btn-reset-card:active {
  box-shadow: var(--neu-shadow-btn-pressed);
}

.rows-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.input-row {
  display: grid;
  grid-template-columns: 55px 1fr 65px 28px;
  gap: 6px;
  align-items: center;
}

input[type="number"], select {
  background: var(--bg-color);
  box-shadow: var(--neu-shadow-inset);
  border: none;
  border-radius: 8px;
  color: var(--text-main);
  padding: 7px 8px;
  font-size: 0.78rem;
  font-weight: 600;
  outline: none;
  width: 100%;
  transition: all 0.2s ease;
}

select {
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

input[type="number"]:focus, select:focus {
  color: var(--accent-blue);
}

.row-subtotal {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-blue);
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-add-row {
  background: var(--bg-color);
  color: var(--accent-blue);
  box-shadow: var(--neu-shadow-btn);
  border: none;
  padding: 8px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.78rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: auto;
}

.btn-add-row:hover {
  color: var(--accent-blue-hover);
}

.btn-add-row:active {
  box-shadow: var(--neu-shadow-btn-pressed);
}

.btn-remove-row {
  background: var(--bg-color);
  color: var(--accent-red);
  box-shadow: var(--neu-shadow-btn);
  border: none;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-remove-row:hover {
  color: #dc2626;
}

.btn-remove-row:active {
  box-shadow: var(--neu-shadow-btn-pressed);
}

/* Responsif khusus HP agar banner pas & proporsional */
@media (max-width: 640px) {
  .banner-header {
    height: 110px;
  }
  .inventory-grid {
    grid-template-columns: 1fr;
  }
  .input-row {
    grid-template-columns: 50px 1fr 58px 26px;
    gap: 4px;
  }
}
