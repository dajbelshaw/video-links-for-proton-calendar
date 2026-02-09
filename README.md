# Video Links for Proton Calendar

> **Experimental** - This extension is not affiliated with or endorsed by Proton AG. It may break at any time if Proton changes their calendar interface. Use at your own risk.

A browser extension for [Proton Calendar](https://calendar.proton.me) (the web app at `calendar.proton.me`) that adds one-click buttons to insert video conferencing links from **Jitsi Meet**, **BigBlueButton**, **Whereby**, or a **custom service** directly into your calendar events.

![Screenshot of extension in action](screenshot-extension.png)

## Features

- **Jitsi Meet** - Auto-generates unique room URLs (default: meet.jit.si, or use your own server)
- **BigBlueButton** - Connect to your organization's BBB server
- **Whereby** - Use your persistent Whereby room URL
- **Custom Service** - Add any video service with a URL template

## Installation

### Download

**[Download the latest release here](https://github.com/dajbelshaw/video-links-for-proton-calendar/releases/latest)**

Choose the file for your browser:

- **Chrome, Edge, Brave, Opera, Vivaldi** → `chrome-v*.zip`
- **Firefox** → `firefox-v*.zip`

---

### Chrome / Edge / Brave / Opera / Vivaldi

1. **Download** the Chrome zip file from the [releases page](https://github.com/dajbelshaw/video-links-for-proton-calendar/releases/latest)
2. **Extract** the zip file to a folder on your computer (remember where you put it!)
3. **Open your browser's extensions page:**
   - Chrome: Type `chrome://extensions` in the address bar
   - Edge: Type `edge://extensions` in the address bar
   - Brave: Type `brave://extensions` in the address bar
4. **Enable Developer Mode** - Look for a toggle switch in the top-right corner and turn it on
5. **Click "Load unpacked"** - A button should appear after enabling Developer Mode
6. **Select the folder** you extracted in step 2
7. **Done!** You should see the extension icon in your toolbar

---

### Firefox

1. **Download** the Firefox zip file from the [releases page](https://github.com/dajbelshaw/video-links-for-proton-calendar/releases/latest)
2. **Open Firefox's debugging page:** Type `about:debugging#/runtime/this-firefox` in the address bar
3. **Click "Load Temporary Add-on..."**
4. **Select the zip file** you downloaded (no need to extract it)
5. **Done!** You should see the extension icon in your toolbar

> **Note for Firefox users:** Temporary add-ons are removed when you close Firefox. You'll need to repeat these steps each time you restart the browser. For a permanent installation, the extension would need to be signed by Mozilla.

---

## How to Use

1. **Open Proton Calendar** in your browser at [calendar.proton.me](https://calendar.proton.me) and create or edit an event.
2. **Click a video service button** (e.g. "Add Jitsi") that appears below the location field. A unique meeting link is generated and inserted into the event's location and description automatically.
3. **Save the event** — the meeting link is now part of the invite for all participants.

The screenshot above shows the result: the "Add Jitsi" button has inserted a Jitsi Meet link into both the location field and the event description.

### Configuring Your Services

Click the extension icon in your browser toolbar to open settings:

- **Enable/disable services** - Choose which buttons appear in the event form
- **Jitsi domain** - Use the public `meet.jit.si` or enter your own self-hosted server
- **BBB server URL** - Enter your organisation's BigBlueButton server address
- **Whereby room** - Enter your personal Whereby room URL
- **Custom service** - Set up any other video service (use `{random}` in the URL for auto-generated room IDs)

## Privacy

This extension does not collect, transmit, or sell any personal data. See the full [Privacy Policy](PRIVACY.md) for details.

In short:

- Only runs on `calendar.proton.me`
- Stores your settings locally in your browser
- Does not collect or send any data anywhere
- Generates meeting URLs entirely on your device

## Troubleshooting

**The buttons don't appear:**

- Make sure you're on `calendar.proton.me` (not the mobile app)
- Try refreshing the page
- Check that the extension is enabled in your browser's extensions page

**The extension disappeared (Firefox):**

- Firefox temporary add-ons are removed when the browser closes
- You'll need to load it again using the steps above

**Settings aren't saving:**

- Make sure you click the "Save Settings" button after making changes

## For Developers

See the [Development](#development) section below if you want to build from source or contribute.

<details>
<summary><strong>Development</strong></summary>

### Building from Source

```bash
git clone https://github.com/dajbelshaw/video-links-for-proton-calendar.git
cd video-links-for-proton-calendar

# Build for all browsers
node build.js

# Build for specific browser
node build.js chrome
node build.js firefox

# Clean and rebuild
node build.js --clean
```

### Project Structure

```
video-links-for-proton-calendar/
├── src/                    # Shared source code
│   ├── content-script.js   # Injected into calendar page
│   ├── popup.html          # Settings UI
│   └── popup.js            # Settings logic
├── manifests/              # Browser-specific manifests
│   ├── chrome.json
│   └── firefox.json
├── icons/                  # Extension icons
├── dist/                   # Built extensions (gitignored)
│   ├── chrome/
│   └── firefox/
└── build.js                # Build script
```

</details>

## License

MIT License - see [LICENSE](LICENSE) for details.
