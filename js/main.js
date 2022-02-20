
import {ObjectMovement} from "./controls/ObjectMovement.js";
import {GLTFLoader} from "../lib/three/examples/jsm/loaders/GLTFLoader.js";
import {Computer} from "./objects/computer.js";
import {LinkArea} from "./objects/linkarea.js";
import {Lantern} from "./objects/lantern.js";
import {Box} from "./objects/box.js";

let locale = "de"; //englisch ist default wert.
const gltfLoader = new GLTFLoader();
const loader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: webgl});
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
const floorWidth = 1000;
const floorDepth = 1000;
const startX = -180;
const startY = 0;
const startZ = 140;
/**
 * Lighting options.
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
//const pointLight = new THREE.PointLight(0xffffff, 1);
/**
 * scene has in this case only one floor.
 * @type {Mesh}
 */
const floor = generateFloor(floorWidth, floorDepth);
const street = new Box(250,0.2, 30, 'rgb(88, 88, 88)');
const street2 = new Box(30,0.2, 200, 'rgb(88, 88, 88)');
const street3 = new Box(250,0.2, 30, 'rgb(88, 88, 88)');
const street4 = new Box(30, 0.2,100,'rgb(88, 88, 88)');
street.setPosition(-50,0.05,70);
street2.setPosition(60,0.05,-40);
street3.setPosition(40,0.05, -140);
street4.setPosition(-180,0,105);
const gui = new dat.GUI();
const defaultStep = 0.6;
let objMove = new ObjectMovement(null, null, null) ;
const canvasTexture = loader.load('img/textures/canvasTexture.jpg');
const asideTexture = loader.load('img/textures/asideTagTexture.jpg');
const headerTexture = loader.load('img/textures/headerTagTexture.jpg');
const footerTexture = loader.load('img/textures/footerTagTexture.jpg');
const audioTexture = loader.load('img/textures/audioTagTexture.jpg');
const navTexture = loader.load('img/textures/navTagTexture.jpg');
const videoTexture = loader.load('img/textures/videoTagTexture.jpg');
const absoluteOSensorTexture = loader.load('img/textures/absoluteOSensorTexture.png');
const accelerometerTexture = loader.load('img/textures/accelerometerTexture.png');
const ambientLSensorTexture = loader.load('img/textures/ambientLSensorTexture.png');
const gravitySensorTexture = loader.load('img/textures/gravitySensorTexture.png');
const gyroscopeTexture = loader.load('img/textures/gyroscopeTexture.png');
const linearAccSensorTexture = loader.load('img/textures/linearASensorTexture.png');
const magnetometerTexture = loader.load('img/textures/magnetometerTexture.png');
const relativeOSensorTexture = loader.load('img/textures/relativeOSensorTexture.png');

const computerCanvas = new Computer(canvasTexture, 2);
const computerAside = new Computer(asideTexture, 2);
const computerHeader = new Computer(headerTexture, 2);
const computerFooter = new Computer(footerTexture, 2);
const computerAudio = new Computer(audioTexture, 2);
const computerNav = new Computer(navTexture, 2);
const computerVideo = new Computer(videoTexture, 2);
const computerAbsoluteOSensor = new Computer(absoluteOSensorTexture,2);
const computerAccelerometer = new Computer(accelerometerTexture,2);
const computerAmbientLSensor = new Computer(ambientLSensorTexture, 2);
const computerGravitySensor = new Computer(gravitySensorTexture, 2);
const computerGyroscope = new Computer(gyroscopeTexture, 2);
const computerLinearAccSensor = new Computer(linearAccSensorTexture, 2);
const computerMagnetometer = new Computer(magnetometerTexture,2);
const computerRelativeOSensor = new Computer(relativeOSensorTexture, 2);
/**
 * Lanterns.
 * @type {number} intensity
 */
