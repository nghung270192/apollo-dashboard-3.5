import {HubNodeTreeImpl, NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Observable, of} from 'rxjs';
import {GetZigbeeDevice, ZigbeeModel} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';

export enum ApolloDeviceModel {
  BLE_SIG_MESH = 'BLE SIG MESH',
  ZIGBEE = 'ZIGBEE',
}

export const ApolloDeviceModelLabelMapping: Record<ApolloDeviceModel, string> = {
  [ApolloDeviceModel.BLE_SIG_MESH]: 'BLE SIG MESH',
  [ApolloDeviceModel.ZIGBEE]: 'ZIGBEE'
};

export enum ApolloDeviceSource {
  GROUP = 'GROUP',
  DEVICE = 'DEVICE',
}

export const ApolloDeviceSourceLabelMapping: Record<ApolloDeviceSource, string> = {
  [ApolloDeviceSource.GROUP]: 'Nhóm',
  [ApolloDeviceSource.DEVICE]: 'Thiết bị'
};


export enum ApolloSceneSource {
  ALL = 'ALL',
  GROUP = 'GROUP',
  DEVICE = 'DEVICE',
}

export const ApolloSceneSourceLabelMapping: Record<ApolloSceneSource, string> = {
  [ApolloSceneSource.ALL]: 'Tất cả',
  [ApolloSceneSource.GROUP]: 'Nhóm',
  [ApolloSceneSource.DEVICE]: 'Thiết bị'
};


export interface HubCmd {
  'method': string;
  'params': any;
  'timeout': number;
}

export interface HubControllerI {
  tbDeviceId: string;

  bleResetNetwork(): Observable<any>;

  bleRequestUpdateJson(data: any): Observable<any>;

  bleSetUnicastAddress(unicast: string): Observable<any>;

  bleSetGroups(unicast: Array<string>): Observable<any>;

  bleSetNodesAddress(unicast: Array<string>): Observable<any>;

  bleRebootHub(): Observable<any>;

  bleGetOnOff(): Observable<any>;

  bleSetOnOff(): Observable<any>;

  bleGetLightness(): Observable<any>;

  bleSetLightness(): Observable<any>;

  bleCallScene(address: string, scene: string): Observable<any>;

  zbSetOnOff(address: number): Observable<any>;

  zbGetOnOff(address: number): Observable<any>;

  zbResetNetwork(): Observable<any>;

  zbInitNetwork(): Observable<any>;

  zbStartPermitJoint(timeOut: number): Observable<any>;

  zbStopPermitJoint(): Observable<any>;

  zbSetModel(address: number, model: ZigbeeModel, name: string): Observable<any>;

  zbRemoveDevice(address: number): Observable<any>;

  zbGetDevices(): Observable<any>;
}


export class HubController extends HubNodeTreeImpl implements HubControllerI {

  isOnline = false;
  constructor(private nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    super(nodeTree);
  }

  bleRequestUpdateJson(data: any): Observable<any> {
    return this.apollo.hubService.bleHubService.requestUpdateNetwork(this.tbDeviceId, data);
  }

  bleSetGroups(unicast: Array<string>): Observable<any> {
    return this.apollo.hubService.bleHubService.setGroupsAddress(this.tbDeviceId, unicast);
  }

  bleSetNodesAddress(unicast: Array<string>): Observable<any> {
    return this.apollo.hubService.bleHubService.setNodesAddress(this.tbDeviceId, unicast);
  }

  bleSetUnicastAddress(unicast: string): Observable<any> {
    return this.apollo.hubService.bleHubService.setUnicastAddress(this.tbDeviceId, unicast);
  }

  bleCallScene(address: string, scene: string): Observable<any> {
    return this.apollo.hubService.bleHubService.callScene(this.tbDeviceId, address, scene);
  }

  bleGetLightness(): Observable<any> {

    return this.apollo.hubService.bleHubService.getLightness(this.tbDeviceId, 'FFFF');
  }

  bleGetHsl(): Observable<any> {

    return this.apollo.hubService.bleHubService.getHsl(this.tbDeviceId, 'FFFF');
  }

  bleGetOnOff(): Observable<any> {
    return this.apollo.hubService.bleHubService.getOnOff(this.tbDeviceId, 'FFFF');
  }

  bleGetAllStatus(addresses: Array<string>): Observable<{ 'method': 'status_devices'; 'params': { [key: string]: any } }> {
    return this.apollo.hubService.bleHubService.getAllStatus(this.tbDeviceId, addresses);
  }

  bleRebootHub(): Observable<any> {

    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }

