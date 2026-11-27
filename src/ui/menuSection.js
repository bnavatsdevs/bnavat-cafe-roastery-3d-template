import { SITE_CONFIG } from "../../config.js";
import { getState, setState, subscribe } from "../state/store.js";
import { el, formatRupees } from "../utils/dom.js";
import { buildMenuOrderWhatsAppUrl } from "../utils/whatsapp.js";

export function renderMenuSection(container) {
  if (!container) return;

  function draw() {
    container.innerHTML = "";
    const { activeMenuTab } = getState();

    const inner = el("div", "section__inner");
    const header = el("div", "menu-header");

    const titleBlock = el("div");
    const eyebrow = el("span", "section__eyebrow", "Curated Offerings");
    const heading = el("h2", "section__title", SITE_CONFIG.menu.heading);
    const sub = el("p", "section__subtitle", SITE_CONFIG.menu.subheading);
    titleBlock.append(eyebrow, heading, sub);

    const tabs = el("div", "menu-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Menu categories");

    SITE_CONFIG.menu.categories.forEach((cat) => {
      const isSelected = cat === activeMenuTab;
      const tabBtn = el(
        "button",
        `menu-tab${isSelected ? " menu-tab--active" : ""}`,
        cat
      );
      tabBtn.type = "button";
      tabBtn.setAttribute("role", "tab");
      tabBtn.setAttribute("aria-selected", String(isSelected));
      tabBtn.addEventListener("click", () => {
        setState({ activeMenuTab: cat });
      });
      tabs.appendChild(tabBtn);
    });

    header.append(titleBlock, tabs);

    const grid = el("div", "menu-grid");
    const filtered = SITE_CONFIG.menu.items.filter((item) => item.category === activeMenuTab);

    filtered.forEach((item) => {
      const card = el("article", "menu-card");

      const top = el("div", "menu-card__top");
      const meta = el("div");
      const badge = el("span", "menu-card__badge", item.tag);
      const name = el("h3", "menu-card__name", item.name);
      const desc = el("p", "menu-card__desc", item.description);
      meta.append(badge, name, desc);

      const price = el(
        "span",
        "menu-card__price",
        formatRupees(item.price, SITE_CONFIG.brand.currency)
      );

      top.append(meta, price);

      const footer = el("div", "menu-card__footer");
      const waLink = el("a", "btn btn--ghost btn--sm", "Order on WhatsApp");
      waLink.href = buildMenuOrderWhatsAppUrl(item);
      waLink.target = "_blank";
      waLink.rel = "noopener noreferrer";
      footer.appendChild(waLink);

      card.append(top, footer);
      grid.appendChild(card);
    });

    inner.append(header, grid);
    container.appendChild(inner);
  }

  draw();
  return subscribe(draw);
}

