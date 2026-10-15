//made by AI because i can´t java script
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");

if (menuToggle && menuClose && menuOverlay) {
    function closeMenu() {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        document.body.classList.add("menu-open");
        menuToggle.setAttribute("aria-expanded", "true");
    });

    menuClose.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}


document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener("click", event => {
        const url = new URL(link.href, window.location.href);

        if (
            url.origin !== window.location.origin ||
            url.pathname === window.location.pathname ||
            event.ctrlKey || event.metaKey || event.shiftKey ||
            event.altKey || event.button !== 0 ||
            link.target === "_blank"
        ) {
            return;
        }

        event.preventDefault();
        document.body.classList.add("page-leaving");

        setTimeout(() => {
            window.location.href = url.href;
        }, 200);
    });
});