let lanternIntensity = 1;
const lantern = new Lantern(2, lanternIntensity);
const lantern2 = new Lantern(2, lanternIntensity);
const lantern3 = new Lantern(2, lanternIntensity);
const lantern4 = new Lantern(2, lanternIntensity);
const lantern5 = new Lantern(2, lanternIntensity);
const lantern6 = new Lantern(2, lanternIntensity);
const lantern7 = new Lantern(2, lanternIntensity);
const lantern8 = new Lantern(2, lanternIntensity);
const lantern9 = new Lantern(2, lanternIntensity);
const lantern10 = new Lantern(2, lanternIntensity);
const lantern11 = new Lantern(2, lanternIntensity);
const lantern12 = new Lantern(2, lanternIntensity);
const lantern13 = new Lantern(2, lanternIntensity);

let linkAreas = [];
async function fillLinkAreas() {
    linkAreas = [   new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/HTML/Element/aside", 15,10),
        new LinkArea("https://developer.mozilla.org/", locale, "/docs/Web/API/Canvas_API", 15,10),
        new LinkArea("https://developer.mozilla.org/" , locale, "/docs/Web/HTML/Element/footer", 15,10),
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/HTML/Element/header",15,10),
        new LinkArea("https://developer.mozilla.org/", locale, "/docs/Web/HTML/Element/video", 15,10),
        new LinkArea("https://developer.mozilla.org/", locale, "/docs/Web/HTML/Element/audio",15,10),
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/HTML/Element/nav",15,10),
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/AbsoluteOrientationSensor",15,10), //absoluteOrientationSensor
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/Accelerometer",15,10), //accelerometer
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/AmbientLightSensor",15,10), //ambientlightSensor
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/GravitySensor",15,10), //gravitySensor
        new LinkArea("https://developer.mozilla.org/", locale, "/docs/Web/API/Gyroscope",15,10), //gyroscope
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/LinearAccelerationSensor",15,10), //linearAccSensor
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/Magnetometer",15,10), //magnetometer
        new LinkArea("https://developer.mozilla.org/", locale,"/docs/Web/API/RelativeOrientationSensor",15,10), //relativeOrientationSensor
    ];
}

document.getElementById('leftControl').addEventListener('touchstart',moveLeft);

function moveLeft() {
    objMove.sphere.position.x =20;
}

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

