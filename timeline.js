async function onGetTimeline() {
    "use strict";
    document.getElementById('link_download').innerHTML = "<p>Processing...</p>";
    try {
        const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(document.getElementById("urlTimeline").value);
        const htmlString = (await (await fetch(url)).text());
        const html = new DOMParser().parseFromString(htmlString, "text/html");
        document.getElementById('link_download').innerHTML = `<p>Extract JSON from ${url}</p>`;
        const json = JSON.parse(html.getElementById("__NEXT_DATA__").textContent);
        const feeds = Object.values(json.props?.pageProps?.initialState?.api?.feeds || {});
        const hasil = [], total = feeds.length;
        document.getElementById('link_download').innerHTML = "<p>[Progress] 0% get media from JSON.</p>";
        feeds.forEach(({ post }, i) => {
            document.getElementById('link_download').innerHTML = `<p>[Progress] ${(100*i)/total | 0}% get media from JSON.</p>`;
            let media = post?.contents?.media;
            Array.isArray(media) && media.forEach(({ type, resourceId }) => {
                type == "VIDEO" ?
                    hasil.push(`<video width="320" height="240" controls><source src="https://obs.line-scdn.net/${resourceId}" type="video/mp4"></video>`) :
                    hasil.push(`<img src="https://obs.line-scdn.net/${resourceId}" width="320" height="240">`);
            });
        });
        document.getElementById('link_download').innerHTML = hasil.join("").trim() || '<p>Invalid Link!</p>';
    } catch (error) {
        document.getElementById('link_download').innerHTML = `<p>Error : ${error.message}</p>`;
    }
}
