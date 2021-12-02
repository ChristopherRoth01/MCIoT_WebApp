import {Monitor} from "./objects/monitor.js";
import {Keyboard} from "./objects/keyboard.js";
/**
 * The Renderer of the Scene.
 * @type {HTMLElement}
 */

const keyUp = document.getElementById("topControl");
const keyDown = document.getElementById("bottomControl");
const keyLeft=document.getElementById("leftControl");
const keyRight = document.getElementById("rightControl");

const renderer = new THREE.WebGLRenderer();
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
const sphere = generateSphere( 2, 60, 60);
const gui = new dat.GUI();
//const controls = new THREE.OrbitControls(camera, renderer.domElement);
const keyboard = new THREEx.KeyboardState();
const monitor = new Monitor();
const monitor2 = new Monitor();
const monitor3 = new Monitor();
const keyboardBox1 = new Keyboard(1);
const keyboardBox2 = new Keyboard(1);
const keyboardBox3 = new Keyboard(1);
/**
 * Code Block responsible for switching to the 3D-World.
 */
document.getElementById("start").addEventListener("click", function () {
    main();
    document.getElementById("startDiv").style = "display:none;";
    document.getElementById("webgl").style = "display:block;"
    document.getElementById("keyBoardControls").style = "display:grid;"

})

/**
 * Main function. Builds first Scene with three.js
 */
function main() {
    camera.position.set(60,40,80);
    camera.rotation.x = -30/180*Math.PI;
    camera.rotation.y =30/180*Math.PI;
    camera.rotation.z = 15/180*Math.PI;
    floor.name = "floor";
    floor.rotation.x = Math.PI / 2;
    sphere.position.z = -2;
    floor.add(sphere);
    ambientLight.position.y = 10;
    pointLight.position.y = 10;
    gui.add(ambientLight, 'intensity', 0.02);
    gui.add(pointLight, 'intensity', 0.02);
    scene.add(floor);
    scene.add(keyboardBox1.getMesh());
    scene.add(keyboardBox2.getMesh());
    scene.add(keyboardBox3.getMesh());

    scene.add(pointLight);
    scene.add(ambientLight);
    scene.add(monitor.getMesh());
    scene.add(monitor2.getMesh());
    scene.add(monitor3.getMesh());
    keyboardBox1.setPosition(-5, 0,15);
    keyboardBox2.setPosition(25, 0,15)
    keyboardBox3.setPosition(-35, 0,15)
    monitor.setPosition(30,0,0);
    monitor3.setPosition(-30,0,0);
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
    let speed = 10;
    renderer.render(scene, camera);
    let step = speed*clock.getDelta();
    if(keyboard.pressed("D")) {
        sphere.translateX(step);
        camera.position.x += step;
        let img = keyRight.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißRight.jpg");
    } else if(keyboard.pressed("A")) {
        sphere.translateX(-step);
        camera.position.x -= step;
        let img = keyLeft.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißLeft.jpg");
    } else if(keyboard.pressed("W")) {
        sphere.translateY(-step);
        camera.position.z -= step;
        let img = keyUp.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißUp.jpg");
    } else if(keyboard.pressed("S")) {
        sphere.translateY(step);
        camera.position.z += step;
        let img = keyDown.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißDown.jpg");
    }
    if(!keyboard.pressed("D")) {
        let img = keyRight.children[0];
        img.setAttribute("src", "img/tastaturKeysSchwarzRight.jpg");
    }
    if(!keyboard.pressed("A")) {
        let img = keyLeft.children[0];
        img.setAttribute("src", "img/tastaturKeysSchwarzLeft.jpg");
    }
    if (!keyboard.pressed("W")) {
        let img = keyUp.children[0];
        img.setAttribute("src", "img/tastaturKeysSchwarzUp.jpg");
    }
    if (!keyboard.pressed("S")) {
        let img = keyDown.children[0];
        img.setAttribute("src", "img/tastaturKeysSchwarzDown.jpg");
    }
    //TODO: Code above is really bullshit
    pointLight.position.x = sphere.position.x;
    pointLight.position.z = sphere.position.y;
    requestAnimationFrame(function () {
            update(renderer, scene, camera);
        }
    );
}





