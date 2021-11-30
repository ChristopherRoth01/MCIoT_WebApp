import {Monitor} from "./objects/monitor.js";
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
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1, 1000);
const clock = new THREE.Clock();
/**
 * Dimensions of the Floor.
 * @type {number}
 */
const floorWidth = 100;
const floorDepth = 100;
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
    camera.position.set(0,10,40);
    floor.name = "floor";
    floor.rotation.x = Math.PI / 2;
    sphere.position.z = -2;
    floor.add(sphere);
    ambientLight.position.y = 10;
    pointLight.position.y = 10;
    gui.add(ambientLight, 'intensity', 0.02);
    gui.add(pointLight, 'intensity', 0.02);
    scene.add(floor);

    scene.add(pointLight);
    scene.add(ambientLight);
    scene.add(monitor.getMesh());
    scene.add(monitor2.getMesh());
    scene.add(monitor3.getMesh());

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
        camera.translateX(step);
        let img = keyRight.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißRight.jpg");
    } else if(keyboard.pressed("A")) {
        sphere.translateX(-step);
        camera.translateX(-step);
        let img = keyLeft.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißLeft.jpg");
    } else if(keyboard.pressed("W")) {
        sphere.translateY(-step);
        camera.translateZ(-step);
        let img = keyUp.children[0];
        img.setAttribute("src", "img/tastaturKeysWeißUp.jpg");
    } else if(keyboard.pressed("S")) {
        sphere.translateY(step);
        camera.translateZ(step);
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

        const webgl = document.getElementById("webgl");
        webgl.addEventListener("mouseover", function (event) {
            keyUp.children[0].setAttribute("src", "img/tastaturKeysSchwarzUp.jpg");
            keyDown.children[0].setAttribute("src", "img/tastaturKeysSchwarzDown.jpg");
            keyLeft.children[0].setAttribute("src", "img/tastaturKeysSchwarzLeft.jpg");
            keyRight.children[0].setAttribute("src", "img/tastaturKeysSchwarzRight.jpg");

        })


        keyUp.addEventListener("mouseover", function (event) {
            let img = keyUp.children[0];
            img.setAttribute("src", "img/tastaturKeysWeißUp.jpg");
        });
        keyDown.addEventListener("mouseover", function (event) {
            let img = keyDown.children[0];
            img.setAttribute("src", "img/tastaturKeysWeißDown.jpg");
        });

        keyLeft.addEventListener("mouseover", function (event) {
            let img = keyLeft.children[0];
            img.setAttribute("src", "img/tastaturKeysWeißLeft.jpg");
        });

        keyRight.addEventListener("mouseover", function (event) {
            let img = keyRight.children[0];
            img.setAttribute("src", "img/tastaturKeysWeißRight.jpg");
        })




