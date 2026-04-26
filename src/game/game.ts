import type { PlayerController } from './player/PlayerController';
import {SceneBootstrapper} from './SceneBootstrapper';
import {Scene, Color, WebGLRenderer, Camera} from 'three';

interface AnimateCallbackDepednencies{
  playerController: PlayerController,
  camera: Camera
}

export class Game{
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _lastFrameTime = 0;
  private set lastFrameTime(time: number){
    this._deltaTime = time - this._lastFrameTime;
    this._lastFrameTime = time; 
  }
  private _deltaTime = 0;


  public constructor()
  {
    const scene = this._scene = new Scene();
    scene.background = new Color(0xf8d840);

    const renderer = this._renderer = new WebGLRenderer({});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    this._init();
  }

  private async _init()
  {
    const {_renderer: renderer} = this;
    const sceneBuilder = new SceneBootstrapper(this._scene);
    const sceneBuiltObjects = await sceneBuilder.createScene();

      renderer.setAnimationLoop( (time: number) => {
        this._animate(sceneBuiltObjects, time)
      });
  }

  private _animate({playerController, camera}: AnimateCallbackDepednencies, time: number)
  {
    this.lastFrameTime = time;

    playerController.update(this._deltaTime);
    
    this._renderer.render(this._scene, camera)
  }
}

