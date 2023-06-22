 import {DeviceService} from '@core/http/device.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
 import {RequestConfig} from '@core/http/http-utils';

const Timeout = 5000;
@Injectable({
  providedIn: 'root'
})
export class RpcCmdService {
  public timeOut: number = Timeout;
  private requestConfig: RequestConfig ={
    ignoreLoading: false,
    ignoreErrors: true,
    resendRequest: false
  };

  protected constructor(public deviceService: DeviceService){
    this.deviceService = deviceService;
  }
  send(deviceId: string, requestBody: any): Observable<any>{
    console.log('hubId:', deviceId, requestBody);
    return this.deviceService.sendTwoWayRpcCommand(deviceId,requestBody,this.requestConfig);
  }
}
