import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';

import {
  CommonLayout,
  CommonLayoutI
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/common-layout';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ResizeObserver} from '@juggle/resize-observer';
import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'tb-device-layout',
  templateUrl: './device-layout.component.html',
  styleUrls: ['./device-layout.component.scss']
})
export class DeviceLayoutComponent extends CommonLayout implements CommonLayoutI, OnInit, OnChanges, AfterViewInit {

  name = 'abc';
  size = 100;
  isProcessing = false;
  @Input() scale = 50;

  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTrees: Array<NodeTree> = [];
  @Input() isEdited = false;
  @Output() nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() reloadEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: Array<NodeTree> = [];
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;


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

  clickNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
    this.nodeTreeClick.emit(nodeTree);
  }

  removeNodeTree($event, nodeTree: NodeTree) {

  }

  settingNodeTree($event, nodeTree: NodeTree) {
    this.removeClickEvent($event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodeTrees && changes.nodeTrees.isFirstChange()===false && changes.nodeTrees?.previousValue != changes.nodeTrees?.currentValue) {
      this.updateData();
    }
  }

  updateData() {

    /*    const dataPerPage = dataFilter.slice((pageLink.page) * pageLink.pageSize, (pageLink.page + 1) * pageLink.pageSize);
        const nPage = Math.ceil(dataFilter.length / pageLink.pageSize);*/

    /*const page: PageData<NodeTree> = {
      data: dataPerPage,
      totalElements: dataFilter.length,
      hasNext: pageLink.page < nPage,
      totalPages: nPage
    };*/
    this.totalItems = this.nodeTrees.length;
    this.dataSource = this.nodeTrees.slice((this.paginator.pageIndex) * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize);
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        tap(() => this.updateData())
      )
      .subscribe();
    this.updateData();
  }

}
