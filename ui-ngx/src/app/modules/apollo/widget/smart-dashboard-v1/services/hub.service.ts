import {DeviceService} from '@core/http/device.service';

import {Injectable} from '@angular/core';
import {SchedulerService} from '@modules/apollo/widget/smart-dashboard-v1/services/scheduler.service';
import {AutomationService} from '@modules/apollo/widget/smart-dashboard-v1/services/automation.service';
 import {BaseHubService} from '@modules/apollo/widget/share/services/base-hub.service';


@Injectable({
  providedIn: 'root'
})
export class HubService extends BaseHubService {
  schedulerService: SchedulerService;
  automationService: AutomationService;

  constructor(deviceService: DeviceService) {
    super(deviceService);
    this.schedulerService = new SchedulerService(deviceService);
    this.automationService = new AutomationService(deviceService);
  }


}
