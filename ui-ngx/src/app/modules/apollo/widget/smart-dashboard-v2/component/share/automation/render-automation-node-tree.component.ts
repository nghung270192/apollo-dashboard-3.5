import {
  AfterViewInit,
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
  DataKey, TelemetryIncoming
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
  ComparisonType, ComparisonTypeLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree-id';
import {
  CreateDeviceCommon
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/device/create-device-common';
import {SchedulerNodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/scheduler/scheduler.model';
import {Observable, Subscription} from 'rxjs';
import {DatePipe, JsonPipe} from '@angular/common';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  SelectCmdZigbeeComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/automation/input/select-cmd-zigbee.component';
import {IWidgetSubscription, SubscriptionInfo, WidgetSubscriptionOptions} from '@core/api/widget-api.models';
import {DatasourceType, widgetType} from '@shared/models/widget.models';
import {EntityType} from '@shared/models/entity-type.models';

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
export class RenderAutomationNodeTreeComponent extends CreateDeviceCommon implements OnInit, OnDestroy, OnChanges, AfterViewInit {
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
  ApolloDeviceArray = Object.values(ApolloDeviceModel);
  ApolloDeviceModel = ApolloDeviceModel;
  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeIdSelected: string;
  bleNetwork: BleNetwork;
  zbNodeSource: Array<ZigbeeDevice> = [];
  fromTime: string;
  fromWeekDays: Array<number> = [];
  bleGroupSource: Array<GroupModel> = [];
  bleSceneSource: Array<SceneModel> = [];
  AutoTypeControl = AutoTypeControl;
  typeControlDatasource = Object.values(AutoTypeControl);
  comparisonTypes = Object.values(ComparisonType);
  comparisonTypeLabelMapping = ComparisonTypeLabelMapping;

  inputFormGroup: FormGroup;
  outputFormGroup: FormGroup;


  displayedColumns: string[] = ['No', 'Cmd'];
  datasource: Array<TableDatasource> = [];

  private subscription: Observable<IWidgetSubscription>;
  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;

  outputScriptDataSource: Array<OutputScript> = [];

  displayedColumnsRenderOutput: string[] = ['model', 'control', 'target', 'value', 'tool'];


  constructor(private cd: ChangeDetectorRef, public datepipe: DatePipe, public dialog: MatDialog, private fb: FormBuilder) {
    super();

    this.inputFormGroup = fb.group({
      deviceModel: [ApolloDeviceModel.ZIGBEE, Validators.required],
      zigbeeNodeSelected: [null, Validators.required],
      zbEndPoint: [0, Validators.required],
      zbName: [null, Validators.required],
      zbValue: [null, Validators.required],
      compareType: [null, Validators.required]
    });
    this.outputFormGroup = fb.group({
      deviceModel: [ApolloDeviceModel.BLE_SIG_MESH, Validators.required],
      zigbeeNodeSelected: [null, Validators.required],
      zbEndPoint: [0, Validators.required],
      modeControl: [AutoTypeControl.ONOFF, Validators.required],
      target: [null, Validators.required], /*ble group/device, zigbee address*/
      value: [null, Validators.required], /*state, lightness, scene*/
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.name = (this.type === NodeTreeType.SCHEDULER) ? 'New Scheduler' : 'New Automation';
    if (this.node) {
      const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(this.node);

      const input: InputScriptImpl = new InputScriptImpl(nodeTreeImpl.additionalInfo?.inputScript);

      this.hubNodeTreeIdSelected = nodeTreeImpl.additionalInfo?.hubNodeTreeId?.id;
      this.name = nodeTreeImpl.name;
      this.inputFormGroup.patchValue({
        deviceModel: input.fromZbEndpoint,
        zigbeeNodeSelected: input.fromZbNodes,
        zbEndPoint: input.fromZbEndpoint,
        zbName: input.fromZbName,
        zbValue: input.fromZbValue,
        compareType: nodeTreeImpl.additionalInfo.comparison
      });


      this.fromTime = input.fromTimes;
      this.fromWeekDays = input.fromWeekDays;

      if (nodeTreeImpl.additionalInfo?.outputScript && Array.isArray(nodeTreeImpl.additionalInfo?.outputScript)) {
        this.outputScriptDataSource = nodeTreeImpl.additionalInfo?.outputScript;
      }
      console.log(this.ApolloDeviceArray);
      console.log(this.inputFormGroup);

      this.cd.detectChanges();
    }

    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id,
      new PageLink(100), 'HUB', '').subscribe(
      res => {
        this.hubNodeTrees = res.data;
        this.renderDeviceFromHub();
        this.cd.detectChanges();
      }
    );

    /*    this.subscription = this.apollo.apolloObserver.subscribe(res => {
          if (res && res?.model === DataKey.ZIGBEE_KEY) {
            // this.datasource = [];
            // this.datasource.push({method: res.key, params: res.params});
            this.zbStateParams = res.params;
            this.zbModelParams = res.key;
            this.zbTimeUpdate = this.datepipe.transform((new Date()), 'HH:mm:ss');
            this.cd.detectChanges();
          }
        });*/
  }

  applyZigbeeInput() {
    // this.fromZbNodes = this.zbNodeSource.find(node => node.addr === this.zbStateParams?.addr);
    // this.fromZbNodeId = this.zbStateParams?.addr;
    console.log(this.zbStateParams);
    const zbNode = this.zbNodeSource.find(node => node.addr === this.zbStateParams?.addr);
    /*
        this.inputFormGroup.get('zigbeeNodeSelected').patchValue([zbNode]);
        this.inputFormGroup.get('zbEndPoint').patchValue([this.zbStateParams?.ep]);
        this.inputFormGroup.get('zbName').patchValue([this.zbStateParams?.state?.name]);
        this.inputFormGroup.get('zbValue').patchValue([this.zbStateParams?.state?.val]);
    */

    this.inputFormGroup.patchValue({
      zigbeeNodeSelected: zbNode,
      zbEndPoint: this.zbStateParams?.ep,
      zbName: this.zbStateParams?.state?.name,
      zbValue: this.zbStateParams?.state?.val,
    });

    console.log(this.inputFormGroup);

    this.cd.detectChanges();
  }

  renderDeviceFromHub() {
    if (this.hubNodeTreeIdSelected) {
      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.hubNodeTreeIdSelected).subscribe(res => {
        const hubController = new HubController(res, this.apollo);
        console.log(hubController, this.inputFormGroup.get('deviceModel').value);
        /*        if (this.type === NodeTreeType.AUTOMATION && this.inputFormGroup.get('deviceModel').value === ApolloDeviceModel.ZIGBEE) {
                  this.renderZbDeviceFromHub(hubController);
                }*/
        this.renderZbDeviceFromHub(hubController);
        this.renderBleDeviceFromHub(hubController);
        /*        if (this.inputFormGroup.get('deviceModel').value === ApolloDeviceModel.BLE_SIG_MESH) {
                  this.renderBleDeviceFromHub(hubController);
                }*/
      });
    }
  }

  renderZbDeviceFromHub(hubController: HubController) {
    hubController.zbGetDevices().subscribe(
      res => {
        if (res && Array.isArray(res)) {
          this.zbNodeSource = res;
          this.renderZigbeeDeviceFromId();
          const addressKeys = this.zbNodeSource.map(zb => `data_zigbee_${zb?.addr}`);
          this.subscribeForValue(new DeviceId(hubController.tbDeviceId), addressKeys);
          this.cd.detectChanges();
        }
      }
    );

    /*    if (this.data.hubNodeTreeIdSelected) {
          this.data.apollo.apolloNodeTreeService.getApolloNodeTree(this.data.hubNodeTreeIdSelected)
            .subscribe(hubNodeTree => {
              this.data.apollo.hubService.zigbeeHubService.getDevices(hubNodeTree?.additionalInfo?.tbDeviceId?.id)
                .subscribe(value => {
                  if (value && value?.params) {
                    let listAddress = Object.keys(value.params);
                    listAddress = listAddress.map(value1 => `data_zigbee_${value1}`);
                    this.subscribeForValue(hubNodeTree?.additionalInfo?.tbDeviceId, listAddress);
                  }
                });
            });
        }*/
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
    /*if (this.zbNodeSource && Array.isArray(this.zbNodeSource)) {
      this.fromZbNodes = this.zbNodeSource.find(res => res.addr === this.fromZbNodeId);
    }*/
  }

  /*  renderZigbeeDeviceFromIdForOutput() {
      if (this.zbNodeSource && Array.isArray(this.zbNodeSource)) {
        this.toZbNodes = this.zbNodeSource.find(res => res.addr === this.toZbNodeId);
      }
    }*/


  renderAndExportNodeEntity() {
    const additionalInfo: NodeTreeInfoBase = {
      hubNodeTreeId: new ApolloNodeTreeId(this.hubNodeTreeIdSelected),
      enable: true,
      comparison: this.inputFormGroup.get('compareType').value,
      inputScript: {
        fromDeviceModel: this.inputFormGroup.get('deviceModel').value,
        fromZbNodes: this.inputFormGroup.get('zigbeeNodeSelected').value,
        fromZbEndpoint: this.inputFormGroup.get('zbEndPoint').value,
        fromZbName: this.inputFormGroup.get('zbName').value,
        fromZbValue: this.inputFormGroup.get('zbValue').value,
        fromTimes: this.fromTime,
        fromWeekDays: this.fromWeekDays
      },
      outputScript: this.outputScriptDataSource
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

  /*  loadNetwork(tbDeviceId: DeviceId) {
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
    }*/

  checkZbNodeAvailable(zbNodes: ZigbeeDevice): boolean {
    return !!(zbNodes && zbNodes?.model && zbNodes?.addr);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      // this.subscription?.unsubscribe();
      this.subscription.subscribe(value => this.apollo.ctx.subscriptionApi.removeSubscription(value.id));
    }
  }

  save(): void {
    this.loading = true;
    this.renderAndExportNodeEntity();
    if (this.type === NodeTreeType.AUTOMATION) {
      const automationNodeTree: AutomationNodeTree = new AutomationNodeTree(this.node, this.apollo);
      automationNodeTree.createOrUpdate().subscribe(
        res => {
        },
        error => new JsonPipe().transform(error),
        () => {
          this.loading = false;
          this.createEvent.emit();
        }
      );
    } else if (this.type === NodeTreeType.SCHEDULER) {
      const schedulerNodeTree: SchedulerNodeTree = new SchedulerNodeTree(this.node, this.apollo);
      schedulerNodeTree.createOrUpdate().subscribe(
        res => {
        },
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
        hubNodeTreeIdSelected: this.hubNodeTreeIdSelected,
      }
    };
    this.dialog.open(SelectCmdZigbeeComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data && res?.data?.zbStateParams) {
        this.zbStateParams = res?.data?.zbStateParams;
        this.zbTimeUpdate = res?.data?.zbTimeUpdate;
        this.applyZigbeeInput();
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange() === false
      && changes.addTrigger?.previousValue !== changes.addTrigger?.currentValue) {
      this.save();
    }
  }

  addNewOutputScript() {
    const tmp = this.outputScriptDataSource;
    tmp.push(
      {
        toTarget: this.outputFormGroup.get('target').value,
        toDeviceModel: this.outputFormGroup.get('deviceModel').value,
        toControlType: this.outputFormGroup.get('modeControl').value,
        toValue: this.outputFormGroup.get('value').value,
        toOptionTarget: this.outputFormGroup.get('zbEndPoint').value
      }
    );
    this.outputScriptDataSource = tmp;

    this.cd.detectChanges();
  }

  removeOutputScript(idx: number) {
    this.outputScriptDataSource.splice(idx, 1);
    this.cd.detectChanges();
  }

  parseDateCallback(data: TelemetryIncoming) {
    if (data && data?.data && Array.isArray(data?.data) && data?.data.length > 0) {
      // const params = new ZbStateParamsImpl(data.data[0]?.params as ZbStateParams);
      this.zbStateParams = data?.data[0].params as ZbStateParams;
      this.zbModelParams = data?.data[0].method;

      this.zbTimeUpdate = this.datepipe.transform((new Date()), 'HH:mm:ss');

      this.cd.detectChanges();
    }
  }

  private subscribeForValue(deviceId: DeviceId, addresses: Array<string>): Observable<IWidgetSubscription> {

    const valueSubscriptionInfo: SubscriptionInfo[] = [];
    const subscriptionInfo: SubscriptionInfo = {
      type: DatasourceType.entity,
      entityType: EntityType.DEVICE,
      entityId: deviceId.id,
      timeseries: addresses.map(value => ({name: value}))
    };
    // subscriptionInfo.timeseries.push({name: `data_zigbee_${this.addr}`});

    valueSubscriptionInfo.push(subscriptionInfo);


    const subscriptionOptions: WidgetSubscriptionOptions = {
      callbacks: {
        onDataUpdated: (subscription, detectChanges) => this.apollo.ctx.ngZone.run(() => {
          this.onDataUpdated(subscription);
        })
      }
    };
    return this.apollo.ctx.subscriptionApi.createSubscriptionFromInfo(
      widgetType.latest, valueSubscriptionInfo, subscriptionOptions, false, true);

  }

  private onDataUpdated(subscription: IWidgetSubscription) {
    const data = subscription.data;

    if (data && Array.isArray(data)) {
      const arr = [];
      for (const dt of data) {
        let model = DataKey.UNKNOW_KEY;
        let unicastAddress = '';

        if (dt && dt.dataKey && dt.dataKey?.name) {
          model = DataKey.ZIGBEE_KEY;
          unicastAddress = dt.dataKey?.name.substring(-4);
        }

        const ds: TelemetryIncoming = {
          entityId: dt.datasource.entityId,
          entityName: dt.datasource.entityName,
          time: dt.data[0][0],
          model,
          unicastAddress,
          data: JSON.parse(dt.data[0][1])
        };
        /*        this.subject.next(ds);*/
        this.parseDateCallback(ds);
      }
    }

  }


  // protected readonly ComparisonTypeLabelMapping = ComparisonTypeLabelMapping;
  compareZbNode(a: ZigbeeDevice, b: ZigbeeDevice) {
    return a.addr === b.addr;
  };
}
