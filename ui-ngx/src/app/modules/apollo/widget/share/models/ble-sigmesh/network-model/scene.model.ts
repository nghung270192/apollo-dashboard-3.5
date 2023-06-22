import {NetworkConfigModel} from './network.model';

export interface SceneModel {
  name: string;
  addresses: Array<string>;
  number: string;
}


export interface SceneBleI {
  scenes: Map<string, SceneModel>;
}


export class SceneBleImp implements SceneBleI {
  scenes: Map<string, SceneModel> = new Map<string, SceneModel>();

  constructor(networkConfig?: NetworkConfigModel) {
    if (networkConfig && networkConfig?.scenes && Array.isArray(networkConfig?.scenes)) {
      this.scenes = new Map(networkConfig?.scenes.map(obj => [obj.number, obj]));
    }
  }

  getSceneDetail(scene: string): SceneModel {
    return this.scenes.get(scene);
  }

  getSceneDetails(strScenes: Array<string>): Array<SceneModel> {
    const scenes: Array<SceneModel> = [];
    if (strScenes && Array.isArray(strScenes)) {
      strScenes.forEach(scene => {
        scenes.push(this.scenes.get(scene));
      });
    }
    return scenes;
  }

  get sceneArray() {
    return [...this.scenes.values()];
  }

  createOrUpdateScene(sceneModel: SceneModel) {
    this.scenes.set(sceneModel.number, sceneModel);
  }

  sortScene() {
    this.scenes = new Map<string, SceneModel>([...this.scenes].sort());
  }

  removeScene(number: string) {
    this.scenes.delete(number);
  }

  nextSceneNumber(): string {
    let start = 0x0001;
    let flag = false;

    while (!flag) {
      const addrString = start.toString(16).padStart(4, '0').toUpperCase();
      if (this.scenes.has(addrString) == false) {
        flag = true;
      } else {
        start++;
      }
    }
    return start.toString(16).padStart(4, '0').toUpperCase();
  }

}

export class SceneController implements SceneModel {

  addresses: Array<string> = [];
  name = '';
  number = '';

  constructor(private scene?: SceneModel) {
    if (scene) {
      this.addresses = scene?.addresses;
      this.name = scene?.name;
      this.number = scene?.number;
    }
  }

  update(scene: SceneModel) {
    if (scene) {
      this.addresses = scene?.addresses;
      this.name = scene?.name;
      this.number = scene?.number;
    }
  }


}
