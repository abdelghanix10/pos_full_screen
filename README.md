# POS Full Screen Button & Wake Lock (Odoo 20)

The **POS Full Screen Button & Wake Lock** module for **Odoo 20** adds a convenient Full Screen toggle button directly into the Point of Sale navigation bar, along with optional Auto-Fullscreen and Screen Wake Lock support for dedicated touchscreen/tablet POS terminals.

## Features

- **One-Click Full Screen Toggle**: Adds a Full Screen button next to the POS search bar using Odoo 20's Material Symbols icons (`fullscreen` / `fullscreen_exit`).
- **Auto Enter Full Screen**: Optional setting to automatically switch the POS terminal into Full Screen mode on the cashier's first interaction.
- **Keep POS Screen Awake (Wake Lock API)**: Prevents tablet and touchscreen displays from dimming or locking while the POS session is active.
- **Keyboard Shortcuts**: Toggle full screen anytime using **`Alt + F`** or **`F11`**.
- **Cross-Browser Support**: Supports both standard Fullscreen API and Safari/iPad WebKit Fullscreen API.

## Configuration

Go to **Point of Sale → Configuration → Settings** (or edit an individual POS terminal) under **Full Screen & Display Wake Lock**:
- **Show Full Screen Button** (Default: Enabled)
- **Auto Enter Full Screen** (Default: Disabled)
- **Keep POS Screen Awake** (Default: Enabled)

## Technical Details

- **Odoo Version**: `20.0.2.0.0`
- **Dependencies**: `point_of_sale`
- **Frontend Framework**: OWL 3 (`proxy`, `onMounted`, `onWillUnmount`, mandatory `this.` template bindings)
- **License**: LGPL-3