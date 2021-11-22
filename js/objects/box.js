/**
 * Generates a box.
 * @param w width
 * @param h height
 * @param d depth
 * @param x position-x
 * @param y position-y
 * @param z position-z
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
 * @param rows
 * @param cols
 * @param w width
 * @param d depth
 * @param h height
 * @param dx the distance between the the boxes on x-axis
 * @param dy distance between the boxes on y-axis.
 * @param start
 * @param end
 * @param z
 */
function generateBoxes(floor, rows, cols, w, h, d, dx, dy, start, end, z) {
    for(let i = start; i < rows + start; i++) {
        for(let j = end; j < cols + end ;j++) {
            let box = generateBox(w,h,d,i*dx,j*dy, z);
            floor.add(box);
        }
    }
}
