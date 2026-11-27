import { SITE_CONFIG } from "../../config.js";
import { el } from "../utils/dom.js";

export function renderNavbar(container) {
  if (!container) return;
  container.innerHTML = "";

  const nav = el("header", "pill-nav");
  nav.setAttribute("role", "banner");

  const brandLink = el("a", "pill-nav__brand");
  brandLink.href = "#top";
  const dot = el("span", "pill-nav__dot");
  dot.setAttribute("aria-hidden", "true");
  const nameSpan = el("span", "", SITE_CONFIG.brand.name);
  brandLink.append(dot, nameSpan);

  const linksWrap = el("nav", "pill-nav__links");
  linksWrap.setAttribute("aria-label", "Primary navigation");

  const navItems = [
    { label: "Menu", href: "#menu-section-root" },
    { label: "Craft", href: "#craft-section-root" },
    { label: "Visit", href: "#visit-section-root" }
  ];

  navItems.forEach(({ label, href }) => {
    const a = el("a", "pill-nav__link", label);
    a.href = href;
    linksWrap.appendChild(a);
  });

  const reserveBtn = el("a", "btn btn--primary btn--sm", "Reserve Table");
  reserveBtn.href = "#visit-section-root";

  nav.append(brandLink, linksWrap, reserveBtn);
  container.appendChild(nav);
}

