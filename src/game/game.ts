import { InputManager } from './input/InputManager';
import type { PlayerController } from './player/PlayerController';
import {SceneBootstrapper} from './SceneBootstrapper';
import {Scene, Color, WebGLRenderer, Camera} from 'three';

interface AnimateCallbackDepednencies{
  playerController: PlayerController,
  camera: Camera
}

export class Game{
  private _hasStarted = false;
  public get hasStarted(): boolean
  {
    return this._hasStarted;
  }

  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _lastFrameTime = 0;
  private set lastFrameTime(time: number){
    this._deltaTime = time - this._lastFrameTime;
    this._lastFrameTime = time; 
  }
  private _deltaTime = 0;
  private _mountedToDom = false;

  private _sceneBootstrapper: SceneBootstrapper;

  private _onResizeBound = this._onResize.bind(this);

  public constructor()
  {
    const scene = this._scene = new Scene();
    scene.background = new Color(0xf8d840);

    this._sceneBootstrapper = new SceneBootstrapper(scene, new InputManager());

    const renderer = this._renderer = new WebGLRenderer({});
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  private _mountToDom()
  {
    if (!this._mountedToDom)
    {
      document.body.appendChild(this._renderer.domElement);

      window.addEventListener("resize", this._onResizeBound);

      this._mountedToDom = true;
    }
  }

  private _onResize(){
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public async start()
  {
    if (this._hasStarted)
      return;

    this._hasStarted = true;

    const {_renderer: renderer} = this;
    const sceneBuiltObjects = await this._sceneBootstrapper.createScene();

    this._mountToDom();

    this._renderer.domElement.requestPointerLock({
      unadjustedMovement: true
    });

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

  public unMount()
{
  this._renderer.setAnimationLoop(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this._scene.traverse((object: any) => {
    if (object.geometry) object.geometry.dispose();

    if (object.material) {
      if (Array.isArray(object.material)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        object.material.forEach((mat: any) => mat.dispose());
      } else {
        object.material.dispose();
      }
    }
  });

  this._renderer.dispose();
  this._scene.clear();

  window.removeEventListener("resize", this._onResizeBound);

  if (this._renderer.domElement.parentNode) {
    document.body.removeChild(this._renderer.domElement);
  }

  if (document.pointerLockElement) {
    document.exitPointerLock();
  }

  this._lastFrameTime = 0;
  this._deltaTime = 0;
  this._mountedToDom = false;
  this._hasStarted = false;
}
}

