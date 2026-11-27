export function detectDeviceProfile() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const width = window.innerWidth || 1280;
  const isMobileViewport = width < 768;

  let tier = "high";
  if (isMobileViewport || cores <= 4 || memory <= 2) {
    tier = "low";
  } else if (cores <= 6 || memory <= 4 || width < 1100) {
    tier = "balanced";
  }

  const maxDpr = tier === "high" ? 2 : tier === "balanced" ? 1.5 : 1.25;
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const shadowMapSize = tier === "high" ? 2048 : tier === "balanced" ? 1024 : 512;
  const particleCount = tier === "high" ? 90 : tier === "balanced" ? 55 : 28;
  const steamCount = tier === "high" ? 18 : tier === "balanced" ? 12 : 7;

  return {
    tier,
    dpr,
    shadowMapSize,
    particleCount,
    steamCount,
    prefersReducedMotion
  };
}

