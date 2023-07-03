import {DeviceService} from '@core/http/device.service';

import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {RpcCmdService} from '@modules/apollo/widget/share/services/rpc-cmd.service';
import {HubCmd} from '@modules/apollo/widget/share/services/base-hub.service';
import {ByteBuffer} from '@modules/apollo/widget/share/utilities/byte-buffer';

export interface MotionSensorParams {
  'status': boolean;
  'delay': number;
  'detect': number;
  'unDetect': number;
  'ambient_brightness': number;
  'brightness': number;
}

export interface MotionSensorLevelSet {
  'detect': number;
  'unDetect': number;
}

@Injectable({
  providedIn: 'root'
})
export class BleHubService extends RpcCmdService {
  constructor(deviceService: DeviceService) {
    super(deviceService);
  }


  resetNetwork(deviceId: string): Observable<any> {
    /*    let buffer:ByteBuffer = new ByteBuffer()
        buffer.putShort(hsl?.l);
        buffer.putShort(hsl?.h);
        buffer.putShort(hsl?.s);
        buffer.putByte(getHex(2));*/
    const requestBody: HubCmd = {
      method: 'delete_network',
      params: {type: 'ble_sigmesh'},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }


  reboot(deviceId: string): Observable<any> {

    const requestBody: HubCmd = {
      method: 'reboot',
      params: {type: 'ble_sigmesh'},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setUnicastAddress(deviceId: string, unicast: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'configUnicast',
      params: {type: 'ble_sigmesh', unicast},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setGroupsAddress(deviceId: string, unicast: Array<string>): Observable<any> {
    const requestBody: HubCmd = {
      method: 'listGroups',
      params: {type: 'ble_sigmesh', unicast},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setNodesAddress(deviceId: string, unicast: Array<string>): Observable<any> {
    const requestBody: HubCmd = {
      method: 'listNodes',
      params: {type: 'ble_sigmesh', unicast},
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }


  requestUpdateNetwork(deviceId: string, data_bleSigmesh: any): Observable<any> {
    const requestBody: HubCmd = {
      method: 'updateData',
      params: {
        type: 'ble_sigmesh',
        data_bleSigmesh
      },
      timeout: 30000
    };
    return this.send(deviceId, requestBody);
  }

  setOnOff(deviceId: string, address: string, state: number): Observable<any> {
    const requestBody: HubCmd = {
      method: 'set_onOff',
      params: {
        type: 'ble_sigmesh',
        unicast: address,
        value: state
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  getOnOff(deviceId: string, address: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'get_onOff',
      params: {
        type: 'ble_sigmesh',
        unicast: address
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setLightness(deviceId: string, address: string, value: number): Observable<any> {
    const requestBody: HubCmd = {
      method: 'set_lightness',
      params: {
        type: 'ble_sigmesh',
        unicast: address,
        value
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }


  getLightness(deviceId: string, address: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'get_lightness',
      params: {
        type: 'ble_sigmesh',
        unicast: address
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setHsl(deviceId: string, address: string, h: number, s: number, l: number): Observable<any> {
    console.log(h, s, l);
    const requestBody: HubCmd = {
      method: 'set_HSL',
      params: {
        type: 'ble_sigmesh',
        unicast: address,
        Hue: h,
        Saturation: s,
        Lightness: l,
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }


  getHsl(deviceId: string, address: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'get_hsl',
      params: {
        type: 'ble_sigmesh',
        unicast: address
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  getAllStatus(deviceId: string, addresses: Array<string>): Observable<{
    'method': 'status_devices';
    'params': { [key: string]: any };
  }> {
    const requestBody: HubCmd = {
      method: 'get_status_devices',
      params: {
        type: 'ble_sigmesh',
        address: addresses
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  callScene(deviceId: string, address: string, scene: string): Observable<any> {
    const requestBody: HubCmd = {
      method: 'scene_recall',
      params: {
        type: 'ble_sigmesh',
        unicast: address,
        SceneNumber: Number(scene)
      },
      timeout: this.timeOut
    };
    return this.send(deviceId, requestBody);
  }

  setVendor(deviceId: string,
            address: string,
            opcode: string,
            message: any,
            timeout: number = this.timeOut): Observable<any> {
    const requestBody: HubCmd = {
      method: 'set_vendor',
      params: {
        type: 'ble_sigmesh',
        unicast: address,
        opcode,
        message
      },
      timeout
    };
    return this.send(deviceId, requestBody);
  }

  setAllMotionSensorData(deviceId: string,
                         address: string,
                         lowLevel: number,
                         highLevel: number,
                         delayTime: number,
                         brightness: number,
                         hlkSensitive: number,
                         hlkDelayTime: number): Observable<any> {

    /*    const message: ByteBuffer = new ByteBuffer();
        message.clear();
        message.putShort(lowLevel);
        message.putShort(highLevel);
        message.putShort(delayTime);
        message.putShort(brightness);
        message.putByte(hlkSensitive);
        message.putShort(hlkDelayTime);*/
    return this.setVendor(deviceId, address, '0D', '');
  }

  getAllMotionSensorData(deviceId: string,
                         address: string,
                         timeout: number = 5000): Observable<MotionSensorParams> {
    return this.setVendor(deviceId, address, 'all_info_status', '', timeout);
  }

  getDistanceSensorMotion(deviceId: string,
                          address: string,
                          timeout: number = 5000) {
    return this.setVendor(deviceId, address, 'sensor_distance_get', '', timeout);
  }

  setDelaySensorMotion(deviceId: string,
                       address: string,
                       value: number,
                       timeout: number = 5000) {
    return this.setVendor(deviceId, address, 'delay_set', value, timeout);
  }


  setLevelSensorMotion(deviceId: string,
                       address: string,
                       value: MotionSensorLevelSet,
                       timeout: number = 5000) {
    return this.setVendor(deviceId, address, 'level_set', '', timeout);
  }

  setBrightnessSensorMotion(deviceId: string,
                            address: string,
                            value: number,
                            timeout: number = 5000) {
    return this.setVendor(deviceId, address, 'brightness_set', value, timeout);
  }

  /**
   *
   * @param deviceId : hub id
   * @param address : ble node unicast
   * @param value: blink times
   * @param timeout
   */
  setBlinkSensorMotion(deviceId: string,
                       address: string,
                       value: number,
                       timeout: number = 5000) {
    return this.setVendor(deviceId, address, 'blinking_set', value, timeout);
  }

  /**
   *
   * @param deviceId : hub id
   * @param address : ble node unicast
   * @param value: 0-15
   * @param timeout
   */
  setHLKDistanceSensingSensorMotion(deviceId: string,
                                    address: string,
                                    value: number,
                                    timeout: number = 5000) {
    return this.setVendor(deviceId, address, 'hlk_distance_sensing_set', value, timeout);
  }


}
