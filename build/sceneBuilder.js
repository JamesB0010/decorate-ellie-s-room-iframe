var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from 'three';
//impor {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.ts';
export class SceneBootstrapper {
    //private gltfLoader: GLTFLoader = new GLTFLoader();
    constructor(scene) {
        this.scene = scene;
    }
    createScene() {
        return __awaiter(this, void 0, void 0, function* () {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
            // const room = await this.gltfLoader.loadAsync("../assets/room.glb").then((gltf) => {
            //     this.scene.add(gltf.scene);
            // }).catch((error) => {
            //     console.error("Error loading GLTF model:", error);
            // });
            return {
                cube: cube
            };
        });
    }
}
