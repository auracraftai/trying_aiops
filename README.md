# LiteTube (Static YouTube-style demo)

A lightweight, dependency-free YouTube-style UI you can open directly in a browser.

## What’s included
- Home feed with search (`index.html`)
- Watch page with HTML5 video player, likes (localStorage), save, share, and suggestions (`watch.html`)
- Mock data and helpers (`scripts/data.js`)
- Core interactions (`scripts/app.js`)
- Minimal responsive styling (`styles.css`)

## Run
- Double-click `index.html` to open in your browser.
- Or serve the folder: `python3 -m http.server 8000` and open http://localhost:8000/

## Notes
- Videos stream from the public Google test videos bucket; thumbnails use YouTube image CDN or picsum.photos.
- To integrate the YouTube Data API, fetch results in `scripts/app.js` where `MOCK_VIDEOS` are used and map fields to the renderers.
# trying_aiops
# trying_aiops
