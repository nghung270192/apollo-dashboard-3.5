import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  GatewayModel,
  NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {
  HubModel,
  HubSource
} from "@modules/apollo/widget/share/models/apollo-hub/hub.model";


import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree-id';
import {Device} from '@shared/models/device.models';
import {DeviceId} from '@shared/models/id/device-id';
import {PageLink} from '@shared/models/page/page-link';

import {forkJoin} from 'rxjs';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {ThemePalette} from '@angular/material/core';
import {HubControllerWithTbDeviceId} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {
  NodeTreeInfoBase,
  NodeTreeInfoBaseImpl
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {SceneModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {DialogComponent} from '@shared/components/dialog.component';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  nodeTree: NodeTree;
}

enum State {
  'IDLE',
  'RESET_NETWORK',
  'REQUEST_UPDATE_FILE_JSON',
  'SET_NODES',
  'SET_GROUPS',
  'SET_UNICAST',
  'REBOOT',
  'WAIT',
  'DONE',
  'ERROR'
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

interface ConfigStep {
  checked: boolean;
  name: string;
  color: string;
}

@Component({
  selector: 'tb-hub-setting',
  templateUrl: './hub-setting.component.html',
  styleUrls: ['./hub-setting.component.scss']
})
export class HubSettingComponent extends DialogComponent<HubSettingComponent, null> implements OnInit, AfterViewInit {

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
  importStatus = '';


  bleNetwork: BleNetwork;
  netKeysSource: Array<string> = [];
  appKeysSource: Array<string> = [];
  scenesSource: Array<SceneModel> = [];

  nodesSourceAddress: Array<string> = [];
  nodesSource: Array<NodeModel> = [];

  groupsSourceAddress: Array<string> = [];
  groupsSource: Array<GroupModel> = [];

  netKeys: Array<string>;
  appKeys: Array<string>;
  scenes: Array<string>;
  nodes: Array<string>;
  groups: Array<string>;
  unicastAddress: string;

  processingStep: ConfigStep[] = [
    {checked: false, name: 'Factory Reset', color: 'black'},
    {checked: false, name: 'Request Update Json', color: 'black'},
    {checked: false, name: 'Set Nodes', color: 'black'},
    {checked: false, name: 'Set Groups', color: 'black'},
    {checked: false, name: 'Set Unicast', color: 'black'},
    {checked: false, name: 'Reboot', color: 'black'}
  ];

  barProcessingPercent = 0;
  processingHistory = '';

  private state: State = State.IDLE;
  private waiting = false;
  private subsIndexAddress = 0;
  configTaskId: any;

  hubController: HubControllerWithTbDeviceId;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<HubSettingComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);
  }

  ngOnInit(): void {

    this.apolloNodeTree = new NodeTreeImpl(this.data.nodeTree);

    this.name = this.apolloNodeTree.name;
    this.model = this.apolloNodeTree.model as HubModel;
    this.additionalInfo = new NodeTreeInfoBaseImpl(this.apolloNodeTree.additionalInfo);
    this.hubSource = this.additionalInfo.hubSource;

    if (this.additionalInfo?.gatewaySource) {
      this.gatewaySource = this.additionalInfo.gatewaySource.id;
    }

    if (this.additionalInfo?.tbDeviceId) {
      this.hubDevice = this.additionalInfo.tbDeviceId.id;
    }

    if (this.additionalInfo?.bleNetKeys && Array.isArray(this.additionalInfo?.bleNetKeys)) {
      this.netKeys = this.additionalInfo.bleNetKeys;
    }

    if (this.additionalInfo?.bleAppKeys && Array.isArray(this.additionalInfo?.bleAppKeys)) {
      this.appKeys = this.additionalInfo.bleAppKeys;
    }

    if (this.additionalInfo?.bleNodes && Array.isArray(this.additionalInfo?.bleNodes)) {
      this.nodes = this.additionalInfo.bleNodes;
    }

    if (this.additionalInfo?.bleScenes && Array.isArray(this.additionalInfo?.bleScenes)) {
      this.scenes = this.additionalInfo.bleScenes;
    }

    if (this.additionalInfo?.bleGroups && Array.isArray(this.additionalInfo?.bleGroups)) {
      this.groups = this.additionalInfo.bleGroups;
    }

    if (this.additionalInfo?.bleUnicastAddress) {
      this.unicastAddress = this.additionalInfo.bleUnicastAddress;
    }

    this.reloadGatewaySource();
    this.reloadHubDevicesFromGateway();
    this.loadNetwork();
    this.cd.detectChanges();
  }

  reloadGatewaySource() {
    if (this.hubSource == HubSource.GATEWAY) {
      this.data.apollo.apolloNodeTreeService.getByApolloTree(this.apolloNodeTree.apolloTreeId.id, new PageLink(100), NodeTreeType.GATEWAY, GatewayModel.APOLLO)
        .subscribe(res => {
          this.GatewaySources = res.data;
          this.reloadHubDevicesFromGateway();
        });
    } else if (this.hubSource == HubSource.DEVICES) {
      this.reloadHubDevicesFromGateway();
    }
  }

  reloadHubDevicesFromGateway() {
    if (this.hubSource == HubSource.GATEWAY) {
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
    } else if (this.hubSource == HubSource.DEVICES) {
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


  /*importNetworkConfig(networkJson) {
    console.log(this.hubDevice);
    if (this.hubDevice) {
      this.data.apollo.ctx.attributeService.saveEntityAttributes(new DeviceId(this.hubDevice), AttributeScope.SHARED_SCOPE,
        [{key: "data_bleSigmesh", value: networkJson as NetworkConfigModel}]).subscribe(res => {
        this.importStatus = "Successful";
        this.loadNetwork();
        this.cd.detectChanges();
      }, error => this.importStatus = error);
    } else {
      this.importStatus = "Not found hub device";
    }
  }

  importEvent($event) {
    let input = $event.target;
    if (input.files.length > 0) {
      let reader = new FileReader();

      reader.onload = function () {
        let text = reader.result;
        this.importNetworkConfig(text);
      }.bind(this);
      reader.readAsText(input.files[0]);
    }
  }

  exportEvent() {
  }*/

  loadNetwork() {
    if (this.hubDevice) {
      this.data.apollo.ctx.attributeService.getEntityAttributes(new DeviceId(this.hubDevice),
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data && data?.value) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));
            this.cd.detectChanges();
            this.data.apollo.ctx.attributeService.getEntityAttributes(new DeviceId(this.hubDevice),
              AttributeScope.SHARED_SCOPE, ['dataSetting']).subscribe(
              att => {
                const data = att.find((key) => {
                  if (key.key === 'dataSetting') {
                    return att;
                  }
                });
                if (data && data?.value) {
                  this.netKeysSource = data?.value?.bleNetKeys;
                  this.netKeys = this.netKeysSource;
                  this.appKeysSource = data?.value?.bleAppKeys;
                  this.appKeys = data?.value?.bleAppKeys;

                  this.scenes = data?.value?.bleScenes;

                  this.nodesSourceAddress = data?.value?.bleNodes;
                  this.groupsSourceAddress = data?.value?.bleGroups;


                  this.nodesSource = this.bleNetwork?.nodes?.getNodeArrayFromUnicastAddresses(this.nodesSourceAddress);
                  this.groupsSource = this.bleNetwork?.groups?.getDetailGroups(this.groupsSourceAddress);
                  this.scenesSource = this.bleNetwork?.scenes?.sceneArray;


                  this.cd.detectChanges();

                } else {
                  alert('Vui lòng cấu hình hub');
                }
              }
            );
          } else {
            confirm('Chưa import ble network.');
          }
        }
      );


    }
  }

  reloadNodeFromGroup() {

    if (this.groups && Array.isArray(this.groups)) {
      this.nodes = this.bleNetwork.groups.getNodesFromGroups(this.groups,
        this.bleNetwork.nodes.getNodeArrayFromUnicastAddresses(this.nodesSourceAddress));
    }
  }


  save($event) {
    this.status1 = 'Đang cập nhật...';
    this.apolloNodeTree.name = this.name;
    this.apolloNodeTree.model = this.model;
    const info: NodeTreeInfoBase = {
      hubSource: this.hubSource,
      gatewaySource: new ApolloNodeTreeId(this.gatewaySource),
      tbDeviceId: new DeviceId(this.hubDevice),
      bleNetKeys: this.netKeys,
      bleAppKeys: this.appKeys,
      bleNodes: this.nodes,
      bleGroups: this.groups,
      bleScenes: this.scenes,
      bleUnicastAddress: this.unicastAddress,
    };
    this.apolloNodeTree.additionalInfo = new NodeTreeInfoBaseImpl(info);

    this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(this.apolloNodeTree.toApolloNodeTree())
      .subscribe(res => {
        this.status1 = 'Cập nhật thực thể thành công';
        this.cd.detectChanges();
        setTimeout(() => {
          this.close();
        }, 1000);
      }, error => this.status1 = error);
  }

  close() {
    this.dialogRef.close({data: this.apolloNodeTree});
  }

  ngAfterViewInit(): void {

  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
