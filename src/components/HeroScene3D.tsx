import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroScene3DProps {
  className?: string;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {};
    mediaQuery.addEventListener('change', handleMotionChange);

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Warm dramatic athletic lighting
    const ambientLight = new THREE.AmbientLight(0x181716, 1.8);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xF0CF8E, 3.2);
    goldKeyLight.position.set(5, 4, 6);
    scene.add(goldKeyLight);

    const rimLight = new THREE.PointLight(0xDDB46B, 4.5, 20);
    rimLight.position.set(-4, -2, 2);
    scene.add(rimLight);

    const deepShadowLight = new THREE.DirectionalLight(0x080A0B, 1.5);
    deepShadowLight.position.set(0, -5, -4);
    scene.add(deepShadowLight);

    // Dynamic 3D Flowing Gold Ribbon
    const curvePoints: THREE.Vector3[] = [];
    const ribbonSegments = 120;
    for (let i = 0; i <= ribbonSegments; i++) {
      const t = (i / ribbonSegments) * Math.PI * 4;
      const x = Math.sin(t * 0.8) * 2.8 + Math.cos(t * 0.3) * 0.6;
      const y = Math.cos(t * 0.6) * 1.6 + Math.sin(t * 0.2) * 0.4;
      const z = Math.sin(t * 1.2) * 1.4;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints, true);

    const tubeGeo = new THREE.TubeGeometry(curve, 180, 0.08, 16, true);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xDDB46B,
      metalness: 0.9,
      roughness: 0.22,
      emissive: 0x483512,
      emissiveIntensity: 0.35,
    });
    const ribbonMesh = new THREE.Mesh(tubeGeo, goldMaterial);
    scene.add(ribbonMesh);

    // Secondary lighter ribbon for depth
    const curvePoints2: THREE.Vector3[] = [];
    for (let i = 0; i <= ribbonSegments; i++) {
      const t = (i / ribbonSegments) * Math.PI * 3.5;
      const x = Math.cos(t * 0.7) * 3.2;
      const y = Math.sin(t * 0.5) * 1.8;
      const z = Math.cos(t * 1.1) * 1.6;
      curvePoints2.push(new THREE.Vector3(x, y, z));
    }
    const curve2 = new THREE.CatmullRomCurve3(curvePoints2, true);
    const tubeGeo2 = new THREE.TubeGeometry(curve2, 140, 0.035, 12, true);
    const goldMaterial2 = new THREE.MeshStandardMaterial({
      color: 0xF0CF8E,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x5a4214,
      emissiveIntensity: 0.4,
    });
    const ribbonMesh2 = new THREE.Mesh(tubeGeo2, goldMaterial2);
    scene.add(ribbonMesh2);

    // Floating Golden Atmospheric Dust / Spark Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF0CF8E,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetX = ((x / rect.width) * 2 - 1) * 0.35;
      targetY = (-(y / rect.height) * 2 + 1) * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause rendering when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      if (!mediaQuery.matches) {
        // Slow majestic rotation of ribbons
        ribbonMesh.rotation.y = elapsedTime * 0.12;
        ribbonMesh.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15;

        ribbonMesh2.rotation.y = -elapsedTime * 0.09;
        ribbonMesh2.rotation.z = Math.cos(elapsedTime * 0.07) * 0.12;

        // Particle sway
        particleSystem.rotation.y = elapsedTime * 0.03;
        particleSystem.rotation.x = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      tubeGeo.dispose();
      goldMaterial.dispose();
      tubeGeo2.dispose();
      goldMaterial2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-scene-3d ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {!webglSupported && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 65% 45%, rgba(221,180,107,0.18) 0%, transparent 60%)',
          }}
        />
      )}
    </div>
  );
};
