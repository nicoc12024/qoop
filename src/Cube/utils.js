import * as THREE from "three";

export const createTwistedCubeGeometry = (size, twist, axis = "y", direction = 1) => {
  const geometry = new THREE.BoxGeometry(size, size, size, 32, 32, 32);
  const positionAttribute = geometry.attributes.position;
  const quaternion = new THREE.Quaternion();
  const twistAngle = (twist * Math.PI) / 180;

  for (let i = 0; i < positionAttribute.count; i++) {
    const y = positionAttribute.getY(i);
    const angle = (twistAngle * y * direction) / size;
    quaternion.setFromAxisAngle(
      new THREE.Vector3(axis === "x" ? 1 : 0, axis === "y" ? 1 : 0, 0),
      angle
    );
    const vertex = new THREE.Vector3(
      positionAttribute.getX(i),
      y,
      positionAttribute.getZ(i)
    ).applyQuaternion(quaternion);
    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
};
