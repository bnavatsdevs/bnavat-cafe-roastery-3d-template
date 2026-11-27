import * as THREE from "three";
import { buildLightingRig } from "./lightingRig.js";
import { buildArchitecture } from "./architectureBuilder.js";
import { buildEspressoBar } from "./espressoBarBuilder.js";
import { buildRoastery } from "./roasteryBuilder.js";
import { buildPropsAndParticles } from "./propsAndParticles.js";
import { createCameraRig } from "./cameraRig.js";
import { createHotspotsController } from "./hotspotsController.js";
import { setState } from "../state/store.js";

export function initScene({ container, config, profile, onProgress, onSelectHotspot }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.colors.surfaceDark);
  scene.fog = new THREE.FogExp2(config.colors.surfaceDark, 0.032);

  const width = container.clientWidth || window.innerWidth || 1280;
  const height = container.clientHeight || window.innerHeight || 720;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 45);

  const renderer = new THREE.WebGLRenderer({
    antialias: profile.tier !== "low",
    powerPreference: profile.tier === "low" ? "low-power" : "high-performance"
  });
  renderer.setPixelRatio(profile.dpr);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const report = (pct) => {
    setState({ loadingProgress: pct });
    if (typeof onProgress === "function") onProgress(pct);
  };

  report(18);
  buildLightingRig(scene, profile.shadowMapSize);

  report(38);
  buildArchitecture(scene, config.colors);

  report(58);
  const { carafePosition } = buildEspressoBar(scene, config.colors);

  report(74);
  const { drumPivot } = buildRoastery(scene, config.colors);

  report(86);
  const propsSystem = buildPropsAndParticles(scene, config.colors, profile, carafePosition);

  const initialPreset = config.cameraPresets[0];
  const cameraRig = createCameraRig(camera, renderer.domElement, initialPreset);

  const hotspotsController = createHotspotsController(
    scene,
    camera,
    renderer.domElement,
    config.hotspots,
    onSelectHotspot
  );

  function handleResize() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener("resize", handleResize);

  const handleContextLost = (e) => {
    e.preventDefault();
    setState({ webglLost: true });
  };

  const handleContextRestored = () => {
    setState({ webglLost: false });
  };

  renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);
  renderer.domElement.addEventListener("webglcontextrestored", handleContextRestored, false);

  let rafId = null;
  let isPausedByVisibility = false;
  const clock = new THREE.Clock();

  function renderFrame() {
    if (isPausedByVisibility) return;
    rafId = requestAnimationFrame(renderFrame);

    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;

    if (!profile.prefersReducedMotion && drumPivot) {
      drumPivot.rotation.x += delta * 0.9;
    }

    propsSystem.update(elapsed, profile.prefersReducedMotion);
    hotspotsController.update(elapsed, profile.prefersReducedMotion);
    cameraRig.update(delta);

    renderer.render(scene, camera);
  }

  const handleVisibility = () => {
    if (document.hidden) {
      isPausedByVisibility = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    } else {
      isPausedByVisibility = false;
      clock.getDelta();
      renderFrame();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  // Render first frame & complete loading sequence to 100%
  renderer.render(scene, camera);
  report(100);
  setState({ isReady: true });
  renderFrame();

  function dispose() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("visibilitychange", handleVisibility);
    renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
    renderer.domElement.removeEventListener("webglcontextrestored", handleContextRestored);
    hotspotsController.dispose();
    cameraRig.dispose();
    renderer.dispose();
  }

  return {
    moveToView: cameraRig.moveToView,
    dispose
  };
}

