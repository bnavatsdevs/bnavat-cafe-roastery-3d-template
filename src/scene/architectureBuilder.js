import * as THREE from "three";
import { createStoneTexture, createWalnutTexture } from "./proceduralTextures.js";

export function buildArchitecture(scene, colors) {
  const group = new THREE.Group();
  group.name = "ArchitectureShell";

  const stoneTex = createStoneTexture(colors.stone);
  const walnutTex = createWalnutTexture(colors.wood);

  const floorMat = new THREE.MeshStandardMaterial({
    map: stoneTex,
    roughness: 0.68,
    metalness: 0.08
  });

  const floor = new THREE.Mesh(new THREE.CircleGeometry(14, 64), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x1a1c21,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.BackSide
  });

  const curvedWall = new THREE.Mesh(
    new THREE.CylinderGeometry(11.5, 11.5, 6.2, 64, 1, true, -Math.PI * 0.65, Math.PI * 1.3),
    wallMat
  );
  curvedWall.position.set(0, 3.0, -1.2);
  group.add(curvedWall);

  const wainscotMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.52,
    metalness: 0.08,
    side: THREE.BackSide
  });

  const wainscot = new THREE.Mesh(
    new THREE.CylinderGeometry(11.42, 11.42, 1.35, 64, 1, true, -Math.PI * 0.65, Math.PI * 1.3),
    wainscotMat
  );
  wainscot.position.set(0, 0.675, -1.2);
  group.add(wainscot);

  const brassMat = new THREE.MeshStandardMaterial({
    color: colors.brass,
    roughness: 0.3,
    metalness: 0.85
  });

  const trimRing = new THREE.Mesh(
    new THREE.TorusGeometry(11.4, 0.035, 12, 80, Math.PI * 1.3),
    brassMat
  );
  trimRing.rotation.x = Math.PI / 2;
  trimRing.rotation.z = Math.PI * 0.85;
  trimRing.position.set(0, 1.36, -1.2);
  group.add(trimRing);

  const columnPositions = [
    [-4.8, 0, -2.6],
    [5.2, 0, -2.6]
  ];
  const colGeo = new THREE.BoxGeometry(0.45, 5.6, 0.45);
  columnPositions.forEach(([x, y, z]) => {
    const col = new THREE.Mesh(colGeo, wainscotMat);
    col.position.set(x, y + 2.8, z);
    col.castShadow = true;
    col.receiveShadow = true;
    group.add(col);
  });

  // Instanced bar stools along front of espresso counter
  const stoolCount = 4;
  const seatGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.07, 24);
  const legGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.68, 12);

  const seatMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.42,
    metalness: 0.1
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x1c1e22,
    roughness: 0.45,
    metalness: 0.75
  });

  const seatsInstanced = new THREE.InstancedMesh(seatGeo, seatMat, stoolCount);
  const legsInstanced = new THREE.InstancedMesh(legGeo, legMat, stoolCount);
  seatsInstanced.castShadow = true;
  seatsInstanced.receiveShadow = true;
  legsInstanced.castShadow = true;

  const dummy = new THREE.Object3D();
  for (let i = 0; i < stoolCount; i++) {
    const x = -1.35 + i * 0.72;
    const z = 1.15;

    dummy.position.set(x, 0.72, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    seatsInstanced.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, 0.34, z);
    dummy.updateMatrix();
    legsInstanced.setMatrixAt(i, dummy.matrix);
  }

  seatsInstanced.instanceMatrix.needsUpdate = true;
  legsInstanced.instanceMatrix.needsUpdate = true;
  group.add(seatsInstanced, legsInstanced);

  scene.add(group);
  return { group };
}

