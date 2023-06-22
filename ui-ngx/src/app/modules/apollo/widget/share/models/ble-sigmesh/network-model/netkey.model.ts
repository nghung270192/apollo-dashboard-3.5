import {NetworkConfigModel} from './network.model';

export interface NetkeyModel {
  'name': string;
  'index': number;
  'key': string;
  'phase': number;
  'minSecurity': string;
  'timestamp': string;
}

export interface NetkeyBleI {
  netKeys: Map<number, NetkeyModel>;

}

export class NetkeyBleImp implements NetkeyBleI {
  netKeys: Map<number, NetkeyModel> = new Map();
  isValid = false;

  constructor(networkConfig?: NetworkConfigModel) {
    if (networkConfig && networkConfig?.netKeys && Array.isArray(networkConfig?.netKeys)) {
      this.netKeys = new Map(networkConfig?.netKeys.map(obj => [obj.index, obj]));
      this.isValid = true;
    }
  }


  get netKeyArray() {
    return [...this.netKeys.values()];
  }

}
