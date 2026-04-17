"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying vec2 vUv;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; ++i) {
    v += a * gnoise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 q = vec2(fbm(uv + 0.08 * uTime), fbm(uv + vec2(1.0)));
  vec2 r = vec2(
    fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.12 * uTime),
    fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.10 * uTime)
  );
  float f = fbm(uv + r);

  float t = clamp(f * f * 4.0, 0.0, 1.0);
  vec3 color = mix(uColorA, uColorB, t);
  color = mix(color, uColorC, clamp(length(q) * 0.5, 0.0, 1.0));

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function LiquidEtherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const updateSize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    };
    updateSize();

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const isDark = resolvedTheme !== "light";

    const uniforms = {
      uTime: { value: 0 },
      uColorA: {
        value: isDark ? new THREE.Color(0x0a0a1a) : new THREE.Color(0xdbeafe),
      },
      uColorB: {
        value: isDark ? new THREE.Color(0x0d1332) : new THREE.Color(0xffffff),
      },
      uColorC: {
        value: isDark ? new THREE.Color(0x1a1a3a) : new THREE.Color(0xbfdbfe),
      },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    scene.add(new THREE.Mesh(geometry, material));

    window.addEventListener("resize", updateSize);

    let animId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      animId = requestAnimationFrame(tick);
      uniforms.uTime.value = clock.getElapsedTime() * 0.25;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
