import {NetworkConfigModel} from './network.model';

export interface AppkeyModel {
  'name': string;
  'index': number;
  'boundNetKey': number;
  'key': string;
}
export interface AppkeyBleI {
  appKeys: Map<number, AppkeyModel>;
  appKeyArray(): Array<AppkeyModel>;
}
export class AppkeyBleImp implements AppkeyBleI{
  private _appKeys: Map<number, AppkeyModel> = new Map();


  constructor(networkConfig?: NetworkConfigModel) {
    if (networkConfig && networkConfig?.appKeys && Array.isArray(networkConfig?.appKeys))
       {this._appKeys = new Map(networkConfig?.appKeys.map(obj => [obj.index, obj]));}
  }

  get appKeys(): Map<number, AppkeyModel> {
    return this._appKeys;
  }

  set appKeys(value: Map<number, AppkeyModel>) {
    this._appKeys = value;
  }

  appKeyArray(): Array<AppkeyModel> {
    return [...this._appKeys.values()];
  }

}
