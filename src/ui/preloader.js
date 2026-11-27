export function createPreloader() {
  const root = document.getElementById("preloader");
  const bar = document.getElementById("preloader-bar");
  const label = document.getElementById("preloader-percent");
  const brandLabel = document.getElementById("preloader-brand");

  function setBrandName(name) {
    if (brandLabel && name) brandLabel.textContent = name;
  }

  function setProgress(pct) {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (bar) bar.style.width = `${clamped}%`;
    if (label) label.textContent = `${clamped}%`;
  }

  function complete() {
    setProgress(100);
    if (!root) return;
    window.setTimeout(() => {
      root.classList.add("preloader--done");
    }, 220);
  }

  return { setBrandName, setProgress, complete };
}

