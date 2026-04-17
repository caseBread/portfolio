"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

// ── Config ────────────────────────────────────────────────────────────────────
const config = {
  // Interaction
  mouseForce: 50, // Strength of mouse/touch interaction
  cursorSize: 200, // Size of the interaction area

  // Physics
  isViscous: false, // Enable viscosity simulation
  viscous: 30, // Viscosity strength
  iterationsViscous: 32, // Viscosity calculation iterations
  iterationsPoisson: 32, // Pressure calculation iterations
  dt: 0.014, // Time step for simulation
  BFECC: true, // Back and Forth Error Compensation (smoother results)
  resolution: 0.5, // Simulation resolution (0.1 – 1.0)
  isBounce: false, // Bounce off boundaries

  // Appearance — colors are overridden per theme in the component
  colorsDark: ["#0a1628", "#1a56db", "#3b8bd4"],
  colorsLight: ["#f0f9ff", "#93c5fd", "#bfdbfe"],

  // Auto Demo
  autoDemo: true, // Enable auto-animation
  autoSpeed: 0.5, // Auto-animation movement speed
  autoIntensity: 2.2, // Auto-animation force multiplier
  takeoverDuration: 0.25, // Smooth transition duration (seconds)
  autoResumeDelay: 1000, // Delay before auto-animation resumes (ms)
  autoRampDuration: 0.6, // Fade-in duration for auto-animation
};
// ─────────────────────────────────────────────────────────────────────────────

