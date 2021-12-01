import {Box} from "./box.js";

export class Keyboard extends THREE.Mesh {

    constructor(scale) {
        super();
        this.keyboard = new THREE.Group();
        this.box1 = new Box(10*scale,0.4*scale,4*scale, "rgb(46,46,46)");
        this.box2 = new Box(10*scale,0.4*scale,4*scale,"rgb(46,46,46)");
        this.box2.rotate(5/180*Math.PI, 0 ,0);
        this.box2.setPosition(0,0.35,0);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                let key = new Box(0.4,0.2,0.4, "rgb(0,0,0)");
                key.rotate(5/180*Math.PI,0,0);
                key.setPosition(-4.6 +i, 0.687-j/15, -1.5+j);
                this.keyboard.add(key.getMesh());
            }
        }
        this.keyboard.add(this.box1.getMesh());
        this.keyboard.add(this.box2.getMesh());

    }

    getMesh() {
        return this.keyboard;
    }

    setPosition(x,y,z) {
        this.keyboard.position.x = x;
        this.keyboard.position.y = y;
        this.keyboard.position.z = z;
    }


}
