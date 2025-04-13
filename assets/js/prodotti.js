(function () {
  "use strict";

  const CATEGORIES = [
    "Antipasti", "Aperitivi", "Impasti", "Pizze Classiche",
    "Pizze con Bufala", "Pizze Gourmet", "Calzoni", "Hamburger",
    "Secondi", "Dolci", "Bibite", "Birre alla Spina"
  ];

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

  async function loadCategoryCSV(category, container) {
    const catValue = category.toLowerCase().replaceAll(" ", "-");
    const url = `assets/data/${category}.csv`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("CSV non trovato");
      const csvText = await res.text();

      const rows = csvText.trim().split("\n").map(line => {
        return line.split(";").map(cell => cell.trim().replace(/^"|"$/g, ''));
      });

      rows.shift();

      if (rows.length === 0) {
        container.innerHTML += noItemsTemplate(catValue, "Nessun prodotto nella categoria");
        return;
      }

      let html = '';
      rows.forEach(([nome, descr, prezzo, immagine]) => {
        html += createMenuItemHTML(catValue, nome || '', descr || '', prezzo || '0.00', immagine || '');
      });

      container.innerHTML += html;

    } catch (err) {
      container.innerHTML += noItemsTemplate(catValue, "Categoria non trovata o CSV mancante");
      console.error(`Errore nella categoria "${category}":`, err.message);
    }
  }

  async function loadCSVFiles() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    await Promise.all(CATEGORIES.map(cat => loadCategoryCSV(cat, container)));

    const isoContainer = document.querySelector('.isotope-container');
    if (isoContainer && Isotope.data(isoContainer)) {
      Isotope.data(isoContainer).reloadItems();
      Isotope.data(isoContainer).arrange();
    }
  }

  window.addEventListener('load', loadCSVFiles);

})();
