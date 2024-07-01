import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let meshfloor ;

meshfloor = new THREE.Mesh(
    new THREE.CircleGeometry(4,32),
    new THREE.MeshBasicMaterial({color:0xeeeeee})

);
meshfloor.rotation.x -= Math.PI /2;
scene.add(meshfloor);



const loader = new GLTFLoader();
let obj;
loader.load('model.gltf', function (gltf) {
    obj = gltf.scene;
    obj.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    obj.position.y += 2;
    scene.add(obj);
});

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 30);
dirLight.position.set(5, 10, 7.5);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = -2;
dirLight.shadow.camera.left = -2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add(dirLight);

camera.position.set(0, 1, 4);

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);
    if (obj) {
        obj.rotation.y += 0.005;
    }
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle color change
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', (event) => {
    const color = new THREE.Color(event.target.value);
    if (meshfloor) {
        meshfloor.traverse(function (node) {
            if (node.isMesh) {
                node.material.color = color;
            }
        });
    }
});

console.log(gltf.scene);


// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer({alpha : true});
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
// document.body.appendChild( renderer.domElement );
// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();

// let obj;
// loader.load("model.gltf", function(gltf){
//     obj = gltf.scene;    
//     scene.add(gltf.scene);
// })

// const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 50 );
// scene.add( light );


// camera.position.set(0,1,4);

// function animate() {
//     requestAnimationFrame(animate);    
//     obj.rotation.y += 0.005 
//     renderer.render(scene, camera);
// }
