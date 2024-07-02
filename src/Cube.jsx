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

    // Crear la escena, la cámara y el renderizador
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

    // Crear una esfera de fondo con un gradiente animado
    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide });

    // Crear el gradiente
    const gradientCanvas = document.createElement("canvas");
    gradientCanvas.width = 1024;
    gradientCanvas.height = 512;
    const ctx = gradientCanvas.getContext("2d");

    if (isColorClicked) {
      // Fondo blanco, rosa clarito y gris
      const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
      gradient.addColorStop(0, "#ffffff"); // Blanco
      gradient.addColorStop(0.5, "#ffc0cb"); // Rosa clarito
      gradient.addColorStop(1, "#d3d3d3"); // Gris
      ctx.fillStyle = gradient;
    } else {
      // Fondo original
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

    // Crear el cubo con colores distintos en cada cara
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
          new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Rojo
          new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Verde
          new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Azul
          new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Amarillo
          new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
          new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cian
        ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Ajustar la posición de la cámara
    camera.position.z = 2;
    camera.lookAt(0, 0, 0);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Aplicar la rotación continua al cubo y a la esfera si isMotionClicked es false
      if (!isMotionClicked) {
        cube.rotation.x += rotationVelocity.x;
        cube.rotation.y += rotationVelocity.y;
        sphere.rotation.x += backgroundRotationVelocity.x;
        sphere.rotation.y += backgroundRotationVelocity.y;
      }

      // Aplicar rotación adicional cuando se arrastra el mouse
      if (isDragging) {
        cube.rotation.x += additionalRotation.x;
        cube.rotation.y += additionalRotation.y;
        sphere.rotation.x += additionalRotation.x * 0.1;
        sphere.rotation.y += additionalRotation.y * 0.1;
      }

      // Reducir gradualmente la rotación adicional
      additionalRotation.x *= 0.95;
      additionalRotation.y *= 0.95;

      // Actualizar el raycaster y detectar intersecciones
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);
      if (intersects.length > 0 || isCubeClicked) {
        mount.style.cursor = isDragging ? "grabbing" : "grab"; // Cambiar el cursor a 'grabbing' cuando arrastramos
      } else {
        mount.style.cursor = "default"; // Restaurar el cursor predeterminado cuando el mouse no esté sobre el cubo
      }

      renderer.render(scene, camera);
    };

    animate();

    // Manejar el evento de movimiento del mouse para rotar el cubo y la esfera
    const onMouseMove = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Calcular la rotación adicional
        additionalRotation = {
          x: deltaY * 0.005,
          y: deltaX * 0.005,
        };

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
      }

      // Actualizar la posición del mouse para el raycaster
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

    // Limpiar al desmontar el componente
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeChild(renderer.domElement);
    };
  }, [isMotionClicked, isColorClicked]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Cube;
