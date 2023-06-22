import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  CreateDeviceCommon
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/device/create-device-common';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {PageLink} from '@shared/models/page/page-link';
import {PelabEntity} from '@modules/apollo/widget/share/models/pelab/pelab.model';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/pelab/pelab.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'tb-create-pelab-group',
  templateUrl: './create-pelab-group.component.html',
  styleUrls: ['./create-pelab-group.component.scss']
})
export class CreatePelabGroupComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  gwNodeTreeSource: Array<NodeTree> = [];
  gwSelected: NodeTree;
  pelabEntities: Array<PelabEntity>;
  loading = false;
  nodeTrees: Array<NodeTree> = [];

  name = 'New Pelab Group';

  formGroup: FormGroup;

  @Input() apollo: ApolloWidgetContext;
  @Input() addTrigger: boolean;
  @Input() parentNodeTree: NodeTree;
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]]
    });
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

  renderDqSmartNodeTree(pelabEntities: Array<PelabEntity>) {
    this.nodeTrees = [];
    if (this.pelabEntities && Array.isArray(this.pelabEntities) && this.pelabEntities.length > 0) {
      const pelabIds = pelabEntities.map(res => res.deviceAdressStr);
      const nodeTree: NodeTree = {
        name: this.name,
        type: NodeTreeType.GROUP,
        apolloTreeId: this.parentNodeTree.apolloTreeId,
        parentId: this.parentNodeTree.id,
        additionalInfo: {
          gatewaySource: this.gwSelected.id,
          entity: pelabIds
        },
        model: GatewayModel.PELAB_LORA
      };
      this.nodeTrees.push(nodeTree);
      //console.log(this.nodeTrees);
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
    if (changes.addTrigger && changes.addTrigger.isFirstChange() == false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.createNodeEntity();
    }
  }

}
