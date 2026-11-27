import { SITE_CONFIG } from "../../config.js";

const listeners = new Set();

const state = {
  activeMenuTab: SITE_CONFIG.menu.categories[0] || "Specialty Coffee",
  activePresetId: SITE_CONFIG.cameraPresets[0]?.id || "espresso",
  selectedHotspotId: null,
  webglLost: false,
  deviceTier: "balanced",
  loadingProgress: 0,
  isReady: false
};

export function getState() {
  return { ...state };
}

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(getState()));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

