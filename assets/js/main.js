/**
* Template Name: Delicious
* Template URL: https://bootstrapmade.com/delicious-free-restaurant-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/*!
 * BurgerPizza - main.js
 * (c) 2025 BurgerPizza
 * Released under MIT License
 * See LICENSE
 */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  // === MENU DINAMICO DA EXCEL ===
  const CATEGORIES = ["Antipasti", "Aperitivi", "Impasti", "Pizze Classiche", "Pizze con Bufala", "Pizze Gourmet", "Calzoni", "Hamburger", "Secondi", "Dolci", "Bibite", "Birre alla Spina"];

  function createMenuItemHTML(category, nome, descrizione, prezzo, immagine) {
    const imageName = immagine && immagine.trim() !== "" ? immagine.trim() : "default.jpg";
    return `
      <div class="col-lg-6 menu-item isotope-item filter-${category}">
        <img src="assets/img/menu/${imageName}" class="menu-img" alt="${imageName} foto" onerror="this.onerror=null;this.src='assets/img/menu/default.jpg';">
        <div class="menu-content">
          <a href="#">${nome}</a><span>€${prezzo}</span>
        </div>
        <div class="menu-ingredients">${descrizione}</div>
      </div>
    `;
  }

  function loadExcelFile() {
    fetch('prodotti.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const wb = XLSX.read(data, { type: 'array' });
        const container = document.getElementById('menu-container');
        container.innerHTML = '';

        CATEGORIES.forEach(cat => {
          const catValue = cat.toLowerCase().replaceAll(" ","-")
          if (wb.SheetNames.includes(cat)) {
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[cat], { header: 1, blankrows: false });
            rows.shift(); // rimuovi intestazione
            if (rows.length > 0) {
              rows.forEach(row => {
                const [nome, descr, prezzo, immagine] = row;
                container.innerHTML += createMenuItemHTML(catValue, nome || '', descr || '', prezzo || '0.00', immagine || '');
              });
            } else {
              container.innerHTML += 
                `<div class="col-lg-6 menu-item isotope-item filter-${catValue}">
                  <img src="assets/img/menu/default.jpg" class="menu-img" alt="immagine di default">
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
                <img src="assets/img/menu/default.jpg" class="menu-img" alt="immagine di default">
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
        const container = document.getElementById('menu-container');
        container.innerHTML = '';
        CATEGORIES.forEach(cat => {
          const catValue = cat.toLowerCase().replaceAll(" ","-")
          container.innerHTML += 
            `<div class="col-lg-6 menu-item isotope-item filter-${catValue}">
              <img src="assets/img/menu/default.jpg" class="menu-img" alt="immagine di default">
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
  // === FINE MENU DINAMICO DA EXCEL ===

})();