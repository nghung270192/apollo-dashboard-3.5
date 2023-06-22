import {Injectable} from '@angular/core';
import {DeviceService} from '@core/http/device.service';
import {AutomationInfo} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {Observable} from 'rxjs';
import {
  ComparisonType,
  renderAutoInput,
  renderAutoOutput
} from '@modules/apollo/widget/smart-dashboard-v1/models/automation/automation.model';
import {RpcCmdService} from '@modules/apollo/widget/share/services/rpc-cmd.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationService extends RpcCmdService {

  constructor(deviceService: DeviceService) {
    super(deviceService);
  }

  createSceneHub(deviceId: string, id: string, info: AutomationInfo): Observable<any> {

    const input = renderAutoInput(info?.inputScript);
    const output = renderAutoOutput(info?.outputScript);

    const requestBody: any = {
      method: 'creat_scene_hub',
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

  updateOrCreate(deviceId: string, id: string, enable: boolean, comparison: ComparisonType, input: any, output: any): Observable<any> {

    const requestBody: any = {
      method: 'update_scene_hub',
      params: [
        {
          id,
          enable,
          comparison,
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
      method: 'delete_scene_hub',
      params: id,
      timeout: this.timeOut
    };

    return this.send(deviceId, requestBody);
  }


}
