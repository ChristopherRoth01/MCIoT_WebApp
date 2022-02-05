import {Box} from "./box.js";

export class Lantern {
    materialBlack = new THREE.MeshPhongMaterial({color: 0x000000});
    materialWhite = new THREE.MeshPhongMaterial({color: 0xffffff});


    constructor(scale,intensity) {
        const lanternPost = new THREE.BoxGeometry(scale*1, scale*7, scale*1);
        const lanternLight = new THREE.BoxGeometry(scale*2, scale*2, scale*2);
        const pointLight = new THREE.PointLight(0xffffff, intensity, 150);

        const lanternPostMesh = new THREE.Mesh(lanternPost, this.materialBlack);
        const lanternLightMesh = new THREE.Mesh(lanternLight, this.materialWhite );
        lanternLightMesh.position.x = 0;
        lanternLightMesh.position.y = scale *7/2;
        lanternLightMesh.position.z = 0;
        pointLight.position.x = lanternLightMesh.position.x;
        pointLight.position.y = lanternLightMesh.position.y;
        pointLight.position.z = lanternLightMesh.position.z;
        this.lantern = new THREE.Group();
        this.lantern.add(pointLight);
        this.lantern.add(lanternPostMesh);
        this.lantern.add(lanternLightMesh);
    }

    getMesh() {
        return this.lantern;
    }

    setPosition(x,y,z) {
        this.lantern.position.x = x;
        this.lantern.position.y = y;
        this.lantern.position.z = z;
    }


}
