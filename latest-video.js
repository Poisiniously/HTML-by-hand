const channelId = "UCK1l24pu2VfM78fdtHYMQzQ";

const feedUrl =
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const proxyUrl = `https://proxy.cors.dev/${feedUrl}`;

async function loadLatestVideo() {
    const player = document.getElementById("latest-video");

    if (!player) {
        console.error("YouTube player not found.");
        return;
    }

    try {
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`Feed request failed: HTTP ${response.status}`);
        }

        const xmlText = await response.text();
        const xml = new DOMParser().parseFromString(
            xmlText,
            "application/xml"
        );

        if (xml.querySelector("parsererror")) {
            throw new Error("The YouTube feed could not be parsed.");
        }

        const entry = xml.querySelector("entry");
        const videoId = entry
            ?.getElementsByTagNameNS("*", "videoId")[0]
            ?.textContent
            ?.trim();

        if (!videoId) {
            throw new Error("No video found in the YouTube feed.");
        }

        player.src =
            `https://www.youtube-nocookie.com/embed/${videoId}`;
    } catch (error) {
        console.error("YouTube video error:", error);
    }
}

loadLatestVideo();