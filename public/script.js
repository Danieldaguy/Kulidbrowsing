document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("urlInput");
    const searchButton = document.getElementById("searchButton");
    const openNewTabButton = document.getElementById("openNewTab");
    const modal = document.getElementById("modal");
    const iframe = document.getElementById("iframeWindow");
    const closeModal = document.querySelector(".close");
    const searchUrl = "https://www.google.com/search?q=";

    modal.style.display = "none";

    function openModalWithURL(url) {
        if (!url || url.trim() === "") {
            return;
        }

        if (!url.includes(".")) {
            url = searchUrl + encodeURIComponent(url);
        } else {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }
        }

        iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
        modal.style.display = "flex";
    }

    searchButton.onclick = function (event) {
        event.preventDefault();
        let url = urlInput.value.trim();
        if (url) {
            openModalWithURL(url);
        }
    };

    urlInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchButton.click();
        }
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        iframe.src = "";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            iframe.src = "";
        }
    });

    openNewTabButton.onclick = function () {
        let url = urlInput.value.trim();
        if (!url) return;

        if (!url.includes(".")) {
            url = searchUrl + encodeURIComponent(url);
        } else {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }
        }

        let newTab = window.open("about:blank", "_blank");
        newTab.document.write(`<iframe src="${__uv$config.prefix + __uv$config.encodeUrl(url)}" style="width:100vw;height:100vh;border:none;"></iframe>`);

        window.location.href = "https://classroom.google.com/";
    };
});