import {ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';

import {
  CommonLayout,
  CommonLayoutI
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/common-layout';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  AreaSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/area-layout/area-setting.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ResizeObserver} from '@juggle/resize-observer';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'tb-area-layout',
  templateUrl: './area-layout.component.html',
  styleUrls: ['./area-layout.component.scss']
})
export class AreaLayoutComponent extends CommonLayout implements CommonLayoutI, OnInit {

  selection = false;

  @Input() scale = 100;
  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTrees: Array<NodeTree> = [];
  @Input() isEdited = false;
  @Output() nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() reloadEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private ngZone: NgZone, protected store: Store<AppState>) {
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
    // if (this.isEdited == false)
    this.nodeTreeClick.emit(nodeTree);
  }

  removeNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    this.apollo.apolloNodeTreeService.deleteApolloNodeTree(nodeTree.id.id).subscribe(res => {
      this.reloadEvent.emit();
    });
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
    const sub = this.dialog.open(AreaSettingComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
        if (res) {
          this.reloadEvent.emit();
        }
      });
    }
  }

  fetchBackgroupIcon(icon: string): Observable<string> {

    if (icon) {
      return of(`url(${icon})`);
    } else {
      return of(`url()`);
    }
  }

}
