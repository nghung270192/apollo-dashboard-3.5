import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {
  CommonLayout,
  CommonLayoutI
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/common-layout';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  AutomationCreateOrUpdateComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/automation/automation-create-or-update.component';
import {AutomationNodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';
import {JsonPipe} from '@angular/common';
import {EntitySearchDirection} from '@shared/models/relation.models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Direction, SortOrder} from '@shared/models/page/sort-order';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {SchedulerNodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/scheduler/scheduler.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'tb-automation-layout',
  templateUrl: './automation-layout.component.html',
  styleUrls: ['./automation-layout.component.scss']
})
export class AutomationLayoutComponent extends CommonLayout implements CommonLayoutI, OnInit, AfterViewInit {
  columnsAnalyze: Array<string> = ['No', 'createdTime', 'name', 'Time', 'Control', 'Enable', 'Edit'];


  datasource: Array<NodeTree> = [];

  enableProcessing = [];
  removeProcessing = [];
  directions = EntitySearchDirection;
  direction: EntitySearchDirection;
  pageLink: PageLink = new PageLink(5);
  hidePageSize = false;
  totalElements = 0;
  textSearchMode = false;

  isEdited = false;
  eventTaskDefault = EventTask.SAVE_DATABASE;
  EventTask = EventTask;
  @ViewChild('searchInput') searchInputField: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() apollo: ApolloWidgetContext;

  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog, private ngZone: NgZone, protected store: Store<AppState>,
              private _snackBar: MatSnackBar) {
    super(store);
    const sortOrder: SortOrder = {property: 'createdTime', direction: Direction.ASC};
    this.direction = EntitySearchDirection.FROM;
    this.pageLink = new PageLink(10, 0, '', sortOrder);
  }

  ngOnInit(): void {

  }

  clickNodeTree($event: NodeTree) {
    console.log($event);
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.rootNodeTree,
        nodeTree: $event,
        title: 'Tự động - Chỉnh sửa: ' + $event?.name
      }
    };
    this.dialog.open(AutomationCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      /*if (res && res?.data==="create")
        this.createEntity.emit(res);*/
    });
  }

  removeNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    if (confirm('Xóa: ' + nodeTree.name)) {
      this.removeProcessing[nodeTree.id.id] = true;
      const autoNodeTree: AutomationNodeTree = new AutomationNodeTree(nodeTree, this.apollo);
      autoNodeTree.remove().subscribe(
        res => console.log(res),
        error => {
          if (error?.errCode === 2) {
            this._snackBar.open('Không xoá trên Hub đươợc. Xoá trên database', 'Xoá', {
              duration: 2000,
              panelClass: ['blue-snackbar']
            }).onAction()
              .subscribe(value => {
                this.removeOnDatebaseNodeTree($event, nodeTree);
              });
          } else {

            alert(new JsonPipe().transform(error));
          }
          this.removeProcessing[nodeTree.id.id] = false;
        },
        () => {
          this.updateData();
          this.removeProcessing[nodeTree.id.id] = false;
          this.cd.detectChanges();
        }
      );
    }
  }

  settingNodeTree($event, nodeTree: NodeTree) {
    /*    this.removeClickEvent($event);
         const dialogConfig: MatDialogConfig = {
          disableClose: false,
          data: {
            apollo: this.apollo,
            nodeTree: nodeTree,
          }
        };
        let sub:any;
        sub = this.dialog-controller.open(HubSettingComponent, dialogConfig).afterClosed();
        if (sub){
          sub.subscribe(res =>
          {
            this.reloadEvent.emit();
          });
        }*/
  }

  enableClick($event, nodeTree: NodeTree) {
    /*
        if ($event) {
          $event.stopPropagation();
          $event.preventDefault();
        }
    */


    const autoNodeTree: AutomationNodeTree = new AutomationNodeTree(nodeTree, this.apollo);

    this.enableProcessing[nodeTree.id.id] = true;
    autoNodeTree.createOrUpdate().subscribe(
      res => console.log(res),
      error => alert(new JsonPipe().transform(error)),
      () => {
        this.enableProcessing[nodeTree.id.id] = false;
        this.cd.detectChanges();
      }
    );
  }

  copyNodeTree($event, nodeTree: NodeTree) {
    if (confirm('Copy new Automation')) {
      const newNode = {...nodeTree, id: null, createTime: null};
      // newNode.id = null;
      // newNode.createdTime = null;
      const schNodeTree: SchedulerNodeTree = new SchedulerNodeTree(newNode, this.apollo);
      schNodeTree.createOrUpdate().subscribe(res => {
        console.log(res);
      }, error => {
        alert(error);
      }, () => {
        this.updateData();
        this.cd.detectChanges();

      });
    }
  }

  createAutomation() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.rootNodeTree,
        type: '',
        title: 'Thêm lệnh Tự động'
      }
    };

    dialogConfig.data.type = NodeTreeType.AUTOMATION;
    this.dialog.open(AutomationCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data === 'create') {
        this.updateData();
      }
    });
  }

  updateData(reload: boolean = false) {
    this.pageLink.page = this.paginator.pageIndex;
    this.pageLink.pageSize = this.paginator.pageSize;
    this.pageLink.sortOrder.property = this.sort.active;
    this.pageLink.sortOrder.direction = Direction[this.sort.direction.toUpperCase()];
    if (this.rootNodeTree) {
      this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, this.pageLink,
        NodeTreeType.AUTOMATION, '').subscribe(res => {
        this.datasource = res.data;
        this.totalElements = res.totalElements;
        // this.hidePageSize = res.hasNext;
        this.datasource.forEach(data => {
          this.enableProcessing[data.id.id] = false;
          this.removeProcessing[data.id.id] = false;
        });
        this.cd.detectChanges();
      });
    }
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInputField.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.updateData();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.updateData())
      )
      .subscribe();
    if (this.rootNodeTree) {
      this.updateData();
      /*      this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, this.pageLink,
              NodeTreeType.AUTOMATION, "").subscribe(res => {
              this.datasource = res.data;
              this.datasource.forEach(data => {
                this.enableProcessing[data.id.id] = false;
                this.removeProcessing[data.id.id] = false;
              });
              this.cd.detectChanges();
            });*/
    }

  }

  enterFilterMode() {
    this.textSearchMode = true;
    this.pageLink.textSearch = '';
    setTimeout(() => {
      this.searchInputField.nativeElement.focus();
      this.searchInputField.nativeElement.setSelectionRange(0, 0);
    }, 10);
  }

  exitFilterMode() {
    this.textSearchMode = false;
    this.pageLink.textSearch = '';
    this.paginator.pageIndex = 0;
    this.updateData();
  }

  removeOnDatebaseNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    if (confirm('Xóa trên Database ' + nodeTree.name)) {
      this.removeProcessing[nodeTree.id.id] = true;
      const autoNodeTree: AutomationNodeTree = new AutomationNodeTree(nodeTree, this.apollo);
      autoNodeTree.removeOnDatabase().subscribe(
        res => console.log(res),
        error => {
          alert(new JsonPipe().transform(error));
          this.removeProcessing[nodeTree.id.id] = false;
        },
        () => {
          this.updateData();
          this.removeProcessing[nodeTree.id.id] = false;
          this.cd.detectChanges();
        }
      );
    }
  }
}
