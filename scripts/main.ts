import * as THREE from 'three';
import {SceneBootstrapper} from './sceneBuilder.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8d840);
const sceneBuilder = new SceneBootstrapper(scene);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1.6;
camera.position.y = 1;

const renderer = new THREE.WebGLRenderer({ 
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let lastFrameTime = 0;

const init = async () => {
  const {room} = await sceneBuilder.createScene();
  room.position.y += 0.3;
  const roomStartingY = room.position.y;
  
  camera.lookAt(room.position);

  renderer.setAnimationLoop( animate );

  function animate( time: number ) {
    const dt = time - lastFrameTime;
    lastFrameTime = time;
    room.rotation.y += dt * 0.0003;
    room.position.y = roomStartingY + Math.sin(time * 0.001) * 0.1;

    renderer.render( scene, camera );
  }
}


init();