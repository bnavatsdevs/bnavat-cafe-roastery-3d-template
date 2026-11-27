
import { SITE_CONFIG } from "../config.js";
import { setState, subscribe } from "./state/store.js";
import { detectDeviceProfile } from "./utils/deviceProfile.js";
import { initScene } from "./scene/sceneManager.js";
import { createPreloader } from "./ui/preloader.js";
import { renderNavbar } from "./ui/navbar.js";
import { renderHeroOverlay } from "./ui/heroOverlay.js";
import { renderHotspotDrawer } from "./ui/hotspotDrawer.js";
import { renderMenuSection } from "./ui/menuSection.js";
import { renderCraftStrip } from "./ui/craftStrip.js";
import { renderReservationSection } from "./ui/reservationSection.js";
import { renderFooterSection } from "./ui/footerSection.js";

function applyBrandCssVariables(colors) {
  const root = document.documentElement;
  if (!colors) return;
  if (colors.accent) root.style.setProperty("--color-accent", colors.accent);
  if (colors.accentHover) root.style.setProperty("--color-accent-hover", colors.accentHover);
  if (colors.wood) root.style.setProperty("--color-wood", colors.wood);
  if (colors.stone) root.style.setProperty("--color-stone", colors.stone);
  if (colors.brass) root.style.setProperty("--color-brass", colors.brass);
  if (colors.surfaceDark) root.style.setProperty("--bg-dark", colors.surfaceDark);
  if (colors.surfaceElevated) root.style.setProperty("--bg-elevated", colors.surfaceElevated);
  if (colors.surfaceLight) root.style.setProperty("--bg-light", colors.surfaceLight);
  if (colors.inkLight) root.style.setProperty("--text-light", colors.inkLight);
  if (colors.inkMuted) root.style.setProperty("--text-muted", colors.inkMuted);
  if (colors.inkDark) root.style.setProperty("--text-dark", colors.inkDark);
}

function boot() {
  document.title = `${SITE_CONFIG.brand.name} — ${SITE_CONFIG.brand.tagline}`;
  applyBrandCssVariables(SITE_CONFIG.colors);

  const profile = detectDeviceProfile();
  setState({ deviceTier: profile.tier });

  const preloader = createPreloader();
  preloader.setBrandName(SITE_CONFIG.brand.name);
  preloader.setProgress(8);

  renderNavbar(document.getElementById("navbar-root"));
  renderMenuSection(document.getElementById("menu-section-root"));
  renderCraftStrip(document.getElementById("craft-section-root"));
  renderReservationSection(document.getElementById("visit-section-root"));
  renderFooterSection(document.getElementById("footer-root"));

  const fallbackEl = document.getElementById("webgl-fallback");
  const restoreBtn = document.getElementById("restore-webgl-btn");

  subscribe((nextState) => {
    if (fallbackEl) {
      fallbackEl.classList.toggle("hidden", !nextState.webglLost);
    }
  });

  if (restoreBtn) {
    restoreBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }

  let sceneApi = null;

  const handleSelectPreset = (preset) => {
    if (sceneApi && preset) {
      sceneApi.moveToView(preset.position, preset.target);
    }
  };

  const handleSelectHotspot = (hotspotId) => {
    const spot = SITE_CONFIG.hotspots.find((h) => h.id === hotspotId);
    if (sceneApi && spot) {
      sceneApi.moveToView(spot.cameraPosition, spot.cameraTarget);
    }
  };

  renderHeroOverlay(document.getElementById("hero-overlay-root"), handleSelectPreset);
  renderHotspotDrawer(document.getElementById("hotspot-drawer-root"), handleSelectHotspot);

  const canvasContainer = document.getElementById("canvas-host");
  if (canvasContainer) {
    sceneApi = initScene({
      container: canvasContainer,
      config: SITE_CONFIG,
      profile,
      onProgress: (pct) => preloader.setProgress(pct),
      onSelectHotspot: handleSelectHotspot
    });
  }

  preloader.complete();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
