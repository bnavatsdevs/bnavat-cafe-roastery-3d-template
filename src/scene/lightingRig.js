import * as THREE from "three";

export function buildLightingRig(scene, shadowMapSize = 1024) {
  const hemiLight = new THREE.HemisphereLight(0xffe9cc, 0x241711, 0.72);
  hemiLight.position.set(0, 8, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffefd7, 2.35);
  keyLight.position.set(4.5, 7.2, 5.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(shadowMapSize, shadowMapSize);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 22;
  const d = 6.5;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x9bb8e8, 0.85);
  rimLight.position.set(-5.5, 4.2, -3.8);
  scene.add(rimLight);

  const barPendantLight = new THREE.PointLight(0xffb469, 2.2, 7.5, 1.6);
  barPendantLight.position.set(0, 2.85, 0.25);
  barPendantLight.castShadow = false;
  scene.add(barPendantLight);

  const roasterPendantLight = new THREE.PointLight(0xff9d47, 1.8, 6.5, 1.6);
  roasterPendantLight.position.set(2.55, 2.75, -0.35);
  roasterPendantLight.castShadow = false;
  scene.add(roasterPendantLight);

  return { hemiLight, keyLight, rimLight, barPendantLight, roasterPendantLight };
}

