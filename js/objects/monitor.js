

export class Monitor extends THREE.Mesh {

    /**
     * Constructs a monitor. Positions all Parts required for the monitor relative to each other.
     * A monitor consists of a monitorStand, a screenBackGround and the screen itself.
     *
     * @param texture the image/texture which should be displayed on the screen. Should be in 16:9 aspect ratio.
     * @param scale the scale/size of the monitor.
     */
    constructor(texture, scale) {
        super();
        const monitorStandGeometry = new THREE.BoxGeometry(1*scale,5*scale,1*scale);
        const screenBackGroundGeometry = new THREE.BoxGeometry(10*scale,5*scale,1*scale);
        const screenGeometry = new THREE.BoxGeometry(9.5*scale,4.5*scale,1*scale);

        const materialBlack = new THREE.MeshPhongMaterial({color: 0x000000});
        const materialWhite = new THREE.MeshPhongMaterial({color: 0xffffff});

        const materialScreen = new THREE.MeshPhongMaterial({map:texture})
        const monitorStand = new THREE.Mesh(monitorStandGeometry, materialBlack);
        const screenBackGround = new THREE.Mesh(screenBackGroundGeometry, materialBlack);
        const screen = new THREE.Mesh(screenGeometry, materialScreen);

        monitorStand.position.x = -1.5 * scale;
        monitorStand.position.y = 2.5 * scale;
        monitorStand.position.z = 1.5 * scale;

        screenBackGround.position.x = -1.5 * scale;
        screenBackGround.position.y = 6 * scale;
        screenBackGround.position.z = 2 * scale;

        screen.position.x = -1.5*scale;
        screen.position.y = 6*scale;
        screen.position.z = 2.10*scale;

        this.monitor = new THREE.Group();
        this.monitor.add(monitorStand);
        this.monitor.add(screenBackGround);
        this.monitor.add(screen);
        this.monitor.castShadow = true;

    }

    getMesh() {
        return this.monitor;
    }

    setPosition(x,y,z) {
        this.monitor.position.x = x;
        this.monitor.position.y = y;
        this.monitor.position.z = z;
    }
}
