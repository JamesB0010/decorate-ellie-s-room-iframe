import * as THREE from 'three';
import {GLTF, GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

export class SceneBootstrapper {
    private scene: THREE.Scene;
    private gltfLoader: GLTFLoader = new GLTFLoader();

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    public async createScene(){
        const roomGLTF = await this.gltfLoader.loadAsync("../assets/room.glb");
            
        const room = roomGLTF.scene;
        this.scene.add(room);

        return {
            room: room
        }
    }
}