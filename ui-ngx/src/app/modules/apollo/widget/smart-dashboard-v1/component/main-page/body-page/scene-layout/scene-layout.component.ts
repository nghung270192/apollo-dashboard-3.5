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
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';

import {
  CommonLayout,
  CommonLayoutI
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/common-layout';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ResizeObserver} from '@juggle/resize-observer';

@Component({
  selector: 'tb-scene-layout',
  templateUrl: './scene-layout.component.html',
  styleUrls: ['./scene-layout.component.scss']
})
export class SceneLayoutComponent extends CommonLayout implements CommonLayoutI, OnInit, OnChanges {

  name = 'abc';
  size = 100;
  isProcessing = false;

  @Input() scale = 50;

  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTrees: Array<NodeTree> = [];
  @Input() isEdited = false;
  @Output() nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() reloadEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected store: Store<AppState>, private cd: ChangeDetectorRef) {
    super(store);
  }

  ngOnInit(): void {
    this.widgetResize$ = new ResizeObserver(() => {
      this.cd.detectChanges();
      this.apollo.ctx.detectChanges();
    });
    this.widgetResize$.observe(this.apollo.ctx.$containerParent[0]);
  }

  clickNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);

  }




  settingNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  removeNodeTree($event, nodeTree: NodeTree) {
  }



}
