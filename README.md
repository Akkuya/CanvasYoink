<img src="images/icon128.png" width="64"/>

# CanvasYoink

Adds a download button to Canvas lecture recordings. Only works on UofT's Canvas (q.utoronto.ca).

## How it works

When you play a lecture, Canvas streams video through Kaltura. The extension intercepts those requests in the background, constructs the direct MP4 URL, and injects a download button onto the page next to the Actions menu. Two buttons show up — one for the slides feed, one for the camera.

## Installation

**Option 1 — Download the zip (easier)**
1. Download the latest zip from the [Releases](https://github.com/Akkuya/CanvasYoink/releases) page and extract it
2. Go to `chrome://extensions`
3. Enable **Developer Mode** (toggle in the top right)
4. Click **Load Unpacked** and select the extracted folder

**Option 2 — Clone the repo**
```bash
git clone https://github.com/Akkuya/CanvasYoink.git
```
Then follow steps 2-4 above.

## Usage

1. Go to a lecture on Canvas and press play
2. Wait a few seconds for the stream to start
3. Click **⬇ Download Lecture** next to the Actions menu
