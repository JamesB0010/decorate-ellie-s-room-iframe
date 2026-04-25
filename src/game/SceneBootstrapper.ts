import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController } from './PlayerController.js';
import { InputManager } from './input/inputManager.js';

export class SceneBootstrapper {
    private scene: THREE.Scene;
    private gltfLoader: GLTFLoader = new GLTFLoader();

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    public async createScene(){
        const inputManager = new InputManager();

        const roomGLTF = await this.gltfLoader.loadAsync("../assets/room.glb");
            
        const room = roomGLTF.scene;
        room.scale.set(40, 40, 40);
        this.scene.add(room);

        const playerController = new PlayerController(inputManager, 0, 0);
        this.scene.add(playerController.body);

        return {
            room: room,
            playerController: playerController,
            camera: playerController.camera
        }
    }
}