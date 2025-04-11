(function() {
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

  function loadExcelFile() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    fetch('prodotti.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const wb = XLSX.read(data, { type: 'array' });
        CATEGORIES.forEach(cat => {
          const catValue = cat.toLowerCase().replaceAll(" ","-")
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
              container.innerHTML += 
                `<div class="col-lg-6 menu-item isotope-item filter-${catValue}">
                  <img src="assets/img/menu/default.webp" class="menu-img" alt="immagine di default">
                  <div class="menu-content">
                    <span>Nessun prodotto nella categoria</span>
                  </div>
                  <div class="menu-ingredients">Non sono presenti prodotti per questa categoria</div>
                </div>`
              console.error("Nessun prodotto")
            }
          } else {
            container.innerHTML += 
              `<div class="col-lg-6 menu-item isotope-item filter-${catValue}">
                <img src="assets/img/menu/default.webp" class="menu-img" alt="immagine di default">
                <div class="menu-content">
                  <span>Categoria non trovata</span>
                </div>
                <div class="menu-ingredients">Controlla il file prodotti</div>
              </div>`
            console.error("Categoria " + catValue + " non trovata")
          }
        });
        // Ricalcola il layout Isotope dopo il caricamento
        const isoContainer = document.querySelector('.isotope-container');
        if (isoContainer && Isotope.data(isoContainer)) {
          Isotope.data(isoContainer).reloadItems();
          Isotope.data(isoContainer).arrange();
        }
      })
      .catch(() => {
        CATEGORIES.forEach(cat => {
          const catValue = cat.toLowerCase().replaceAll(" ","-")
          container.innerHTML += 
            `<div class="col-lg-6 menu-item isotope-item filter-${catValue}">
              <img src="assets/img/menu/default.webp" class="menu-img" alt="immagine di default">
              <div class="menu-content">
                <span>File Excel dei prodotti non trovato</span>
              </div>
              <div class="menu-ingredients">Contattare l'amministratore del sito</div>
            </div>`
          console.error("File Excel dei prodotti non trovato")
        });
        // Ricalcola il layout Isotope dopo il caricamento
        const isoContainer = document.querySelector('.isotope-container');
        if (isoContainer && Isotope.data(isoContainer)) {
          Isotope.data(isoContainer).reloadItems();
          Isotope.data(isoContainer).arrange();
        }
      });
  }

  window.addEventListener('load', loadExcelFile);

  })();
  