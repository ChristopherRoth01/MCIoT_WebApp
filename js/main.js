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
/**
 * Dimensions of the Floor.
 * @type {number}
 */
const floorWidth = 100;
const floorDepth = 100;

/**
 * scene has in this case only one floor.
 * @type {Mesh}
 */
const floor = generateFloor(floorWidth, floorDepth);


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

    generateBoxes(floor, 10, 10, 2,2,2, 3, 3, 0, 0, -2);

    let sphere = generateSphere( 10, 60, 60);
    floor.add(sphere);
    let pointLight = generatePointLight(0xffffff, 2);
    pointLight.position.y = 10;
    scene.add(floor);
    scene.add(pointLight);

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1, 1000);
    camera.position.x = 1;
    camera.position.y = 5;
    camera.position.z = 10;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(255,255,255)');
    document.getElementById("webgl").appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);
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
    let floor = scene.getObjectByName('floor');
    scene.traverse(function (child) {

    });

    controls.update();
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
        }
    );
}

const loader = new FontLoader();

loader.load( '/font/Quicksand_Bold.json', function ( font ) {

    const geometry = new TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    });
    const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: 0xad4000}),
        new THREE.MeshPhongMaterial({color: 0x5c2301})
    ])
    textMesh.castShadow = true;
    textMesh.positionZ= -10;
    floor.add(textMesh);
    console.log("text hinzugefügt!");

});
