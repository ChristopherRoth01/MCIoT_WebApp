
import {ObjectMovement} from "./controls/ObjectMovement.js";
import {GLTFLoader} from "../lib/three/examples/jsm/loaders/GLTFLoader.js";
import {Computer} from "./objects/computer.js";
import {LinkArea} from "./objects/linkarea.js";

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
const floorWidth = 20000;
const floorDepth = 20000;
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

const canvasTexture = loader.load('img/textures/canvasTexture.jpg');
const asideTexture = loader.load('img/textures/asideTagTexture.jpg');
const headerTexture = loader.load('img/textures/headerTagTexture.jpg');
const footerTexture = loader.load('img/textures/footerTagTexture.jpg');
const audioTexture = loader.load('img/textures/audioTagTexture.jpg');
const navTexture = loader.load('img/textures/navTagTexture.jpg');
const videoTexture = loader.load('img/textures/videoTagTexture.jpg');

const computerCanvas = new Computer(canvasTexture, 2);
const computerAside = new Computer(asideTexture, 2);
const computerHeader = new Computer(headerTexture, 2);
const computerFooter = new Computer(footerTexture, 2);
const computerAudio = new Computer(audioTexture, 2);
const computerNav = new Computer(navTexture, 2);
const computerVideo = new Computer(videoTexture, 2);

let linkAreas = [new LinkArea("https://developer.mozilla.org/de/docs/Web/HTML/Element/aside", 15,10),
                    new LinkArea("https://developer.mozilla.org/de/docs/Web/API/Canvas_API", 15,10),
                    new LinkArea("https://developer.mozilla.org/de/docs/Web/HTML/Element/footer", 15,10),
                    new LinkArea("https://developer.mozilla.org/de/docs/Web/HTML/Element/header",15,10),
                    new LinkArea("https://developer.mozilla.org/de/docs/Web/HTML/Element/video", 15,10),
                    new LinkArea("",15,10),
                    new LinkArea("",15,10),
];

/**
 * Code Block responsible for switching to the 3D-World.
 */
document.getElementById("start").addEventListener("click", function () {
    main().then(r => update(renderer, scene, camera));
    document.getElementById("startDiv").style = "display:none;";
    document.getElementById("webgl").style = "display:block;"
    document.getElementById("keyBoardControls").style = "display:grid;"
})

document.addEventListener("keydown", (ev => {
    switch (ev.key) {
        case "Enter":
            checkLinkCollision().then(linkarea => {
                if(linkarea === null) {
                    console.log("no linkarea here");
                } else {
                    linkarea.openUrl();
                }
            });
        break;
    }
}));
let car;
let count = 1;

function loadAssets() {
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

function showPosition(position) {
    console.log("Latitude:"+  position.coords.latitude, "longitude: " + position.coords.longitude);
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}
function handleError(error) {
    let errorStr;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorStr = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorStr = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorStr = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorStr = 'An unknown error occurred.';
            break;
        default:
            errorStr = 'An unknown error occurred.';
    }
    console.error('Error occurred: ' + errorStr);
}

/**
 * Main function. Builds first Scene with three.js
 */
async function main() {
    getLocation();

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
    for(let i = 0; i < linkAreas.length; i++) {
        scene.add(linkAreas[i].getMesh());
    }

    await loadAssets();
    computerCanvas.setPosition(30,0,0);
    computerFooter.setPosition(-30,0,0);
    computerHeader.setPosition(-60,0,0);
    linkAreas[0].setPosition(0, 1 , 30);
    linkAreas[1].setPosition(30, 1, 30);
    linkAreas[2].setPosition(-30,1,30);
    linkAreas[3].setPosition(-60,1,30);
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
 * Returns found linkarea.
 * @returns {Promise<LinkArea>}
 */
async function checkLinkCollision() {
    for(let i = 0; i < linkAreas.length; i++) {
        if((objMove.getPositionX() < linkAreas[i].getMesh().position.x + linkAreas[i].w/2 && objMove.getPositionZ() < linkAreas[i].getMesh().position.z + linkAreas[i].h/2 &&
            objMove.getPositionX() > linkAreas[i].getMesh().position.x - linkAreas[i].w/2 && objMove.getPositionZ() > linkAreas[i].getMesh().position.z - linkAreas[i].h/2)) {
                return linkAreas[i];
        }
    }
    return null;
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
    checkLinkCollision();
    requestAnimationFrame(function () {
            update(renderer, scene, camera);
        }
    );
}






