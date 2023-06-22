import {ApolloDeviceModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceState,
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {Observable} from 'rxjs';

export interface DeviceParamsToCreateNew {
  name?: string;
  label?: string;
  model?: string;
  deviceType?: ApolloDeviceModel;
}

export abstract class DeviceControllerAbstract extends NodeTreeImpl {

  protected constructor(node: NodeTree) {
    super(node);
  }

  abstract renderName(): string;

  abstract renderDeviceTypeIcon(): string;

  abstract renderState(): DeviceState;

  abstract renderIcon(): string;

  abstract hasToggle(): boolean;

  abstract toggle?(params?: any): Observable<any>;

/*
  setState?(params: any): Observable<any>;

  getState?(params: any): Observable<any>;

  setLightness?(params: any): Observable<any>;

  getLightness?(params: any): Observable<any>;

  getMaxIndex?(): number;

  setHsl?(params: any): Observable<any>;

  getHsl?(params: any): Observable<any>;*/

  abstract subscribe(): void;

  abstract unSubscribe(): void;

  abstract entityClick?(): any;

  abstract renderIconUrlOnMap(): string;
}
