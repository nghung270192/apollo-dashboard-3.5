import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  ApolloDeviceModel,
  ApolloDeviceSource
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {
  ApolloEntityTypeModel,
  GatewayModel,
  NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {
  CreateDeviceCommon
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/device/create-device-common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'tb-create-ble-device-from-apollo',
  templateUrl: './create-ble-device-from-apollo.component.html',
  styleUrls: ['./create-ble-device-from-apollo.component.scss']
})
export class CreateBleDeviceFromApolloComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  @Input() apollo: ApolloWidgetContext;
  @Input() parentNodeTree: NodeTree;
  @Input() nodes: Array<NodeTree> = [];
  @Input() addTrigger: boolean;
  @Output() nodesChange: EventEmitter<Array<NodeTree>> = new EventEmitter<Array<NodeTree>>();
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup;

  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;
  devices: Array<Device> = [];


  deviceSource: ApolloDeviceSource;
  DeviceSourceArray = Object.values(ApolloDeviceSource);
  ApolloDeviceSource = ApolloDeviceSource;

  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeSelected: NodeTree;

  bleGroupSource: Array<GroupModel> = [];
  bleGroup: Array<string>;

  bleNodeSource: Array<NodeModel> = [];
  bleNodes: Array<string>;

  bleNetwork: BleNetwork;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
    super();
    this.formGroup = fb.group({
      deviceSource: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    //console.log(this.parentNodeTree);
    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id,
      new PageLink(100), 'HUB', '').subscribe(
      res => {
        this.hubNodeTrees = res.data;
        this.cd.detectChanges();
      }
    );

    //todo: get device by customer

  }

  renderDeviceFromHub() {
    let hub: NodeTreeInfoBaseImpl;
    if (this.hubNodeTreeSelected && this.hubNodeTreeSelected?.additionalInfo) {
      hub = new NodeTreeInfoBaseImpl(this.hubNodeTreeSelected?.additionalInfo);
    }
    if (hub) {

      this.apollo.ctx.attributeService.getEntityAttributes(hub.tbDeviceId,
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));
            this.bleGroupSource = this.bleNetwork.groups.getDetailGroups(hub.bleGroups);
            if (this.deviceSource === ApolloDeviceSource.GROUP) {

            } else if (this.deviceSource === ApolloDeviceSource.DEVICE) {

            }

          } else {
            confirm('Chưa import ble network. Vui lòng cấu hình Hub');
          }
        }
      );
    }
  }

  renderNodeFromGroupSelected() {
    this.bleNodeSource = this.bleNetwork.groups.getNodesDetailFromGroups(this.bleGroup, this.bleNetwork.nodes.nodeArray);
    this.bleNodes = this.bleNetwork.groups.getNodesFromGroups(this.bleGroup, this.bleNetwork.nodes.nodeArray);
  }

  createNodeEntity() {
    this.nodes = [];
    this.loading = true;
    if (this.bleNodes && Array.isArray(this.bleNodes) && this.bleNodes.length > 0) {
      this.bleNodes.forEach(bleNode => {
        const node = this.bleNetwork.nodes.nodes.get(bleNode);
        const nodeTree: NodeTree = {
          name: node?.name + node?.unicastAddress + node?.UUID,
          type: NodeTreeType.DEVICE,
          apolloTreeId: this.parentNodeTree.apolloTreeId,
          parentId: this.parentNodeTree.id,
          additionalInfo: {
            model: ApolloDeviceModel.BLE_SIG_MESH,
            tbDeviceId: this.hubNodeTreeSelected?.additionalInfo?.tbDeviceId,
            hubNodeTreeId: this.hubNodeTreeSelected.id,
            entity: node
          },
          model: GatewayModel.APOLLO
        };
        this.nodes.push(nodeTree);
      });
    }
    if (this.bleNodes && Array.isArray(this.bleNodes) && this.bleNodes.length > 0) {
      this.createNodeTrees(this.nodes, this.apollo).subscribe(res => {

        this.createEvent.emit();
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách thiết bị trống');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange() === false
      && changes.addTrigger?.previousValue !== changes.addTrigger?.currentValue) {
      this.createNodeEntity();
    }
  }
}
