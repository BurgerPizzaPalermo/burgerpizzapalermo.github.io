(function () {
    "use strict";
  
    const galleryImages = Array.from({ length: 15 }, (_, i) => `assets/img/gallery/gallery-${i + 1}.webp`);
  
    function createGalleryItem(src) {
      const col = document.createElement("div");
      col.className = "col-lg-3 col-md-4";
  
      const item = document.createElement("div");
      item.className = "gallery-item";
  
      const link = document.createElement("a");
      link.href = src;
      link.className = "glightbox";
      link.dataset.gallery = "images-gallery";
      link.setAttribute("aria-label", "foto del locale");
  
      const img = document.createElement("img");
      img.src = src;
      img.alt = "foto del locale";
      img.className = "img-fluid";
      img.loading = "lazy";
  
      link.appendChild(img);
      item.appendChild(link);
      col.appendChild(item);
  
      return col;
    }
  
    document.addEventListener("DOMContentLoaded", () => {
      const row = document.getElementById("gallery-row");
      galleryImages.forEach((src) => {
        const item = createGalleryItem(src);
        row.appendChild(item);
      });
    });
  })();  