import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {GatewayModel, NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {EventTask, PageView} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';

@Component({
  selector: 'tb-body-page',
  templateUrl: './body-page.component.html',
  styleUrls: ['./body-page.component.scss']
})
export class BodyPageComponent implements OnInit, OnChanges, AfterViewInit {

  nodeTreeType: NodeTreeType;
  NodeTreeType = NodeTreeType;

  modelNodeTree: GatewayModel;
  EntityModel = GatewayModel;


  @Input() apollo: ApolloWidgetContext;
  @Input() rootNodeTree: NodeTree;
  @Input() parentNodeTree: NodeTree;
  @Input() childrenNodetree: Array<NodeTree> = [];
  @Input() isEdited = false;
  @Input() isMapMode = false;
  @Input() pageView: PageView = PageView.NORMAL;
  @Input() sizeIcon = 50;
  @Input() callbackEvent: (event: EventTask) => void;


  @Output() clickEvent: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() reloadEvent: EventEmitter<any> = new EventEmitter<any>();


  PageView = PageView;

  constructor(private cd: ChangeDetectorRef) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


  getEntityByType(type: NodeTreeType): Array<NodeTree> {
    return this.childrenNodetree.filter(nodeTree => nodeTree.type === type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd.detectChanges();
  }

  nodeTreeClick(nodeTree: NodeTree) {
    this.clickEvent.emit(nodeTree);
  }

  reload() {
    this.reloadEvent.emit();
  }

  checkIsEmpty(): boolean {
    let data = [];
    data = data.concat(this.childrenNodetree.filter(res => res.type === NodeTreeType.HUB));
    data = data.concat(this.childrenNodetree.filter(res => res.type === NodeTreeType.DEVICE));
    data = data.concat(this.childrenNodetree.filter(res => res.type === NodeTreeType.GATEWAY));
    data = data.concat(this.childrenNodetree.filter(res => res.type === NodeTreeType.GROUP));
    data = data.concat(this.childrenNodetree.filter(res => res.type === NodeTreeType.SCENE));
    data = data.concat(this.childrenNodetree.filter(res => res.type === NodeTreeType.AREA));
    return data.length > 0;
  }

  createApolloNodeTree() {
    this.apollo.apolloService.eventTaskSubject.next(EventTask.ADD_ENTITY);
  }

}
