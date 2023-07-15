import {DeviceService} from '@core/http/device.service';

export interface HubCmd {
  'method': string;
  'params': any;
  'timeout': number;
}

import {Injectable} from '@angular/core';
import {BleHubService} from '@modules/apollo/widget/share/services/ble-hub.service';
import {ZigbeeHubService} from '@modules/apollo/widget/share/services/zigbee-hub.service';
import {RpcCmdService} from '@modules/apollo/widget/share/services/rpc-cmd.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseHubService extends RpcCmdService {
  bleHubService: BleHubService;
  zigbeeHubService: ZigbeeHubService;

  constructor(deviceService: DeviceService) {
    super(deviceService);
    this.bleHubService = new BleHubService(deviceService);
    this.zigbeeHubService = new ZigbeeHubService(deviceService);
  }


  getVersion(deviceId: string): Observable<any> {

    const requestBody: HubCmd = {
      method: 'get_version',
      params: {},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }


  updateFirmware(deviceId: string): Observable<any> {

    const requestBody: HubCmd = {
      method: 'update_firmware',
      params: {},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

}
