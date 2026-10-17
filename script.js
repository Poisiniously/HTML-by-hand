//made by AI because i can´t java script
const pageContent = document.querySelector("#page-content");

async function loadPage(page) {
    const allowedPages = ["home", "socials", "info", "projects"];

    if (!allowedPages.includes(page)) {
        page = "home";
    }

    const pageFiles = {
        home: "pages/home.html",
        socials: "pages/socials.html",
        info: "pages/info.html",
        projects: "pages/projects"
    };
    const file = pageFiles[page];

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const documentPage = parser.parseFromString(html, "text/html");

        pageContent.innerHTML = documentPage.body.innerHTML;

    if (page === "home") {
        const oldScript =document.getElementById("latest-video-script");
        oldScript?.remove();

        const videoScript = document.createElement("script");
        videoScript.id = "latest-video-script";
        videoScript.src = "latest-video.js";
        document.body.appendChild(videoScript);
    }

    
        // page title
        const pageTitles = {
          home: "Poisiniously | Home",
          socials: "Poisiniously | Socials",
          info: "Poisiniously | Info",
          projects: "Poisiniously | Projects"
        };

document.title = pageTitles[page];

        document.querySelectorAll("[data-page]").forEach(link => {
            const active = link.dataset.page === page;
            link.classList.toggle("active", active);
            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

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