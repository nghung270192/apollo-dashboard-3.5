import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CreateDeviceCommon} from '@modules/apollo/widget/smart-dashboard-v1/component/share/device/create-device-common';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {PageLink} from '@shared/models/page/page-link';
import {PelabEntity} from '@modules/apollo/widget/share/models/pelab/pelab.model';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/pelab/pelab.model';
import {ZigbeeNodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';

@Component({
  selector: 'tb-create-pelab-device',
  templateUrl: './create-pelab-device.component.html',
  styleUrls: ['./create-pelab-device.component.scss']
})
export class CreatePelabDeviceComponent extends CreateDeviceCommon implements OnInit, OnChanges  {

  gwNodeTreeSource: Array<NodeTree> = [];
  gwSelected: NodeTree;
  pelabEntities: Array<PelabEntity>;
  loading = false;
  nodeTrees: Array<NodeTree> = [];

  @Input() apollo: ApolloWidgetContext;
  @Input() parentNodeTree: NodeTree;
  @Input() addTrigger: boolean;
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id, new PageLink(100),
      NodeTreeType.GATEWAY, GatewayModel.PELAB_LORA).subscribe(
      res => {
        if (res && res.data && Array.isArray(res.data)) {
          this.gwNodeTreeSource = res.data;
        }
      }
    );
  }

  getEntityFromGateway(gw: NodeTree) {
    this.gwSelected = gw;
    this.pelabEntities = [];
    if (gw) {
      const gwImpl = new PelabGatewayNodeTreeImpl(gw, this.apollo);
      gwImpl.getDevices().subscribe(res => {
        if (res && Array.isArray(res)) {
          this.pelabEntities = res;
        }
      });
    }
  }

  renderDqSmartNodeTree(iotDevices: Array<PelabEntity>) {
    if (iotDevices && Array.isArray(iotDevices)) {
      this.nodeTrees = [];
      iotDevices.forEach(entity => {
        const nodeInfo: ZigbeeNodeTreeInfoBase = {
          entity,
          gatewaySource: this.gwSelected.id,

        };
        const nodeTree: NodeTree = {
          additionalInfo: nodeInfo,
          apolloTreeId: this.parentNodeTree.apolloTreeId,
          model: GatewayModel.PELAB_LORA,
          name: entity.deviceName ? entity.deviceName : 'Unknown Device',
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
       if (changes.addTrigger && changes.addTrigger.isFirstChange() == false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
        this.createNodeEntity();
        console.log('create event');
      }
  }
}
