const channelId = "UCK1l24pu2VfM78fdtHYMQzQ";
const feedUrl =
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const apiUrl =
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (!data.items || data.items.length === 0) {
            throw new Error("No videos found.");
        }

        const videoUrl = data.items[0].link;
        const videoId = new URL(videoUrl).searchParams.get("v");

        if (!videoId) {
            throw new Error("Could not determine video ID.");
        }

        document.getElementById("latest-video").src =
            `https://www.youtube.com/embed/${videoId}`;
    })
    .catch(error => console.error("YouTube video error:", error));