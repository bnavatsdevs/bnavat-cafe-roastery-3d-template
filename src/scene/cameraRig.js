import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createCameraRig(camera, domElement, initialPreset) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.enablePan = false;

  // Strict polar & distance clamps so camera never clips below floor or outside room
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = Math.PI * 0.475;
  controls.minDistance = 2.0;
  controls.maxDistance = 9.2;

  const desiredPos = new THREE.Vector3(...initialPreset.position);
  const desiredTarget = new THREE.Vector3(...initialPreset.target);
  let isTransitioning = false;

  camera.position.copy(desiredPos);
  controls.target.copy(desiredTarget);
  controls.update();

  // Yield immediately to manual pointer/wheel interaction
  const cancelTransition = () => {
    isTransitioning = false;
  };
  domElement.addEventListener("pointerdown", cancelTransition, { passive: true });
  domElement.addEventListener("wheel", cancelTransition, { passive: true });

  function moveToView(positionArr, targetArr) {
    desiredPos.set(...positionArr);
    desiredTarget.set(...targetArr);
    isTransitioning = true;
  }

  function update(delta) {
    if (isTransitioning) {
      const alpha = 1 - Math.exp(-5.5 * Math.min(delta, 0.05));
      camera.position.lerp(desiredPos, alpha);
      controls.target.lerp(desiredTarget, alpha);

      if (
        camera.position.distanceTo(desiredPos) < 0.015 &&
        controls.target.distanceTo(desiredTarget) < 0.015
      ) {
        camera.position.copy(desiredPos);
        controls.target.copy(desiredTarget);
        isTransitioning = false;
      }
    }

    // Clamp camera height & radius inside curved architectural boundary
    camera.position.y = Math.max(0.45, Math.min(4.6, camera.position.y));
    const radialDist = Math.hypot(camera.position.x, camera.position.z + 1.2);
    if (radialDist > 10.2) {
      const scale = 10.2 / radialDist;
      camera.position.x *= scale;
      camera.position.z = (camera.position.z + 1.2) * scale - 1.2;
    }

    controls.update();
  }

  function dispose() {
    domElement.removeEventListener("pointerdown", cancelTransition);
    domElement.removeEventListener("wheel", cancelTransition);
    controls.dispose();
  }

  return { controls, moveToView, update, dispose };
}

