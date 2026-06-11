/** @odoo-module */

import { Navbar } from "@point_of_sale/app/components/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { useState, useExternalListener } from "@odoo/owl";

patch(Navbar.prototype, {
  setup() {
    super.setup();
    this.fullScreenState = useState({ isFullScreen: this._isFullScreen() });
    const updateFullScreen = () => {
      this.fullScreenState.isFullScreen = this._isFullScreen();
    };
    useExternalListener(window, "resize", updateFullScreen);
    useExternalListener(document, "fullscreenchange", updateFullScreen);
  },
  _isFullScreen() {
    return (
      !!document.fullscreenElement ||
      window.innerHeight === window.screen.height
    );
  },
  toggleFullScreen() {
    if (this._isFullScreen()) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        // If in browser-level fullscreen, first request JS fullscreen
        // so we can eventually exit it, or just hope it works.
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
        );
      });
    }
  },
});
