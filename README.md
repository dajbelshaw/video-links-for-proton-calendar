# Proton Calendar Video Links

> **Experimental** - This extension is experimental and not affiliated with Proton AG. It may break at any time if Proton changes their calendar interface. Use at your own risk.

A browser extension that adds video conferencing buttons to Proton Calendar, allowing you to quickly insert meeting links from services other than Zoom.

## Features

- **Jitsi Meet** - Auto-generates unique room URLs (default: meet.jit.si, or use your own server)
- **BigBlueButton** - Connect to your organization's BBB server
- **Whereby** - Use your persistent Whereby room URL
- **Custom Service** - Add any video service with a URL template

When creating a calendar event in Proton Calendar, buttons appear near the location field. Click a button to instantly populate the location with a video meeting link.

## Supported Browsers

- Google Chrome / Chromium / Edge / Brave / Opera / Vivaldi
- Mozilla Firefox

## Installation

### From Source (Developer Mode)

#### Chrome / Chromium

1. Clone this repository
2. Run `node build.js chrome`
3. Open `chrome://extensions`
4. Enable **Developer mode**
5. Click **Load unpacked**
6. Select the `dist/chrome` folder

#### Firefox

1. Clone this repository
2. Run `node build.js firefox`
3. Open `about:debugging#/runtime/this-firefox`
4. Click **Load Temporary Add-on**
5. Select any file in the `dist/firefox` folder

## Usage

1. Go to [Proton Calendar](https://calendar.proton.me)
2. Create a new event (click on a time slot)
3. Look for the video service buttons below the location field
4. Click a button to add a meeting link

### Configuration

Click the extension icon in your toolbar to configure:

- **Enable/disable services** - Toggle which buttons appear
- **Jitsi domain** - Use the public `meet.jit.si` or your self-hosted instance
- **BBB server URL** - Your organization's BigBlueButton server
- **Whereby room** - Your personal Whereby room URL
- **Custom service** - Define your own service with a URL template (use `{random}` for auto-generated room IDs)

## Development

```bash
git clone https://github.com/dajbelshaw/proton-calendar-video-links.git
cd proton-calendar-video-links

# Build for all browsers
node build.js

# Build for specific browser
node build.js chrome
node build.js firefox

# Clean build
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

## Privacy

This extension:
- Only runs on `calendar.proton.me`
- Stores settings locally in browser storage
- Does not collect or transmit any data
- Generates meeting URLs locally without external API calls

## Permissions

- **storage** - Save your video service preferences
- **Host permission for calendar.proton.me** - Inject video buttons into the calendar

## License

MIT License - see [LICENSE](LICENSE) for details.
