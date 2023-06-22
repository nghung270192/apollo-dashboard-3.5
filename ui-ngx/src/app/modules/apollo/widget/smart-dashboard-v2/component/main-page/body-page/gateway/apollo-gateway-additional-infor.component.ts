import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {DeviceId} from '@shared/models/id/device-id';
import {
  NodeTreeInfoBase,
  NodeTreeInfoBaseImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';

@Component({
  selector: 'tb-apollo-gateway-additional-infor',
  templateUrl: './apollo-gateway-additional-infor.component.html',
  styleUrls: ['./apollo-gateway-additional-infor.component.scss']
})
export class ApolloGatewayAdditionalInforComponent implements OnInit {

  @Input() apollo: ApolloWidgetContext;
  @Input() additionalInfor: any;
  @Output() additionalInforChange: EventEmitter<any> = new EventEmitter<any>();

  apolloGatewayAdditionalInfo: NodeTreeInfoBaseImpl;
  devices: Array<Device> = [];
  deviceSelected: string;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.apolloGatewayAdditionalInfo
      = new NodeTreeInfoBaseImpl(this.additionalInfor as NodeTreeInfoBase);
    //todo: get device by customer
    this.apollo.ctx.deviceService.getTenantDeviceInfos(new PageLink(100), 'Gateway').subscribe(res => {
      this.devices = res.data;
      console.log(this.devices);
      this.cd.detectChanges();
      if (this.apolloGatewayAdditionalInfo.tbDeviceId != null) {
        this.apollo.ctx.deviceService.getDevice(this.apolloGatewayAdditionalInfo.tbDeviceId.id).subscribe(res => {
          this.deviceSelected = res.id.id;
          this.cd.detectChanges();
          console.log(this.deviceSelected);
        });
      }
    });

  }


  returnData() {
    if (this.deviceSelected != null) {
      this.apolloGatewayAdditionalInfo.tbDeviceId = new DeviceId(this.deviceSelected);
    }
    this.additionalInforChange.emit(this.apolloGatewayAdditionalInfo.toData());
  }

}
