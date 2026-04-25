import * as THREE from 'three';
import {SceneBootstrapper} from './SceneBootstrapper.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8d840);

const renderer = new THREE.WebGLRenderer({});
const {domElement: canvas} = renderer;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


canvas.addEventListener("click", async () => {
  await canvas.requestPointerLock({
    unadjustedMovement: true,
  });
});

const sceneBuilder = new SceneBootstrapper(scene);


let lastFrameTime = 0;
const init = async () => {
  const {playerController, camera} = await sceneBuilder.createScene();
  
  renderer.setAnimationLoop( animate );

  function animate( time: number ) {
    const dt = time - lastFrameTime;
    lastFrameTime = time;

    playerController.update(dt);

    renderer.render( scene, camera );
  }
}


init();