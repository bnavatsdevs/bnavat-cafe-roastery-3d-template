import { SITE_CONFIG } from "../../config.js";
import { formatRupees } from "./dom.js";

function sanitizeNumber(num) {
  return String(num || "").replace(/\D/g, "");
}

export function buildReservationWhatsAppUrl({ guests, date, timeSlot, guestName }) {
  const phone = sanitizeNumber(SITE_CONFIG.brand.whatsappNumber);
  const cleanName = (guestName || "Guest").trim();
  const lines = [
    `Hello ${SITE_CONFIG.brand.name}, I would like to reserve a table.`,
    `• Name: ${cleanName}`,
    `• Guests: ${guests}`,
    `• Date: ${date}`,
    `• Time Slot: ${timeSlot}`
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone}?text=${text}`;
}

export function buildMenuOrderWhatsAppUrl(item) {
  const phone = sanitizeNumber(SITE_CONFIG.brand.whatsappNumber);
  const priceText = formatRupees(item.price, SITE_CONFIG.brand.currency);
  const lines = [
    `Hello ${SITE_CONFIG.brand.name}, I would like to order / inquire about:`,
    `• Item: ${item.name} (${item.category})`,
    `• Price: ${priceText}`
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone}?text=${text}`;
}

