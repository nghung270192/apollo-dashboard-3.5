import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {HubController} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {
  ZigbeeDevice,
  ZigbeeModelTypeLabelMapping
} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ZigbeeUpdateDeviceComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-page/zigbee-update-device.component';
import {fromEvent, merge, Subscription} from 'rxjs';
import {EntitySearchDirection} from '@shared/models/relation.models';
import {PageLink} from '@shared/models/page/page-link';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Direction, SortOrder} from '@shared/models/page/sort-order';
import {MatTableDataSource} from '@angular/material/table';
import {ZigbeeDeviceImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/zigbee-controller';

@Component({
  selector: 'tb-zigbee-tab',
  templateUrl: './zigbee-tab.component.html',
  styleUrls: ['./zigbee-tab.component.scss']
})
export class ZigbeeTabComponent implements OnInit, AfterViewInit {

  columnsAnalyze: Array<string> = ['No', 'addr', 'name', 'model', 'Tool'];
  datasource = new MatTableDataSource<ZigbeeDevice>([]);
  /*  buttons = {
      reloadDevice: {
        name: "false",
        loading: false
      },
      deleteNetwork: {
        name: "false",
        loading: false
      },
      initNetwork: {
        name: "false",
        loading: false
      },
      startPermitJoin: {
        name: "false",
        loading: false
      },
      stopPermitJoin: {
        name: "false",
        loading: false
      },
    }*/

  loading = false;
  startP = false;
  hubController: HubController;
  isShow = false;
  sub: Subscription = null;
  // public loading = new Array(4);

  public ZigbeeModelTypeLabelMapping = ZigbeeModelTypeLabelMapping;
  enableProcessing = [];
  removeProcessing = [];
  directions = EntitySearchDirection;
  direction: EntitySearchDirection;
  pageLink: PageLink = new PageLink(5);
  hidePageSize = false;
  totalElements = 0;
  textSearchMode = false;
  @ViewChild('searchInput') searchInputField: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;

  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private ngZone: NgZone) {
    const sortOrder: SortOrder = {property: 'createdTime', direction: Direction.ASC};
    this.direction = EntitySearchDirection.FROM;
    this.pageLink = new PageLink(10, 0, null, sortOrder);
  }

  ngOnInit(): void {
    this.hubController = new HubController(this.nodeTree, this.apollo);
    // this.buttons['reloadDevice']['loading'] = true;
  }


  reloadDevices(name: string) {
    this.loading = true;
    this.hubController.zbGetDevices().subscribe(res => {
      if (res && Array.isArray(res))
        {this.datasource.data = res;}
      this.loading = false;
      this.cd.detectChanges();

    }, error => alert(this.nodeTree.name + ': Mất kết nối với Hub. Vui lòng kiểm tra lại'));
  }

  initNetwork() {
    if (confirm('Delete Zigbee Network')) {
      this.loading = true;
      this.hubController.zbResetNetwork().subscribe(res => {
        this.hubController.zbInitNetwork().subscribe(res => {
          this.loading = false;
          this.cd.detectChanges();
        }, error => {
          this.loading = false;
          this.cd.detectChanges();
          alert('Lỗi: Không khởi tạo được mạng zigbee');
        });
      }, error => {
        this.loading = false;
        this.cd.detectChanges();
        alert('Lỗi: Không xóa được mạng zigbee');
      });
    }
  }

  startPermitJoin() {
    this.startP = true;
    this.loading = true;
    this.sub = this.hubController.zbStartPermitJoint(60000).subscribe(res => {
      this.startP = false;
      this.cd.detectChanges();
      if (res && res?.params) {
        this.loading = false;
        const device: ZigbeeDevice = res.params as ZigbeeDevice;
        this.editDevice(device);

      }
    }, error => {
      this.stopPermitJoin();
      this.cd.detectChanges();
    });
  }

  stopPermitJoin() {
    this.startP = false;
    this.loading = false;
    if (this.sub) {this.sub.unsubscribe();}
    this.hubController.zbStopPermitJoint().subscribe(res => {
      this.cd.detectChanges();
    }, error => {
      this.cd.detectChanges();
    });
  }

  editDevice(device: ZigbeeDevice) {
    const dialogConfig: MatDialogConfig = {
        disableClose: true,
        panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
        data: {
          hubController: this.hubController,
          zbDevice: device
        }
      }
    ;
    let sub: any;
    sub = this.dialog.open(ZigbeeUpdateDeviceComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
        if (res && res?.device) {
          const device: ZigbeeDeviceImpl = new ZigbeeDeviceImpl(res?.device as ZigbeeDevice);
          this.hubController.zbSetModel(device.addr, device.model, device.name).subscribe(res => {
            console.log(res);
            this.reloadDevices('reloadDevice');
          }, error => alert(error));
        }
      });
    }
  }

  removeDevice($event, device: ZigbeeDevice) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    this.hubController.zbDeleteDevice(device.addr).subscribe(res => {
      this.reloadDevices('reloadDevice');
    }, error => alert(error));
  }

  updateData() {
    this.pageLink.page = this.paginator.pageIndex;
    this.pageLink.pageSize = this.paginator.pageSize;
    this.pageLink.sortOrder.property = this.sort.active;
    this.pageLink.sortOrder.direction = Direction[this.sort.direction.toUpperCase()];
    this.datasource.filter = this.pageLink.textSearch?.trim()?.toLowerCase();
    /*    if (this.datasource.paginator) {
          this.datasource.paginator.firstPage();
        }*/

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

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.hubController.zbGetDevices().subscribe(res => {
      if (res && Array.isArray(res)) {
        this.datasource.data = res;
      }
      this.cd.detectChanges();
    }, error => alert(this.nodeTree.name + ': Mất kết nối với Hub. Vui lòng kiểm tra lại'));

    this.updateData();
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
}
