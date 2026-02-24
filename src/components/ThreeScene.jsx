import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );

    mountRef.current.appendChild(renderer.domElement);

    // 👇 Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Smooth movement
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Optional: limit zoom
    controls.minDistance = 1;
    controls.maxDistance = 20;

    // Load chaos game binary
    fetch("/data/octahedron.bin")
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const positions = new Float32Array(buffer);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );

        const material = new THREE.PointsMaterial({
          size: 0.01,
          color: 0x66ccff,
          transparent: true,
          opacity: 0.02,
          depthWrite: false
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);
      })
      .catch(err => console.error("Failed to load:", err));

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);

      // 👇 Required for smooth damping
      controls.update();

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      controls.dispose();

      if (
        mountRef.current &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default ThreeScene;