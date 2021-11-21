document.getElementById("start").addEventListener("click", function () {
    main();
    document.getElementById("startDiv").style = "display:none;";
    document.getElementById("webgl").style = "display:block;"
})

/**
 * Main function. Builds first Scene with three.js
 */
function main() {
    let scene = new THREE.Scene();
    let floor = generateFloor(100, 100);
    floor.name = "floor";
    floor.rotation.x = Math.PI / 2;

    generateBoxes(floor, 10, 10, 2,2,2, 3, 3, 0, 0, -2);

    let pointLight = generatePointLight(0xffffff, 2);
    pointLight.position.y = 10;

    scene.add(floor);
    scene.add(pointLight);

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1, 1000);
    camera.position.x = 1;
    camera.position.y = 5;
    camera.position.z = 10;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let renderer = new THREE.WebGLRenderer();
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

/**
 * Generates a box.
 * @param w width
 * @param h height
 * @param d depth
 * @returns {Mesh} Box
 */
function generateBox(w, h, d, x, y, z) {
    let geo = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(0, 100, 100)',
    });
    let mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    return mesh;
}

/**
 * Generates an specific amount of boxes and places them on a floor.
 * @param floor
 * @param w width
 * @param d depth
 * @param h height
 * @param dx the distance between the the boxes on x-axis
 * @param dy distance between the boxes on y-axis.
 */
function generateBoxes(floor, rows, cols, w, h, d, dx, dy, start, end, z) {
    for(let i = start; i < rows + start; i++) {
        for(let j = end; j < cols + end ;j++) {
            let box = generateBox(w,h,d,i*dx,j*dy, z);
            floor.add(box);
        }
    }
}

/**
 * The Lighter for the hole scenery
 */
function generatePointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    return light;
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
//    scene.children[0].rotation.y += 0.002;
  //  floor.rotation.z += 0.0005;
    scene.traverse(function (child) {
      //  child.position.x += 0.01;
    });

    controls.update();
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
        }
    );
}

