import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CreateDeviceCommon} from '@modules/apollo/widget/smart-dashboard-v2/component/share/device/create-device-common';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {PageLink} from '@shared/models/page/page-link';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {HassDomain, IotDevice} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {ZigbeeNodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';

@Component({
  selector: 'tb-create-dqsmart-device',
  templateUrl: './create-dqsmart-device.component.html',
  styleUrls: ['./create-dqsmart-device.component.scss']
})
export class CreateDqsmartDeviceComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  gwNodeTreeSource: Array<NodeTree> = [];
  gwSelected: NodeTree;
  iotDeviceSource: Array<IotDevice>;
  domains: Array<HassDomain> = [];
  loading = false;
  nodeTrees: Array<NodeTree> = [];

  @Input() apollo: ApolloWidgetContext;
  @Input() addTrigger: boolean;
  @Input() parentNodeTree: NodeTree;
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id, new PageLink(100), NodeTreeType.GATEWAY, GatewayModel.DQSMART).subscribe(
      res => {
        //console.log(res);
        if (res && res.data && Array.isArray(res.data)) {
          this.gwNodeTreeSource = res.data;
        }
      }
    );
  }

  getEntityFromGateway(gw: NodeTree) {
    this.gwSelected = gw;
    this.iotDeviceSource = [];
    if (gw) {
      const gwImpl: DqsmartGatewayNodeTreeImpl = new DqsmartGatewayNodeTreeImpl(gw, this.apollo);
      this.apollo.dqsmartService.getStates(gwImpl.hassUrl, gwImpl.token).subscribe(
        res => {
          if (res && Array.isArray(res)) {
            res.forEach(ha => {
              this.iotDeviceSource.push(new IotDevice(ha));
            });
          }
        }
      );
    }
  }

  renderDqSmartNodeTree(iotDevices: Array<IotDevice>) {
    if (iotDevices && Array.isArray(iotDevices)) {
      this.nodeTrees = [];
      iotDevices.forEach(iotDevice => {
        const nodeInfo: ZigbeeNodeTreeInfoBase = {
          entity: iotDevice.hassEntity,
          gatewaySource: this.gwSelected.id,

        };
        const nodeTree: NodeTree = {
          additionalInfo: nodeInfo,
          apolloTreeId: this.parentNodeTree.apolloTreeId,
          model: GatewayModel.DQSMART,
          name: iotDevice.name ? iotDevice.name : 'Unknown Name',
          parentId: this.parentNodeTree.id,
          type: NodeTreeType.DEVICE
        };
        this.nodeTrees.push(nodeTree);
      });
    }
  }

  createNodeEntity(): void {
    if(this.nodeTrees && Array.isArray(this.nodeTrees)&&this.nodeTrees.length>0){
      this.createNodeTrees(this.nodeTrees, this.apollo).subscribe(res => {
        this.createEvent.emit();
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách thiết bị trống');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange()===false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.createNodeEntity();
      console.log('create event');
    }
  }
}
