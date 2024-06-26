import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha : true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

let obj;
loader.load("scene.gltf", function(gltf){
    obj = gltf.scene;
    scene.add(gltf.scene);
})

const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 2 );
scene.add( light );

camera.position.set(0,1,4);

function animate() {
    requestAnimationFrame(animate);
    obj.rotation.y += 0.005 
    renderer.render(scene, camera);
}



