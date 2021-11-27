

/**
 * The Renderer of the Scene.
 * @type {WebGLRenderer}
 */
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
const floorWidth = 100;
const floorDepth = 100;
/**
 * Lighting options.
 */
const pointLight = generatePointLight(0xffffff, 1);
const ambientLight = generateAmbientLighting(0xffffff, 1);
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
    ambientLight.positionY = 10;
    pointLight.position.y = 10;
    gui.add(ambientLight, 'intensity', 0.02);
    gui.add(pointLight, 'intensity', 0.02);
    scene.add(floor);
    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(monitor.getMesh());
    scene.add(monitor2.getMesh());
    scene.add(monitor3.getMesh());

    monitor.position.x = 30;
    monitor3.position.x = -30;
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


function createMonitor() {


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
    if(keyboard.pressed("D")) {
        sphere.translateX(0.1);
        camera.translateX(0.1);
    } else if(keyboard.pressed("A")) {
        sphere.translateX(-0.1);
        camera.translateX(-0.1);
    } else if(keyboard.pressed("W")) {
        sphere.translateY(-0.1);
        camera.translateZ(-0.1);
    } else if(keyboard.pressed("S")) {
        sphere.translateY(0.1);
        camera.translateZ(0.1);
    }
    pointLight.position.x = sphere.position.x;
    pointLight.position.z = sphere.position.y;


    requestAnimationFrame(function () {
        update(renderer, scene, camera);
        }
    );
}


