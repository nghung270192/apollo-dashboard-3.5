import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {HubNodeTreeImpl, NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v1/models/common-type.model';
import {CommonLayout} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/common-layout';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HubSettingComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/Hub/hub-setting.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';

@Component({
  selector: 'tb-hub-icon',
  templateUrl: './hub-icon.component.html',
  styleUrls: ['./hub-icon.component.scss']
})
export class HubIconComponent extends CommonLayout implements OnInit, OnChanges, AfterViewInit {


  node: HubNodeTreeImpl;
  selection = false;
  isOnline = false;

  @Input() scale = 100;
  @Input() isEdited = false;
  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;
  @Output() nodeTreeClick: EventEmitter<any> = new EventEmitter<any>();


  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private ngZone: NgZone, protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
  }

  clickNodeTree($event) {
    if (this.isEdited == false) {
      this.removeClickEvent($event);
      this.nodeTreeClick.emit();
    } else {
      this.selection = !this.selection;
    }
  }


  settingNodeTree($event) {
    this.removeClickEvent($event);
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        nodeTree: this.nodeTree,
      }
    };
    let sub: any;
    sub = this.dialog.open(HubSettingComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
        if (res)
          {this.apollo.apolloService.eventTaskSubject.next(EventTask.RELOAD_ENITY);}
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodeTree && changes.nodeTree.firstChange == false) {
      this.ngOnInit();
    }
  }

  ngAfterViewInit(): void {
    this.node = new HubNodeTreeImpl(this.nodeTree);
    if (this.node && this.node.tbDeviceId) {
      const hubController = this.apollo.hubNodeTrees.get(this.node.id.id);
      if (hubController) {
        this.isOnline = hubController.isOnline;
        this.cd.detectChanges();
      }
    }
  }

}
