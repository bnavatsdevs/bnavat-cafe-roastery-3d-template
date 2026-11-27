import { SITE_CONFIG } from "../../config.js";
import { el } from "../utils/dom.js";

export function renderCraftStrip(container) {
  if (!container) return;
  container.innerHTML = "";

  const inner = el("div", "section__inner");

  const eyebrow = el("span", "section__eyebrow", "Sensory Craft");
  const heading = el("h2", "section__title", "Built on Discipline & Warmth");
  const sub = el(
    "p",
    "section__subtitle",
    "Every cup, plate, and architectural surface follows a deliberate rhythm."
  );

  const grid = el("div", "craft-grid");
  grid.style.marginTop = "2.2rem";

  SITE_CONFIG.craft.forEach((pillar) => {
    const card = el("article", "craft-card");
    const idx = el("span", "craft-card__index", `${pillar.index} / ${pillar.title.toUpperCase()}`);
    const title = el("h3", "craft-card__title", pillar.title);
    const copy = el("p", "craft-card__copy", pillar.copy);
    card.append(idx, title, copy);
    grid.appendChild(card);
  });

  inner.append(eyebrow, heading, sub, grid);
  container.appendChild(inner);
}

