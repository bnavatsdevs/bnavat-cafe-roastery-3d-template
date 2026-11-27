import * as THREE from "three";
import { createSoftSpriteTexture } from "./proceduralTextures.js";

export function buildPropsAndParticles(scene, colors, profile, carafePosition) {
  const group = new THREE.Group();
  group.name = "PropsAndParticles";

  const brassMat = new THREE.MeshStandardMaterial({
    color: colors.brass,
    roughness: 0.25,
    metalness: 0.88
  });

  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0x1c1e22,
    roughness: 0.38,
    metalness: 0.65
  });

  // Warm brass pendant lamps
  const pendantCoords = [
    [-0.45, 3.1, 0.15],
    [0.95, 3.05, 0.35],
    [2.55, 3.05, -0.35]
  ];

  const cordGeo = new THREE.CylinderGeometry(0.01, 0.01, 1.4, 8);
  const shadeGeo = new THREE.ConeGeometry(0.26, 0.22, 24, 1, true);

  pendantCoords.forEach(([x, y, z]) => {
    const lamp = new THREE.Group();
    lamp.position.set(x, y, z);

    const cord = new THREE.Mesh(cordGeo, brassMat);
    cord.position.y = 0.7;
    lamp.add(cord);

    const shade = new THREE.Mesh(shadeGeo, shadeMat);
    shade.position.y = -0.05;
    lamp.add(shade);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.012, 10, 28), brassMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.16;
    lamp.add(rim);

    group.add(lamp);
  });

  const spriteTex = createSoftSpriteTexture();

  // Rising steam wisps above carafe
  const steamWisps = [];
  const steamMatBase = new THREE.SpriteMaterial({
    map: spriteTex,
    color: 0xfff7eb,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });

  for (let i = 0; i < profile.steamCount; i++) {
    const mat = steamMatBase.clone();
    const sprite = new THREE.Sprite(mat);
    const seed = i / Math.max(1, profile.steamCount);
    sprite.position.set(
      carafePosition.x + (Math.sin(i * 2.1) * 0.05),
      carafePosition.y + seed * 0.65,
      carafePosition.z + (Math.cos(i * 1.7) * 0.05)
    );
    const s = 0.14 + (i % 4) * 0.04;
    sprite.scale.set(s, s * 1.35, 1);
    group.add(sprite);
    steamWisps.push({ sprite, phase: seed, speed: 0.18 + (i % 5) * 0.03 });
  }

  // Floating golden aroma dust motes
  const count = profile.particleCount;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = ((i * 137.5) % 360) * (Math.PI / 180);
    const radius = 0.6 + ((i * 29) % 100) / 28;
    positions[i * 3] = Math.cos(angle) * radius * 0.75 + 0.8;
    positions[i * 3 + 1] = 0.75 + ((i * 17) % 100) / 42;
    positions[i * 3 + 2] = Math.sin(angle) * radius * 0.55;
    seeds[i] = (i * 0.6180339) % 1;
  }

  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const moteMat = new THREE.PointsMaterial({
    map: spriteTex,
    color: 0xffc778,
    size: 0.09,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const motes = new THREE.Points(moteGeo, moteMat);
  group.add(motes);

  scene.add(group);

  function update(elapsed, reducedMotion) {
    if (reducedMotion) return;

    for (let i = 0; i < steamWisps.length; i++) {
      const w = steamWisps[i];
      const t = (elapsed * w.speed + w.phase) % 1;
      w.sprite.position.y = carafePosition.y + t * 0.72;
      w.sprite.position.x = carafePosition.x + Math.sin(elapsed * 1.6 + w.phase * 10) * 0.06 * t;
      w.sprite.material.opacity = Math.sin(t * Math.PI) * 0.28;
      const scale = 0.12 + t * 0.22;
      w.sprite.scale.set(scale, scale * 1.4, 1);
    }

    const posAttr = moteGeo.getAttribute("position");
    for (let i = 0; i < count; i++) {
      const baseY = posAttr.getY(i);
      const driftY = baseY + Math.sin(elapsed * 0.8 + seeds[i] * 20) * 0.0008;
      posAttr.setY(i, driftY);
    }
    posAttr.needsUpdate = true;
  }

  return { group, update };
}

