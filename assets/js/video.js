(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("video-container");

        fetch("data/video.json")
        .then((res) => res.json())
        .then((data) => {
            const img = document.createElement("img");
            img.src = data.image;
            img.alt = data.imageAlt || "";
            img.className = "img-fluid";
            img.loading = "lazy";

            const link = document.createElement("a");
            link.href = data.videoLink;
            link.className = "glightbox pulsating-play-btn";
            link.setAttribute("aria-label", "Video");

            container.appendChild(img);
            container.appendChild(link);
        })
        .catch((err) => {
            console.error("Errore nel caricamento della sezione video:", err);
        });
    });
})();
  