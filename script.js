//made by AI because i can´t java script
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");
const pageContent = document.querySelector("#page-content");

function closeMenu() {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
}

function openMenu() {
    document.body.classList.add("menu-open");
    menuToggle?.setAttribute("aria-expanded", "true");
}

menuToggle?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
menuOverlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
});

async function loadPage(page) {
    const allowedPages = ["home", "socials"];

    if (!allowedPages.includes(page)) {
        page = "home";
    }

    const file = page === "home"
    ? "pages/home.html"
    : "pages/socials.html";

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const documentPage = parser.parseFromString(html, "text/html");

        pageContent.innerHTML = documentPage.body.innerHTML;

        document.querySelectorAll("[data-page]").forEach(link => {
            const active = link.dataset.page === page;
            link.classList.toggle("active", active);
            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        closeMenu();
    } catch (error) {
        console.error("Could not load page:", error);
        pageContent.innerHTML =
            "<p>Page could not be loaded. Please try again.</p>";
    }
}

document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const page = link.dataset.page;

        if (location.hash !== `#${page}`) {
            history.pushState({ page }, "", `#${page}`);
        }

        loadPage(page);
    });
});

document.querySelector(".brand")?.addEventListener("click", event => {
    event.preventDefault();

    if (location.hash !== "#home") {
        history.pushState({ page: "home" }, "", "#home");
    }

    loadPage("home");
});

window.addEventListener("popstate", () => {
    loadPage(location.hash.slice(1) || "home");
});

loadPage(location.hash.slice(1) || "home");