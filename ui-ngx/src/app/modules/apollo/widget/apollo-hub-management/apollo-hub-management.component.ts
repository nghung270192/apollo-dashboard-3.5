import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {PageLink} from '@shared/models/page/page-link';
import {EntitySearchDirection} from '@shared/models/relation.models';
import {Direction, SortOrder} from '@shared/models/page/sort-order';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {forkJoin, merge, Observable, of} from 'rxjs';
import {catchError, delay, map, mergeMap, tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {Device} from '@shared/models/device.models';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HubSettingComponent} from '@modules/apollo/widget/apollo-hub-management/hub-setting.component';
import {AliasFilterType} from '@shared/models/alias.models';
import {BaseHubService} from '@modules/apollo/widget/share/services/base-hub.service';
import {AttributeService} from '@core/http/attribute.service';

@Component({
  selector: 'tb-apollo-hub-management-v1',
  templateUrl: './apollo-hub-management.component.html',
  styleUrls: ['./apollo-hub-management.component.scss']
})
export class ApolloHubManagementComponent implements OnInit, AfterViewInit {
  dataSource: Array<Device> = [];
  directions = EntitySearchDirection;

  displayedColumns = ['No', 'createdTime', 'name', 'active', 'version', 'Tool'];
  // apolloTreeService: ApolloTreeService;
  direction: EntitySearchDirection;
  pageLink: PageLink = new PageLink(5);
  hidePageSize = false;
  totalElements = 0;

  @Input() ctx: WidgetContext;

  @ViewChild('searchInput') searchInputField: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cd: ChangeDetectorRef, private datePipe: DatePipe, public dialog: MatDialog,
              private hubService: BaseHubService, private attributeService: AttributeService) {
    const sortOrder: SortOrder = {property: 'type', direction: Direction.ASC};
    this.direction = EntitySearchDirection.FROM;
    this.pageLink = new PageLink(10, 0, null, sortOrder);
  }

  ngOnInit(): void {
    this.dataSource = [];
    const entityAliases = this.ctx?.dashboard?.aliasController?.getEntityAliases();
    const targetDeviceAliasIds = this.ctx.defaultSubscription.targetDeviceAliasIds;
    if (targetDeviceAliasIds && targetDeviceAliasIds.length) {
      const targetDeviceAliasId = targetDeviceAliasIds[0];
      if (targetDeviceAliasId) {
        console.log(entityAliases, targetDeviceAliasId);
        if (entityAliases[targetDeviceAliasId].filter.type === AliasFilterType.entityList) {
          const deviceIds = entityAliases[targetDeviceAliasId].filter.entityList;
          if (deviceIds && Array.isArray(deviceIds)) {
            this.ctx.deviceService.getDevices(deviceIds).pipe();
            this.ctx.deviceService.getDevices(deviceIds).pipe(
              mergeMap(active => {
                  const vesionObservables = active.map(user => this.hubService.getVersion(user.id.id).pipe(
                    catchError(error => of(error))
                  ));
                  return forkJoin(vesionObservables).pipe(
                    catchError(err => of([null, null, err])),
                    map(ages => active.map((user, i) => {
                      if (ages && Array.isArray(ages) && ages[i] && ages[i].params && ages[i].params.version) {
                        return {...user, active: 'Connected', version: ages[i].params.version};
                      } else {
                        return {...user, active: 'Disconnected', version: 'unknown'};
                      }
                    }))
                  );
                }
              )
            ).subscribe(res => {
              console.log(res);
              this.dataSource = res;
              this.cd.detectChanges();
            });

          }
        } else if (entityAliases[targetDeviceAliasId].filter.type === AliasFilterType.singleEntity) {
          if (entityAliases[targetDeviceAliasId].filter.singleEntity) {
            this.ctx.deviceService.getDevice(entityAliases[targetDeviceAliasId].filter.singleEntity.id).subscribe(res => {
              this.dataSource = [res];
              this.cd.detectChanges();

            });
          }
        }
      }
    }
  }

  private calculateAge(userId: string): Observable<number> {
    // this is where you would calculate the age of the user based on their id
    // for this example, we'll just return a random age between 18 and 65 after a short delay
    return of(null).pipe(
      mergeMap(() => {
        const age = Math.floor(Math.random() * 48) + 18;
        return of(age).pipe(
          delay(100) // simulate async delay
        );
      })
    );
  }

  getVersion(hubId: string): Observable<any> {
    return this.hubService.getVersion(hubId);
  }

  ngAfterViewInit(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.updateData())
      )
      .subscribe();

  }

  /**
   *
   * @param reload
   */
  updateData(reload: boolean = false) {
    this.pageLink.page = this.paginator.pageIndex;
    this.pageLink.pageSize = this.paginator.pageSize;
    this.pageLink.sortOrder.property = this.sort.active;
    this.pageLink.sortOrder.direction = Direction[this.sort.direction.toUpperCase()];
    /*    this.apolloTreeService.getTenantApolloTree(this.pageLink).subscribe(res => {
          this.totalElements = res?.totalElements;
          this.dataSource = res?.data;
          this.cd.detectChanges();
        });*/
  }

  /**
   *
   * @param id
   */
  remove(id: string) {
    /*    this.apolloTreeService.deleteApolloTree(id).subscribe(res => {
          this.updateData();
        });*/
  }

  setting(device: Device) {
    const dialogConfig: MatDialogConfig = {
        disableClose: false,
        panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
        data: {
          device,
          ctx: this.ctx
        }
      }
    ;
    this.dialog.open(HubSettingComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data) {
        // this.ngAfterViewInit();
      }
    });
  }
}
