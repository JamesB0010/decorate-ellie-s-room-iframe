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
import { SceneBootstrapper } from './SceneBootstrapper.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8d840);
const renderer = new THREE.WebGLRenderer({});
const { domElement: canvas } = renderer;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
canvas.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield canvas.requestPointerLock({
        unadjustedMovement: true,
    });
}));
const sceneBuilder = new SceneBootstrapper(scene, renderer);
let lastFrameTime = 0;
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const { playerController, camera } = yield sceneBuilder.createScene();
    renderer.setAnimationLoop(animate);
    function animate(time) {
        const dt = time - lastFrameTime;
        lastFrameTime = time;
        playerController.update(dt);
        renderer.render(scene, camera);
    }
});
init();
