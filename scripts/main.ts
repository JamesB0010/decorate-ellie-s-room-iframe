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

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1.6;
camera.position.y = 1;

const sceneBuilder = new SceneBootstrapper(scene, camera, renderer);


let lastFrameTime = 0;
const init = async () => {
  const {playerController} = await sceneBuilder.createScene();
  
  renderer.setAnimationLoop( animate );

  function animate( time: number ) {
    const dt = time - lastFrameTime;
    lastFrameTime = time;

    playerController.update(dt);

    renderer.render( scene, camera );
  }
}


init();