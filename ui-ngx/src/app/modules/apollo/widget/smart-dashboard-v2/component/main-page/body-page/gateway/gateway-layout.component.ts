import {ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {
  CommonLayout,
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/common-layout';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ResizeObserver} from '@juggle/resize-observer';

@Component({
  selector: 'tb-gateway-layout',
  templateUrl: './gateway-layout.component.html',
  styleUrls: ['./gateway-layout.component.scss']
})
export class GatewayLayoutComponent extends CommonLayout implements OnInit {

  @Input() scale = 100;
  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTrees: Array<NodeTree> = [];
  @Input() isEdited = false;
  @Output() nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();

  GatewayModel = GatewayModel;

  constructor(private cd: ChangeDetectorRef, protected store: Store<AppState>) {
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
