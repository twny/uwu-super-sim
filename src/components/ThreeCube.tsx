import { createEffect, createSignal, onCleanup } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeCube() {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement>();

  createEffect(() => {
    if (!canvas()) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas(), antialias: true });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);

    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.5; // Position the cube so it sits on the plane
    scene.add(cube);

    // Add a plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
    scene.add(plane);

    // Add a point light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.set(5, 10, 15);
    camera.lookAt(scene.position);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Handle arrow key input
    const moveSpeed = 0.1;
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          cube.position.z -= moveSpeed;
          break;
        case "ArrowDown":
          cube.position.z += moveSpeed;
          break;
        case "ArrowLeft":
          cube.position.x -= moveSpeed;
          break;
        case "ArrowRight":
          cube.position.x += moveSpeed;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    onCleanup(() => {
      renderer.dispose();
      controls.dispose();
      geometry.dispose();
      material.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      window.removeEventListener("keydown", handleKeyDown);
    });
  });

  return (
    <>
      <canvas ref={setCanvas} />
    </>
  );
}

export default ThreeCube;
