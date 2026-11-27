export function el(tag, className = "", textContent = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent) node.textContent = textContent;
  return node;
}

export function getTodayIsoDate() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - offsetMs);
  return local.toISOString().slice(0, 10);
}

export function formatRupees(amount, currency = "₹") {
  const formatted = Number(amount || 0).toLocaleString("en-IN");
  return `${currency}${formatted}`;
}

