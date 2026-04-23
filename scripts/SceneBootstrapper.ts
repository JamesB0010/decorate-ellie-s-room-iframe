import * as THREE from 'three';
import {GLTF, GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController } from './PlayerController.js';

export class SceneBootstrapper {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private gltfLoader: GLTFLoader = new GLTFLoader();

    constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }

    public async createScene(){
        const roomGLTF = await this.gltfLoader.loadAsync("../assets/room.glb");
            
        const room = roomGLTF.scene;
        this.scene.add(room);

        const playerController = new PlayerController(this.camera, this.renderer, 0, 0);

        return {
            room: room,
            playerController: playerController
        }
    }
}