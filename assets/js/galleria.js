(function () {
    "use strict";
  
    function createSectionTitle({ title, subtitle, highlight }) {
      const galleryTitle = document.getElementById("gallery-title");
  
      const h2 = document.createElement("h2");
      h2.textContent = title;
  
      const div = document.createElement("div");
      const span1 = document.createElement("span");
      span1.textContent = subtitle;
  
      const span2 = document.createElement("span");
      span2.className = "description-title";
      span2.textContent = highlight;
  
      div.appendChild(span1);
      div.appendChild(document.createTextNode(" "));
      div.appendChild(span2);
  
      galleryTitle.appendChild(h2);
      galleryTitle.appendChild(div);
    }
  
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
      const gallery = document.getElementById("gallery-photos");
  
      fetch("data/galleria.json")
        .then((res) => res.json())
        .then((data) => {
          createSectionTitle(data);
  
          data.images.forEach((src) => {
            const item = createGalleryItem(src);
            gallery.appendChild(item);
          });
        })
        .catch((err) => {
          console.error("Errore nel caricamento della galleria:", err);
        });
    });
  })();
  