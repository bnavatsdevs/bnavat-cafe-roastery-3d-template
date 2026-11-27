
import { SITE_CONFIG } from "../../config.js";
import { getState, setState, subscribe } from "../state/store.js";
import { el } from "../utils/dom.js";

export function renderHeroOverlay(container, onSelectPreset) {
  if (!container) return;
  container.innerHTML = "";

  const card = el("div", "hero-card");

  const eyebrow = el("p", "hero-card__eyebrow", SITE_CONFIG.hero.eyebrow);
  const title = el("h1", "hero-card__title", SITE_CONFIG.hero.headline);
  const copy = el("p", "hero-card__copy", SITE_CONFIG.hero.subline);

  const actions = el("div", "hero-card__actions");
  const primaryBtn = el("a", "btn btn--primary", SITE_CONFIG.hero.primaryCta);
  primaryBtn.href = "#visit-section-root";

  const secondaryBtn = el("a", "btn btn--ghost", SITE_CONFIG.hero.secondaryCta);
  secondaryBtn.href = "#menu-section-root";

  actions.append(primaryBtn, secondaryBtn);
  card.append(eyebrow, title, copy, actions);

  const bottomBar = el("div", "hero-bottom-bar");
  const dock = el("div", "preset-dock");
  dock.setAttribute("role", "group");
  dock.setAttribute("aria-label", "Camera angles");

  const presetButtons = new Map();

  SITE_CONFIG.cameraPresets.forEach((preset) => {
    const btn = el("button", "preset-pill", preset.label);
    btn.type = "button";
    btn.addEventListener("click", () => {
      setState({ activePresetId: preset.id, selectedHotspotId: null });
      if (typeof onSelectPreset === "function") {
        onSelectPreset(preset);
      }
    });
    dock.appendChild(btn);
    presetButtons.set(preset.id, btn);
  });

  const hint = el("p", "hero-hint", "Drag to orbit · Scroll page to explore");

  bottomBar.append(dock, hint);
  container.append(card, bottomBar);

  function syncActivePreset(activeId) {
    presetButtons.forEach((btn, id) => {
      btn.classList.toggle("preset-pill--active", id === activeId);
    });
  }

  syncActivePreset(getState().activePresetId);
  return subscribe((nextState) => syncActivePreset(nextState.activePresetId));
}
