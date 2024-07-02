import { useEffect, useRef } from "react";
import * as THREE from "three";

const Cube = ({ isMotionClicked, isColorClicked }) => {
  const mountRef = useRef(null);
  const previousMousePosition = { x: 0, y: 0 };
  let isDragging = false;
  let isCubeClicked = false;
  let rotationVelocity = { x: 0.005, y: 0.005 };
  let additionalRotation = { x: 0, y: 0 };
  let backgroundRotationVelocity = { x: 0.001, y: 0.001 };

  useEffect(() => {
    const mount = mountRef.current;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Adjust the camera position based on screen width
    const adjustCameraPosition = () => {
      if (window.innerWidth > 480) {
        camera.position.z = 2;
      } else {
        camera.position.z = 3;
      }
    };

    // Initial camera position adjustment
    adjustCameraPosition();

    // Listen for window resize events
    window.addEventListener("resize", adjustCameraPosition);

    // Create a background sphere with an animated gradient
    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide });

    // Create the gradient
    const gradientCanvas = document.createElement("canvas");
    gradientCanvas.width = 1024;
    gradientCanvas.height = 512;
    const ctx = gradientCanvas.getContext("2d");

    if (isColorClicked) {
      // White, light pink, and gray background
      const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
      gradient.addColorStop(0, "#ffffff"); // White
      gradient.addColorStop(0.5, "#ffc0cb"); // Light pink
      gradient.addColorStop(1, "#d3d3d3"); // Gray
      ctx.fillStyle = gradient;
    } else {
      // Original background
      const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
      gradient.addColorStop(0, "#ffeaaf");
      gradient.addColorStop(0.1, "#ffe499");
      gradient.addColorStop(0.2, "#ffdd82");
      gradient.addColorStop(0.3, "#fdce54");
      gradient.addColorStop(0.4, "#f8be2c");
      gradient.addColorStop(0.5, "#eeae0a");
      gradient.addColorStop(0.6, "#e2a302");
      gradient.addColorStop(0.7, "#d29702");
      gradient.addColorStop(0.8, "#bd8801");
      gradient.addColorStop(0.9, "#a57701");
      gradient.addColorStop(1, "#6e4f00");
      ctx.fillStyle = gradient;
    }

    ctx.fillRect(0, 0, 1024, 512);

    const texture = new THREE.CanvasTexture(gradientCanvas);
    sphereMaterial.map = texture;
    sphereMaterial.map.minFilter = THREE.LinearFilter;

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create the cube with different colors on each face
    const geometry = new THREE.BoxGeometry();
    const materials = isColorClicked
      ? [
          new THREE.MeshBasicMaterial({ color: 0x8b0000 }), // DarkRed
          new THREE.MeshBasicMaterial({ color: 0x008000 }), // Green
          new THREE.MeshBasicMaterial({ color: 0x00008b }), // DarkBlue
          new THREE.MeshBasicMaterial({ color: 0x808000 }), // Olive
          new THREE.MeshBasicMaterial({ color: 0x800080 }), // Purple
          new THREE.MeshBasicMaterial({ color: 0x008b8b }), // DarkCyan
        ]
      : [
          new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
          new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
          new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
          new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
          new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
          new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
        ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.lookAt(0, 0, 0);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply continuous rotation to the cube and sphere if isMotionClicked is false
      if (!isMotionClicked) {
        cube.rotation.x += rotationVelocity.x;
        cube.rotation.y += rotationVelocity.y;
        sphere.rotation.x += backgroundRotationVelocity.x;
        sphere.rotation.y += backgroundRotationVelocity.y;
      }

      // Apply additional rotation when dragging the mouse
      if (isDragging) {
        cube.rotation.x += additionalRotation.x;
        cube.rotation.y += additionalRotation.y;
        sphere.rotation.x += additionalRotation.x * 0.1;
        sphere.rotation.y += additionalRotation.y * 0.1;
      }

      // Gradually reduce the additional rotation
      additionalRotation.x *= 0.95;
      additionalRotation.y *= 0.95;

      // Update the raycaster and detect intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);
      if (intersects.length > 0 || isCubeClicked) {
        mount.style.cursor = isDragging ? "grabbing" : "grab"; // Change the cursor to 'grabbing' when dragging
      } else {
        mount.style.cursor = "default"; // Restore the default cursor when the mouse is not over the cube
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle the mouse move event to rotate the cube and sphere
    const onMouseMove = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Calculate the additional rotation
        additionalRotation = {
          x: deltaY * 0.005,
          y: deltaX * 0.005,
        };

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
      }

      // Update the mouse position for the raycaster
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (event) => {
      const intersects = raycaster.intersectObject(cube);
      if (intersects.length > 0) {
        isCubeClicked = true;
      }

      isDragging = true;
      previousMousePosition.x = event.clientX;
      previousMousePosition.y = event.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      isCubeClicked = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Clean up when the component unmounts
    return () => {
      window.removeEventListener("resize", adjustCameraPosition);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeChild(renderer.domElement);
    };
  }, [isMotionClicked, isColorClicked]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Cube;
