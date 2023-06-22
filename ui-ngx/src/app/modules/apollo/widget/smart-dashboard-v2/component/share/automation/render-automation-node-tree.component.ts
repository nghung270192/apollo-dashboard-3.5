import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  ApolloWidgetContext,
  DataKey
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloDeviceModel, HubController} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {DeviceId} from '@shared/models/id/device-id';
import {SceneModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';
import {
  ZbStateParams,
  ZigbeeModel
} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {ZigbeeDevice} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {
  InputScriptImpl,
  NodeTreeInfoBase, OutputScript,
  OutputScriptImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {
  AutomationNodeTree,
  AutoTypeControl,
  ComparisonType
} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree-id';
import {
  CreateDeviceCommon
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/device/create-device-common';
import {SchedulerNodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/scheduler/scheduler.model';
import {Subscription} from 'rxjs';
import {DatePipe, JsonPipe} from '@angular/common';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  SelectCmdZigbeeComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/automation/input/select-cmd-zigbee.component';

export interface TableDatasource {
  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;
}

@Component({
  selector: 'tb-automation-from-apollo',
  templateUrl: './render-automation-node-tree.component.html',
  styleUrls: ['./render-automation-node-tree.component.scss']
})
export class RenderAutomationNodeTreeComponent extends CreateDeviceCommon implements OnInit, OnDestroy, OnChanges {


  @Input() apollo: ApolloWidgetContext;
  @Input() parentNodeTree: NodeTree;
  @Input() addTrigger: boolean;
  @Input() node: NodeTree;
  @Input() type: NodeTreeType;

  @Output() nodeChange: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();


  NodeTreeType = NodeTreeType;
  name = '';
  devices: Array<Device> = [];

  inputModelFormControl = new FormControl('');
  outputModelFormControl = new FormControl('');


  fromDeviceModel: ApolloDeviceModel = ApolloDeviceModel.ZIGBEE;
  toDeviceModel: ApolloDeviceModel = ApolloDeviceModel.BLE_SIG_MESH;
  ApolloDeviceArray = Object.values(ApolloDeviceModel);
  ApolloDeviceModel = ApolloDeviceModel;


  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeIdSelected: string;

  bleNetwork: BleNetwork;

  zbNodeSource: Array<ZigbeeDevice> = [];
  fromZbNodes: ZigbeeDevice;
  fromZbNodeId: number;
  fromZbEndpoint = 0;
  fromZbValue = 0;
  fromZbName: string;
  comparisonType: ComparisonType;

  fromTime: string;
  fromWeekDays: Array<number> = [];

  ZigbeeModel = ZigbeeModel;

  hubController: HubController;


  bleGroupSource: Array<GroupModel> = [];
  toBleGroup: string;

  bleSceneSource: Array<SceneModel> = [];
  toBleScene: any;

  toBleTarget: string;

  AutoTypeControl = AutoTypeControl;


  toControlType: AutoTypeControl = AutoTypeControl.ONOFF;
  toBleValue = 0;
  myDate = new Date();

  constructor(private cd: ChangeDetectorRef, public datepipe: DatePipe, public dialog: MatDialog) {
    super();
  }

  displayedColumns: string[] = ['No', 'Cmd'];
  datasource: Array<TableDatasource> = [];

  subscription: Subscription = null;
  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;

  dataSource: Array<OutputScript> = [];

  displayedColumnsRenderOutput: string[] = ['model', 'control', 'target', 'value'];

  ngOnInit(): void {
    this.name = (this.type === NodeTreeType.SCHEDULER) ? 'New Scheduler' : 'New Automation';
    if (this.node) {
      const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(this.node);

      const input: InputScriptImpl = new InputScriptImpl(nodeTreeImpl.additionalInfo?.inputScript);

      this.hubNodeTreeIdSelected = nodeTreeImpl.additionalInfo?.hubNodeTreeId?.id;
      this.name = nodeTreeImpl.name;
      this.comparisonType = nodeTreeImpl.additionalInfo.comparison;
      this.fromDeviceModel = input.fromDeviceModel;
      this.fromZbEndpoint = input.fromZbEndpoint;
      this.fromZbNodes = input.fromZbNodes;
      this.fromZbNodeId = input.fromZbNodes?.addr;
      this.fromZbValue = input.fromZbValue;
      this.fromZbName = input.fromZbName;
      this.fromTime = input.fromTimes;
      this.fromWeekDays = input.fromWeekDays;

      const output: OutputScriptImpl = new OutputScriptImpl(nodeTreeImpl.additionalInfo?.outputScript);
      /*      this.toDeviceModel = output?.toDeviceModel;
            this.toControlType = output?.toControlType;
            this.toBleScene = output?.toBleScene;
            this.toBleGroup = output?.toBleGroup;
            this.toBleValue = Number(output?.toBleValue);*/

      this.dataSource.push(output.toData());
    }

    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id,
      new PageLink(100), 'HUB', '').subscribe(
      res => {
        this.hubNodeTrees = res.data;
        this.renderDeviceFromHub();
        this.cd.detectChanges();
      }
    );

    this.subscription = this.apollo.apolloObserver.subscribe(res => {
      if (res && res?.model === DataKey.ZIGBEE_KEY) {
        // this.datasource = [];
        // this.datasource.push({method: res.key, params: res.params});
        this.zbStateParams = res.params;
        this.zbModelParams = res.key;
        this.zbTimeUpdate = this.datepipe.transform((new Date()), 'HH:mm:ss');
        this.cd.detectChanges();
      }
    });
  }

  applyZigbeeInput() {
    this.fromZbNodes = this.zbNodeSource.find(node => node.addr === this.zbStateParams?.addr);
    this.fromZbNodeId = this.zbStateParams?.addr;
    this.fromZbEndpoint = this.zbStateParams?.ep;
    this.fromZbValue = this.zbStateParams?.state?.val;
    this.fromZbName = this.zbStateParams?.state?.name;
    this.cd.detectChanges();
  }

  renderDeviceFromHub() {
    if (this.hubNodeTreeIdSelected) {
      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.hubNodeTreeIdSelected).subscribe(res => {
        const hubController = new HubController(res, this.apollo);
        if (this.type === NodeTreeType.AUTOMATION && this.fromDeviceModel === ApolloDeviceModel.ZIGBEE) {
          this.renderZbDeviceFromHub(hubController);
        }
        if (this.toDeviceModel === ApolloDeviceModel.BLE_SIG_MESH) {
          this.renderBleDeviceFromHub(hubController);
        }
      });
    }
  }

  renderZbDeviceFromHub(hubController: HubController) {
    hubController.zbGetDevices().subscribe(
      res => {
        if (res && Array.isArray(res)) {
          this.zbNodeSource = res;
          this.renderZigbeeDeviceFromId();
          this.cd.detectChanges();
        }
      }
    );
  }

  renderBleDeviceFromHub(hubController: HubController) {
    if (hubController && hubController?.tbDeviceId) {
      this.apollo.ctx.attributeService.getEntityAttributes(new DeviceId(hubController.tbDeviceId),
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));
            this.bleGroupSource = this.bleNetwork.groups.getDetailGroups(hubController.additionalInfo.bleGroups);
            if (this.bleNetwork && this.bleNetwork.scenes && Array.isArray(this.bleNetwork.scenes.sceneArray)) {
              this.bleSceneSource = this.bleNetwork.scenes.sceneArray;
            }

          } else {
            confirm('Chưa import ble network. Vui lòng cấu hình Hub');
          }
        }
      );
    }
  }

  renderZigbeeDeviceFromId() {
    if (this.zbNodeSource && Array.isArray(this.zbNodeSource)) {
      this.fromZbNodes = this.zbNodeSource.find(res => res.addr === this.fromZbNodeId);
    }
  }

  renderAndExportNodeEntity() {
    const additionalInfo: NodeTreeInfoBase = {
      hubNodeTreeId: new ApolloNodeTreeId(this.hubNodeTreeIdSelected),
      enable: true,
      comparison: this.comparisonType,
      inputScript: {
        fromDeviceModel: this.fromDeviceModel,
        fromZbNodes: this.fromZbNodes,
        fromZbEndpoint: this.fromZbEndpoint,
        fromZbName: this.fromZbName,
        fromZbValue: this.fromZbValue,
        fromTimes: this.fromTime,
        fromWeekDays: this.fromWeekDays
      },
      outputScript: {
        toDeviceModel: this.toDeviceModel,
        toControlType: this.toControlType,
        toBleScene: this.toBleScene,
        toBleGroup: this.toBleGroup,
        toBleValue: this.toBleValue
      }
    };
    if (this.node) {
      this.node.name = this.name;
      this.node.additionalInfo = additionalInfo;
      this.nodeChange.emit(this.node);
    } else {
      const nodeTree: NodeTree = {
        name: this.name,
        type: this.type,
        apolloTreeId: this.parentNodeTree.apolloTreeId,
        parentId: this.parentNodeTree.id,
        additionalInfo,
        model: GatewayModel.APOLLO
      };

      this.node = nodeTree;
    }

    console.log(this.node);
  }

  loadNetwork(tbDeviceId: DeviceId) {
    if (tbDeviceId) {
      this.apollo.ctx.attributeService.getEntityAttributes(tbDeviceId,
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));

          } else {
            confirm('Chưa import ble network.');
          }
        }
      );
    }
  }

  checkZbNodeAvailable(zbNodes: ZigbeeDevice): boolean {
    return !!(zbNodes && zbNodes?.model && zbNodes?.addr);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save(): void {
    this.loading = true;
    this.renderAndExportNodeEntity();
    if (this.type === NodeTreeType.AUTOMATION) {
      const automationNodeTree: AutomationNodeTree = new AutomationNodeTree(this.node, this.apollo);
      automationNodeTree.createOrUpdate().subscribe(
        res => console.log(res),
        error => new JsonPipe().transform(error),
        () => {
          this.loading = false;
          this.createEvent.emit();
        }
      );
    } else if (this.type === NodeTreeType.SCHEDULER) {
      const schedulerNodeTree: SchedulerNodeTree = new SchedulerNodeTree(this.node, this.apollo);
      schedulerNodeTree.createOrUpdate().subscribe(
        res => console.log(res),
        error => alert(new JsonPipe().transform(error)),
        () => {
          this.loading = false;
          this.createEvent.emit();
        }
      );
    }
    /*
        if (this.node) {
          this.loading = true;
          super.createNodeTree(this.node, this.apollo).subscribe(res => {
            this.createEvent.emit();
            this.loading = false;
          });
        } else {
          alert("Danh sách trống");
        }*/
  }

  openDialogSelectZigbeeCmd() {
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
      }
    };
    this.dialog.open(SelectCmdZigbeeComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data && res?.data?.zbStateParams) {
        this.zbStateParams = res?.data?.zbStateParams;
        this.applyZigbeeInput();
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange() === false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.save();
    }
  }

  addNewOutputScript() {

  }
}
