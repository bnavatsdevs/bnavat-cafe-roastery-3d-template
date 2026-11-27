import * as THREE from "three";

export function createWalnutTexture(baseHex = "#5a3822") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 180; i++) {
    const y = (i / 180) * 512;
    const wave = Math.sin(i * 0.14) * 8;
    ctx.strokeStyle = i % 2 === 0 ? "rgba(22, 12, 6, 0.18)" : "rgba(180, 128, 86, 0.09)";
    ctx.lineWidth = 1.2 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(170, y + wave, 340, y - wave, 512, y + wave * 0.5);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  return tex;
}

export function createStoneTexture(baseHex = "#2c3138") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 512);

  const speckles = [
    { color: "rgba(247, 245, 241, 0.08)", count: 420, maxR: 2.2 },
    { color: "rgba(200, 155, 84, 0.09)", count: 140, maxR: 2.6 },
    { color: "rgba(10, 12, 15, 0.22)", count: 360, maxR: 3.0 }
  ];

  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  speckles.forEach(({ color, count, maxR }) => {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      const x = rand() * 512;
      const y = rand() * 512;
      const r = 0.5 + rand() * maxR;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}

export function createSoftSpriteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, "rgba(255, 245, 224, 0.95)");
  grad.addColorStop(0.45, "rgba(255, 232, 196, 0.35)");
  grad.addColorStop(1, "rgba(255, 232, 196, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

