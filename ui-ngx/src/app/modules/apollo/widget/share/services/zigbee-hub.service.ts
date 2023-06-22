import {DeviceService} from '@core/http/device.service';

import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {RpcCmdService} from '@modules/apollo/widget/share/services/rpc-cmd.service';
import {HubCmd} from '@modules/apollo/widget/share/services/base-hub.service';
import {ZigbeeModel} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';

@Injectable({
  providedIn: 'root'
})
export class ZigbeeHubService extends RpcCmdService {
  constructor(deviceService: DeviceService) {
    super(deviceService);
  }

  resetNetwork(deviceId: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'delete_network',
      params: {type: 'zigbee'},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  initNetwork(deviceId: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'set_network',
      params: {type: 'zigbee'},
      timeout: 15000
    };
    return this.send(deviceId, requestBody);
  }

  startPermitJoin(deviceId: string, timeOut: number): Observable<any> {
    const requestBody: HubCmd = {
      method: 'start_permit_join',
      params: {type: 'zigbee'},
      timeout: timeOut
    };
    return this.send(deviceId, requestBody);
  }

  stopPermitJoin(deviceId: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'stop_permit_join',
      params: {type: 'zigbee'},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setModel(deviceId: string, address: number, model: ZigbeeModel, name: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'set_model',
      params: {
        type: 'zigbee',
        address,
        model,
        name
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  deleteDevice(deviceId: string, address: number): Observable<any> {
    const requestBody: HubCmd = {
      method: 'device_remove',
      params: {
        type: 'zigbee',
        address
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  getDevices(deviceId: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'get_list_device',
      params: {
        type: 'zigbee'
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setOnOff(deviceId: string, address: number, endpoint: number,value: number): Observable<any> {

    console.log('here');
    const requestBody: HubCmd = {
      method: 'set_onOff',
      params: {
        type: 'zigbee',
        address,
        DstEndPoint: endpoint,
        SrcEndPoint: 1,
        value
      },
      timeout: this.timeOut
    };
    console.log(requestBody,deviceId );
    return this.send(deviceId, requestBody);
  }

  setLightness(deviceId: string, address: number, endpoint: number,value: number): Observable<any> {
    const requestBody: HubCmd = {
      method: 'set_lightness',
      params: {
        type: 'zigbee',
        address,
        DstEndPoint: endpoint,
        SrcEndPoint: 1,
        value
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }
}
