import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createTwistedCubeGeometry } from "./utils";
import { createGradientTexture } from "./gradients";

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

    const adjustCameraPosition = () => {
      camera.position.z = window.innerWidth > 480 ? 2 : 3;
    };
    adjustCameraPosition();
    window.addEventListener("resize", adjustCameraPosition);

    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide });

    const gradientCanvas = document.createElement("canvas");
    gradientCanvas.width = 1024;
    gradientCanvas.height = 512;
    const ctx = gradientCanvas.getContext("2d");
    const gradientColors = isColorClicked
      ? ["#ffffff", "#ffc0cb", "#d3d3d3"]
      : [
          "#ffeaaf",
          "#ffe499",
          "#ffdd82",
          "#fdce54",
          "#f8be2c",
          "#eeae0a",
          "#e2a302",
          "#d29702",
          "#bd8801",
          "#a57701",
          "#6e4f00",
        ];
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradientColors.forEach((color, index) =>
      gradient.addColorStop(index / (gradientColors.length - 1), color)
    );
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);
    const texture = new THREE.CanvasTexture(gradientCanvas);
    sphereMaterial.map = texture;
    sphereMaterial.map.minFilter = THREE.LinearFilter;

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const size = 1;
    const twist = 85;
    const normalGeometry = new THREE.BoxGeometry(size, size, size, 32, 32, 32);
    const twistedGeometryX = createTwistedCubeGeometry(size, twist, "x", 1);
    const twistedGeometryXInverse = createTwistedCubeGeometry(size, twist, "x", -1);
    const twistedGeometryY = createTwistedCubeGeometry(size, twist, "y", 1);
    const twistedGeometryYInverse = createTwistedCubeGeometry(size, twist, "y", -1);

    const materials = Array(6).fill(
      new THREE.MeshBasicMaterial({
        map: createGradientTexture(["rgba(202, 79, 32, 1)", "rgba(135, 145, 120, 1)"]),
      })
    );

    const cube = new THREE.Mesh(normalGeometry, materials);
    scene.add(cube);

    const normalPositions = normalGeometry.attributes.position.array.slice();
    const twistedPositionsX = twistedGeometryX.attributes.position.array.slice();
    const twistedPositionsXInverse =
      twistedGeometryXInverse.attributes.position.array.slice();
    const twistedPositionsY = twistedGeometryY.attributes.position.array.slice();
    const twistedPositionsYInverse =
      twistedGeometryYInverse.attributes.position.array.slice();

    camera.lookAt(0, 0, 0);

    let morphTarget = 0;
    let morphDirection = 1;
    const morphSpeed = 0.003;

    const animate = () => {
      requestAnimationFrame(animate);

      morphTarget += morphSpeed * morphDirection;
      if (morphTarget >= 1 || morphTarget <= 0) morphDirection *= -1;

      const positions = cube.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i++) {
        if (morphTarget <= 0.25) {
          positions[i] = THREE.MathUtils.lerp(
            normalPositions[i],
            twistedPositionsX[i],
            morphTarget * 4
          );
        } else if (morphTarget <= 0.5) {
          positions[i] = THREE.MathUtils.lerp(
            twistedPositionsX[i],
            twistedPositionsXInverse[i],
            (morphTarget - 0.25) * 4
          );
        } else if (morphTarget <= 0.75) {
          positions[i] = THREE.MathUtils.lerp(
            twistedPositionsXInverse[i],
            twistedPositionsY[i],
            (morphTarget - 0.5) * 4
          );
        } else {
          positions[i] = THREE.MathUtils.lerp(
            twistedPositionsY[i],
            twistedPositionsYInverse[i],
            (morphTarget - 0.75) * 4
          );
        }
      }
      cube.geometry.attributes.position.needsUpdate = true;
      cube.geometry.computeVertexNormals();

      if (!isMotionClicked) {
        cube.rotation.x += rotationVelocity.x;
        cube.rotation.y += rotationVelocity.y;
        sphere.rotation.x += backgroundRotationVelocity.x;
        sphere.rotation.y += backgroundRotationVelocity.y;
      }

      if (isDragging) {
        cube.rotation.x += additionalRotation.x;
        cube.rotation.y += additionalRotation.y;
        sphere.rotation.x += additionalRotation.x * 0.1;
        sphere.rotation.y += additionalRotation.y * 0.1;
      }

      additionalRotation.x *= 0.95;
      additionalRotation.y *= 0.95;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);
      mount.style.cursor =
        intersects.length > 0 || isCubeClicked
          ? isDragging
            ? "grabbing"
            : "grab"
          : "default";

      renderer.render(scene, camera);
    };

    animate();

    const onMouseMove = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        additionalRotation = { x: deltaY * 0.005, y: deltaX * 0.005 };
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
      }
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (event) => {
      if (raycaster.intersectObject(cube).length > 0) isCubeClicked = true;
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