export default function LiquidEtherBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = resolvedTheme !== "light";
    const colors = isDark ? config.colorsDark : config.colorsLight;

    // ── Shaders ─────────────────────────────────────────────────────────────
    const face_vert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `;
    const line_vert = `
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main(){
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px * 1.0;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `;
    const mouse_vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;
    const advection_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spot_new = uv;
          vec2 vel_old = texture2D(velocity, uv).xy;
          vec2 spot_old = spot_new - vel_old * dt * ratio;
          vec2 vel_new1 = texture2D(velocity, spot_old).xy;
          vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
          vec2 error = spot_new2 - spot_new;
          vec2 spot_new3 = spot_new - error / 2.0;
          vec2 vel_2 = texture2D(velocity, spot_new3).xy;
          vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spot_old2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `;
    const color_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `;
    const divergence_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `;
    const externalForce_frag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `;
    const poisson_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `;
    const pressure_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `;
    const viscous_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        vec2 old = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
        newv /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newv, 0.0, 0.0);
      }
    `;

    // ── Palette texture ──────────────────────────────────────────────────────
    function makePaletteTexture(stops: string[]) {
      const arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = isDark
      ? new THREE.Vector4(0, 0, 0, 0)
      : new THREE.Vector4(1, 1, 1, 0);

    // ── Common ───────────────────────────────────────────────────────────────
    const Common = {
      width: 0,
      height: 0,
      aspect: 1,
      pixelRatio: 1,
      time: 0,
      delta: 0,
      renderer: null as THREE.WebGLRenderer | null,
      clock: null as THREE.Timer | null,
      init(el: HTMLElement) {
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize(el);
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.height = "100%";
        this.renderer.domElement.style.display = "block";
        this.clock = new THREE.Timer();
      },
      resize(el: HTMLElement) {
        const rect = el.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer)
          this.renderer.setSize(this.width, this.height, false);
      },
      update() {
        this.clock!.update();
        this.delta = this.clock!.getDelta();
        this.time += this.delta;
      },
    };

    // ── Mouse ────────────────────────────────────────────────────────────────
    const Mouse = {
      mouseMoved: false,
      coords: new THREE.Vector2(),
      coords_old: new THREE.Vector2(),
      diff: new THREE.Vector2(),
      isHoverInside: false,
      hasUserControl: false,
      isAutoActive: false,
      autoIntensity: 2.0,
      takeoverActive: false,
      takeoverStartTime: 0,
      takeoverDuration: 0.25,
      takeoverFrom: new THREE.Vector2(),
      takeoverTo: new THREE.Vector2(),
      onInteract: null as (() => void) | null,
      _container: null as HTMLElement | null,
      _timer: null as ReturnType<typeof setTimeout> | null,

      init(el: HTMLElement) {
        this._container = el;
        window.addEventListener("mousemove", this._onMouseMove);
        window.addEventListener("touchstart", this._onTouchStart, {
          passive: true,
        });
        window.addEventListener("touchmove", this._onTouchMove, {
          passive: true,
        });
        window.addEventListener("touchend", this._onTouchEnd);
        document.addEventListener("mouseleave", this._onDocLeave);
      },
      dispose() {
        window.removeEventListener("mousemove", this._onMouseMove);
        window.removeEventListener("touchstart", this._onTouchStart);
        window.removeEventListener("touchmove", this._onTouchMove);
        window.removeEventListener("touchend", this._onTouchEnd);
        document.removeEventListener("mouseleave", this._onDocLeave);
        this._container = null;
      },
      isPointInside(cx: number, cy: number) {
        if (!this._container) return false;
        const r = this._container.getBoundingClientRect();
        return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
      },
      setCoords(x: number, y: number) {
        if (!this._container) return;
        if (this._timer) clearTimeout(this._timer);
        const r = this._container.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const nx = (x - r.left) / r.width;
        const ny = (y - r.top) / r.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this._timer = setTimeout(() => {
          this.mouseMoved = false;
        }, 100);
      },
      setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
      },
      _onMouseMove: null as unknown as (e: MouseEvent) => void,
      _onTouchStart: null as unknown as (e: TouchEvent) => void,
      _onTouchMove: null as unknown as (e: TouchEvent) => void,
      _onTouchEnd: null as unknown as () => void,
      _onDocLeave: null as unknown as () => void,
      update() {
        if (this.takeoverActive) {
          const t =
            (performance.now() - this.takeoverStartTime) /
            (this.takeoverDuration * 1000);
          if (t >= 1) {
            this.takeoverActive = false;
            this.coords.copy(this.takeoverTo);
            this.coords_old.copy(this.coords);
            this.diff.set(0, 0);
          } else {
            const k = t * t * (3 - 2 * t);
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
          }
        }
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0)
          this.diff.set(0, 0);
        if (this.isAutoActive && !this.takeoverActive)
          this.diff.multiplyScalar(this.autoIntensity);
      },
    };

    Mouse._onMouseMove = (e: MouseEvent) => {
      const inside = Mouse.isPointInside(e.clientX, e.clientY);
      Mouse.isHoverInside = inside;
      if (!inside) return;
      if (Mouse.onInteract) Mouse.onInteract();
      if (
        Mouse.isAutoActive &&
        !Mouse.hasUserControl &&
        !Mouse.takeoverActive
      ) {
        const r = Mouse._container!.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        Mouse.takeoverFrom.copy(Mouse.coords);
        Mouse.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
        Mouse.takeoverStartTime = performance.now();
        Mouse.takeoverActive = true;
        Mouse.hasUserControl = true;
        Mouse.isAutoActive = false;
        return;
      }
      Mouse.setCoords(e.clientX, e.clientY);
      Mouse.hasUserControl = true;
    };
    Mouse._onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      Mouse.isHoverInside = Mouse.isPointInside(t.clientX, t.clientY);
      if (!Mouse.isHoverInside) return;
      if (Mouse.onInteract) Mouse.onInteract();
      Mouse.setCoords(t.clientX, t.clientY);
      Mouse.hasUserControl = true;
    };
    Mouse._onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      Mouse.isHoverInside = Mouse.isPointInside(t.clientX, t.clientY);
      if (!Mouse.isHoverInside) return;
      if (Mouse.onInteract) Mouse.onInteract();
      Mouse.setCoords(t.clientX, t.clientY);
    };
    Mouse._onTouchEnd = () => {
      Mouse.isHoverInside = false;
    };
    Mouse._onDocLeave = () => {
      Mouse.isHoverInside = false;
    };

    // ── AutoDriver ───────────────────────────────────────────────────────────
    class AutoDriver {
      mouse = Mouse;
      enabled: boolean;
      speed: number;
      resumeDelay: number;
      rampDurationMs: number;
      active = false;
      current = new THREE.Vector2(0, 0);
      target = new THREE.Vector2();
      lastTime = performance.now();
      activationTime = 0;
      margin = 0.2;
      _tmpDir = new THREE.Vector2();
      lastUserInteraction: number;

      constructor(opts: {
        enabled: boolean;
        speed: number;
        resumeDelay: number;
        rampDuration: number;
      }) {
        this.enabled = opts.enabled;
        this.speed = opts.speed;
        this.resumeDelay = opts.resumeDelay;
        this.rampDurationMs = opts.rampDuration * 1000;
        this.lastUserInteraction = performance.now();
        this.pickNewTarget();
      }
      pickNewTarget() {
        this.target.set(
          (Math.random() * 2 - 1) * (1 - this.margin),
          (Math.random() * 2 - 1) * (1 - this.margin),
        );
      }
      forceStop() {
        this.active = false;
        this.mouse.isAutoActive = false;
      }
      update() {
        if (!this.enabled) return;
        const now = performance.now();
        const idle = now - this.lastUserInteraction;
        if (idle < this.resumeDelay) {
          if (this.active) this.forceStop();
          return;
        }
        if (this.mouse.isHoverInside) {
          if (this.active) this.forceStop();
          return;
        }
        if (!this.active) {
          this.active = true;
          this.current.copy(this.mouse.coords);
          this.lastTime = now;
          this.activationTime = now;
        }
        this.mouse.isAutoActive = true;
        let dtSec = (now - this.lastTime) / 1000;
        this.lastTime = now;
        if (dtSec > 0.2) dtSec = 0.016;
        const dir = this._tmpDir.subVectors(this.target, this.current);
        const dist = dir.length();
        if (dist < 0.01) {
          this.pickNewTarget();
          return;
        }
        dir.normalize();
        let ramp = 1;
        if (this.rampDurationMs > 0) {
          const t = Math.min(
            1,
            (now - this.activationTime) / this.rampDurationMs,
          );
          ramp = t * t * (3 - 2 * t);
        }
        const move = Math.min(this.speed * dtSec * ramp, dist);
        this.current.addScaledVector(dir, move);
        this.mouse.setNormalized(this.current.x, this.current.y);
      }
    }

    // ── ShaderPass ───────────────────────────────────────────────────────────
    type FBO = THREE.WebGLRenderTarget;
    interface PassProps {
      material?: {
        vertexShader: string;
        fragmentShader: string;
        uniforms: Record<string, { value: unknown }>;
        blending?: THREE.Blending;
        depthWrite?: boolean;
        transparent?: boolean;
      };
      output?: FBO | null;
      output0?: FBO;
      output1?: FBO;
    }

    class ShaderPass {
      props: PassProps;
      uniforms: Record<string, { value: unknown }> | undefined;
      scene!: THREE.Scene;
      camera!: THREE.Camera;
      material: THREE.RawShaderMaterial | null = null;
      geometry: THREE.PlaneGeometry | null = null;
      plane: THREE.Mesh | null = null;

      constructor(props: PassProps) {
        this.props = props;
        this.uniforms = props.material?.uniforms;
      }
      init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        if (this.uniforms) {
          this.material = new THREE.RawShaderMaterial(
            this.props.material as THREE.ShaderMaterialParameters,
          );
          this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
          this.plane = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.plane);
        }
      }
      _render() {
        Common.renderer!.setRenderTarget(this.props.output ?? null);
        Common.renderer!.render(this.scene, this.camera);
        Common.renderer!.setRenderTarget(null);
      }
    }

    // ── Advection ────────────────────────────────────────────────────────────
    class Advection extends ShaderPass {
      line!: THREE.LineSegments;
      constructor(simProps: {
        cellScale: THREE.Vector2;
        fboSize: THREE.Vector2;
        dt: number;
        src: FBO;
        dst: FBO;
      }) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: advection_frag,
            uniforms: {
              boundarySpace: { value: simProps.cellScale },
              px: { value: simProps.cellScale },
              fboSize: { value: simProps.fboSize },
              velocity: { value: simProps.src.texture },
              dt: { value: simProps.dt },
              isBFECC: { value: true },
            },
          },
          output: simProps.dst,
        });
        this.uniforms = this.props.material!.uniforms;
        this.init();
      }
      init() {
        super.init();
        const geo = new THREE.BufferGeometry();
        geo.setAttribute(
          "position",
          new THREE.BufferAttribute(
            new Float32Array([
              -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1,
              0, -1, -1, 0,
            ]),
            3,
          ),
        );
        const mat = new THREE.RawShaderMaterial({
          vertexShader: line_vert,
          fragmentShader: advection_frag,
          uniforms: this.uniforms,
        });
        this.line = new THREE.LineSegments(geo, mat);
        this.scene.add(this.line);
      }
      update({
        dt,
        isBounce,
        BFECC,
      }: {
        dt: number;
        isBounce: boolean;
        BFECC: boolean;
      }) {
        this.uniforms!.dt.value = dt;
        this.line.visible = isBounce;
        this.uniforms!.isBFECC.value = BFECC;
        super._render();
      }
    }

    // ── ExternalForce ────────────────────────────────────────────────────────
    class ExternalForce extends ShaderPass {
      mouse!: THREE.Mesh;
      constructor(simProps: {
        cellScale: THREE.Vector2;
        cursor_size: number;
        dst: FBO;
      }) {
        super({ output: simProps.dst });
        super.init();
        const geo = new THREE.PlaneGeometry(1, 1);
        const mat = new THREE.RawShaderMaterial({
          vertexShader: mouse_vert,
          fragmentShader: externalForce_frag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simProps.cellScale },
            force: { value: new THREE.Vector2(0, 0) },
            center: { value: new THREE.Vector2(0, 0) },
            scale: {
              value: new THREE.Vector2(
                simProps.cursor_size,
                simProps.cursor_size,
              ),
            },
          },
        });
        this.mouse = new THREE.Mesh(geo, mat);
        this.scene.add(this.mouse);
      }
      update(props: {
        cursor_size: number;
        mouse_force: number;
        cellScale: THREE.Vector2;
      }) {
        const fx = (Mouse.diff.x / 2) * props.mouse_force;
        const fy = (Mouse.diff.y / 2) * props.mouse_force;
        const csx = props.cursor_size * props.cellScale.x;
        const csy = props.cursor_size * props.cellScale.y;
        const cx = Math.min(
          Math.max(Mouse.coords.x, -1 + csx + props.cellScale.x * 2),
          1 - csx - props.cellScale.x * 2,
        );
        const cy = Math.min(
          Math.max(Mouse.coords.y, -1 + csy + props.cellScale.y * 2),
          1 - csy - props.cellScale.y * 2,
        );
        const u = (this.mouse.material as THREE.RawShaderMaterial).uniforms;
        u.force.value.set(fx, fy);
        u.center.value.set(cx, cy);
        u.scale.value.set(props.cursor_size, props.cursor_size);
        super._render();
      }
    }

    // ── Viscous ──────────────────────────────────────────────────────────────
    class Viscous extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        viscous: number;
        src: FBO;
        dst: FBO;
        dst_: FBO;
        dt: number;
      }) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: viscous_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              velocity_new: { value: simProps.dst_.texture },
              v: { value: simProps.viscous },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
          output0: simProps.dst_,
          output1: simProps.dst,
        });
        this.init();
      }
      update({
        viscous,
        iterations,
        dt,
      }: {
        viscous: number;
        iterations: number;
        dt: number;
      }) {
        this.uniforms!.v.value = viscous;
        let fbo_out: FBO = this.props.output0!;
        for (let i = 0; i < iterations; i++) {
          const fbo_in =
            i % 2 === 0 ? this.props.output0! : this.props.output1!;
          fbo_out = i % 2 === 0 ? this.props.output1! : this.props.output0!;
          this.uniforms!.velocity_new.value = fbo_in.texture;
          this.props.output = fbo_out;
          this.uniforms!.dt.value = dt;
          super._render();
        }
        return fbo_out;
      }
    }

    // ── Divergence ───────────────────────────────────────────────────────────
    class Divergence extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        src: FBO;
        dst: FBO;
        dt: number;
      }) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: divergence_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }
      update({ vel }: { vel: FBO }) {
        this.uniforms!.velocity.value = vel.texture;
        super._render();
      }
    }

    // ── Poisson ──────────────────────────────────────────────────────────────
    class Poisson extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        src: FBO;
        dst: FBO;
        dst_: FBO;
      }) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: poisson_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.dst_.texture },
              divergence: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
            },
          },
          output: simProps.dst,
          output0: simProps.dst_,
          output1: simProps.dst,
        });
        this.init();
      }
      update({ iterations }: { iterations: number }) {
        let p_out: FBO = this.props.output0!;
        for (let i = 0; i < iterations; i++) {
          const p_in = i % 2 === 0 ? this.props.output0! : this.props.output1!;
          p_out = i % 2 === 0 ? this.props.output1! : this.props.output0!;
          this.uniforms!.pressure.value = p_in.texture;
          this.props.output = p_out;
          super._render();
        }
        return p_out;
      }
    }

    // ── Pressure ─────────────────────────────────────────────────────────────
    class Pressure extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        src_p: FBO;
        src_v: FBO;
        dst: FBO;
        dt: number;
      }) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: pressure_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.src_p.texture },
              velocity: { value: simProps.src_v.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }
      update({ vel, pressure }: { vel: FBO; pressure: FBO }) {
        this.uniforms!.velocity.value = vel.texture;
        this.uniforms!.pressure.value = pressure.texture;
        super._render();
      }
    }

    // ── Simulation ───────────────────────────────────────────────────────────
    class Simulation {
      options: {
        iterations_poisson: number;
        iterations_viscous: number;
        mouse_force: number;
        resolution: number;
        cursor_size: number;
        viscous: number;
        isBounce: boolean;
        dt: number;
        isViscous: boolean;
        BFECC: boolean;
      };
      fbos: Record<string, FBO> = {};
      fboSize = new THREE.Vector2();
      cellScale = new THREE.Vector2();
      boundarySpace = new THREE.Vector2();
      advection!: Advection;
      externalForce!: ExternalForce;
      viscous!: Viscous;
      divergence!: Divergence;
      poisson!: Poisson;
      pressure!: Pressure;

      constructor(opts: Partial<Simulation["options"]>) {
        this.options = {
          iterations_poisson: 32,
          iterations_viscous: 32,
          mouse_force: 20,
          resolution: 0.5,
          cursor_size: 100,
          viscous: 30,
          isBounce: false,
          dt: 0.014,
          isViscous: false,
          BFECC: true,
          ...opts,
        };
        this.calcSize();
        this.createAllFBO();
        this.createShaderPass();
      }
      getFloatType() {
        return /iPad|iPhone|iPod/i.test(navigator.userAgent)
          ? THREE.HalfFloatType
          : THREE.FloatType;
      }
      createAllFBO() {
        const type = this.getFloatType();
        const opts = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        };
        for (const key of [
          "vel_0",
          "vel_1",
          "vel_viscous0",
          "vel_viscous1",
          "div",
          "pressure_0",
          "pressure_1",
        ]) {
          this.fbos[key] = new THREE.WebGLRenderTarget(
            this.fboSize.x,
            this.fboSize.y,
            opts as THREE.RenderTargetOptions,
          );
        }
      }
      createShaderPass() {
        this.advection = new Advection({
          cellScale: this.cellScale,
          fboSize: this.fboSize,
          dt: this.options.dt,
          src: this.fbos.vel_0,
          dst: this.fbos.vel_1,
        });
        this.externalForce = new ExternalForce({
          cellScale: this.cellScale,
          cursor_size: this.options.cursor_size,
          dst: this.fbos.vel_1,
        });
        this.viscous = new Viscous({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          viscous: this.options.viscous,
          src: this.fbos.vel_1,
          dst: this.fbos.vel_viscous1,
          dst_: this.fbos.vel_viscous0,
          dt: this.options.dt,
        });
        this.divergence = new Divergence({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.vel_viscous0,
          dst: this.fbos.div,
          dt: this.options.dt,
        });
        this.poisson = new Poisson({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.div,
          dst: this.fbos.pressure_1,
          dst_: this.fbos.pressure_0,
        });
        this.pressure = new Pressure({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src_p: this.fbos.pressure_0,
          src_v: this.fbos.vel_viscous0,
          dst: this.fbos.vel_0,
          dt: this.options.dt,
        });
      }
      calcSize() {
        const w = Math.max(
          1,
          Math.round(this.options.resolution * Common.width),
        );
        const h = Math.max(
          1,
          Math.round(this.options.resolution * Common.height),
        );
        this.cellScale.set(1 / w, 1 / h);
        this.fboSize.set(w, h);
      }
      resize() {
        this.calcSize();
        for (const key in this.fbos)
          this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
      }
      update() {
        if (this.options.isBounce) {
          this.boundarySpace.set(0, 0);
        } else {
          this.boundarySpace.copy(this.cellScale);
        }
        this.advection.update({
          dt: this.options.dt,
          isBounce: this.options.isBounce,
          BFECC: this.options.BFECC,
        });
        this.externalForce.update({
          cursor_size: this.options.cursor_size,
          mouse_force: this.options.mouse_force,
          cellScale: this.cellScale,
        });
        let vel: FBO = this.fbos.vel_1;
        if (this.options.isViscous)
          vel = this.viscous.update({
            viscous: this.options.viscous,
            iterations: this.options.iterations_viscous,
            dt: this.options.dt,
          });
        this.divergence.update({ vel });
        const pressure = this.poisson.update({
          iterations: this.options.iterations_poisson,
        });
        this.pressure.update({ vel, pressure });
      }
    }

    // ── Output ───────────────────────────────────────────────────────────────
    class Output {
      simulation!: Simulation;
      scene!: THREE.Scene;
      camera!: THREE.Camera;
      outputMesh!: THREE.Mesh;

      constructor() {
        this.simulation = new Simulation({
          mouse_force: config.mouseForce,
          cursor_size: config.cursorSize,
          isViscous: config.isViscous,
          viscous: config.viscous,
          iterations_viscous: config.iterationsViscous,
          iterations_poisson: config.iterationsPoisson,
          dt: config.dt,
          BFECC: config.BFECC,
          resolution: config.resolution,
          isBounce: config.isBounce,
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.outputMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: face_vert,
            fragmentShader: color_frag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.vel_0.texture },
              boundarySpace: { value: new THREE.Vector2() },
              palette: { value: paletteTex },
              bgColor: { value: bgVec4 },
            },
          }),
        );
        this.scene.add(this.outputMesh);
      }
      resize() {
        this.simulation.resize();
      }
      render() {
        Common.renderer!.setRenderTarget(null);
        Common.renderer!.render(this.scene, this.camera);
      }
      update() {
        this.simulation.update();
        this.render();
      }
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    Common.init(container);
    Mouse.init(container);
    Mouse.autoIntensity = config.autoIntensity;
    Mouse.takeoverDuration = config.takeoverDuration;

    container.prepend(Common.renderer!.domElement);

    const output = new Output();

    let lastUserInteraction = performance.now();
    Mouse.onInteract = () => {
      lastUserInteraction = performance.now();
      autoDriver.forceStop();
    };

    const autoDriver = new AutoDriver({
      enabled: config.autoDemo,
      speed: config.autoSpeed,
      resumeDelay: config.autoResumeDelay,
      rampDuration: config.autoRampDuration,
    });
    autoDriver.lastUserInteraction = lastUserInteraction;

    let rafId: number | null = null;
    let running = false;

    const loop = () => {
      if (!running) return;
      autoDriver.lastUserInteraction = lastUserInteraction;
      autoDriver.update();
      Mouse.update();
      Common.update();
      output.update();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      loop();
    };
    const pause = () => {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const onResize = () => {
      Common.resize(container);
      output.resize();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      document.hidden ? pause() : start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeRafId: number | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        Common.resize(container);
        output.resize();
      });
    });
    ro.observe(container);

    start();

    return () => {
      pause();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      Mouse.dispose();
      const canvas = Common.renderer?.domElement;
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
      Common.renderer?.dispose();
      paletteTex.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, overflow: "hidden" }}
    />
  );
}
