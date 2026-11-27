
import { SITE_CONFIG } from "../../config.js";
import { el } from "../utils/dom.js";

export function renderFooterSection(container) {
  if (!container) return;
  container.innerHTML = "";

  const inner = el("div", "site-footer__inner");
  const left = el("span", "", SITE_CONFIG.brand.copyright);

  const right = el("a", "location-link", `Contact · ${SITE_CONFIG.brand.email}`);
  right.href = `mailto:${SITE_CONFIG.brand.email}`;

  inner.append(left, right);
  container.appendChild(inner);
}
