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

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  ApolloDeviceModel,
  ApolloDeviceSource,
  HubController
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {ZigbeeDevice} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee.model';
import {CreateDeviceCommon} from '@modules/apollo/widget/smart-dashboard-v1/component/share/device/create-device-common';

@Component({
  selector: 'tb-create-zb-device-from-apollo',
  templateUrl: './create-zb-device-from-apollo.component.html',
  styleUrls: ['./create-zb-device-from-apollo.component.scss']
})
export class CreateZbDeviceFromApolloComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  @Input() apollo: ApolloWidgetContext;
  @Input() parentNodeTree: NodeTree;
  @Input() addTrigger: boolean;
  @Input() nodes: Array<NodeTree> = [];
  @Output() nodesChange: EventEmitter<Array<NodeTree>> = new EventEmitter<Array<NodeTree>>();
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  devices: Array<Device> = [];


  deviceSource: ApolloDeviceSource;
  DeviceSourceArray = Object.values(ApolloDeviceSource);
  ApolloDeviceSource = ApolloDeviceSource;

  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeSelected: NodeTree;

  zbNodeSource: Array<ZigbeeDevice> = [];
  zbNodes: Array<ZigbeeDevice> = [];


  bleNetwork: BleNetwork;

  hubController: HubController;

  constructor(private cd: ChangeDetectorRef) {
    super();
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
    /*    let hub: NodeTreeInfoBaseImpl;
        if (this.hubNodeTreeSelected && this.hubNodeTreeSelected?.additionalInfo) {
          hub = new NodeTreeInfoBaseImpl(this.hubNodeTreeSelected?.additionalInfo);
        }*/
    // if (hub) {
    this.hubController = new HubController(this.hubNodeTreeSelected, this.apollo);
    this.hubController.zbGetDevices().subscribe(
      res => {
        //console.log(res);
        if (res && Array.isArray(res)) {
          this.zbNodeSource = res;
        }
      }
    );
  }

  createNodeEntity() {
    this.nodes = [];
    if (this.zbNodes && Array.isArray(this.zbNodes)) {
      this.zbNodes.forEach(zbNode => {
        const nodeTree: NodeTree = {
          name: zbNode?.name + zbNode?.addr + zbNode?.model,
          type: NodeTreeType.DEVICE,
          apolloTreeId: this.parentNodeTree.apolloTreeId,
          parentId: this.parentNodeTree.id,
          additionalInfo: {
            model: ApolloDeviceModel.ZIGBEE,
            hubNodeTreeId: this.hubNodeTreeSelected.id,
            entity: zbNode
          },
          model: GatewayModel.APOLLO
        };
        this.nodes.push(nodeTree);
      });
    }

    if (this.nodes && Array.isArray(this.nodes) && this.nodes.length > 0) {
      this.createNodeTrees(this.nodes, this.apollo).subscribe(res => {
        this.createEvent.emit();
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách thiết bị trống');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange() == false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.createNodeEntity();
      console.log('create event');
    }
  }
}
