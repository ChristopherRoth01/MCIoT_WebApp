import {Keyboard} from "./keyboard.js";
import {Monitor} from "./monitor.js";


export class Computer extends THREE.Mesh {

    constructor(texture) {
        super();
        const keyboard = new Keyboard(1);
        keyboard.setPosition(-5,0,15);
        const monitor = new Monitor(texture, 2);

        this.computer = new THREE.Group();
        this.computer.add(keyboard.getMesh());
        this.computer.add(monitor.getMesh());
    }

    getMesh() {
        return this.computer;
    }

    setPosition(x,y,z) {
        this.computer.position.x = x;
        this.computer.position.y = y;
        this.computer.position.z = z;
    }
}