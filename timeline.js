async function onGetTimeline() {
    "use strict";
    document.getElementById('link_download').innerHTML = "<p>Processing...</p>";
    try {
        const url = "https://apiorigins.herokuapp.com/line?url=" + encodeURIComponent(document.getElementById("urlTimeline").value);
        const htmlString = (await (await fetch(url)).text());
        document.getElementById('link_download').innerHTML = htmlString;
    } catch (error) {
        document.getElementById('link_download').innerHTML = `<p>Error : ${error.message}</p>`;
    }
}
