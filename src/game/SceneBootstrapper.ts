import {Group, Scene} from "three"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { PlayerController } from './player/PlayerController';
import { InputManager } from "./input/InputManager";

type LoadedAssetNames = "room"

export class SceneBootstrapper {
    private scene: Scene;
    private gltfLoader: GLTFLoader = new GLTFLoader();
    private _loadedAssets: Record<LoadedAssetNames, Group | undefined> = {
        room: undefined
    }
    private _dependenciesLoaded = false;
    private _loadDependenciesPromise!: Promise<void>;

    private _inputManager: InputManager;

    private _playerController: PlayerController | undefined;

    constructor(scene: Scene, inputManager: InputManager) {
        this.scene = scene;
        this._inputManager = inputManager;
        this._LoadDependencies();
    }

    private async _LoadDependencies()
    {
        this._loadDependenciesPromise = new Promise((res) =>
        {
            (async()=>{
                const roomGLTF = await this.gltfLoader.loadAsync("../assets/room.glb");
                
                const room = roomGLTF.scene;
                room.scale.set(40, 40, 40);
                this._loadedAssets.room = room;
                this._dependenciesLoaded = true;
                res();
            })();
        })
    }

    private _AddLoadedAssetToScene(name: LoadedAssetNames)
    {
        const object = this._loadedAssets[name]; 
        if (object && !this.scene.children.includes(object))
        {
            this.scene.add(object);
        }
    }

    public async createScene(){
        if (!this._dependenciesLoaded)
        {
            await this._loadDependenciesPromise;
        }

        this._AddLoadedAssetToScene("room");

        //todo add graceful removal of old player controller if exists
        if (this._playerController)
        {
            this.scene.remove(this._playerController.body);
            this.scene.remove(this._playerController.camera);
            //this._playerController.unhookFromInputManagerEvents(this._inputManager);
            this._playerController = undefined;   
        }
        
        
        this._playerController = new PlayerController(this._inputManager, 0, 0);
        this.scene.add(this._playerController.body);

        return {
            playerController: this._playerController,
            camera: this._playerController.camera
        }
    }
}