# Privacy Policy

**Video Links for Proton Calendar**

*Last updated: 2026-02-09*

## Overview

This extension does not collect, transmit, or sell any personal data. All configuration is stored using the browser's built-in extension storage and is only used locally to generate video-conferencing links in Proton Calendar events.

## Data Collection

This extension collects **no data whatsoever**. Specifically:

- No personal information is collected
- No browsing history is recorded
- No analytics or telemetry are sent
- No cookies are set by the extension
- No data is shared with third parties

## Data Storage

The extension stores user preferences (such as enabled services and server URLs) using the browser's built-in `storage.sync` API. This data:

- Remains entirely on your device (or synced via your browser account if sync is enabled)
- Is never transmitted to any external server by the extension
- Can be cleared at any time by uninstalling the extension or clearing extension data in your browser settings

## Permissions

- **storage**: Used to save your service configuration preferences locally
- **host_permissions (`calendar.proton.me`)**: Required to inject video conferencing buttons into the Proton Calendar event form. The extension only runs on this domain.

## Third-Party Services

When you click a button to generate a meeting link, the extension constructs a URL for your chosen video service (e.g. Jitsi Meet, BigBlueButton, Whereby, or a custom provider). The extension does not communicate with these services — it only generates and inserts a URL into your calendar event.

## Contact

If you have questions about this privacy policy, please open an issue on the [GitHub repository](https://github.com/dajbelshaw/video-links-for-proton-calendar).
