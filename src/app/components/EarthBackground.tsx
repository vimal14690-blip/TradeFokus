'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const THEMES = {
  earth: {
    primary: new THREE.Color('#00d2ff'),
    secondary: new THREE.Color('#3b82f6'),
    accent: new THREE.Color('#fbbf24'),
    nebulaBase: new THREE.Color('#000105'),
    smoke: new THREE.Color('#010815'),
    planetBase: new THREE.Color('#000003'),
    planetLand: new THREE.Color('#010205')
  },
  fire: {
    primary: new THREE.Color('#ff0000'),
    secondary: new THREE.Color('#440000'),
    accent: new THREE.Color('#ff3333'),
    nebulaBase: new THREE.Color('#020000'),
    smoke: new THREE.Color('#100000'),
    planetBase: new THREE.Color('#050000'),
    planetLand: new THREE.Color('#200000')
  },
  galaxy: {
    primary: new THREE.Color('#9d00ff'),
    secondary: new THREE.Color('#00f2ff'),
    accent: new THREE.Color('#ff00ff'),
    nebulaBase: new THREE.Color('#05000a'),
    smoke: new THREE.Color('#0a0015'),
    planetBase: new THREE.Color('#000010'),
    planetLand: new THREE.Color('#100020')
  }
};

const WORLD_HUBS = [
  { name: 'New York', lat: 40.71, lon: -74.00, type: 'ind' },
  { name: 'London', lat: 51.50, lon: -0.12, type: 'ind' },
  { name: 'Dubai', lat: 25.20, lon: 55.27, type: 'ind' },
  { name: 'Singapore', lat: 1.35, lon: 103.81, type: 'ind' },
  { name: 'Tokyo', lat: 35.67, lon: 139.65, type: 'ind' },
  { name: 'Sydney', lat: -33.86, lon: 151.20, type: 'agri' },
  { name: 'Sao Paulo', lat: -23.55, lon: -46.63, type: 'agri' },
  { name: 'Mumbai', lat: 19.07, lon: 72.87, type: 'agri' },
  { name: 'Rotterdam', lat: 51.92, lon: 4.47, type: 'agri' },
  { name: 'Buenos Aires', lat: -34.60, lon: -58.38, type: 'agri' }
];

function getPosFromLatLon(lat: number, lon: number, radius = 1.0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon) * (Math.PI / 180);
  return new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
}

const GalaxyRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.015;
    }
  });
  return (
    <group ref={groupRef} rotation={[Math.PI / 2.2, 0.05, 0.1]}>
      <mesh>
        <ringGeometry args={[2.6, 3.6, 128]} />
        <meshBasicMaterial color="#3a006f" transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.5, 2.65, 128]} />
        <meshBasicMaterial color="#6600cc" transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.48, 1.8, 128]} />
        <meshBasicMaterial color="#00cfff" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.44, 1.52, 128]} />
        <meshBasicMaterial color="#88eeff" transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.0, 2.3, 128]} />
        <meshBasicMaterial color="#4400aa" transparent opacity={0.18} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const SatellitePlanet = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.03;
      meshRef.current.position.set(
        Math.cos(t) * 6 - 1,
        Math.sin(t * 0.5) * 2 + 3,
        -8
      );
      meshRef.current.rotation.y += 0.002;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshBasicMaterial color="#cc0044" transparent opacity={0.9} />
      <mesh scale={[1.6, 1.6, 1.6]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#ff2255" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </mesh>
  );
};

const NebulaShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorBase: { value: new THREE.Color() },
    uColorSmoke: { value: new THREE.Color() },
    uColorPrimary: { value: new THREE.Color() },
    uColorSecondary: { value: new THREE.Color() },
    uTheme: { value: 0.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColorBase;
    uniform vec3 uColorSmoke;
    uniform vec3 uColorPrimary;
    uniform vec3 uColorSecondary;
    uniform float uTheme;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i+vec2(0,0)),hash(i+vec2(1,0)),u.x),
                 mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
    }
    float fbm(vec2 p) {
      float v=0.0; float a=0.5;
      for(int i=0;i<7;i++){v+=a*noise(p);p*=2.0;a*=0.5;}
      return v;
    }
    void main() {
      vec2 uv = (vUv - 0.5) * 2.0;
      float t = uTime * 0.02;
      float distToMouse = length(uv - uMouse);
      float ripple = sin(distToMouse*8.0 - uTime*1.5) * exp(-distToMouse*2.5) * 0.1;
      vec2 mDistort = uMouse * 0.2 * smoothstep(1.5, 0.0, distToMouse);
      vec2 q = vec2(fbm(uv*1.2+t+mDistort+ripple), fbm(uv*1.2+vec2(5.2,1.3)-mDistort));
      vec2 r = vec2(fbm(uv+3.5*q+t*0.6+ripple), fbm(uv+3.5*q+vec2(8.3,2.8)+t*0.4));
      float n = fbm(uv*0.9 + 3.5*r);
      vec3 col = mix(uColorBase, uColorSmoke, n*0.8);
      col += uColorPrimary * pow(n, 2.5) * 0.5;
      col += uColorSecondary * pow(n, 4.0) * 0.6;
      if(uTheme > 1.5) {
        col += vec3(0.35, 0.0, 0.7) * pow(n, 2.0) * 0.7;
        col += vec3(0.0, 0.4, 0.8) * pow(max(0.0, 1.0-n), 3.0) * 0.5;
        col += vec3(0.6, 0.0, 0.8) * exp(-distToMouse*3.0) * 0.25;
        float coreDist = length(uv - vec2(-0.1, 0.1));
        col += vec3(0.8, 0.9, 1.0) * exp(-coreDist*6.0) * 0.5;
      }
      col += uColorPrimary * exp(-distToMouse*5.0) * 0.15;
      float vignette = smoothstep(1.6, 0.0, length(vUv-0.5));
      gl_FragColor = vec4(col * vignette, 1.0);
    }
  `
};

const GlobalNebula = ({ theme = 'earth' }: { theme: 'earth' | 'fire' | 'galaxy' }) => {
  const colors = THEMES[theme];
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.05);
      matRef.current.uniforms.uColorBase.value.copy(colors.nebulaBase);
      matRef.current.uniforms.uColorSmoke.value.copy(colors.smoke);
      matRef.current.uniforms.uColorPrimary.value.copy(colors.primary);
      matRef.current.uniforms.uColorSecondary.value.copy(colors.secondary);
      matRef.current.uniforms.uTheme.value = theme === 'earth' ? 0 : theme === 'fire' ? 1 : 2;
    }
    if (meshRef.current) {
        meshRef.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(30));
        meshRef.current.lookAt(state.camera.position);
    }
  });
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[200, 200]} />
      <shaderMaterial ref={matRef as any} {...NebulaShader} transparent depthWrite={false} />
    </mesh>
  );
};

const ParticleShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color() }
  },
  vertexShader: `
    uniform float uTime;
    attribute float pSize;
    attribute float pSpeed;
    attribute float pIndex;
    varying float vFlicker;
    void main() {
      vFlicker = sin(uTime * pSpeed + pIndex * 1.5) * 0.5 + 0.5;
      vec3 pos = position;
      pos.x += sin(uTime * 0.1 + pIndex) * 0.4;
      pos.y += cos(uTime * 0.1 + pIndex * 1.2) * 0.4;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = pSize * (250.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vFlicker;
    void main() {
      float dist = length(gl_PointCoord - 0.5);
      if (dist > 0.5) discard;
      
      float strength = pow(1.0 - dist * 2.0, 8.0);
      float twinkle = pow(vFlicker, 15.0) * 10.0;
      
      vec2 pt = (gl_PointCoord - 0.5) * 2.0;
      float flare = (smoothstep(0.015, 0.0, abs(pt.x)) * smoothstep(0.5, 0.0, abs(pt.y)) +
                     smoothstep(0.015, 0.0, abs(pt.y)) * smoothstep(0.5, 0.0, abs(pt.x))) * 0.5;
      
      vec3 col = mix(uColor, vec3(1.0), vFlicker);
      gl_FragColor = vec4(col * (strength + flare * twinkle), strength * vFlicker);
    }
  `
};

const GlitteringParticles = ({ theme = 'earth' }: { theme: 'earth' | 'fire' | 'galaxy' }) => {
  const count = 5000;
  const colors = THEMES[theme];
  const pointsRef = useRef<THREE.Points>(null);
  const [pos, sizes, speeds, indices] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const sp = new Float32Array(count);
    const idx = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i*3] = (Math.random() - 0.5) * 120;
      p[i*3+1] = (Math.random() - 0.5) * 100;
      p[i*3+2] = (Math.random() - 0.5) * 60 - 40;
      s[i] = Math.random() * 0.8 + 0.1;
      sp[i] = Math.random() * 2.0 + 0.5;
      idx[i] = i;
    }
    return [p, s, sp, idx];
  }, []);
  useFrame((state) => {
    if (pointsRef.current && (pointsRef.current.material as any).uniforms) {
      (pointsRef.current.material as any).uniforms.uTime.value = state.clock.elapsedTime;
      (pointsRef.current.material as any).uniforms.uColor.value.copy(colors.primary);
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} args={[pos, 3]} />
        <bufferAttribute attach="attributes-pSize" count={count} array={sizes} itemSize={1} args={[sizes, 1]} />
        <bufferAttribute attach="attributes-pSpeed" count={count} array={speeds} itemSize={1} args={[speeds, 1]} />
        <bufferAttribute attach="attributes-pIndex" count={count} array={indices} itemSize={1} args={[indices, 1]} />
      </bufferGeometry>
      <shaderMaterial {...ParticleShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const PlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    theme: { value: 0 },
    tLights: { value: null },
    tSpec: { value: null },
    uColorBase: { value: new THREE.Color() },
    uColorLand: { value: new THREE.Color() },
    uColorAccent: { value: new THREE.Color() }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float theme;
    uniform sampler2D tLights;
    uniform sampler2D tSpec;
    uniform vec3 uColorBase;
    uniform vec3 uColorLand;
    uniform vec3 uColorAccent;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vPosition;

    float hash(vec3 p) { return fract(sin(dot(p, vec3(12.98, 78.23, 45.16))) * 43758.54); }
    float noise(vec3 p) {
      vec3 i = floor(p); vec3 f = fract(p);
      f = f*f*(3.0-2.0*f);
      return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),
                     mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                  mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                      mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }
    float fbm(vec3 p) {
      float v = 0.0; float a = 0.5;
      for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
      return v;
    }

    void main() {
      float dotNV = max(dot(vNormal, vViewDir), 0.0);
      float rim = pow(1.0 - dotNV, 3.0);
      
      if (theme > 1.5) {
        vec3 p = normalize(vPosition) * 4.5 + vec3(uTime * 0.03);
        float n1 = fbm(p);
        float n2 = fbm(p * 2.0 + n1 * 0.8);
        vec3 darkRock = vec3(0.02, 0.02, 0.06);
        vec3 litRock   = vec3(0.05, 0.08, 0.18);
        vec3 col = mix(darkRock, litRock, n2 * 0.7);
        col += vec3(0.0, 0.15, 0.4) * pow(dotNV, 3.0) * 0.5;
        float atmPow = pow(1.0 - dotNV, 2.0);
        vec3 atmInner = vec3(0.0, 0.8, 1.0) * atmPow * 3.0;
        vec3 atmOuter = vec3(0.1, 0.3, 1.0) * rim * 5.0;
        vec3 edge = vec3(0.5, 0.95, 1.0) * pow(rim, 6.0) * 8.0;
        gl_FragColor = vec4(col + atmInner + atmOuter + edge, 1.0);
      } else if (theme > 0.5) {
        float t = uTime * 0.08;
        vec3 p = normalize(vPosition) * 3.0 + t;
        float n1 = fbm(p);
        float n2 = fbm(p * 2.0 + n1 * 0.5);
        
        vec3 crust = vec3(0.01, 0.0, 0.0);
        vec3 midLava = vec3(0.8, 0.0, 0.0);
        vec3 hotLava = vec3(1.0, 0.0, 0.0);
        
        float magmaMix = smoothstep(0.3, 0.7, n2);
        vec3 col = mix(crust, midLava, magmaMix);
        col += hotLava * pow(magmaMix, 8.0) * 4.0;
        
        vec3 atmosphere = vec3(1.0, 0.0, 0.0) * rim * 6.0;
        gl_FragColor = vec4(col + atmosphere, 1.0);
        
      } else {
        vec3 lights = texture2D(tLights, vUv).rgb;
        float spec = texture2D(tSpec, vUv).r;
        float land = smoothstep(0.1, 0.4, 1.0 - spec);
        
        vec3 col = mix(uColorBase, uColorLand, land);
        
        col += uColorAccent * smoothstep(0.3, 0.7, lights.r) * 2.5;
        
        float specular = pow(dotNV, 128.0) * spec * 0.1;
        vec3 rimGlow = vec3(0.4, 0.7, 1.0) * rim * 0.3;
        
        gl_FragColor = vec4(col + rimGlow + specular, 1.0);
      }
    }
  `
};

const CometShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color() },
    uActive: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uActive;
    varying vec2 vUv;
    void main() {
      float travel = fract(vUv.x - uTime * 0.4);
      float head = smoothstep(0.0, 0.1, travel);
      float tail = pow(1.0 - travel, 3.0);
      float glow = head * tail;
      float endFades = pow(sin(vUv.x * 3.14159), 0.5);
      gl_FragColor = vec4(uColor, glow * endFades * uActive * pow(1.0 - vUv.y, 2.0));
    }
  `
};

const FlowingCometArc = ({ start, end, type, isActive, theme = 'earth' }: { start: THREE.Vector3; end: THREE.Vector3; type: string; isActive: boolean; theme: 'earth' | 'fire' | 'galaxy' }) => {
  const colors = THEMES[theme];
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).normalize().multiplyScalar(1.15);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uColor.value.copy(type === 'agri' ? colors.primary : colors.secondary);
      matRef.current.uniforms.uActive.value = isActive ? 1.0 : 0.15;
    }
  });

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.003, 8, false]} />
      <shaderMaterial ref={matRef} {...CometShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
};

const CinematicWorld = ({ activeSector, theme = 'earth', rotationTarget }: { activeSector?: string | null; theme: 'earth' | 'fire' | 'galaxy'; rotationTarget: React.MutableRefObject<{ x: number; y: number }> }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const colors = THEMES[theme];
  const { size, camera } = useThree();
  
  const textures = useTexture([
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_lights_2048.png',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg'
  ]);

  const scrollPos = useRef(0);
  useEffect(() => {
    const handleScroll = () => { scrollPos.current = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const routes = useMemo(() => {
    const res: any[] = [];
    const used = new Set();
    for(let i=0; i<40; i++) {
        const s = Math.floor(Math.random()*WORLD_HUBS.length);
        const e = Math.floor(Math.random()*WORLD_HUBS.length);
        if(s===e || used.has(`${s}->${e}`)) continue;
        used.add(`${s}->${e}`);
        res.push({
          start: getPosFromLatLon(WORLD_HUBS[s].lat, WORLD_HUBS[s].lon, 1.002),
          end: getPosFromLatLon(WORLD_HUBS[e].lat, WORLD_HUBS[e].lon, 1.002),
          type: WORLD_HUBS[s].type
        });
    }
    return res;
  }, []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.theme.value = theme === 'earth' ? 0.0 : theme === 'fire' ? 1.0 : 2.0;
      matRef.current.uniforms.tLights.value = textures[0];
      matRef.current.uniforms.tSpec.value = textures[1];
      matRef.current.uniforms.uColorBase.value.copy(colors.planetBase);
      matRef.current.uniforms.uColorLand.value.copy(colors.planetLand);
      matRef.current.uniforms.uColorAccent.value.copy(colors.accent);
    }
    
    if (meshRef.current && groupRef.current) {
        meshRef.current.rotation.y += 0.001;
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, meshRef.current.rotation.y + rotationTarget.current.y, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotationTarget.current.x, 0.1);
        
        rotationTarget.current.y *= 0.95;
        rotationTarget.current.x *= 0.95;

        const aspect = size.width / (size.height || 1);
        const isDesktop = size.width > 1024;
        const baseScale = Math.min(0.45, 0.7 * aspect) || 0.3;
        const baseY = 0.8 - baseScale;
        const scrollProgress = THREE.MathUtils.clamp(scrollPos.current / 600, 0, 1);
        
        const targetX = isDesktop ? 1.0 : 0.6;
        const targetY = isDesktop ? 0 : -0.2;
        const targetScale = isDesktop ? baseScale * 1.5 : baseScale * 1.2;

        const lerpX = THREE.MathUtils.lerp(0, targetX, scrollProgress);
        const lerpY = THREE.MathUtils.lerp(baseY, targetY, scrollProgress);
        const lerpS = THREE.MathUtils.lerp(baseScale, targetScale, scrollProgress);

        groupRef.current.position.set(lerpX, lerpY, 0);
        groupRef.current.scale.setScalar(lerpS);
        
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, activeSector ? 2.2 : 3.0, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial ref={matRef as any} {...PlanetShader} transparent />
        {theme === 'galaxy' && <GalaxyRings />}
        {theme === 'earth' && WORLD_HUBS.map((h, i) => (
          <mesh key={i} position={getPosFromLatLon(h.lat, h.lon, 1.005)}>
            <sphereGeometry args={[0.015, 12, 12]} />
            <meshBasicMaterial color={h.type === 'agri' ? colors.primary : colors.secondary} />
          </mesh>
        ))}
        {theme === 'earth' && routes.map((r, i) => (
          <FlowingCometArc key={i} {...r} isActive={!activeSector || activeSector === r.type} theme={theme} />
        ))}
      </mesh>
    </group>
  );
};

interface EarthBackgroundProps {
  activeSector?: string | null;
  theme?: 'earth' | 'fire' | 'galaxy';
}

const EarthBackground = ({ activeSector, theme = 'earth' }: EarthBackgroundProps) => {
  const rotationTarget = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  return (
    <div 
      className="earth-bg-container" 
      style={{ 
        position: 'fixed', inset: 0, zIndex: 0, 
        background: theme === 'fire' ? 'radial-gradient(circle at center, #1a0000 0%, #050000 100%)' : 
                   theme === 'galaxy' ? 'radial-gradient(circle at center, #0a0015 0%, #020005 100%)' :
                   'radial-gradient(circle at center, #000015 0%, #000005 100%)'
      } as React.CSSProperties}
      onPointerDown={(e) => { 
        isDragging.current = true; 
        lastPos.current = { x: e.clientX, y: e.clientY }; 
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - lastPos.current.x;
        const deltaY = e.clientY - lastPos.current.y;
        rotationTarget.current.y += deltaX * 0.005;
        rotationTarget.current.x += deltaY * 0.005;
        lastPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => { isDragging.current = false; }}
      onPointerLeave={() => { isDragging.current = false; }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <React.Suspense fallback={null}>
            <Stars radius={200} depth={80} count={theme === 'galaxy' ? 12000 : 5000} factor={theme === 'galaxy' ? 6 : 4} saturation={theme === 'galaxy' ? 0.3 : 0} fade speed={0.5} />
            {theme === 'galaxy' && <SatellitePlanet />}
            <GlobalNebula theme={theme} />
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
                <CinematicWorld activeSector={activeSector} theme={theme} rotationTarget={rotationTarget} />
            </Float>
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default EarthBackground;
