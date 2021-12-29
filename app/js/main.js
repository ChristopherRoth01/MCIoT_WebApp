
import {ObjectMovement} from "./controls/ObjectMovement.js";
import {GLTFLoader} from "../../lib/three/examples/jsm/loaders/GLTFLoader.js";
import {Computer} from "./objects/computer.js";

const gltfLoader = new GLTFLoader();
const loader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({ antialias: true });
/**
 * The scene, which gets rendered by the @renderer.
 * @type {Scene}
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/ window.innerHeight, 0.01, 1000);
const clock = new THREE.Clock();
/**
 * Dimensions of the Floor.
 * @type {number}
 */
const floorWidth = 500;
const floorDepth = 500;
/**
 * Lighting options.
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 1);
/**
 * scene has in this case only one floor.
 * @type {Mesh}
 */
const floor = generateFloor(floorWidth, floorDepth);
const gui = new dat.GUI();
const defaultStep = 0.3;
let objMove = new ObjectMovement(null, null, null) ;

//const controls = new THREE.OrbitControls(camera, renderer.domElement);
const keyboard = new THREEx.KeyboardState();
const canvasTexture = loader.load('img/textures/canvasTexture.jpg');
const asideTexture = loader.load('img/textures/asideTagTexture.jpg');
const headerTexture = loader.load('img/textures/headerTagTexture.jpg');
const footerTexture = loader.load('img/textures/footerTagTexture.jpg');

const computerCanvas = new Computer(canvasTexture,2);
const computerAside = new Computer(asideTexture,2);
const computerHeader = new Computer(headerTexture,2);
const computerFooter = new Computer(footerTexture,2);
/**
 * Code Block responsible for switching to the 3D-World.
 */
document.getElementById("start").addEventListener("click", function () {
    main().then(r => update(renderer, scene, camera));
    document.getElementById("startDiv").style = "display:none;";
    document.getElementById("webgl").style = "display:block;"
    document.getElementById("keyBoardControls").style = "display:grid;"
})
let car;
let count = 1;
function loadStuff() {
    gltfLoader.load('3dObjects/free_car_001_size3.glb', function (gltf) {
        if(count === 1) {
        car = gltf.scene;
        scene.add(car);
        objMove = new ObjectMovement(camera, car, defaultStep);
        gui.add(objMove, 'step', defaultStep);
        console.log(Date.now());
        count++;
        }
    }, undefined, function (error) {
        console.error(error);
    } );
}

/**
 * Main function. Builds first Scene with three.js
 */
async function main() {
    camera.position.set(60,40,80);
    camera.rotation.x = -30/180*Math.PI;
    camera.rotation.y =30/180*Math.PI;
    camera.rotation.z = 15/180*Math.PI;
    floor.name = "floor";
    floor.rotation.x = Math.PI / 2;
    ambientLight.position.y = 10;
    pointLight.position.y = 10;
    gui.add(ambientLight, 'intensity', 0.02);
    gui.add(pointLight, 'intensity', 0.02);

    scene.add(floor);
    scene.add(pointLight);
    scene.add(ambientLight);
    scene.add(computerCanvas.getMesh());
    scene.add(computerAside.getMesh());
    scene.add(computerFooter.getMesh());
    scene.add(computerHeader.getMesh());
    loadStuff();
    await loadStuff();
    computerCanvas.setPosition(30,0,0);
    computerFooter.setPosition(-30,0,0);
    computerHeader.setPosition(-60,0,0);
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(255,255,255)');
    document.getElementById("webgl").appendChild(renderer.domElement);
    return scene;
}

/**
 * Generates the Floor of the scene
 * @param w width
 * @param d depth
 */
function generateFloor(w, d) {
    let geo = new THREE.PlaneGeometry(w, d);
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(255, 165, 0)',
        side: THREE.DoubleSide,
    });
    let mesh = new THREE.Mesh(geo, material);
    mesh.receiveShadow = true;
    return mesh;
}

/**
 * Updates the scenery all the time.
 * @param renderer
 * @param scene
 * @param camera
 */
function update(renderer, scene, camera) {
    let speed = 10;
    renderer.render(scene, camera);
    let step = speed*clock.getDelta();
    objMove.moveKeyboardInput(step);
    objMove.moveAcceleratorInput();
    requestAnimationFrame(function () {
            update(renderer, scene, camera);
        }
    );

}





