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
import {
  SchedulerNodeTree,
  WeekdaysMapping
} from '@modules/apollo/widget/smart-dashboard-v2/models/scheduler/scheduler.model';
import {EntitySearchDirection} from '@shared/models/relation.models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Direction, SortOrder} from '@shared/models/page/sort-order';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {JsonPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';


export interface DataViewDialog {
}

@Component({
  selector: 'tb-scheduler-layout',
  templateUrl: './scheduler-layout.component.html',
  styleUrls: ['./scheduler-layout.component.scss']
})

export class SchedulerLayoutComponent extends CommonLayout implements CommonLayoutI, OnInit, AfterViewInit {
  columnsAnalyze: Array<string> = ['No', 'createdTime', 'name', 'Time', 'Control', 'Enable', 'Edit'];

  datasource: Array<NodeTree> = [];

  enableProcessing = [];
  removeProcessing = [];

  textSearchMode = false;
  directions = EntitySearchDirection;
  direction: EntitySearchDirection;
  pageLink: PageLink = new PageLink(5);
  hidePageSize = false;
  totalElements = 0;


  isEdited = false;
  eventTaskDefault = EventTask.SAVE_DATABASE;
  EventTask = EventTask;

  @ViewChild('searchInput') searchInputField: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() apollo: ApolloWidgetContext;

  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog, private ngZone: NgZone, protected store: Store<AppState>) {
    super(store);
    const sortOrder: SortOrder = {property: 'type', direction: Direction.ASC};
    this.direction = EntitySearchDirection.FROM;
    this.pageLink = new PageLink(10, 0, null, sortOrder);
  }

  ngOnInit(): void {
    if (this.rootNodeTree) {
      this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, this.pageLink,
        NodeTreeType.SCHEDULER, '').subscribe(res => {
        console.log(res);
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
    this.pageLink.textSearch = null;
    this.paginator.pageIndex = 0;
    this.updateData();
  }

  updateData(reload: boolean = false) {
    this.pageLink.page = this.paginator.pageIndex;
    this.pageLink.pageSize = this.paginator.pageSize;
    this.pageLink.sortOrder.property = this.sort.active;
    this.pageLink.sortOrder.direction = Direction[this.sort.direction.toUpperCase()];
    if (this.rootNodeTree) {
      this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, this.pageLink,
        NodeTreeType.SCHEDULER, '').subscribe(res => {
        console.log(res);
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

  clickNodeTree($event: NodeTree) {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.rootNodeTree,
        type: NodeTreeType.SCHEDULER,
        nodeTree: $event,
        title: 'Hẹn giờ - Chỉnh sửa: ' + $event?.name
      }
    };
    this.dialog.open(AutomationCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res?.data) {
        this.ngOnInit();
      }
    });
  }

  removeNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    if (confirm('Remove Scheduler')) {
      this.removeProcessing[nodeTree.id.id] = true;
      new SchedulerNodeTree(nodeTree, this.apollo).remove().subscribe(res => {
      }, error => {
        alert(new JsonPipe().transform(error));
        this.removeProcessing[nodeTree.id.id] = false;
      }, () => {
        this.removeProcessing[nodeTree.id.id] = false;
        this.cd.detectChanges();
        this.ngOnInit();
      });
    }
  }

  copyNodeTree($event, nodeTree: NodeTree) {

    if (confirm('Copy to New Scheduler')) {
      const newNode = {...nodeTree};
      newNode.id = null;
      newNode.createdTime = null;
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

  settingNodeTree($event, nodeTree: NodeTree) {

  }

  enableClick($event, nodeTree: NodeTree) {
    this.enableProcessing[nodeTree.id.id] = true;
    const schNodeTree: SchedulerNodeTree = new SchedulerNodeTree(nodeTree, this.apollo);
    schNodeTree.createOrUpdate().subscribe(res => {
      console.log(res);
    }, error => {
      alert(error);
    }, () => {
      this.enableProcessing[nodeTree.id.id] = false;
      this.cd.detectChanges();

    });

  }

  create() {
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.rootNodeTree,
        type: '',
        title: 'Thêm lịch hẹn'
      }
    };

    dialogConfig.data.type = NodeTreeType.SCHEDULER;
    this.dialog.open(AutomationCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data === 'create') {
        this.updateData();
      }
    });
  }

  convertWeekday(days: Array<number>): Array<string> {
    const strDays = [];
    if (days && Array.isArray(days)) {
      days.forEach(day => strDays.push(' ' + WeekdaysMapping[day]));
    }
    return strDays;

  }


  gatewayIsOnline(nodeTree: NodeTree) {
  }


}
