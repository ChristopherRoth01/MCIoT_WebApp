export class Box extends THREE.Mesh {
    constructor(w, h, d) {
        super();
        let geo = new THREE.BoxGeometry(w, h, d);
        let material = new THREE.MeshPhongMaterial({
            color: 'rgb(0, 100, 100)',
        });
        let mesh = new THREE.Mesh(geo, material);
        mesh.castShadow = true;
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
}
