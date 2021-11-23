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
const pointLight = generatePointLight(0xffffff, 2);
const ambientLight = generateAmbientLighting(0xffffff, 1);
/**
 * scene has in this case only one floor.
 * @type {Mesh}
 */
const floor = generateFloor(floorWidth, floorDepth);
const sphere = generateSphere( 2, 60, 60);
const gui = new dat.GUI();
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
    let material = new THREE.MeshBasicMaterial( {
        color: 0xffff00
    } );
    let sphere = new THREE.Mesh( geometry, material );
    return sphere;
}

/**
 * Updates the scenery all the time.
 * @param renderer
 * @param scene
 * @param camera
 */
function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera);
    scene.traverse(function (child) {

    });
    camera.lookAt(new THREE.Vector3(sphere.position.x, sphere.position.y , sphere.position.z ));
    controls.update();
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
        }
    );
}


