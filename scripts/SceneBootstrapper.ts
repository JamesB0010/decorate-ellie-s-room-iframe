import * as THREE from 'three';
import {GLTF, GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController } from './PlayerController.js';

export class SceneBootstrapper {
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private gltfLoader: GLTFLoader = new GLTFLoader();

    constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
    }

    public async createScene(){
        const roomGLTF = await this.gltfLoader.loadAsync("../assets/room.glb");
            
        const room = roomGLTF.scene;
        room.scale.set(40, 40, 40);
        this.scene.add(room);

        const playerController = new PlayerController(this.renderer, 0, 0);
        this.scene.add(playerController.body);

        return {
            room: room,
            playerController: playerController,
            camera: playerController.camera
        }
    }
}