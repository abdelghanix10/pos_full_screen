/** @odoo-module */

import { Navbar } from "@point_of_sale/app/components/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { proxy, onMounted, onWillUnmount } from "@odoo/owl";

patch(Navbar.prototype, {
  setup() {
    super.setup(...arguments);

    // OWL 3 in Odoo 20 uses proxy() instead of useState()
    this.fullScreenState = proxy({
      isFullScreen: this._isFullScreen(),
    });
    this._wakeLockSentinel = null;

    const updateFullScreen = () => {
      this.fullScreenState.isFullScreen = this._isFullScreen();
    };

    const onKeyDown = (ev) => {
      // Support Alt+F or F11 to toggle full screen cleanly
      if ((ev.altKey && ev.key.toLowerCase() === "f") || ev.key === "F11") {
        ev.preventDefault();
        this.toggleFullScreen();
      }
    };

    const onFirstInteraction = () => {
      if (this.pos?.config?.iface_auto_fullscreen && !this._isFullScreen()) {
        this._enterFullScreen();
      }
      window.removeEventListener("pointerdown", onFirstInteraction);
    };

    const onVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        this.pos?.config?.iface_keep_screen_awake
      ) {
        this._requestWakeLock();
      }
    };

    onMounted(() => {
      window.addEventListener("resize", updateFullScreen);
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("fullscreenchange", updateFullScreen);
      document.addEventListener("webkitfullscreenchange", updateFullScreen);
      document.addEventListener("visibilitychange", onVisibilityChange);

      if (this.pos?.config?.iface_auto_fullscreen) {
        window.addEventListener("pointerdown", onFirstInteraction, {
          once: true,
        });
      }
      if (this.pos?.config?.iface_keep_screen_awake) {
        this._requestWakeLock();
      }
    });

    onWillUnmount(() => {
      window.removeEventListener("resize", updateFullScreen);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onFirstInteraction);
      document.removeEventListener("fullscreenchange", updateFullScreen);
      document.removeEventListener("webkitfullscreenchange", updateFullScreen);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      this._releaseWakeLock();
    });
  },

  get showFullScreenButton() {
    return this.pos?.config?.iface_show_fullscreen_btn !== false;
  },

  _isFullScreen() {
    return Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      window.innerHeight === window.screen.height,
    );
  },

  _enterFullScreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  },

  _exitFullScreen() {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (
      document.webkitExitFullscreen &&
      document.webkitFullscreenElement
    ) {
      document.webkitExitFullscreen();
    }
  },

  toggleFullScreen() {
    if (this._isFullScreen()) {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        this._exitFullScreen();
      } else {
        this._enterFullScreen();
      }
    } else {
      this._enterFullScreen();
    }
  },

  async _requestWakeLock() {
    if ("wakeLock" in navigator && !this._wakeLockSentinel) {
      try {
        this._wakeLockSentinel = await navigator.wakeLock.request("screen");
        this._wakeLockSentinel.addEventListener("release", () => {
          this._wakeLockSentinel = null;
        });
      } catch {
        // Wake Lock may be denied by browser policy or battery saver
      }
    }
  },

  async _releaseWakeLock() {
    if (this._wakeLockSentinel) {
      try {
        await this._wakeLockSentinel.release();
      } catch {
        // Ignore release errors
      } finally {
        this._wakeLockSentinel = null;
      }
    }
  },
});
