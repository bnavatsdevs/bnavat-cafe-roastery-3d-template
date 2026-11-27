import * as THREE from "three";
import { createStoneTexture, createWalnutTexture } from "./proceduralTextures.js";

function createCeramicCarafeGeometry() {
  const points = [
    new THREE.Vector2(0.001, 0.0),
    new THREE.Vector2(0.11, 0.0),
    new THREE.Vector2(0.14, 0.09),
    new THREE.Vector2(0.12, 0.19),
    new THREE.Vector2(0.075, 0.26),
    new THREE.Vector2(0.09, 0.31),
    new THREE.Vector2(0.082, 0.31),
    new THREE.Vector2(0.068, 0.25)
  ];
  const geo = new THREE.LatheGeometry(points, 32);
  geo.computeVertexNormals();
  return geo;
}

function createCeramicCupGeometry() {
  const points = [
    new THREE.Vector2(0.001, 0.0),
    new THREE.Vector2(0.062, 0.0),
    new THREE.Vector2(0.082, 0.06),
    new THREE.Vector2(0.088, 0.12),
    new THREE.Vector2(0.08, 0.12),
    new THREE.Vector2(0.073, 0.055)
  ];
  const geo = new THREE.LatheGeometry(points, 28);
  geo.computeVertexNormals();
  return geo;
}

export function buildEspressoBar(scene, colors) {
  const group = new THREE.Group();
  group.name = "EspressoBar";

  const walnutTex = createWalnutTexture(colors.wood);
  const stoneTex = createStoneTexture(colors.stone);

  const counterBaseMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.48,
    metalness: 0.08
  });

  const counterTopMat = new THREE.MeshStandardMaterial({
    map: stoneTex,
    roughness: 0.28,
    metalness: 0.15
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xd8dde3,
    roughness: 0.22,
    metalness: 0.9
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: colors.brass,
    roughness: 0.28,
    metalness: 0.86
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x1b1d21,
    roughness: 0.45,
    metalness: 0.72
  });

  // Main counter body & beveled stone slab
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.92, 1.05), counterBaseMat);
  baseMesh.position.set(-0.15, 0.46, 0.15);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);

  const topSlab = new THREE.Mesh(new THREE.BoxGeometry(3.54, 0.08, 1.18), counterTopMat);
  topSlab.position.set(-0.15, 0.96, 0.15);
  topSlab.castShadow = true;
  topSlab.receiveShadow = true;
  group.add(topSlab);

  // Dual-group espresso machine
  const machineGroup = new THREE.Group();
  machineGroup.position.set(-0.45, 1.0, 0.12);

  const machineBody = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.44, 0.52), steelMat);
  machineBody.position.set(0, 0.34, 0);
  machineBody.castShadow = true;
  machineGroup.add(machineBody);

  const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.05, 0.54), brassMat);
  topRail.position.set(0, 0.58, 0);
  machineGroup.add(topRail);

  const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.03, 20), brassMat);
  gauge.rotation.x = Math.PI / 2;
  gauge.position.set(0, 0.43, 0.275);
  machineGroup.add(gauge);

  [-0.24, 0.24].forEach((gx) => {
    const groupHead = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 20), steelMat);
    groupHead.position.set(gx, 0.22, 0.16);
    machineGroup.add(groupHead);

    const portafilter = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.042, 0.035, 20), brassMat);
    portafilter.position.set(gx, 0.17, 0.16);
    machineGroup.add(portafilter);

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.19, 14), darkMetalMat);
    handle.rotation.x = Math.PI / 2;
    handle.position.set(gx, 0.17, 0.27);
    machineGroup.add(handle);
  });

  group.add(machineGroup);

  // Ceramic pour-over carafe & tasting cup (LatheGeometry)
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf4f0e8,
    roughness: 0.24,
    metalness: 0.04
  });

  const carafe = new THREE.Mesh(createCeramicCarafeGeometry(), ceramicMat);
  carafe.position.set(0.95, 1.0, 0.45);
  carafe.castShadow = true;
  carafe.receiveShadow = true;
  group.add(carafe);

  const cup = new THREE.Mesh(createCeramicCupGeometry(), ceramicMat);
  cup.position.set(1.22, 1.0, 0.52);
  cup.castShadow = true;
  group.add(cup);

  scene.add(group);
  return { group, carafePosition: new THREE.Vector3(0.95, 1.32, 0.45) };
}

