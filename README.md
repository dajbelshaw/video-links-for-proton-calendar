# Proton Calendar Video Links

> **Experimental** - This extension is experimental and not affiliated with Proton AG. It may break at any time if Proton changes their calendar interface. Use at your own risk.

A browser extension that adds video conferencing buttons to Proton Calendar, allowing you to quickly insert meeting links from services other than Zoom.

## Features

- **Jitsi Meet** - Auto-generates unique room URLs (default: meet.jit.si, or use your own server)
- **BigBlueButton** - Connect to your organization's BBB server
- **Whereby** - Use your persistent Whereby room URL
- **Custom Service** - Add any video service with a URL template

When creating a calendar event in Proton Calendar, buttons appear near the location field. Click a button to instantly populate the location with a video meeting link.

## Installation

### Download

**[Download the latest release here](https://github.com/dajbelshaw/proton-calendar-video-links/releases/latest)**

Choose the file for your browser:
- **Chrome, Edge, Brave, Opera, Vivaldi** → `proton-calendar-video-links-chrome-v*.zip`
- **Firefox** → `proton-calendar-video-links-firefox-v*.zip`

---

### Chrome / Edge / Brave / Opera / Vivaldi

1. **Download** the Chrome zip file from the [releases page](https://github.com/dajbelshaw/proton-calendar-video-links/releases/latest)
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

1. **Download** the Firefox zip file from the [releases page](https://github.com/dajbelshaw/proton-calendar-video-links/releases/latest)
2. **Open Firefox's debugging page:** Type `about:debugging#/runtime/this-firefox` in the address bar
3. **Click "Load Temporary Add-on..."**
4. **Select the zip file** you downloaded (no need to extract it)
5. **Done!** You should see the extension icon in your toolbar

> **Note for Firefox users:** Temporary add-ons are removed when you close Firefox. You'll need to repeat these steps each time you restart the browser. For a permanent installation, the extension would need to be signed by Mozilla.

---

## How to Use

1. Go to [Proton Calendar](https://calendar.proton.me)
2. Create a new event (click on any time slot)
3. Look for the coloured video service buttons below the location field
4. Click a button to add a meeting link to your event

### Configuring Your Services

Click the extension icon in your browser toolbar to open settings:

- **Enable/disable services** - Choose which buttons appear
- **Jitsi domain** - Use the public `meet.jit.si` or enter your own self-hosted server
- **BBB server URL** - Enter your organisation's BigBlueButton server address
- **Whereby room** - Enter your personal Whereby room URL
- **Custom service** - Set up any other video service (use `{random}` in the URL for auto-generated room IDs)

## Privacy

This extension:
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
git clone https://github.com/dajbelshaw/proton-calendar-video-links.git
cd proton-calendar-video-links

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
proton-calendar-video-links/
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
