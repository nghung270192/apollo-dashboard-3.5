import {ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {
  CommonLayout,
  CommonLayoutI
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/common-layout';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {HubModel} from "@modules/apollo/widget/share/models/apollo-hub/hub.model";
 import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ResizeObserver} from '@juggle/resize-observer';

@Component({
  selector: 'tb-hub-layout',
  templateUrl: './hub-layout.component.html',
  styleUrls: ['./hub-layout.component.scss']
})
export class HubLayoutComponent extends CommonLayout implements OnInit {

  @Input() scale = 100;
  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTrees: Array<NodeTree> = [];
  @Input() isEdited = false;
  @Output() nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() reloadEvent: EventEmitter<any> = new EventEmitter<any>();

  HubModel = HubModel;

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


  gatewayIsOnline(nodeTree: NodeTree) {
  }
}
