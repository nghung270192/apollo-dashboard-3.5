import {Injectable} from '@angular/core';
import {DeviceService} from '@core/http/device.service';
import {AutomationInfo} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {Observable} from 'rxjs';
import {renderAutoInput, renderAutoOutput} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';
import {RpcCmdService} from '@modules/apollo/widget/share/services/rpc-cmd.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService extends RpcCmdService {

  constructor(deviceService: DeviceService) {
    super(deviceService);
  }

  createSceneHub(deviceId: string, id: string, info: AutomationInfo): Observable<any> {

    const input = renderAutoInput(info?.inputScript);
    const output = renderAutoOutput(info?.outputScript);

    const requestBody: any = {
      method: 'creat_schedule_hub',
      params: [
        {
          id,
          enable: info?.enable,
          input,
          output
        }
      ],
      timeout: this.timeOut
    };

    return this.send(deviceId, requestBody);
  }

  createOrUpdate(deviceId: string, id: string, enable: boolean, input: any, output: any): Observable<any> {
    const requestBody: any = {
      method: 'update_schedule_hub',
      params: [
        {
          id,
          enable,
          input,
          output
        }
      ],
      timeout: this.timeOut
    };

    return this.send(deviceId, requestBody);
  }

  remove(deviceId: string, id: Array<string>): Observable<any> {
    const requestBody: any = {
      method: 'delete_schedule_hub',
      params: id,
      timeout: this.timeOut
    };

    return this.send(deviceId, requestBody);
  }


}
