import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {
  BleEnergySensor,
  EnergyUpdateNewstData
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-energy-sensor';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {map} from 'rxjs/operators';
import {PageLink} from '@shared/models/page/page-link';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {
  EnergySensor
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-sensor';
import {FormControl, FormGroup} from '@angular/forms';
import {forkJoin, Observable, of} from 'rxjs';
import {
  EnergySensorDaily, EnergySensorDailyChart
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management.model';
import {DatePipe} from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export interface TableData {
  name?: string;
  total?: number;
  price?: number;
}

export interface TableDataLatest {
  name: string;
  lastEnergy?: number;
  timeUpdated?: number;
}

export interface PriceForCalculating {
  energy: number;
  price: number;
}

export enum ReportTypeEnum {
  Device = 'Thiết bị',
  Date = 'Ngày',
  Month = 'Tháng',
  Year = 'Năm',
}


@Component({
  selector: 'tb-energy-layout',
  templateUrl: './energy-layout.component.html',
  styleUrls: ['./energy-layout.component.scss']
})
export class EnergyLayoutComponent implements OnInit, OnDestroy {

  bleEnergyDatasource: Array<TableData> = [];
  bleEnergyLatest: Array<TableDataLatest> = [];

  displayedColumns: string[] = ['no', 'name', 'total', 'price', 'tool'];

  rangeDateFormGroup: FormGroup;
  rangDateFormControl = new FormControl(null);
  // dataSource = ELEMENT_DATA;

  energySensors: Array<EnergySensor> = [];

  totalEnergy = 0;
  totalMoney = 0;

  nodeEnergySensorMap: Map<string, TableData> = new Map<string, TableData>([]);

  bleEnergySensors: Array<BleEnergySensor> = [];
  energyNodetrees: Array<NodeTree> = [];

  ReportTypes = Object.values(ReportTypeEnum);
  ReportTypeEnum = ReportTypeEnum;


  @Input() apollo: ApolloWidgetContext;
  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor(private cd: ChangeDetectorRef, public datePipe: DatePipe) {
    this.callback = this.callback.bind(this);
    this.rangeDateFormGroup = new FormGroup({
      start: new FormControl<Date | null>(new Date()),
      end: new FormControl<Date | null>(new Date()),
      reportType: new FormControl<ReportTypeEnum>(ReportTypeEnum.Device),
    });
  }

  ngOnInit(): void {
    this.energyNodetrees = [];
    this.bleEnergySensors = [];
    this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, new PageLink(100),
      NodeTreeType.DEVICE, GatewayModel.APOLLO).pipe(
      map(value => value.data.filter(
        node => node?.additionalInfo?.entity?.pid === '10A9'
      ))
    ).subscribe(nodeTrees => {
      if (nodeTrees && Array.isArray(nodeTrees)) {
        const bleEnergySensorList: Array<BleEnergySensor> = [];
        nodeTrees.map(nodeTree => new BleEnergySensor(nodeTree, this.apollo, null, null, null))
          .forEach(bleEnergySensor => {
            bleEnergySensorList.push(bleEnergySensor);
            bleEnergySensor.subscribe();
            bleEnergySensor.updateNewData(this.callback);

            this.nodeEnergySensorMap.set(bleEnergySensor.bleNodeViewer.unicastAddress, {
              name: bleEnergySensor.renderName(),
              total: 0, price: 0
            });
          });

        this.energyNodetrees = nodeTrees;
        this.bleEnergySensors = bleEnergySensorList;
      }
    });


  }

  updateLatest() {
    console.log('updateLatest');
    this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, new PageLink(100),
      NodeTreeType.DEVICE, GatewayModel.APOLLO).pipe(
      map(value => value.data.filter(
        node => node?.additionalInfo?.entity?.pid === '10A9'
      ))
    ).subscribe(value => {
      value.forEach(nodeEnergy => {
        const bleEnergySensor = new BleEnergySensor(nodeEnergy, this.apollo, null, null, null);
        console.log(bleEnergySensor);
      });
    });
  }

  callback(unicastAddress: string, data: EnergySensorDaily) {
    /*    if (unicastAddress && data) {
          const res = this.nodeEnergySensorMap.get(unicastAddress);
          this.nodeEnergySensorMap.set(unicastAddress, {
            ...res,
            lastEnergy: data?.data.energy,
            timeUpdated: data?.date
          });
          this.guiUpdate();
        }*/
  }

  updateDate() {
    const startDate = this.rangeDateFormGroup.get('start').value as Date;
    const endDate = this.rangeDateFormGroup.get('end').value as Date;
    endDate.setHours(23, 59, 59, 999);

    const fromDate = new Date(this.rangeDateFormGroup.get('start').value);
    fromDate.setDate(fromDate.getDate() - 1);

    console.log(startDate, this.rangeDateFormGroup.get('start').value, fromDate);

    this.bleEnergySensors
      .map(value => new EnergySensor(value))
      .map(value1 => value1.getTotalEnergy(startDate, endDate))
      .forEach(value => value.subscribe(
        data => {
          if (data && data?.unicastAddress) {
            const res = this.nodeEnergySensorMap.get(data.unicastAddress);
            this.nodeEnergySensorMap.set(data.unicastAddress, {
              ...res,
              total: data?.total,
              price: this.calculatePrice(data?.total)
            });
            this.guiUpdate();
          }
        }
      ));

    const requests = [];

    this.bleEnergySensors
      .map(value => new EnergySensor(value))
      // .map(value1 => value1.getEnergyDaily(fromDate, endDate))
      .forEach(value => requests.push(value.getEnergyDaily(fromDate, endDate)));

    forkJoin(requests).subscribe(
      value => console.log(value)
    );

    /*this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNodeTree.apolloTreeId.id, new PageLink(100),
      NodeTreeType.DEVICE, GatewayModel.APOLLO).pipe(
      map(value => value.data.filter(
        node => node?.additionalInfo?.entity?.pid === '10A9'
      )), map(value => value.map(
        nodeEnergy => new BleEnergySensor(nodeEnergy, this.apollo, null, null, null)
      )), map(value => value.map(
        energy => new EnergySensor(energy)
      )), map(value => value.map(
        value1 => value1.getData(startDate, endDate)
      ))
    ).subscribe(value => {
      value.forEach(obs => {
        obs.subscribe(data => {
          if (data && data?.unicastAddress) {
            const res = this.nodeEnergySensorMap.get(data.unicastAddress);
            this.nodeEnergySensorMap.set(data.unicastAddress, {
              ...res,
              total: data?.total,
              price: this.calculatePrice(data?.total)
            });
            this.guiUpdate();
          }
        });
      });
      /!*      const temp: Array<TableData> = [];
            this.energySensors = value;
            let te = 0;
            const tm = 0;
            const forJoinList = [];
            const forJoinLatestLish = [];

            value.forEach(energy => {
              forJoinList.push(energy.getData(startDate, endDate));
            });

            forkJoin(forJoinList).subscribe(
              value1 => {
                console.log(value1);
                value1.forEach(res => {
                    console.log(res);
                    if (res && isFinite(res?.energy)) {
                      te += res?.energy;
                      temp.push(res);
                    }
                  }
                );
                this.totalEnergy = te;
                this.bleEnergyDatasource = temp;

                this.cd.detectChanges();
              }
            );*!/
    });*/
  }

  getDataDaily(startDate: Date, endDate: Date): Observable<Array<Array<EnergySensorDailyChart>>> {
    // const startDate = this.rangeDateFormGroup.get('start').value as Date;
    // const endDate = this.rangeDateFormGroup.get('end').value as Date;
    endDate.setHours(23, 59, 59, 999);

    const fromDate = new Date(startDate);
    fromDate.setDate(fromDate.getDate() - 1);

    console.log(startDate, this.rangeDateFormGroup.get('start').value, fromDate);

    this.bleEnergySensors
      .map(value => new EnergySensor(value))
      .map(value1 => value1.getTotalEnergy(startDate, endDate))
      .forEach(value => value.subscribe(
        data => {
          if (data && data?.unicastAddress) {
            const res = this.nodeEnergySensorMap.get(data.unicastAddress);
            this.nodeEnergySensorMap.set(data.unicastAddress, {
              ...res,
              total: data?.total,
              price: this.calculatePrice(data?.total)
            });
            this.guiUpdate();
          }
        }
      ));

    const requests = [];

    this.bleEnergySensors
      .map(value => new EnergySensor(value))
      // .map(value1 => value1.getEnergyDaily(fromDate, endDate))
      .forEach(value => requests.push(value.getEnergyDaily(fromDate, endDate)));
    return forkJoin(requests);
  }


  guiUpdate() {
    this.bleEnergyDatasource = [...this.nodeEnergySensorMap.values()];
    this.totalEnergy = this.bleEnergyDatasource.reduce((power, obj) => power + obj.total, 0);
    this.totalMoney = this.calculatePrice(this.totalEnergy);
    this.cd.detectChanges();
  }

  loadTotalEnergy(): Observable<number> {
    return of(100);
  }

  calculatePrice(energy: number) {
    return energy * 1000;
  }

  payment(): Observable<number> {
    return of(1000);
  }

  mergeDailyDate(): Observable<Array<EnergySensorDailyChart>> {
    return new Observable<Array<EnergySensorDailyChart>>(subscriber => {
      const startDate = new Date(this.rangeDateFormGroup.get('start').value as Date);
      const endDate = new Date(this.rangeDateFormGroup.get('end').value as Date);


      /*
      .pipe(
        map(value => value.map(
          value1 => value1.map(
            value2 => ({...value2, date: this.datePipe.transform(value2.date, 'dd/MM/yyyy')}))
        ))
      )
      * */

      this.getDataDaily(startDate, endDate).subscribe(energyDevicesSensorDaily => {

        const mergeDataDaily: Array<EnergySensorDailyChart> = [];
        for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate) {
          const arrayDataOfCurrentDate: Array<EnergySensorDailyChart> = [];
          energyDevicesSensorDaily.forEach(
            energyDeviceSensorDaily => {
              const dataOfCurrentDate = energyDeviceSensorDaily.find(value => {
                if (new Date(value.date).toDateString() === currentDate.toDateString()) {
                  return value;
                }
              });
              if (dataOfCurrentDate) {
                arrayDataOfCurrentDate.push(dataOfCurrentDate);
              }
            }
          );

          const energyTotalOfDate = arrayDataOfCurrentDate.reduce(
            (previousValue, currentValue) => previousValue = previousValue + currentValue.energy, 0);
          mergeDataDaily.push({energy: energyTotalOfDate, date: this.datePipe.transform(currentDate, 'dd/MM/yyyy')});
          currentDate.setDate(currentDate.getDate() + 1);
        }
        subscriber.next(mergeDataDaily);
        subscriber.complete();
      }, error => subscriber.error(error));

    });

  }

  ngOnDestroy(): void {
    if (this.bleEnergySensors && Array.isArray(this.bleEnergySensors)) {
      this.bleEnergySensors.forEach(value => value.unSubscribe());
    }
  }

  data: { energy: number, date: Date }[] = [
    {energy: 10, date: new Date()},
    {energy: 20, date: new Date()},
    {energy: 30, date: new Date()}
  ];


  downloadReportTotal() {
    this.mergeDailyDate().subscribe(
      value => {
        const dataWithPrice = value.map(entry => ({
          ...entry,
          price: ''
        }));

        const totalEnergy = dataWithPrice.reduce(
          (previousValue, currentValue) => previousValue = previousValue + currentValue.energy, 0
        );

        const dataWithTotalEnergy = [...dataWithPrice, {
          energy: totalEnergy,
          date: 'Tổng',
          price: this.calculatePrice(totalEnergy)
        }];

        const worksheet: XLSX.WorkSheet = XLSX.utils.sheet_add_json(
          XLSX.utils.json_to_sheet([], {skipHeader: true}), // Create an empty worksheet without header
          dataWithTotalEnergy,
          {header: ['date', 'energy', 'price'], skipHeader: true, origin: {r: 2, c: 0}} // Specify starting row at index 2 (row 3)
        );


        /*        // Add currency format to the 'Price' column
                const currencyFormat = '#,##0.00 [$VND]'; // Customize the format as per your requirements
                const priceColumn = worksheet["C"]; // Assuming 'Price' column is at index 2 (C)
                console.log(priceColumn);
                if (priceColumn && Array.isArray(priceColumn)) {
                  priceColumn.forEach((cell: XLSX.CellObject) => {
                    cell.z = currencyFormat;
                  });
                }*/

        // Add title above the header row
        const title = 'Bảng tổng hợp điện tiêu thụ';
        const titleCell = XLSX.utils.encode_cell({r: 0, c: 0}); // Assuming the title cell is at A1
        worksheet[titleCell] = {v: title};

        // Merge cells for the title
        const titleRange = {s: {r: 0, c: 0}, e: {r: 0, c: 2}}; // Assuming the title spans three columns (A to C)
        worksheet['!merges'] = [titleRange];

        // Customize the column names
        XLSX.utils.sheet_add_json(worksheet, [
          {date: 'Ngày', energy: 'Năng lượng tiêu thụ(Kwh)', price: 'Giá (VNĐ)'}
        ], {skipHeader: true, origin: 'A2'});

        // Create workbook
        const workbook: XLSX.WorkBook = {Sheets: {Sheet1: worksheet}, SheetNames: ['Sheet1']};
        console.log(worksheet, workbook);
        // Convert the workbook to a binary 'Blob'
        const excelBlob: Blob = new Blob([XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        FileSaver.saveAs(excelBlob, 'favorites.xlsx');
      }
    );
  }


  downloadReport() {
    // Create worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      ...this.nodeEnergySensorMap.values()
    ]);

    // Create workbook
    const workbook: XLSX.WorkBook = {Sheets: {Sheet1: worksheet}, SheetNames: ['Sheet1']};

    // Convert the workbook to a binary 'Blob'
    const excelBlob: Blob = new Blob([XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    FileSaver.saveAs(excelBlob, 'favorites.xlsx');
  }
}
