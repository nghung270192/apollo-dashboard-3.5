import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Type
} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  GatewaySettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/gateway-setting.component';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {CommonLayout} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/common-layout';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {GatewayProvider} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway';
import {GatewayControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway.model';

@Component({
  selector: 'tb-gateway-icon',
  templateUrl: './gateway-icon.component.html',
  styleUrls: ['./gateway-icon.component.scss']
})
export class GatewayIconComponent extends CommonLayout implements OnInit, AfterViewInit {

  selection = false;
  isOnline = false;

  @Input() scale = 100;
  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;
  @Input() isEdited = false;
  @Output() nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();

  gateway: GatewayControllerAbstract;


  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private ngZone: NgZone, protected store: Store<AppState>) {
    super(store);

  }


  ngAfterViewInit(): void {
    const gatewayProvider = GatewayProvider[this.nodeTree?.model];
    if (gatewayProvider) {
      this.gateway = new gatewayProvider(this.nodeTree, this.apollo);
      if (this.gateway) {
        setTimeout(() => {
          this.gateway?.isOnline().subscribe(
            isOnline => {
              this.isOnline = isOnline;
              this.cd.detectChanges();
            }, error => {
              console.log('disconnect', this.nodeTree.name);
            }
          );
        }, 5000);
      }
    }

  }

  ngOnInit(): void {

  }

  clickNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    if (this.isEdited) {
      this.selection = !this.selection;
    } else {
      this.nodeTreeClick.emit(nodeTree);
    }
  }

  settingNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        nodeTree,
      }
    };
    let sub: any;
    sub = this.dialog.open(GatewaySettingComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
        if (res && res?.data) {
          this.apollo.apolloService.eventTaskSubject.next(EventTask.RELOAD_ENITY);
        }
      });
    }
  }
}
