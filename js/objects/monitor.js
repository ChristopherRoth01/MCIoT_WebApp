
const monitorStandGeometry = new THREE.BoxGeometry(1*2,5*2,1*2);
const screenBackGroundGeometry = new THREE.BoxGeometry(10*2,5*2,1*2);
const screenGeometry = new THREE.BoxGeometry(9.5*2,4.5*2,1*2);

const materialBlack = new THREE.MeshPhongMaterial({
    color: 0x000000,
});

const materialWhite = new THREE.MeshPhongMaterial({
    color: 0xffffff,
});



class Monitor extends THREE.Mesh {

    constructor() {
        super();
        const monitorStand = new THREE.Mesh(monitorStandGeometry, materialBlack);
        const screenBackGround = new THREE.Mesh(screenBackGroundGeometry, materialBlack);
        const screen = new THREE.Mesh(screenGeometry, materialWhite);
        monitorStand.position.x = -1.5*2;
        monitorStand.position.y = 2.5*2;
        monitorStand.position.z = 1.5*2;

        screenBackGround.position.x = -1.5*2;
        screenBackGround.position.y = 6*2;
        screenBackGround.position.z = 2 *2;

        screen.position.x = -1.5*2;
        screen.position.y = 6*2;
        screen.position.z = 2.01*2;

        this.monitor = new THREE.Group();
        this.monitor.add(monitorStand);
        this.monitor.add(screenBackGround);
        this.monitor.add(screen);

        this.monitor.castShadow = true;

    }

    getMesh() {
        return this.monitor;
    }
}
