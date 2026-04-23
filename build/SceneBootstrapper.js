var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController } from './PlayerController.js';
export class SceneBootstrapper {
    constructor(scene, camera, renderer) {
        this.gltfLoader = new GLTFLoader();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }
    createScene() {
        return __awaiter(this, void 0, void 0, function* () {
            const roomGLTF = yield this.gltfLoader.loadAsync("../assets/room.glb");
            const room = roomGLTF.scene;
            this.scene.add(room);
            const playerController = new PlayerController(this.camera, this.renderer, 0, 0);
            return {
                room: room,
                playerController: playerController
            };
        });
    }
}
