import {NetworkConfigModel} from './network.model';

export interface AllocatedUnicastRange {
  'lowAddress': string;
  'highAddress': string;
}

export interface AllocatedGroupRange {
  'lowAddress': string;
  'highAddress': string;
}

export interface AllocatedSceneRange {
  'firstScene': string;
  'lastScene': string;
}

export interface ProvisionerModel {
  'provisionerName': string;
  'UUID': string;
  'allocatedUnicastRange': AllocatedUnicastRange[ ];
  'allocatedGroupRange': AllocatedGroupRange[];
  'allocatedSceneRange': AllocatedSceneRange[];
}

export interface ProvisionerBleI {
  provisioners: Map<string, ProvisionerModel>;
}


export class ProvisionerBleImp implements ProvisionerBleI {
  private _provisioners: Map<string, ProvisionerModel> = new Map<string, ProvisionerModel>();

  constructor(networkConfig?: NetworkConfigModel) {
    if (networkConfig && networkConfig?.provisioners && Array.isArray(networkConfig?.provisioners)) {
      this._provisioners = new Map(networkConfig?.provisioners.map(obj => [obj.UUID, obj]));
    }
  }

  get provisioners(): Map<string, ProvisionerModel> {
    return this._provisioners;
  }

  set provisioners(value: Map<string, ProvisionerModel>) {
    this._provisioners = value;
  }
}
