import * as THREE from 'three';
//impor {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.ts';

export class SceneBootstrapper {
    private scene: THREE.Scene;
    //private gltfLoader: GLTFLoader = new GLTFLoader();

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    public async createScene(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        // const room = await this.gltfLoader.loadAsync("../assets/room.glb").then((gltf) => {
        //     this.scene.add(gltf.scene);
        // }).catch((error) => {
        //     console.error("Error loading GLTF model:", error);
        // });


        return {
            cube: cube
        }
    }
}