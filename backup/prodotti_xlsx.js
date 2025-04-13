(function () {
  "use strict";

  const CATEGORIES = ["Antipasti", "Aperitivi", "Impasti", "Pizze Classiche", "Pizze con Bufala", "Pizze Gourmet", "Calzoni", "Hamburger", "Secondi", "Dolci", "Bibite", "Birre alla Spina"];

  function createMenuItemHTML(category, nome, descrizione, prezzo, immagine) {
    const imageName = immagine && immagine.trim() !== "" ? immagine.trim() : "default.webp";
    return `
      <div class="col-lg-6 menu-item isotope-item filter-${category}">
        <img src="assets/img/menu/${imageName}" class="menu-img" alt="${imageName} foto" onerror="this.onerror=null;this.src='assets/img/menu/default.webp';" loading="lazy">
        <div class="menu-content">
          <a href="#">${nome}</a><span>€${prezzo}</span>
        </div>
        <div class="menu-ingredients">${descrizione}</div>
      </div>
    `;
  }

  function loadSheetJSLibrary() {
    return new Promise((resolve, reject) => {
      if (window.XLSX) {
        return resolve(window.XLSX);
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js";
      script.onload = () => resolve(window.XLSX);
      script.onerror = () => reject(new Error("Impossibile caricare SheetJS"));
      document.head.appendChild(script);
    });
  }

  async function loadExcelFile() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    try {
      const XLSX = await loadSheetJSLibrary();
      const res = await fetch('prodotti.xlsx');
      const data = await res.arrayBuffer();
      const wb = XLSX.read(data, { type: 'array' });

      CATEGORIES.forEach(cat => {
        const catValue = cat.toLowerCase().replaceAll(" ", "-");
        if (wb.SheetNames.includes(cat)) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[cat], { header: 1, blankrows: false });
          rows.shift();
          if (rows.length > 0) {
            let html = '';
            rows.forEach(row => {
              const [nome, descr, prezzo, immagine] = row;
              html += createMenuItemHTML(catValue, nome || '', descr || '', prezzo || '0.00', immagine || '');
            });
            container.innerHTML += html;
          } else {
            container.innerHTML += noItemsTemplate(catValue, "Nessun prodotto nella categoria");
          }
        } else {
          container.innerHTML += noItemsTemplate(catValue, "Categoria non trovata");
        }
      });

    } catch (err) {
      console.error(err);
      CATEGORIES.forEach(cat => {
        const catValue = cat.toLowerCase().replaceAll(" ", "-");
        container.innerHTML += noItemsTemplate(catValue, "File Excel dei prodotti non trovato");
      });
    }

    const isoContainer = document.querySelector('.isotope-container');
    if (isoContainer && Isotope.data(isoContainer)) {
      Isotope.data(isoContainer).reloadItems();
      Isotope.data(isoContainer).arrange();
    }
  }

  function noItemsTemplate(category, msg) {
    return `
      <div class="col-lg-6 menu-item isotope-item filter-${category}">
        <img src="assets/img/menu/default.webp" class="menu-img" alt="immagine di default" loading="lazy">
        <div class="menu-content">
          <span>${msg}</span>
        </div>
        <div class="menu-ingredients">Contattare l'amministratore del sito</div>
      </div>`;
  }

  window.addEventListener('load', loadExcelFile);
})();