  bleResetNetwork(): Observable<any> {
    return this.apollo.hubService.bleHubService.resetNetwork(this.tbDeviceId);
  }


  bleSetLightness(): Observable<any> {
    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }

  bleSetOnOff(): Observable<any> {
    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }


  zbGetDevices(): Observable<any> {
    return new Observable(res1 => {
      this.apollo.hubService.zigbeeHubService.getDevices(this.tbDeviceId).subscribe(res => {
        const devices: GetZigbeeDevice = res?.params as GetZigbeeDevice;
        const map = new Map();
        Object.keys(devices).forEach((key) => {
          map.set(key, devices[key]);
        });

        return res1.next([...map.values()]);
      }, error => res1.error(error));
    });

  }

  zbInitNetwork(): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.initNetwork(this.tbDeviceId);
  }

  zbRemoveDevice(address: number): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.deleteDevice(this.tbDeviceId, address);
  }

  zbResetNetwork(): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.resetNetwork(this.tbDeviceId);
  }

  zbSetModel(address: number, model: ZigbeeModel, name: string): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.setModel(this.tbDeviceId, address, model, name);
  }

  zbDeleteDevice(address: number): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.deleteDevice(this.tbDeviceId, address);
  }

  zbStartPermitJoint(timeOut: number): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.startPermitJoin(this.tbDeviceId, timeOut);
  }

  zbStopPermitJoint(): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.stopPermitJoin(this.tbDeviceId);
  }


  zbSetOnOff(address: number): Observable<any> {
    return undefined;
  }

  zbGetOnOff(address: number): Observable<any> {
    return undefined;
  }

}


export class HubControllerWithTbDeviceId implements HubControllerI {
  tbDeviceId: string;

  constructor(tbDeviceId: string, private apollo: ApolloWidgetContext) {
    this.tbDeviceId = tbDeviceId;
  }

  bleRequestUpdateJson(data: any): Observable<any> {
    return this.apollo.hubService.bleHubService.requestUpdateNetwork(this.tbDeviceId, data);
  }

  bleSetGroups(unicast: Array<string>): Observable<any> {
    return this.apollo.hubService.bleHubService.setGroupsAddress(this.tbDeviceId, unicast);
  }

  bleSetNodesAddress(unicast: Array<string>): Observable<any> {
    return this.apollo.hubService.bleHubService.setNodesAddress(this.tbDeviceId, unicast);
  }

  bleSetUnicastAddress(unicast: string): Observable<any> {
    return this.apollo.hubService.bleHubService.setUnicastAddress(this.tbDeviceId, unicast);
  }

  bleCallScene(address: string, scene: string): Observable<any> {
    return this.apollo.hubService.bleHubService.callScene(this.tbDeviceId, address, scene);
  }

  bleGetLightness(): Observable<any> {

    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }

  bleGetOnOff(): Observable<any> {

    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }

  bleRebootHub(): Observable<any> {

    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }

  bleResetNetwork(): Observable<any> {
    return this.apollo.hubService.bleHubService.resetNetwork(this.tbDeviceId);
  }


  bleSetLightness(): Observable<any> {
    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }

  bleSetOnOff(): Observable<any> {
    return new Observable<any>(observable => {
      observable.next('ok. Please implement');
    });
  }


  zbGetDevices(): Observable<any> {
    return new Observable(res1 => {
      this.apollo.hubService.zigbeeHubService.getDevices(this.tbDeviceId).subscribe(res => {
        const devices: GetZigbeeDevice = res?.params as GetZigbeeDevice;
        const map = new Map();
        Object.keys(devices).forEach((key) => {
          map.set(key, devices[key]);
        });

        return res1.next([...map.values()]);
      }, error => res1.error(error));
    });

  }

  zbInitNetwork(): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.initNetwork(this.tbDeviceId);
  }

  zbRemoveDevice(address: number): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.deleteDevice(this.tbDeviceId, address);
  }

  zbResetNetwork(): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.resetNetwork(this.tbDeviceId);
  }

  zbSetModel(address: number, model: ZigbeeModel, name: string): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.setModel(this.tbDeviceId, address, model, name);
  }

  zbDeleteDevice(address: number): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.deleteDevice(this.tbDeviceId, address);
  }

  zbStartPermitJoint(timeOut: number): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.startPermitJoin(this.tbDeviceId, timeOut);
  }

  zbStopPermitJoint(): Observable<any> {
    return this.apollo.hubService.zigbeeHubService.stopPermitJoin(this.tbDeviceId);
  }


  zbSetOnOff(address: number): Observable<any> {
    return undefined;
  }

  zbGetOnOff(address: number): Observable<any> {
    return undefined;
  }

}
