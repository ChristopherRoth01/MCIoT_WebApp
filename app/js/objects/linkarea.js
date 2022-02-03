/**
 * Code from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 *
 */
let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
let regex = new RegExp(expression);

/**
 * Area which has a link to a webpage.
 */
export class LinkArea extends THREE.Mesh {
    link; w; h;
    constructor(link, w, h) {
        super();
        if(link.match(regex)) {
            this.w = w;
            this.h = h;
            this.link = link;
            this.group = new THREE.Group;
            this.geo = new THREE.PlaneGeometry(this.w, this.h);
            this.bordergeo = new THREE.PlaneGeometry(this.w + 2, this.h + 2);
            this.borderMaterial = new THREE.MeshPhongMaterial(
                {color: 0x000000,
                    side: THREE.DoubleSide}
            )
            this.material = new THREE.MeshPhongMaterial(
                {color: 'rgb(255, 165, 0)',
                    side: THREE.DoubleSide}
            );
            this.borderMesh = new THREE.Mesh(this.bordergeo,this.borderMaterial);
            this.mesh = new THREE.Mesh(this.geo, this.material);
            this.group.add(this.mesh);
            this.mesh.position.z = -0.1;
            this.group.add(this.borderMesh)
            this.group.rotation.x = Math.PI / 2;
        } else {
            alert("Das hat nicht funktioniert");
        }
    }

    assignNewLink(link) {
        this.link = link;
    }

    openUrl() {
        window.open(this.link,'mywindow','width=400,height=200,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes')
    }

    getMesh() {
        return this.group;
    }

    setPosition(x,y,z) {
        this.group.position.x = x;
        this.group.position.y = y;
        this.group.position.z = z;
    }

    getWidth() {
        return this.w;
    }

    getHeight() {
        return this.h;
    }


}