async function loadAssets() {
    gltfLoader.load('3dObjects/free_car_001_size3.glb', function (gltf) {
        if(count === 1) {
            car = gltf.scene;
            scene.add(car);
            car.position.set(startX,startY,startZ);
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
    console.log("getting called");
    if(position.coords.latitude < 55 && position.coords.latitude > 47 && position.coords.longitude > 6 && position.coords.longitude < 15) {
        locale = "de";
    } else {
        locale = "en";
    }

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
//    camera.position.set(60,40,80);
    camera.position.set(startX+60,startY+40,startZ+80)
    camera.rotation.x = -30/180 * Math.PI;
    camera.rotation.y = 30/180 * Math.PI;
    camera.rotation.z = 15/180 * Math.PI;
    floor.name = "floor";
    floor.rotation.x = Math.PI / 2;
    ambientLight.position.y = 10;
    scene.add(floor);
    scene.add(ambientLight);
    scene.add(computerCanvas.getMesh());
    scene.add(computerAside.getMesh());
    scene.add(computerFooter.getMesh());
    scene.add(computerHeader.getMesh());
    scene.add(computerAudio.getMesh());
    scene.add(computerNav.getMesh());
    scene.add(computerVideo.getMesh());
    scene.add(computerAbsoluteOSensor.getMesh());
    scene.add(computerAccelerometer.getMesh());
    scene.add(computerAmbientLSensor.getMesh());
    scene.add(computerGravitySensor.getMesh());
    scene.add(computerGyroscope.getMesh());
    scene.add(computerLinearAccSensor.getMesh());
    scene.add(computerMagnetometer.getMesh());
    scene.add(computerRelativeOSensor.getMesh());

    scene.add(lantern.getMesh());
    scene.add(lantern2.getMesh());
    scene.add(lantern3.getMesh());
    scene.add(lantern4.getMesh());
    scene.add(lantern5.getMesh());
    scene.add(lantern6.getMesh());
    scene.add(lantern7.getMesh());
    scene.add(lantern8.getMesh());
    scene.add(lantern9.getMesh());
    scene.add(lantern10.getMesh());
    scene.add(lantern11.getMesh());
    scene.add(lantern12.getMesh());
    scene.add(lantern13.getMesh());

    lantern.setPosition(30,7,100);
    lantern2.setPosition(-30,7,100);
    lantern3.setPosition(-90,7,100);
    lantern4.setPosition(-150,7,100);
    lantern5.setPosition(90,7, 100);
    lantern6.setPosition(90,7, 50);
    lantern7.setPosition(90,7, -0);
    lantern8.setPosition(90,7, -50);
    lantern9.setPosition(90,7,-100);
    lantern10.setPosition(40,7,-100);
    lantern11.setPosition(-10,7,-100);
    lantern12.setPosition(140,7,-100);
    lantern13.setPosition(-60,7,-100);
    scene.add(street.getMesh());
    scene.add(street2.getMesh());
    scene.add(street3.getMesh());
    scene.add(street4.getMesh());
    fillLinkAreas().then(r => {
        for(let i = 0; i < linkAreas.length; i++) {
            scene.add(linkAreas[i].getMesh());
        }
    })
    await loadAssets().then(r => {
        console.log("assets loaded");
    });
    computerCanvas.setPosition(30,0,0);
    computerFooter.setPosition(-30,0,0);
    computerHeader.setPosition(-60,0,0);
    computerVideo.setPosition(-90,0,0);
    computerAudio.setPosition(-120,0,0);
    computerNav.setPosition(-150,0,0);
    computerAbsoluteOSensor.setPosition(-60,0,-200);
    computerAccelerometer.setPosition( -30,0,-200);
    computerAmbientLSensor.setPosition(0,0,-200);
    computerGravitySensor.setPosition(30,0,-200);
    computerGyroscope.setPosition(60,0,-200);
    computerLinearAccSensor.setPosition(90,0,-200);
    computerMagnetometer.setPosition(120,0,-200);
    computerRelativeOSensor.setPosition(150,0,-200);

    linkAreas[0].setPosition(0, 0.2 , 30);
    linkAreas[1].setPosition(30, 0.2, 30);
    linkAreas[2].setPosition(-30, 0.2, 30);
    linkAreas[3].setPosition(-60, 0.2, 30);
    linkAreas[4].setPosition(-90, 0.2, 30);
    linkAreas[5].setPosition(-120, 0.2,30);
    linkAreas[6].setPosition(-150, 0.2, 30);
    linkAreas[7].setPosition(-60,0.2,-170);
    linkAreas[8].setPosition(-30,0.2,-170);
    linkAreas[9].setPosition(0,0.2,-170);
    linkAreas[10].setPosition(30,0.2,-170);
    linkAreas[11].setPosition(60,0.2,-170);
    linkAreas[12].setPosition(90,0.2,-170);
    linkAreas[13].setPosition(120,0.2,-170);
    linkAreas[14].setPosition(150,0.2,-170);


    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(255,255,255)');
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
    let date = new Date();
    if(date.getHours() < 7) {
        console.log("intensity:"+0.3)
        lanternIntensity = 1;
    } else if(date.getHours() < 12) {
        ambientLight.intensity = 0.6;
        lanternIntensity = 0.1;
    } else if (date.getHours() < 17) {
        ambientLight.intensity = 0.9;
        lanternIntensity = 0.1;
    } else if ( date.getHours() < 20) {
        lanternIntensity = 0.6;
        ambientLight.intensity = 0.6;
    } else if( date.getHours() < 24) {
        lanternIntensity = 1;
        ambientLight.intensity = 0.2;
    }
    let speed = 10;
    renderer.render(scene, camera);
    let step = speed*clock.getDelta();
    objMove.moveKeyboardInput(step);x
    checkLinkCollision();

    for(let linkarea of linkAreas) {
        linkarea.setLocale(locale);
    }
    requestAnimationFrame(function () {
            update(renderer, scene, camera);
        }
    );

}






