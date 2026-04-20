import * as THREE from 'three';
import {SceneBootstrapper} from './sceneBuilder.js';

const scene = new THREE.Scene();
const sceneBuilder = new SceneBootstrapper(scene);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const init = async () => {
  const {cube} = await sceneBuilder.createScene();
  renderer.setAnimationLoop( animate );

  function animate( time: number ) {
    renderer.render( scene, camera );
  }
}


init();