import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {
  NodeTree,
  NodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  GatewayModel, NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {HubModel, HubSource} from '@modules/apollo/widget/share/models/apollo-hub/hub.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree-id';
import {Device} from '@shared/models/device.models';
import {DeviceId} from '@shared/models/id/device-id';
import {PageLink} from '@shared/models/page/page-link';

import {forkJoin} from 'rxjs';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  nodeTree: NodeTree;
}

@Component({
  selector: 'tb-device-setting',
  templateUrl: './device-setting.component.html',
  styleUrls: ['./device-setting.component.scss']
})
export class DeviceSettingComponent implements OnInit, AfterViewInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  hubSource: HubSource;
  hubSources = Object.values(HubSource);
  HubSource = HubSource;
  formControlHubSource = new FormControl('');

  gatewaySource: string;
  GatewaySources: Array<NodeTree> = [];
  formControlGatewaySource = new FormControl('');

  hubDevice: string;
  HubDevices: Array<Device> = [];
  formControlHubDevice = new FormControl('');


  apolloNodeTree: NodeTreeImpl;

  name: string;
  model: HubModel;
  HubModel = HubModel;

  additionalInfo: NodeTreeInfoBaseImpl;


  status1 = '';

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DeviceSettingComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
  }

  ngOnInit(): void {

    this.apolloNodeTree = new NodeTreeImpl(this.data.nodeTree);
    console.log(this.data.nodeTree);
    console.log(this.apolloNodeTree);

    this.name = this.apolloNodeTree.name;
    this.model = this.apolloNodeTree.model as HubModel;
    this.additionalInfo = new NodeTreeInfoBaseImpl(this.apolloNodeTree.additionalInfo);
    this.hubSource = this.additionalInfo.hubSource;
    if (this.additionalInfo.gatewaySource) {
      this.gatewaySource = this.additionalInfo.gatewaySource.id;
    }
    if (this.additionalInfo.tbDeviceId) {
      this.hubDevice = this.additionalInfo.tbDeviceId.id;
    }
    this.reloadGatewaySource();
    this.reloadHubDevicesFromGateway();
    this.cd.detectChanges();
  }

  reloadGatewaySource() {
    if (this.hubSource===HubSource.GATEWAY) {
      this.data.apollo.apolloNodeTreeService.getByApolloTree(this.apolloNodeTree.apolloTreeId.id, new PageLink(100), NodeTreeType.GATEWAY, GatewayModel.APOLLO)
        .subscribe(res => {
          this.GatewaySources = res.data;
          this.reloadHubDevicesFromGateway();
        });
    } else if (this.hubSource===HubSource.DEVICES) {
      this.reloadHubDevicesFromGateway();
    }
  }

  reloadHubDevicesFromGateway() {
    if (this.hubSource===HubSource.GATEWAY) {
      if (this.gatewaySource != null) {
        this.data.apollo.apolloNodeTreeService.getApolloNodeTree(this.gatewaySource).subscribe(
          res => {
            const gatewayNodeTree: NodeTreeImpl = new NodeTreeImpl(res);
            if (gatewayNodeTree.additionalInfo && gatewayNodeTree.additionalInfo.tbDeviceId) {
              this.data.apollo.ctx.deviceService.getDevice(gatewayNodeTree.additionalInfo.tbDeviceId.id).subscribe(
                res => {
                  if (res && res.id) {
                    this.data.apollo.ctx.entityRelationService.findByFrom(res.id).subscribe(res => {
                      this.HubDevices = [];
                      forkJoin(res.map(item => this.data.apollo.ctx.deviceService.getDevice(item.to.id))).subscribe(hubsData => {
                        hubsData.forEach(hub => {
                          this.HubDevices.push(hub as Device);
                        });
                        this.cd.detectChanges();

                      });
                    });
                  }
                }
              );
            }
          }
        );
      }
    } else if (this.hubSource===HubSource.DEVICES) {
      this.HubDevices = [];
      this.gatewaySource = null;
      this.data.apollo.ctx.deviceService.getTenantDeviceInfos(new PageLink(100), 'Hub').subscribe(
        res => {
          this.HubDevices = res.data;
          this.cd.detectChanges();
        }
      );
    }
  }

  save($event) {

    this.apolloNodeTree.name = this.name;
    this.apolloNodeTree.model = this.model;
    this.apolloNodeTree.additionalInfo.hubSource = this.hubSource;
    this.apolloNodeTree.additionalInfo.gatewaySource = new ApolloNodeTreeId(this.gatewaySource);
    this.apolloNodeTree.additionalInfo.tbDeviceId = new DeviceId(this.hubDevice);
    /*
        this.apolloNodeTree.additionalInfo = new NodeTreeInfoBaseImpl({
          hubSource: this.hubSource,
          gatewaySource: new ApolloNodeTreeId(this.gatewaySource),
          tbDeviceId: new DeviceId(this.hubDevice)
        });
    */

    this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(this.apolloNodeTree.toApolloNodeTree())
      .subscribe(res => {
        this.status1 = 'Cập nhật thực thể thành công';
        this.cd.detectChanges();
      }, error => this.status1 = error);
  }

  ngAfterViewInit(): void {

  }


}
