/**
 * Creates a Box. Height and Color are needed for construction, rotation and Position are adjustable.
 */
export class Box extends THREE.Mesh {
    constructor(w, h, d, color) {
        super();
        let geo = new THREE.BoxGeometry(w, h, d);
        let material = new THREE.MeshBasicMaterial({
            color: color,
        });
        this.mesh = new THREE.Mesh(geo, material);
        this.mesh.castShadow = false;
    }

    setPosition(x, y, z) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    getMesh() {
        return this.mesh;
    }
    rotate(x,y,z) {
        this.mesh.rotation.x = x;
        this.mesh.rotation.y = y;
        this.mesh.rotation.z = z;
    }
}
