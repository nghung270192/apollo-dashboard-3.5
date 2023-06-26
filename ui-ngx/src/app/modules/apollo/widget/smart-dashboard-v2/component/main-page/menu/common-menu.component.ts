import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';

@Component({
  selector: 'tb-common-menu',
  templateUrl: './common-menu.component.html',
  styleUrls: ['./common-menu.component.scss']
})
export class CommonMenuComponent implements OnInit, AfterViewInit {
  mapView = false;

  @Input() apollo: ApolloWidgetContext;
  @Input() rootNodeTree: NodeTree;
  @Input() parentNodeTree: NodeTree;
  @Input() nameLayout: string;

  @Input() isMobile = false;

  @Output() backEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapViewEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() openDialogMapSetting: EventEmitter<any> = new EventEmitter<any>();
  @Input() sizeIcon = 50;
  @Output() sizeIconChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() settingLayout: EventEmitter<any> = new EventEmitter<any>();
  @Output() createEntity: EventEmitter<any> = new EventEmitter<any>();
  @Output() uploadSetting: EventEmitter<any> = new EventEmitter<any>();
  @Output() downloadSetting: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleTool: EventEmitter<any> = new EventEmitter<any>();
  @Output() schedulerToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() automationViewEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() isEdited = false;
  @Output() isEditedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  isAdmin = true;
  isSimple = false;

  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.isAdmin = this.apollo.isAdmin;
    this.isMobile = this.apollo.ctx.isMobile;
  }


  delete() {
    if (confirm('Xóa nhiều thực thể đã chọn?')) {
      this.apollo.apolloService.eventTaskSubject.next(EventTask.DELETE_ENTITIES);
    }
  }


  editBtnClick() {
    this.apollo.apolloService.eventTaskSubject.next(EventTask.EDIT_ENABLE);
  }

  saveDashboard() {
    this.apollo.apolloService.saveDashboardSubject.next('saveDashboard');
  }

  setting() {
    this.apollo.apolloService.eventTaskSubject.next(EventTask.WIDGET_SETTING);
  }

  home() {
    this.apollo.apolloService.eventTaskSubject.next(EventTask.HOME_PAGE);
  }

  analyzeViewEvent() {
    this.apollo.apolloService.eventTaskSubject.next(EventTask.ANALYZE_VIEWER);
  }
  energyViewEvent() {
    this.apollo.apolloService.eventTaskSubject.next(EventTask.ENERGY_VIEWER);
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
