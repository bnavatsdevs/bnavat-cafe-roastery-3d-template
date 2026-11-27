import { SITE_CONFIG } from "../../config.js";
import { getState, setState, subscribe } from "../state/store.js";
import { el } from "../utils/dom.js";

export function renderHotspotDrawer(container, onFocusHotspot) {
  if (!container) return;

  function draw() {
    container.innerHTML = "";
    const { selectedHotspotId } = getState();
    if (!selectedHotspotId) return;

    const spot = SITE_CONFIG.hotspots.find((h) => h.id === selectedHotspotId);
    if (!spot) return;

    const drawer = el("aside", "hotspot-drawer");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", spot.title);

    const top = el("div", "hotspot-drawer__top");
    const badge = el("span", "hotspot-drawer__badge", spot.badge);
    const closeBtn = el("button", "hotspot-drawer__close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close station details");
    closeBtn.addEventListener("click", () => {
      setState({ selectedHotspotId: null });
    });
    top.append(badge, closeBtn);

    const title = el("h2", "hotspot-drawer__title", spot.title);
    const copy = el("p", "hotspot-drawer__copy", spot.summary);

    const actions = el("div", "hotspot-drawer__actions");
    const focusBtn = el("button", "btn btn--primary btn--sm", "Focus Camera");
    focusBtn.type = "button";
    focusBtn.addEventListener("click", () => {
      if (typeof onFocusHotspot === "function") {
        onFocusHotspot(spot);
      }
    });

    const bookBtn = el("a", "btn btn--ghost btn--sm", "Book Table");
    bookBtn.href = "#visit-section-root";
    bookBtn.addEventListener("click", () => {
      setState({ selectedHotspotId: null });
    });

    actions.append(focusBtn, bookBtn);
    drawer.append(top, title, copy, actions);
    container.appendChild(drawer);
  }

  draw();
  return subscribe(draw);
}

