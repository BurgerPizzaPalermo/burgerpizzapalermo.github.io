(function() {
    "use strict";
    
  document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("lazy-map-container");
    let mapLoaded = false;

    const loadGoogleMap = () => {
      if (mapLoaded) return;
      mapLoaded = true;
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6275.816151877813!2d13.340377000000002!3d38.1423304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319ef363552e6b7%3A0x6bedf492b28f571e!2sBurgerPizza!5e0!3m2!1sit!2sit!4v1743629578301!5m2!1sit!2sit";
      iframe.width = "100%";
      iframe.height = "400";
      iframe.style.border = "0";
      iframe.loading = "lazy";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("title", "Google Maps");
      mapContainer.innerHTML = ""; // Rimuovi il messaggio di caricamento
      mapContainer.appendChild(iframe);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadGoogleMap();
          observer.unobserve(mapContainer);
        }
      });
    }, {
      rootMargin: "0px 0px 200px 0px"
    });

    observer.observe(mapContainer);
  });

})();