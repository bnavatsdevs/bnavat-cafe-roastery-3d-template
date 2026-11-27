import * as THREE from "three";
import { createStoneTexture, createWalnutTexture } from "./proceduralTextures.js";

export function buildRoastery(scene, colors) {
  const group = new THREE.Group();
  group.name = "MicroRoastery";

  const walnutTex = createWalnutTexture(colors.wood);
  const stoneTex = createStoneTexture(colors.stone);

  const benchMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.5,
    metalness: 0.08
  });

  const topMat = new THREE.MeshStandardMaterial({
    map: stoneTex,
    roughness: 0.34,
    metalness: 0.15
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: colors.brass,
    roughness: 0.25,
    metalness: 0.88
  });

  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x202328,
    roughness: 0.42,
    metalness: 0.78
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: colors.accent,
    roughness: 0.36,
    metalness: 0.35
  });

  const bench = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.86, 1.15), benchMat);
  bench.position.set(2.55, 0.43, -0.35);
  bench.castShadow = true;
  bench.receiveShadow = true;
  group.add(bench);

  const benchTop = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.07, 1.24), topMat);
  benchTop.position.set(2.55, 0.895, -0.35);
  benchTop.castShadow = true;
  benchTop.receiveShadow = true;
  group.add(benchTop);

  // Roaster chassis & rotating brass drum
  const roasterBase = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.48, 0.64), ironMat);
  roasterBase.position.set(2.55, 1.17, -0.35);
  roasterBase.castShadow = true;
  group.add(roasterBase);

  const drumPivot = new THREE.Group();
  drumPivot.position.set(2.55, 1.38, -0.35);

  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.54, 28), brassMat);
  drum.rotation.z = Math.PI / 2;
  drum.castShadow = true;
  drumPivot.add(drum);

  const drumBand = new THREE.Mesh(new THREE.TorusGeometry(0.242, 0.014, 12, 32), accentMat);
  drumBand.rotation.y = Math.PI / 2;
  drumPivot.add(drumBand);

  group.add(drumPivot);

  // Bean hopper & cooling tray
  const hopper = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.34, 24), brassMat);
  hopper.rotation.x = Math.PI;
  hopper.position.set(2.42, 1.78, -0.35);
  hopper.castShadow = true;
  group.add(hopper);

  const coolingTray = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.25, 0.09, 24), ironMat);
  coolingTray.position.set(2.96, 0.97, -0.15);
  coolingTray.castShadow = true;
  group.add(coolingTray);

  scene.add(group);
  return { group, drumPivot };
}

