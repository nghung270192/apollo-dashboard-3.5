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
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';

import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {ZigbeeNodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {HassDomain, IotDevice} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {
  CreateDeviceCommon
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/device/create-device-common';

@Component({
  selector: 'tb-group-from-dqsmart',
  templateUrl: './create-group-from-dqsmart.component.html',
  styleUrls: ['./create-group-from-dqsmart.component.scss']
})
export class CreateGroupFromDqsmartComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  gwNodeTreeSource: Array<NodeTree> = [];
  gwSelected: NodeTree;
  iotDeviceSource: Array<IotDevice>;
  domains: Array<HassDomain> = [HassDomain.script];
  loading = false;
  nodeTrees: Array<NodeTree> = [];

  @Input() apollo: ApolloWidgetContext;
  @Input() addTrigger: boolean;
  @Input() parentNodeTree: NodeTree;
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id, new PageLink(100),
      NodeTreeType.GATEWAY, GatewayModel.DQSMART).subscribe(
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
          setTimeout(() => {
            this.cd.detectChanges();
          }, 500);
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
          name: iotDevice.name,
          parentId: this.parentNodeTree.id,
          type: NodeTreeType.SCENE
        };
        this.nodeTrees.push(nodeTree);
      });
    }
  }

  createNodeEntity(): void {
    if (this.nodeTrees && Array.isArray(this.nodeTrees) && this.nodeTrees.length > 0) {
      this.loading = true;
      super.createNodeTrees(this.nodeTrees, this.apollo).subscribe(res => {
        this.createEvent.emit();
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách nhóm trống');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange() === false
      && changes.addTrigger?.previousValue !== changes.addTrigger?.currentValue) {
      this.createNodeEntity();
      console.log('create event');
    }
  }
}

