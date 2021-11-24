
const monitorStandGeometry = new THREE.BoxGeometry(1,5,1);
const screenBackGroundGeometry = new THREE.BoxGeometry(10,5,1);
const screenGeometry = new THREE.BoxGeometry(9.5,4.5,1);

const materialBlack = new THREE.MeshPhongMaterial({
    color: 0x000000,
});

const materialWhite = new THREE.MeshPhongMaterial({
    color: 0xffffff,
});


function createMonitor() {

    const monitorStand = new THREE.Mesh(monitorStandGeometry, materialBlack);
    const screenBackGround = new THREE.Mesh(screenBackGroundGeometry, materialBlack);
    const screen = new THREE.Mesh(screenGeometry, materialWhite);
    monitorStand.position.x = -1.5;
    monitorStand.position.y = -2.5;
    monitorStand.position.z = 1.5;

    screenBackGround.position.x = -1.5;
    screenBackGround.position.y = 6;
    screenBackGround.position.z = 2;

    screen.position.x = -1.5;
    screen.position.y = 6;
    screen.position.z = 2.01;

    const monitor = new THREE.Mesh();
    monitor.add(monitorStand);
    monitor.add(screenBackGround);
    monitor.add(screen);


    return monitor;
}



/**
 * The Renderer of the Scene.
 * @type {WebGLRenderer}
 */
import {FontLoader} from "../lib/three/examples/jsm/loaders/FontLoader.js";
// import {TextGeometry} from "../lib/three/examples/jsm/geometries/TextGeometry";

const renderer = new THREE.WebGLRenderer();
/**
 * The scene, which gets rendered by the @renderer.
 * @type {Scene}
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1, 1000);
/**
 * Dimensions of the Floor.
 * @type {number}
 */
const floorWidth = 1000;
const floorDepth = 1000;

/**
 * Lighting options.
 */
const pointLight = generatePointLight(0xffffff, 2);
const ambientLight = generateAmbientLighting(0xffffff, 1);
/**
 * scene has in this case only one floor.
 * @type {Mesh}
 */
const floor = generateFloor(floorWidth, floorDepth);
const sphere = generateSphere( 2, 60, 60);
const gui = new dat.GUI();
//wconst controls = new THREE.OrbitControls(camera, renderer.domElement);
const keyboard = new THREEx.KeyboardState();
const loader = new FontLoader();
const monitor = createMonitor();

loader.load( 'font/Quicksand_Bold.json', function ( font ) {

    let geo = new TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    } );
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(255, 165, 0)',
    });
    let mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
} );

/**
 * Code Block responsible for switching to the 3D-World.
 */
document.getElementById("start").addEventListener("click", function () {
    main();
    document.getElementById("startDiv").style = "display:none;";
    document.getElementById("webgl").style = "display:block;"
})

/**
 * Main function. Builds first Scene with three.js
 */
function main() {

    floor.name = "floor";
    floor.rotation.x = Math.PI / 2;

    // generateBoxes(floor, 10, 10, 2,2,2, 3, 3, 0, 0, -2);


    sphere.position.y =  10;
    sphere.position.z = -10;
    floor.add(sphere);
    ambientLight.positionY = 10;
    pointLight.position.y = 10;
    gui.add(ambientLight, 'intensity', 0.02);
    scene.add(floor);
    scene.add(ambientLight);
    scene.add(monitor);
    monitor.position.z = -1;

    camera.position.x = 10;
    camera.position.y = 50;
    camera.position.z = 100;

    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(255,255,255)');
    document.getElementById("webgl").appendChild(renderer.domElement);

    update(renderer, scene, camera);
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


function generateSphere(radius, widthSegments, heightSegments) {
    let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    let material = new THREE.MeshPhongMaterial( {
        color: 0x000088,
    } );
    let sphere = new THREE.Mesh( geometry, material );
    return sphere;
}

/**
 * Updates the scenery all the time.
 * @param renderer
 * @param scene
 * @param camera
 * @param controls
 */
function update(renderer, scene, camera) {
    renderer.render(scene, camera);
    scene.traverse(function (child) {

    });
    camera.lookAt(new THREE.Vector3(sphere.position.x, sphere.position.y , sphere.position.z));


    if(keyboard.pressed("A")) {
        sphere.translateX(0.05);
    } else if(keyboard.pressed("D")) {
        sphere.translateX(-0.05);
    } else if(keyboard.pressed("W")) {
        sphere.translateY(-0.05);
    } else if(keyboard.pressed("S")) {
        sphere.translateY(0.05);
    }

    requestAnimationFrame(function () {
        update(renderer, scene, camera);
        }
    );
}


