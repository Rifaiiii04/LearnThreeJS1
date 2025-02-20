import * as THREE from "/node_modules/three/build/three.module.js";

// Setup scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambahkan cahaya untuk efek glow
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Tambahkan objek (kubus)
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe : true,
  roughness: 0.3,
  metalness: 0.8,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animasi rotasi mengikuti kursor dengan efek smooth
let targetX = 0;
let targetY = 0;

window.addEventListener("mousemove", (event) => {
  let x = (event.clientX / window.innerWidth) * 2 - 1;
  let y = (event.clientY / window.innerHeight) * 2 - 1;

  targetX = x * Math.PI * 0.5; // Smooth rotation
  targetY = y * Math.PI * 0.5;
});

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Smooth transition effect
  cube.rotation.y += (targetX - cube.rotation.y) * 0.1;
  cube.rotation.x += (targetY - cube.rotation.x) * 0.1;

  renderer.render(scene, camera);
}
animate();
