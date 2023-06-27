import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {BleEnergySensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-energy-sensor';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {map} from 'rxjs/operators';
import {PageLink} from '@shared/models/page/page-link';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {
  EnergySensor
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-sensor';
import {FormControl, FormGroup} from '@angular/forms';
import {forkJoin, Observable, of} from 'rxjs';

export interface TableData {
  name: string;
  lastEnergy: number;
  total: number;
}

@Component({
  selector: 'tb-energy-layout',
  templateUrl: './energy-layout.component.html',
  styleUrls: ['./energy-layout.component.scss']
})
export class EnergyLayoutComponent implements OnInit {

  bleEnergy: Array<TableData> = [];

  displayedColumns: string[] = ['no', 'name', 'lastEnergy', 'total'];

  rangeDateFormGroup: FormGroup;
  rangDateFormControl = new FormControl(null);
  // dataSource = ELEMENT_DATA;

  energySensors: Array<EnergySensor> = [];

  totalEnergy = 0;
  totalMoney = 0;

  @Input() apollo: ApolloWidgetContext;
  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor(private cd: ChangeDetectorRef) {
    this.rangeDateFormGroup = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
  }


  updateDate() {
    const startDate = this.rangeDateFormGroup.get('start').value as Date;
    const endDate = this.rangeDateFormGroup.get('end').value as Date;
    endDate.setHours(23, 59, 59, 999);

    this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, new PageLink(100),
      NodeTreeType.DEVICE, GatewayModel.APOLLO).pipe(
      map(value => value.data.filter(
        node => node?.additionalInfo?.entity?.pid === '10A9'
      )), map(value => value.map(
        nodeEnergy => new BleEnergySensor(nodeEnergy, this.apollo, null, null, null)
      )), map(value => value.map(
        energy => new EnergySensor(energy)
      ))
    ).subscribe(value => {
      this.energySensors = value;
      let te = 0;
      const tm = 0;
      const forJoinList = [];
      value.forEach(energy => forJoinList.push(energy.getTotalEnergy(startDate, endDate)));
      console.log(value);
      forkJoin(forJoinList).subscribe(
        value1 => {
          console.log(value1);
          value1.forEach(res => {
              console.log(res);
              if (res && isFinite(res)) {
                te += res;
              }
            }
          );

          this.totalEnergy = te;
          this.cd.detectChanges();
        }
      );
    });
  }

  loadTotalEnergy(): Observable<number> {
    return of(100);
  }

  payment(): Observable<number> {
    return of(1000);
  }
}
