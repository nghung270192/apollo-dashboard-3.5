import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Device} from '@shared/models/device.models';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  BleNetwork,
  NetworkConfigModel
} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {WidgetContext} from '@home/models/widget-component.models';
import {HubControllerWithTbDeviceId} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {ThemePalette} from '@angular/material/core';
import {JsonPipe} from '@angular/common';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {SceneModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';
import {BleHubService} from '@modules/apollo/widget/share/services/ble-hub.service';

export interface DataViewDialog {
  device: Device;
  ctx: WidgetContext;
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
export class HubSettingComponent implements OnInit {
  status1 = '';
  importStatus = '';
  bleHubService: BleHubService;
  jsonPip = new JsonPipe();

  bleNetwork: BleNetwork;
  netKeys: Array<string> = [];
  appKeys: Array<string> = [];
  scenes: Array<string> = [];
  scenesSource: Array<SceneModel>;

  nodes: Array<string>;
  nodesSource: Array<NodeModel>;

  groups: Array<string>;
  groupsSource: Array<GroupModel>;

  unicastAddress: string;
  processingStep: ConfigStep[] = [
    {checked: false, name: 'Factory Reset', color: 'black'},
    {checked: false, name: 'Update Ble Network', color: 'black'},
    /*    {checked: false, name: "Set Nodes", color: "black"},
        {checked: false, name: "Set Groups", color: "black"},*/
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

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<HubSettingComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog,
              public dialog: MatDialog) {
    this.importNetworkConfig = this.importNetworkConfig.bind(this);
    this.configTask = this.configTask.bind(this);
  }

  ngOnInit(): void {
    this.bleHubService = new BleHubService(this.data.ctx.deviceService);
    if (this.data?.device?.id) {
      this.loadNetwork();
      this.data.ctx.attributeService.getEntityAttributes(this.data?.device?.id,
        AttributeScope.SHARED_SCOPE, ['dataSetting']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'dataSetting') {
              return att;
            }
          });
          if (data) {
            this.netKeys = data?.value?.bleNetKeys;
            this.appKeys = data?.value?.bleAppKeys;
            this.nodes = data?.value?.bleNodes;
            this.groups = data?.value?.bleGroups;
            this.scenes = data?.value?.bleScenes;
            this.unicastAddress = data?.value?.bleUnicastAddress;
            this.cd.detectChanges();
          } else {
            // alert("Chưa import ble network.")
          }
        }
      );
    }
  }


  importNetworkConfig(networkJson) {
    /*    this.bleNetwork = new BleNetwork(networkJson as NetworkConfigModel);
        this.cd.detectChanges();*/
    if (this.data?.device?.id) {
      this.data.ctx.attributeService.saveEntityAttributes(this.data?.device?.id, AttributeScope.SHARED_SCOPE,
        [{key: 'data_bleSigmesh', value: networkJson as NetworkConfigModel}]).subscribe(res => {
        this.importStatus = 'Successful';
        this.loadNetwork();
        this.cd.detectChanges();
      }, error => this.importStatus = error);
    } else {
      this.importStatus = 'Not found hub device';
    }
  }

  importEvent($event) {
    const input = $event.target;
    if (input.files.length > 0) {
      const reader = new FileReader();

      reader.onload = function () {
        const text = reader.result;
        this.importNetworkConfig(text);
      }.bind(this);
      reader.readAsText(input.files[0]);
    }
  }

  loadNetwork() {
    if (this.data?.device?.id) {
      this.data.ctx.attributeService.getEntityAttributes(this.data?.device?.id,
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));
            this.groupsSource = this.bleNetwork?.groups?.groupArray;
            this.nodesSource = this.bleNetwork?.nodes?.nodeArray;
            this.scenesSource = this.bleNetwork?.scenes?.sceneArray;
            this.cd.detectChanges();
          } else {
            alert('Chưa import ble network.');
          }
        }
      );
    }
  }

  reloadNodeFromGroup() {
    if (this.groups && Array.isArray(this.groups)) {
      this.nodes = this.bleNetwork.groups.getNodesFromGroups(this.groups, this.bleNetwork.nodes.nodeArray);
    }
  }

  private updateHistoryContent(text: string) {
    this.processingHistory += text;
  }

  private clearHistoryContent() {
    this.processingHistory = '';
  }

  private setState(state: State) {
    this.state = state;
  }

  private configTask() {
    switch (this.state) {
      case State.IDLE:
        this.clearHistoryContent();
        this.processingStep.forEach((step, index) => {
          this.processingStep[index].color = 'black';
        });
        this.waiting = true;
        this.state = State.RESET_NETWORK;
        break;
      case State.RESET_NETWORK:
        if (this.processingStep[0].checked === true) {
          this.processingStep[0].color = 'red';
          if (this.waiting) {
            this.waiting = false;
            this.bleHubService.resetNetwork(this.data.device.id.id).subscribe(res => {
              this.waiting = true;
              this.processingStep[0].color = 'green';
              this.setState(State.REQUEST_UPDATE_FILE_JSON);
            }, error => {
              this.setState(State.ERROR);
              this.updateHistoryContent(this.jsonPip.transform(error));
            });
          }
        } else {
          this.setState(State.REQUEST_UPDATE_FILE_JSON);
        }

        break;
      case State.REQUEST_UPDATE_FILE_JSON:

        if (this.processingStep[1].checked === true) {
          this.processingStep[1].color = 'red';
          const data_bleSigmesh = this.copyJsonData();
          if (data_bleSigmesh.groups && Array.isArray(data_bleSigmesh.groups)
            && data_bleSigmesh.nodes && Array.isArray(data_bleSigmesh.nodes)) {
            if (data_bleSigmesh.groups.length + data_bleSigmesh.nodes.length > 120) {
              alert('Lỗi: tổng số group và node > 120');
              this.setState(State.ERROR);
            } else if (this.waiting) {
              this.waiting = false;
              this.bleHubService.requestUpdateNetwork(this.data.device.id.id, data_bleSigmesh).subscribe(res => {
                console.log(res);
                if (res == '8E') {
                  alert('Lỗi: tổng số group và node > 120');
                  this.setState(State.ERROR);
                } else {
                  this.waiting = true;
                  this.processingStep[1].color = 'green';
                  this.setState(State.SET_UNICAST);
                }
              }, error => {
                this.setState(State.ERROR);
                this.updateHistoryContent(this.jsonPip.transform(error));
              });
            }
          }
        } else {
          this.setState(State.SET_UNICAST);
        }

        break;

      case State.SET_UNICAST:
        if (this.processingStep[2].checked === true) {
          this.processingStep[2].color = 'red';
          if (this.waiting) {
            this.waiting = false;
            this.bleHubService.setUnicastAddress(this.data.device.id.id, this.unicastAddress).subscribe(res => {
              this.waiting = true;
              this.processingStep[2].color = 'green';
              this.setState(State.REBOOT);
            }, error => {
              this.setState(State.ERROR);
              this.updateHistoryContent(this.jsonPip.transform(error));
            });
          }
        } else {
          this.setState(State.REBOOT);
        }

        break;
      case State.REBOOT:
        if (this.processingStep[3].checked === true) {
          this.processingStep[3].color = 'red';
          if (this.waiting) {
            this.waiting = false;
            this.bleHubService.reboot(this.data.device.id.id).subscribe(res => {
              this.waiting = true;
              this.processingStep[3].color = 'green';
              this.setState(State.DONE);
            }, error => {
              this.setState(State.ERROR);
              this.updateHistoryContent(this.jsonPip.transform(error));
            });
          }
        } else {
          this.setState(State.DONE);
        }

        break;
      case State.WAIT:
        break;
      case State.DONE:
        this.updateHistoryContent('Cấu hình thành công' + '</br>');
        this.save(null);
        if (this.configTaskId) {
          clearInterval(this.configTaskId);
        }
        break;
      case State.ERROR:
        this.updateHistoryContent('Đã có lỗi sảy ra trong quá trình cài đặt.' + '</br>');
        if (this.configTaskId) {
          clearInterval(this.configTaskId);
        }
        break;
    }
    this.cd.detectChanges();
  }

  startConfig($event) {
    this.state = State.IDLE;
    if (this.configTaskId) {
      clearInterval(this.configTaskId);
    }
    this.configTaskId = setInterval(this.configTask, 500);
  }

  copyJsonData() {
    const copyNetwork: NetworkConfigModel = this.bleNetwork.network;
    console.log(this.nodes);
    copyNetwork.nodes = this.bleNetwork.nodes.getNodeArrayFromUnicastAddresses(this.nodes);
    copyNetwork.groups = this.bleNetwork.groups.getDetailGroups(this.groups);
    copyNetwork.scenes = this.bleNetwork.scenes.getSceneDetails(this.scenes);

    return copyNetwork;
  }

  toggleSelectAllStepConfig($event) {
    if ($event?.checked) {
      this.processingStep.forEach(res => res.checked = true);
    } else {
      this.processingStep.forEach(res => res.checked = false);

    }
  }

  save($event) {

    const dataSetting = {
      bleNetKeys: this.netKeys,
      bleAppKeys: this.appKeys,
      bleNodes: this.nodes,
      bleGroups: this.groups,
      bleScenes: this.scenes,
      bleUnicastAddress: this.unicastAddress,
    };

    if (this.data?.device?.id) {
      /* const data = this.copyJsonData();
       this.data.ctx.attributeService.saveEntityAttributes(this.data?.device?.id, AttributeScope.SHARED_SCOPE,
         [{key: "dataSetting", value: data}]).subscribe(res => {
         this.updateHistoryContent("Lưu vào tb device thành công" + "</br>");
       });*/
      this.data.ctx.attributeService.saveEntityAttributes(this.data?.device?.id, AttributeScope.SHARED_SCOPE,
        [{key: 'dataSetting', value: dataSetting}]).subscribe(res => {
        this.updateHistoryContent('Lưu vào tb device thành công' + '</br>');
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
