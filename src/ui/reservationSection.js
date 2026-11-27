
import { SITE_CONFIG } from "../../config.js";
import { el, getTodayIsoDate } from "../utils/dom.js";
import { buildReservationWhatsAppUrl } from "../utils/whatsapp.js";

export function renderReservationSection(container) {
  if (!container) return;
  container.innerHTML = "";

  const inner = el("div", "section__inner");

  const eyebrow = el("span", "section__eyebrow", "Instant Booking");
  const heading = el("h2", "section__title", SITE_CONFIG.location.heading);
  const sub = el("p", "section__subtitle", SITE_CONFIG.location.subheading);

  const grid = el("div", "visit-grid");

  // WhatsApp Reservation Form
  const form = el("form", "booking-form");
  form.setAttribute("aria-label", "WhatsApp Table Reservation Builder");

  const formGrid = el("div", "form-grid");

  const guestsField = el("div", "field");
  const guestsLabel = el("label", "field__label", "Guests");
  guestsLabel.htmlFor = "res-guests";
  const guestsSelect = el("select", "field__input");
  guestsSelect.id = "res-guests";
  [1, 2, 3, 4, 5, 6, 8].forEach((n) => {
    const opt = el("option", "", `${n} ${n === 1 ? "Guest" : "Guests"}`);
    opt.value = String(n);
    if (n === 2) opt.selected = true;
    guestsSelect.appendChild(opt);
  });
  guestsField.append(guestsLabel, guestsSelect);

  const dateField = el("div", "field");
  const dateLabel = el("label", "field__label", "Date");
  dateLabel.htmlFor = "res-date";
  const dateInput = el("input", "field__input");
  dateInput.id = "res-date";
  dateInput.type = "date";
  dateInput.value = getTodayIsoDate();
  dateInput.min = getTodayIsoDate();
  dateField.append(dateLabel, dateInput);

  const timeField = el("div", "field");
  const timeLabel = el("label", "field__label", "Time Slot");
  timeLabel.htmlFor = "res-time";
  const timeSelect = el("select", "field__input");
  timeSelect.id = "res-time";
  SITE_CONFIG.hero.timeSlots.forEach((slot) => {
    const opt = el("option", "", slot);
    opt.value = slot;
    timeSelect.appendChild(opt);
  });
  timeField.append(timeLabel, timeSelect);

  const nameField = el("div", "field");
  const nameLabel = el("label", "field__label", "Your Name");
  nameLabel.htmlFor = "res-name";
  const nameInput = el("input", "field__input");
  nameInput.id = "res-name";
  nameInput.type = "text";
  nameInput.placeholder = "Aarav Sharma";
  nameInput.required = true;
  nameField.append(nameLabel, nameInput);

  formGrid.append(guestsField, dateField, timeField, nameField);

  const submitBtn = el("button", "btn btn--primary", "Reserve on WhatsApp");
  submitBtn.type = "submit";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = buildReservationWhatsAppUrl({
      guests: guestsSelect.value,
      date: dateInput.value || getTodayIsoDate(),
      timeSlot: timeSelect.value,
      guestName: nameInput.value
    });
    window.open(url, "_blank", "noopener,noreferrer");
  });

  form.append(formGrid, submitBtn);

  // Location Card
  const locCard = el("aside", "location-card");
  const locTitle = el("h3", "location-card__title", SITE_CONFIG.brand.name);

  const addrRow = el("p", "location-row");
  addrRow.append(el("strong", "", "Address"), document.createTextNode(SITE_CONFIG.location.address));

  const hoursRow = el("p", "location-row");
  hoursRow.append(el("strong", "", "Hours"), document.createTextNode(SITE_CONFIG.location.hours));

  const phoneRow = el("p", "location-row");
  phoneRow.append(el("strong", "", "Phone / Concierge"));
  const phoneLink = el("a", "location-link", SITE_CONFIG.brand.phoneDisplay);
  phoneLink.href = SITE_CONFIG.brand.phoneHref;
  phoneRow.appendChild(phoneLink);

  const locActions = el("div", "location-card__actions");
  const mapsBtn = el("a", "btn btn--ghost btn--sm", "Open in Google Maps");
  mapsBtn.href = SITE_CONFIG.location.googleMapsUrl;
  mapsBtn.target = "_blank";
  mapsBtn.rel = "noopener noreferrer";

  const callBtn = el("a", "btn btn--ghost btn--sm", "Call Now");
  callBtn.href = SITE_CONFIG.brand.phoneHref;

  locActions.append(mapsBtn, callBtn);
  locCard.append(locTitle, addrRow, hoursRow, phoneRow, locActions);

  grid.append(form, locCard);
  inner.append(eyebrow, heading, sub, grid);
  container.appendChild(inner);
}
