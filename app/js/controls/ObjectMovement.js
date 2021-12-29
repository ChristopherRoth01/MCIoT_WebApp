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
            this.sphere.rotation.y = 90/180*Math.PI;
            this.camera.position.x += this.step;
            keyRight.children[0].setAttribute("src", "img/keyBoard/tastaturKeysWeißRight.jpg");
        } else if (keyboard.pressed("A")) {
            this.sphere.position.x -= this.step;
            this.sphere.rotation.y = -90/180*Math.PI;
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

    moveAcceleratorInput() {
        navigator.permissions.query({ name: 'accelerometer' })
            .then(result => {
                if (result.state === 'denied') {
                    console.log('Permission to use accelerometer sensor is denied.');
                    return;
                }
                let accelerometer = null;
                try {
                    accelerometer = new Accelerometer({frequency: 60});
                    accelerometer.addEventListener('error', event => {
                        // Handle runtime errors.
                        if (event.error.name === 'NotAllowedError') {
                            // Branch to code for requesting permission.
                        } else if (event.error.name === 'NotReadableError' ) {
                            console.log('Cannot connect to the sensor.');
                        }
                    });
                    accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
                    accelerometer.start();
                    console.log(accelerometer);
                } catch (error) {
                    // Handle construction errors.
                    if (error.name === 'SecurityError') {
                        // See the note above about feature policy.
                        console.log('Sensor construction was blocked by a feature policy.');
                    } else if (error.name === 'ReferenceError') {
                        console.log('Sensor is not supported by the User Agent.');
                    } else {
                        throw error;
                    }
                }
            });
    }

}