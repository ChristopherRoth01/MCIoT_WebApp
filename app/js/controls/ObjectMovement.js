const keyUp = document.getElementById("topControl");
const keyDown = document.getElementById("bottomControl");
const keyLeft=document.getElementById("leftControl");
const keyRight = document.getElementById("rightControl");
const keyboard = new THREEx.KeyboardState();

/**
 * Responsible for the conversion of KeyBoard inputs
 */
export class ObjectMovement {
    constructor(camera, sphere, step) {
        this.camera = camera;
        this.sphere = sphere;
        this.step = step;
    }

    reset() {
        keyDown.children[0].setAttribute("src", "img/keyBoard/tastaturKeysSchwarzDown.jpg");
        keyRight.children[0].setAttribute("src", "img/keyBoard/tastaturKeysSchwarzRight.jpg");
        keyUp.children[0].setAttribute("src", "img/keyBoard/tastaturKeysSchwarzUp.jpg");
        keyLeft.children[0].setAttribute("src", "img/keyBoard/tastaturKeysSchwarzLeft.jpg");
    }

    moveKeyboardInput() {
        if (keyboard.pressed("D")) {
            this.sphere.position.x += this.step;
            this.sphere.rotation.y = 0.5*Math.PI;
            this.camera.position.x += this.step;
            keyRight.children[0].setAttribute("src", "img/keyBoard/tastaturKeysWeißRight.jpg");
        } else if (keyboard.pressed("A")) {
            this.sphere.position.x -= this.step;
            this.sphere.rotation.y = -0.5*Math.PI;
            this.camera.position.x -= this.step;
            let img = keyLeft.children[0];
            img.setAttribute("src", "img/keyBoard/tastaturKeysWeißLeft.jpg");
        } else if (keyboard.pressed("W")) {
            this.sphere.position.z -=this.step;
            this.sphere.rotation.y = Math.PI;
            this.camera.position.z -= this.step;
            let img = keyUp.children[0];
            img.setAttribute("src", "img/keyBoard/tastaturKeysWeißUp.jpg");
        } else if (keyboard.pressed("S")) {
            this.sphere.position.z += this.step;
            this.sphere.rotation.y = 0;
            this.camera.position.z += this.step;
            let img = keyDown.children[0];
            img.setAttribute("src", "img/keyBoard/tastaturKeysWeißDown.jpg");
        }
    }

    getPositionX() {
        return this.sphere.position.x;
    }
    getPositionY() {
        return this.sphere.position.y;
    }
    getPositionZ() {
        return this.sphere.position.z;
    }


}
