import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  GatewayModel,
  NodeTreeType,
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EventTask, PageView} from '@modules/apollo/widget/smart-dashboard-v1/models/common-type.model';
import {
  WidgetSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/widget-setting.component';
import {JsonPipe} from '@angular/common';
import {
  DeviceCreateOrUpdateComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/device/device-create-or-update.component';
import {
  SceneCreateOrUpdateComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/scene/scene-create-or-update.component';
import {
  GroupCreateOrUpdateComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/group/group-create-or-update.component';
import {EntitySearchDirection} from '@shared/models/relation.models';
import {Direction, SortOrder} from '@shared/models/page/sort-order';
import {forkJoin, fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {
  ApolloNodeTreeCreateV2,
  DataViewDialog
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/apollo-node-tree/add-entity-dialog.component';
import {AreaConfigResolver} from '@modules/apollo/widget/smart-dashboard-v1/component/share/area/area-config.resolver';
import {HubConfigResolver} from '@modules/apollo/widget/smart-dashboard-v1/component/share/hub/hub-config.resolver';
import {
  GatewayConfigResolver
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/gateway/gateway-config.resolver';
import {PageComponent} from '@shared/components/page.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'tb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends PageComponent implements OnInit, AfterViewInit {

  formControl: FormControl = new FormControl('');
  isEdited = false;
  parentNodeTree: NodeTree;
  rootNodeTree: NodeTree;
  childrenNodetree: Array<NodeTree> = [];
  childrenNodetreeFilter: Array<NodeTree> = [];
  removedEntityCollecttion: Array<String> = [];
  pageView: PageView = PageView.NORMAL;
  PageView = PageView;
  setTimeOutId = null;
  loading = true;
  assetId: string = null;
  nameLayout = '';
  isEnableMiddleAddEntity = true;
  sizeIcon = 50;
  layoutLoading = true;
  hasLayout = false;
  private jsonPipe: JsonPipe;
  path: Map<string, string> = new Map<string, string>();
  directions = EntitySearchDirection;
  direction: EntitySearchDirection;
  pageLink: PageLink = new PageLink(10000);
  hidePageSize = false;
  totalElements = 0;
  textSearchMode = false;
  nodeType: NodeTreeType = NodeTreeType.AREA;
  NodeTreeType = NodeTreeType;

  @ViewChild('searchInput') searchInputField: ElementRef;
  @Input() apollo: ApolloWidgetContext;
  @ViewChild('drawerTool') sidebar: MatSidenav;
  private areaConfig: AreaConfigResolver;
  private hubConfig: HubConfigResolver;
  private gatewayConfig: GatewayConfigResolver;

  constructor(protected store: Store<AppState>,
              private cd: ChangeDetectorRef, public dialog: MatDialog,
  ) {
    super(store);
    this.removedEntityCollecttion = [];
    const sortOrder: SortOrder = {property: 'createdTime', direction: Direction.ASC};
    this.direction = EntitySearchDirection.FROM;
    this.pageLink = new PageLink(10000, 0, '', sortOrder);
    this.callbackEvent = this.callbackEvent.bind(this);
    this.saveDatabase = this.saveDatabase.bind(this);
  }

  ngOnInit(): void {

    this.areaConfig = new AreaConfigResolver(this.store, this.apollo.apolloNodeTreeService);
    this.hubConfig = new HubConfigResolver(this.store, this.apollo.apolloNodeTreeService);
    this.gatewayConfig = new GatewayConfigResolver(this.store, this.apollo.apolloNodeTreeService);

    this.apollo.apolloService.eventTaskSubject.subscribe(res => {
      switch (res) {
        case EventTask.DELETE_ENTITIES:
          break;
        case EventTask.ADD_ENTITY:
          // this.createApolloNodeTree();
          break;
        case EventTask.RELOAD_ENITY:
          this.reloadEvent();
          break;
        case EventTask.WIDGET_SETTING:
          this.widgetSetting();
          break;
        case EventTask.HOME_PAGE:
          this.home();
          break;
        case EventTask.ANALYZE_VIEWER:
          this.analyzeBtnEventClick();
          break;
      }
    });
  }


  ngAfterViewInit(): void {
    fromEvent(this.searchInputField.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          // this.paginator.pageIndex = 0;
          this.updateData(true);
        })
      )
      .subscribe();

    this.loadDatabase();
  }

  callbackEvent(event: EventTask) {
    switch (event) {
      case EventTask.SAVE_DATABASE:
        this.saveDatabase();
        break;
    }
  }

  loadDatabase() {
    this.loading = true;
    this.layoutLoading = true;
    this.cd.detectChanges();
    this.assetId = this.apollo.ctx.settings.apolloTreeId;
    if (this.assetId) {
      this.apollo.apolloTreeService.getApolloTree(this.assetId).subscribe(res => {
        this.nameLayout = res?.name;
        this.layoutLoading = false;
        this.apollo.apolloTreeService.getDatabaseApolloTree(this.assetId).subscribe(value => {
          this.apollo.apolloNodeTreeService.updateTreeNode(value).subscribe(value1 => {
            this.apollo.apolloNodeTreeService.getRoot(this.assetId).subscribe(
              rootNode => {
                this.rootNodeTree = rootNode;
                this.parentNodeTree = rootNode;
                 this.init().subscribe( value=> {
                  this.getChildrenByParent(this.parentNodeTree.id.id).subscribe(() => {
                    this.hasLayout = true;
                    this.loading = false;
                    this.cd.detectChanges();
                  }, error => console.log(error));
                }, error => console.log(error));
              }
            );
          });
        });
      }, error => {
        this.layoutLoading = false;
        this.loading = false;
        this.hasLayout = false;
        this.cd.detectChanges();
      });
    } else {
      this.layoutLoading = false;
      this.loading = false;
      this.hasLayout = false;
      this.cd.detectChanges();
    }
  }

  saveDatabase() {
    if (this.assetId && this.apollo.apolloNodeTreeService.isChanged) {
      this.apollo.apolloNodeTreeService.getTenantApolloNodeTree(null, null, null)
        .subscribe(value => {
          this.apollo.apolloTreeService.saveDatabaseApolloTree(this.assetId, value.data).subscribe(res => {
              this.apollo.apolloNodeTreeService.isChanged = false;
              this.cd.detectChanges();
            }
          )
          ;
        });
    }
  }

  init(): Observable<any> {

    const initHub = new Observable<any>(subscriber => {
      this.apollo.apolloNodeTreeService.getByApolloTree(this.assetId, this.pageLink, 'HUB', '').subscribe(
        res => {
          this.apollo.hubInit(res.data).subscribe(() => {
            subscriber.next();
            subscriber.complete();
          }, error => subscriber.error(error));
        }
      );
    });

    const initDqsmartGw = new Observable<any>(subscriber => {
      this.apollo.apolloNodeTreeService.getByApolloTree(this.assetId,
        new PageLink(100), NodeTreeType.GATEWAY, GatewayModel.DQSMART).subscribe(
        res => {
          this.apollo.dqSmartInit(res.data).subscribe(() => {
            subscriber.next();
            subscriber.complete();
          }, error => subscriber.error());
        }
      );
    });

    const initPelabGateway = new Observable<any>(subscriber => {
      this.apollo.apolloNodeTreeService.getByApolloTree(this.assetId, null, NodeTreeType.GATEWAY, GatewayModel.PELAB_LORA).subscribe(
        res => {
          this.apollo.pelabInit(res.data).subscribe(() => {
            subscriber.next();
            subscriber.complete();
          }, error => subscriber.error());
        }
      );
    });
    const requests: Array<Observable<any>> = [initHub, initDqsmartGw, initPelabGateway];
    return forkJoin(requests);
  }

  toggleTool() {
    if (this.sidebar) {
      this.sidebar.toggle().then();
    }
  }


  getChildrenByParent(nodeTreeId: string): Observable<any> {
    return new Observable<any>(subscriber => {
      if (this.parentNodeTree) {
        this.loading = true;
        this.cd.detectChanges();
        this.path.set(this.parentNodeTree.id.id, this.parentNodeTree.name);
        this.apollo.apolloNodeTreeService.getChildren(nodeTreeId, new PageLink(200))
          .subscribe(res => {
            this.childrenNodetree = res;
            this.updateData(false);
            subscriber.next(null);
            subscriber.complete();
          });
      } else {
        subscriber.error('not found parentNodeTree');
      }
    });
  }


  createNewApolloTree($event) {
    this.getChildrenByParent(this.parentNodeTree.id.id).subscribe();
  }

  reloadEvent() {
    if (this.setTimeOutId) {
      clearTimeout(this.setTimeOutId);
    }
    this.setTimeOutId = setTimeout(() => {
      this.getChildrenByParent(this.parentNodeTree.id.id).subscribe();
    }, 100);
  }

  clickEvent($event) {
    this.textSearchMode = false;
    this.pageLink.textSearch = '';
    this.parentNodeTree = $event as NodeTree;
    this.getChildrenByParent(this.parentNodeTree.id.id).subscribe();
  }

  backEvent() {
    if (this.pageView !== PageView.NORMAL) {
      this.pageView = PageView.NORMAL;
    } else if (this.parentNodeTree.type !== NodeTreeType.ROOT) {
      this.path.delete(this.parentNodeTree.id.id);
      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.parentNodeTree.parentId.id)
        .subscribe(res => {
          this.parentNodeTree = res as NodeTree;
          this.reloadEvent();
        });
    }
  }

  getPath(): string {
    let path = '';

    const arrPath = [...this.path.values()];

    arrPath.forEach((p, index) => {
      path += p;
      path = path.concat((index < arrPath.length - 1) ? ' > ' : '');
    });

    return path;
  }

  homeEvent($event) {
    this.parentNodeTree = $event as NodeTree;
    this.getChildrenByParent(this.parentNodeTree.id.id).subscribe();
  }

  home() {
    this.path.clear();
    this.pageView = PageView.NORMAL;
    this.apollo.apolloNodeTreeService.getRoot(this.assetId).subscribe(
      rootNode => {
        this.rootNodeTree = rootNode;
        this.parentNodeTree = rootNode;
        this.getChildrenByParent(this.parentNodeTree.id.id).subscribe();
      }
    );
  }


  autoBtnEventClick() {
    this.pageView = PageView.AUTOMATION;
  }

  schedulerBtnEventClick() {
    this.pageView = PageView.SCHEDULER;
  }

  analyzeBtnEventClick() {
    this.pageView = PageView.ANALYZE;
  }

  mapBtnEventClick() {
    this.pageView = PageView.MAP;
  }

  removeEntities() {
    if (confirm('Xóa nhiều thực thể đã chọn?')) {
      this.apollo.apolloService.eventTaskSubject.next(EventTask.DELETE_ENTITIES);
    }
  }

  createOrUpdateArea() {

  }

  createApolloNodeTreeV1(type: NodeTreeType) {
    const entityDialogParams: DataViewDialog = {
      apollo: this.apollo,
      curNodeTree: null,
      parentNodeTree: this.parentNodeTree,
      type
    };


    switch (type) {
      case NodeTreeType.AREA:
        entityDialogParams.title = 'Tạo khu vực mới';
        entityDialogParams.config = this.areaConfig.config;

        break;
      case NodeTreeType.HUB:
        entityDialogParams.title = 'Tạo Hub mới';
        entityDialogParams.config = this.hubConfig.config;
        break;
      case NodeTreeType.GATEWAY:
        entityDialogParams.title = 'Tạo Gateway mới';
        entityDialogParams.config = this.gatewayConfig.config;
        break;
    }

    const entity$ = this.dialog.open<ApolloNodeTreeCreateV2>(ApolloNodeTreeCreateV2, {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: entityDialogParams
    }).afterClosed();

    entity$.subscribe(
      (entities) => {
        if (entities) {
          this.reloadEvent();
        }
      }
    );

  }


  createDevice() {
    const dialogConfig: MatDialogConfig = {

      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.parentNodeTree,
        type: ''
      }
    };
    this.dialog.open(DeviceCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data === 'create') {
        this.createNewApolloTree(null);
      }
    });
  }


  createGroup() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.parentNodeTree,
        type: ''
      }
    };
    this.dialog.open(GroupCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data === 'create') {
        this.createNewApolloTree(null);
      }
    });
  }


  createScene() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: this.parentNodeTree,
        type: ''
      }
    };
    this.dialog.open(SceneCreateOrUpdateComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data === 'create') {
        this.createNewApolloTree(null);
      }
    });
  }


  widgetSetting() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        apolloTreeId: this.assetId,
      }
    };
    this.dialog.open(WidgetSettingComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data) {
        this.assetId = res.data;
        this.apollo.ctx.widget.config.settings.apolloTreeId = this.assetId;
        this.loadDatabase();
      }
    });
  }

  updateData(allNodes: boolean) {
    if (allNodes && this.pageLink.textSearch) {
      this.apollo.apolloNodeTreeService.getByApolloTree(null, this.pageLink, '', '').subscribe(
        value => {
          this.childrenNodetreeFilter = value.data;
          /*          .filter(res =>
                      res.type?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
                      NodeTreeTypeLabelMapping[res.type]?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
                      res.name?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
                      res.model?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
                      res.label?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1);*/

          this.loading = false;
          this.cd.detectChanges();
        }
      );
    } else {
      if (this.pageLink.textSearch) {
        this.childrenNodetreeFilter = this.childrenNodetree.filter(res =>
          res.type?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          res.name?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          res.model?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          res.label?.toLowerCase()?.indexOf(this.pageLink.textSearch?.trim()?.toLowerCase()) > -1);
      } else {
        this.childrenNodetreeFilter = this.childrenNodetree;
      }
      this.loading = false;
      this.cd.detectChanges();
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
    // this.paginator.pageIndex = 0;
    this.updateData(false);
  }
}
