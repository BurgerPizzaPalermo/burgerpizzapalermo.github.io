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

  //USARE QUESTA PER ULTIMA VERSIONE <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
  async function loadExcelFile() {
    const XLSX = await import('https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js');
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    try {
      const res = await fetch('prodotti.xlsx');
      const data = await res.arrayBuffer();
      const wb = XLSX.read(data, { type: 'array' });

      CATEGORIES.forEach(cat => {
        const catValue = cat.toLowerCase().replaceAll(" ", "-");
        if (wb.SheetNames.includes(cat)) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[cat], { header: 1, blankrows: false });
          rows.shift(); // rimuovi intestazione
          if (rows.length > 0) {
            let html = '';
            rows.forEach(row => {
              const [nome, descr, prezzo, immagine] = row;
              html += createMenuItemHTML(catValue, nome || '', descr || '', prezzo || '0.00', immagine || '');
            });
            container.innerHTML += html;
          } else {
            container.innerHTML += noItemsTemplate(catValue, "Nessun prodotto nella categoria");
            console.error("Nessun prodotto");
          }
        } else {
          container.innerHTML += noItemsTemplate(catValue, "Categoria non trovata");
          console.error("Categoria " + catValue + " non trovata");
        }
      });

    } catch (err) {
      CATEGORIES.forEach(cat => {
        const catValue = cat.toLowerCase().replaceAll(" ", "-");
        container.innerHTML += noItemsTemplate(catValue, "File Excel dei prodotti non trovato");
        console.error("File Excel dei prodotti non trovato");
      });
    }

    // Ricalcola il layout Isotope dopo il caricamento
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
