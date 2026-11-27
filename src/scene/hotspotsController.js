import * as THREE from "three";
import { getState, setState } from "../state/store.js";

export function createHotspotsController(scene, camera, domElement, hotspotsConfig, onSelectHotspot) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const markers = [];
  const pickMeshes = [];

  const coreGeo = new THREE.SphereGeometry(0.065, 20, 20);
  const ringGeo = new THREE.RingGeometry(0.1, 0.135, 28);
  const hitGeo = new THREE.SphereGeometry(0.22, 12, 12);

  const hitMat = new THREE.MeshBasicMaterial({ visible: false });

  hotspotsConfig.forEach((cfg) => {
    const markerGroup = new THREE.Group();
    markerGroup.position.set(...cfg.position);

    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff6a1a });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    markerGroup.add(coreMesh);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffb380,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    markerGroup.add(ringMesh);

    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.userData.hotspotId = cfg.id;
    markerGroup.add(hitMesh);
    pickMeshes.push(hitMesh);

    scene.add(markerGroup);
    markers.push({ id: cfg.id, markerGroup, ringMesh, coreMesh });
  });

  let pointerDownPos = { x: 0, y: 0 };

  function updatePointerNDC(event) {
    const rect = domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function handlePointerDown(event) {
    pointerDownPos = { x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event) {
    updatePointerNDC(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickMeshes, false);
    domElement.style.cursor = hits.length > 0 ? "pointer" : "grab";
  }

  function handlePointerUp(event) {
    const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
    if (dist > 6) return; // Ignore drag gestures

    updatePointerNDC(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickMeshes, false);
    if (hits.length > 0) {
      const id = hits[0].object.userData.hotspotId;
      setState({ selectedHotspotId: id });
      if (typeof onSelectHotspot === "function") {
        onSelectHotspot(id);
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && getState().selectedHotspotId !== null) {
      setState({ selectedHotspotId: null });
    }
  }

  domElement.addEventListener("pointerdown", handlePointerDown, { passive: true });
  domElement.addEventListener("pointermove", handlePointerMove, { passive: true });
  domElement.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("keydown", handleKeyDown);

  function update(elapsed, reducedMotion) {
    const activeId = getState().selectedHotspotId;

    markers.forEach((m, idx) => {
      m.ringMesh.lookAt(camera.position);
      const isSelected = m.id === activeId;
      const pulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * 3.1 + idx * 1.4) * 0.16;
      const scale = isSelected ? 1.35 : pulse;
      m.ringMesh.scale.set(scale, scale, 1);
      m.coreMesh.scale.setScalar(isSelected ? 1.25 : 1);
    });
  }

  function dispose() {
    domElement.removeEventListener("pointerdown", handlePointerDown);
    domElement.removeEventListener("pointermove", handlePointerMove);
    domElement.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("keydown", handleKeyDown);
  }

  return { update, dispose };
}

