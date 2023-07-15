import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {BleEnergySensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-energy-sensor';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {map} from 'rxjs/operators';
import {PageLink} from '@shared/models/page/page-link';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {
  EnergySensor
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-sensor';
import {FormControl, FormGroup} from '@angular/forms';
import {forkJoin, Observable, of} from 'rxjs';
import {
  EnergySensorDaily,
  EnergySensorDailyChart
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management.model';
import {DatePipe} from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {
  RangeMonthSelected
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/month-selector.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {
  PriceConfigComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/price-config.component';
import {object} from 'prop-types';
import {PageComponent} from "@shared/components/page.component";
import {Store} from "@ngrx/store";
import {AppState} from "@core/core.state";
import {result} from "lodash";

export interface TableData {
  name?: string;
  total?: number;
  price?: number;
}

export interface EnergyDataReport {
  date?: string | number | Date;
  energy?: number;
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
  Date = 'Ngày',
  Month = 'Tháng',
  Year = 'Năm',
}

export enum ReportTimeEnum {
  today = 'TODAY',
  week = 'WEEK',
  preWeek = 'PRE-WEEK',
  month = 'MONTH',
  preMonth = 'PRE-MONTH',
  pre2Months = 'PRE-2-MONTHS',
  pre3Months = 'PRE-3-MONTHS',
  year = 'YEAR',
  preYear = 'PRE-YEAR',
}

export interface ReportTimeI {
  value: ReportTimeEnum;
  name: string;

}

@Component({
  selector: 'tb-energy-layout',
  templateUrl: './energy-layout.component.html',
  styleUrls: ['./energy-layout.component.scss'],
})
export class EnergyLayoutComponent extends PageComponent implements OnInit, OnDestroy {

  bleEnergyDatasource: Array<TableData> = [];
  bleEnergyLatest: Array<TableDataLatest> = [];

  energyDatasource: Array<EnergyDataReport> = [];
  energyDrawChart: Array<EnergyDataReport> = [];

  displayedColumns: string[] = ['no', 'name', 'total', 'price', 'tool'];
  displayedEnergyReportColumns: string[] = ['date', 'energy', 'price'];

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

  startMonth: Date = new Date();
  endMonth: Date = new Date();

  xValues = [];
  yValues = [];
  y1Values = [];

  xChartDeviceReport = [];
  yChartDeviceReport = [];

  priceForCalculating: Array<PriceForCalculating> = [
    {energy: 50, price: 1728},
    {energy: 50, price: 1786},
    {energy: 100, price: 2074},
    {energy: 100, price: 2612},
    {energy: 100, price: 2919},
    {energy: 100, price: 3015},
  ];
  today = new Date();
  reportType = ReportTypeEnum.Date;
  reportTime: ReportTimeEnum;
  repostTimes: Array<ReportTimeI> = [
    {name: 'Năm trước', value: ReportTimeEnum.preYear},
    {name: 'Năm nay', value: ReportTimeEnum.year},
    {name: '3 Tháng trước', value: ReportTimeEnum.pre3Months},
    {name: '2 Tháng trước', value: ReportTimeEnum.pre2Months},
    {name: 'Tháng trước', value: ReportTimeEnum.preMonth},
    {name: 'Tháng này', value: ReportTimeEnum.month},
    {name: 'Tuần trước', value: ReportTimeEnum.preWeek},
    {name: 'Tuần này', value: ReportTimeEnum.week},
    {name: 'Hôm nay', value: ReportTimeEnum.today},
  ];

  nearTimeReport = {
    today: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    lastMonth: 0
  };

  @Input() apollo: ApolloWidgetContext;
  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor(protected store: Store<AppState>,
              private cd: ChangeDetectorRef,
              public dialog: MatDialog,
              public datePipe: DatePipe) {
    super(store);
    this.callback = this.callback.bind(this);
    this.rangeDateFormGroup = new FormGroup({
      start: new FormControl<Date | null>(new Date()),
      end: new FormControl<Date | null>(new Date()),
      reportType: new FormControl<ReportTypeEnum>(ReportTypeEnum.Month),
    });
  }

  ngOnInit(): void {
    // console.log(this.rootNodeTree);
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

            this.nodeEnergySensorMap.set(bleEnergySensor.bleNodeViewer.unicastAddress, {
              name: bleEnergySensor.renderName(),
              total: 0, price: 0
            });
          });

        this.energyNodetrees = nodeTrees;
        this.bleEnergySensors = bleEnergySensorList;
        // this.report();
        this.reportNearTime();
      }
    });
  }


  callback(unicastAddress: string, data: EnergySensorDaily) {
  }


  getDataDaily(startDate: Date, endDate: Date): Observable<Array<Array<EnergySensorDailyChart>>> {
    // const startDate = this.rangeDateFormGroup.get('start').value as Date;
    // const endDate = this.rangeDateFormGroup.get('end').value as Date;


    /*    this.bleEnergySensors
          .map(value => new EnergySensor(value))
          .map(value1 => value1.getTotalEnergy(startDate, toDate))
          .forEach(value => value.subscribe(
            data => {
              if (data && data?.unicastAddress) {
                const res = this.nodeEnergySensorMap.get(data.unicastAddress);
                this.nodeEnergySensorMap.set(data.unicastAddress, {
                  ...res,
                  total: data?.total,
                  price: this.calculatePrice(data?.total)
                });

                // console.log(this.nodeEnergySensorMap.get(data.unicastAddress));
              }
            }
          ));*/

    const requests = [];

    this.bleEnergySensors
      .map(value => new EnergySensor(value))
      // .map(value1 => value1.getEnergyDaily(fromDate, endDate))
      .forEach(value => requests.push(value.getEnergyDaily(startDate, endDate)));
    return forkJoin(requests);
  }

  getDataMonthly(startDate: Date, endDate: Date): Observable<Array<Array<EnergySensorDailyChart>>> {
    const requests = [];
    this.bleEnergySensors
      .map(value => new EnergySensor(value))
      // .map(value1 => value1.getEnergyDaily(fromDate, endDate))
      .forEach(value => requests.push(value.getEnergyMonthly(startDate, endDate)));
    return forkJoin(requests);
  }

  guiUpdate(totalEnergy, totalMoney) {
    this.totalEnergy = totalEnergy;
    this.totalMoney = totalMoney;
    this.cd.detectChanges();
  }

  loadTotalEnergy(): Observable<number> {
    return of(100);
  }

  calculatePrice(energy: number) {
    let totalPrice = 0;
    let tmpEnergy = energy;

    if (this.priceForCalculating && Array.isArray(this.priceForCalculating) && this.priceForCalculating.length > 0) {
      for (const obj of this.priceForCalculating) {

        if (tmpEnergy < obj.energy) {
          totalPrice += tmpEnergy * obj.price;
          tmpEnergy = 0;
          break;
        } else {
          totalPrice += obj.energy * obj.price;
          tmpEnergy = tmpEnergy - obj.energy;
        }
      }
      if (tmpEnergy > 0) {
        totalPrice += tmpEnergy
          * this.priceForCalculating[this.priceForCalculating.length - 1].price;
      }
    }


    return totalPrice;
  }

  payment(): Observable<number> {
    return of(1000);
  }

  mergeDailyDate(fromDate: Date, toDate: Date): Observable<Array<EnergySensorDailyChart>> {
    return new Observable<Array<EnergySensorDailyChart>>(subscriber => {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
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

  mergeDailyMonth(fromDate: Date, toDate: Date): Observable<Array<EnergySensorDailyChart>> {
    return new Observable<Array<EnergySensorDailyChart>>(subscriber => {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      this.getDataMonthly(startDate, endDate).subscribe(energyDevicesSensorDaily => {

        const mergeDataDaily: Array<EnergySensorDailyChart> = [];
        /*
                const startDateToGetMonth = new Date(dataDailyRaw[0].date);
                const endDate = new Date(dataDailyRaw[dataDailyRaw.length - 1].date);
        */

        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();

        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();

        for (let year = startYear; year <= endYear; year++) {
          const monthStart = (year === startYear) ? startMonth : 0;
          const monthEnd = (year === endYear) ? endMonth : 11;

          for (let month = monthStart; month <= monthEnd; month++) {
            // Do something for each month and year
            // console.log('Month:', month + 1, 'Year:', year, 'energy: ', energy.energyTotal);

            const arrayDataOfCurrentMonth: Array<EnergySensorDailyChart> = [];

            energyDevicesSensorDaily.forEach(
              energyDeviceSensorDaily => {
                const dataOfCurrentDate = energyDeviceSensorDaily.find(value => {
                  const newDate = new Date(value?.date);
                  if (newDate.getMonth() === month && newDate.getFullYear() === year) {
                    return value;
                  }
                });
                if (dataOfCurrentDate) {
                  arrayDataOfCurrentMonth.push(dataOfCurrentDate);
                }
              }
            );

            const energyTotalOfDate = arrayDataOfCurrentMonth.reduce(
              (previousValue, currentValue) => previousValue = previousValue + currentValue.energy, 0);
            mergeDataDaily.push({energy: energyTotalOfDate, date: month + 1 + '/' + year});
          }
        }

        subscriber.next(mergeDataDaily);
        subscriber.complete();
      }, error => subscriber.error(error));

    });

  }

  ngOnDestroy(): void {
    if (this.bleEnergySensors && Array.isArray(this.bleEnergySensors)) {
      // this.bleEnergySensors.forEach(value => value.unSubscribe());
    }
  }


  reportGetToltal(fromDate: Date, toDate: Date): Observable<EnergyDataReport> {
    // console.log(this.datePipe.transform(fromDate, 'dd:MM'), ' - ', this.datePipe.transform(toDate, 'dd:MM'));
    return this.reportByDateAndDevice(fromDate, toDate).pipe(
      map(value => {
        if (value && Array.isArray(value) && value.length > 0) {
          return value[value.length - 1];
        }
      })
    );
  }

  reportByDevice(startDate: Date, endDate: Date): Observable<Array<{ sensor: BleEnergySensor, energy: number }>> {
    return new Observable<any>(subscriber => {
      const requests = [];
      this.bleEnergySensors.forEach(sensor => {
        const energySensor = new EnergySensor(sensor);
        const data = [];
        const request = energySensor.getEnergyDaily(startDate, endDate).pipe(
          map(value => ({sensor, energy: value.reduce((pre, current) => pre = pre + current.energy, 0)}))
        );
        requests.push(request);
      });
      forkJoin(requests).subscribe(
        value => subscriber.next(value),
        error => subscriber.error(error),
        () => subscriber.complete()
      );
    });
  }

  reportByDateAndDevice(fromDate: Date, toDate: Date): Observable<Array<EnergyDataReport>> {
    return new Observable<Array<EnergyDataReport>>(subscriber => {
      let energyDatasource: Array<EnergyDataReport> = [];
      this.mergeDailyDate(fromDate, toDate).subscribe(
        value => {
          const dataWithPrice = value.map(entry => ({
            ...entry,
            price: null
          }));

          const totalEnergy = dataWithPrice.reduce(
            (previousValue, currentValue) => previousValue = previousValue + currentValue.energy, 0
          );

          energyDatasource = [...dataWithPrice, {
            energy: totalEnergy,
            date: 'Tổng',
            price: this.calculatePrice(totalEnergy)
          }];
          subscriber.next(energyDatasource);
          subscriber.complete();
        },
        error => subscriber.error()
      );
    });
  }

  downloadReportByDateAndDevice(energyDatasource: Array<EnergyDataReport>) {
    if (energyDatasource) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.sheet_add_json(
        XLSX.utils.json_to_sheet([], {skipHeader: true}), // Create an empty worksheet without header
        energyDatasource,
        {header: ['date', 'energy', 'price'], skipHeader: true, origin: {r: 2, c: 0}} // Specify starting row at index 2 (row 3)
      );

      // Add title above the header row
      const title = 'Bảng tổng hợp điện tiêu thụ hàng ngày';
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
      // Convert the workbook to a binary 'Blob'
      const excelBlob: Blob = new Blob([XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      FileSaver.saveAs(excelBlob, 'favorites.xlsx');
    }
  }

  reportByMonths(fromDate: Date, toDate: Date): Observable<Array<EnergyDataReport>> {
    return new Observable<Array<EnergyDataReport>>(subscriber => {
      let energyDatasource: Array<EnergyDataReport> = [];
      const startDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1, 0, 0, 0, 0);
      const endDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0, 23, 59, 59, 999);
      this.mergeDailyMonth(startDate, endDate).subscribe(
        value => {
          const dataWithPrice: Array<EnergyDataReport> = value.map(entry => ({
            ...entry,
            price: this.calculatePrice(entry.energy)
          }));

          const totalEnergy = dataWithPrice.reduce(
            (previousValue, currentValue) => previousValue = previousValue + currentValue.energy, 0
          );

          const totalPrice = dataWithPrice.reduce(
            (previousValue, currentValue) => previousValue = previousValue + currentValue.price, 0
          );

          energyDatasource = [...dataWithPrice, {
            energy: totalEnergy,
            date: 'Tổng',
            price: totalPrice
          }];

          subscriber.next(energyDatasource);
          subscriber.complete();
        }, error => subscriber.error(error)
      );
    });
  }

  downloadReportByMonth(energyDatasource: Array<EnergyDataReport>) {
    if (energyDatasource) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.sheet_add_json(
        XLSX.utils.json_to_sheet([], {skipHeader: true}), // Create an empty worksheet without header
        energyDatasource,
        {header: ['date', 'energy', 'price'], skipHeader: true, origin: {r: 2, c: 0}} // Specify starting row at index 2 (row 3)
      );

      // Add title above the header row
      const title = 'Bảng tổng hợp điện tiêu thụ hàng tháng';
      const titleCell = XLSX.utils.encode_cell({r: 0, c: 0}); // Assuming the title cell is at A1
      worksheet[titleCell] = {v: title};

      // Merge cells for the title
      const titleRange = {s: {r: 0, c: 0}, e: {r: 0, c: 2}}; // Assuming the title spans three columns (A to C)
      worksheet['!merges'] = [titleRange];

      // Customize the column names
      XLSX.utils.sheet_add_json(worksheet, [
        {date: 'Tháng', energy: 'Năng lượng tiêu thụ(Kwh)', price: 'Giá (VNĐ)'}
      ], {skipHeader: true, origin: 'A2'});

      // Create workbook
      const workbook: XLSX.WorkBook = {Sheets: {Sheet1: worksheet}, SheetNames: ['Sheet1']};
      // Convert the workbook to a binary 'Blob'
      const excelBlob: Blob = new Blob([XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      FileSaver.saveAs(excelBlob, 'MonthlyReport.xlsx');
    }
  }

  downloadReportByYear() {

  }


  downloadReportTotal() {
    if (this.rangeDateFormGroup.get('reportType').value === ReportTypeEnum.Date) {
      this.downloadReportByDateAndDevice(this.energyDatasource);
    } else if (this.rangeDateFormGroup.get('reportType').value === ReportTypeEnum.Month) {

      this.downloadReportByMonth(this.energyDatasource);
    } else if (this.rangeDateFormGroup.get('reportType').value === ReportTypeEnum.Year) {
      this.downloadReportByYear();
    }
  }

  reportNearTime() {
    const requests = [];

    let startDate = new Date();
    let endDate = new Date();

    //today
    requests.push(this.reportGetToltal(new Date(), new Date()));


    startDate = new Date();
    //this week
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    requests.push(this.reportGetToltal(startDate, new Date()));


    //last week
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1 - 7);
    endDate.setDate(endDate.getDate() - endDate.getDay());
    requests.push(this.reportGetToltal(startDate, endDate));

    //last week
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1 - 7);
    endDate.setDate(endDate.getDate() - endDate.getDay());


    //this month
    startDate = new Date();
    startDate.setDate(1);
    requests.push(this.reportGetToltal(startDate, new Date()));


    //last month
    endDate = new Date();
    endDate.setDate(0);
    //get the start date of pre week
    startDate = new Date(endDate);
    startDate.setDate(1);
    requests.push(this.reportGetToltal(startDate, endDate));

    forkJoin<Array<EnergyDataReport>>(requests).subscribe(value => {
      if (value && Array.isArray(value) && value.length >= 5) {
        this.nearTimeReport.today = Math.round(value[0].energy * 1000) / 1000;
        this.nearTimeReport.thisWeek = Math.round(value[1].energy * 1000) / 1000;
        this.nearTimeReport.lastWeek = Math.round(value[2].energy * 1000) / 1000;
        this.nearTimeReport.thisMonth = Math.round(value[3].energy * 1000) / 1000;
        this.nearTimeReport.lastMonth = Math.round(value[4].energy * 1000) / 1000;
      }
      this.cd.detectChanges();
    });

  }

  report() {
    let startDate = new Date();
    let endDate = new Date();
    if (this.reportTime === ReportTimeEnum.today) {
      this.reportType = ReportTypeEnum.Date;

    } else if (this.reportTime === ReportTimeEnum.week) {
      this.reportType = ReportTypeEnum.Date;
      //get the first day of current week
      startDate.setDate(startDate.getDate() - startDate.getDay());

    } else if (this.reportTime === ReportTimeEnum.preWeek) {
      startDate = new Date();
      endDate = new Date();
      this.reportType = ReportTypeEnum.Date;

      //get the start date of pre week
      startDate.setDate(startDate.getDate() - startDate.getDay() - 7);
      //get the last date of pre week
      endDate.setDate(endDate.getDate() - endDate.getDay() - 1);
    } else if (this.reportTime === ReportTimeEnum.month) {
      this.reportType = ReportTypeEnum.Date;

      //get the start date of pre week
      startDate.setDate(1);
      //get the last date of pre week
      // endDate.setDate(endDate.getDate() - endDate.getDay());
    } else if (this.reportTime === ReportTimeEnum.preMonth) {
      this.reportType = ReportTypeEnum.Date;

      //get the last date of pre week
      endDate.setDate(0);
      //get the start date of pre week
      startDate = new Date(endDate);
      startDate.setDate(1);

    } else if (this.reportTime === ReportTimeEnum.pre2Months) {
      this.reportType = ReportTypeEnum.Month;

      /*      //get the last date of pre week
            endDate.setDate(0);
            //get the start date of pre week
            startDate = new Date(endDate);
            startDate.setDate(1);
            endDate.setMonth(startDate.getMonth() - 2);*/
      startDate.setMonth(startDate.getMonth() - 2);

    } else if (this.reportTime === ReportTimeEnum.pre3Months) {
      this.reportType = ReportTypeEnum.Month;
      /*
            //get the last date of pre week
            endDate.setDate(0);
            //get the start date of pre week
            startDate = new Date(endDate);
            startDate.setDate(1);
            endDate.setMonth(startDate.getMonth() - 3);*/
      startDate.setMonth(startDate.getMonth() - 3);

    } else if (this.reportTime === ReportTimeEnum.year) {
      this.reportType = ReportTypeEnum.Month;
      startDate.setMonth(0);

    } else if (this.reportTime === ReportTimeEnum.preYear) {
      this.reportType = ReportTypeEnum.Month;
      endDate.setMonth(0);
      endDate.setDate(0);
      startDate = new Date(endDate);
      startDate.setMonth(0);

    } else {
      startDate = new Date(this.rangeDateFormGroup.get('start').value as Date);
      endDate = new Date(this.rangeDateFormGroup.get('end').value as Date);
    }

    const dvReportFromDate = new Date(startDate);
    const dvReportToDate = new Date(endDate);

    // console.log(this.reportTime, this.reportType, startDate, endDate);
    let result: Observable<Array<EnergyDataReport>>;
    if (this.reportType === ReportTypeEnum.Date) {
      result = this.reportByDateAndDevice(startDate, endDate);
    } else if (this.reportType === ReportTypeEnum.Month) {
      result = this.reportByMonths(startDate, endDate);
    } else if (this.reportType === ReportTypeEnum.Year) {
    }

    result.subscribe(value => {
      if (value && Array.isArray(value) && value.length > 0) {
        this.energyDatasource = value;
        this.chartInit(value);
        const totalData = value[value.length - 1];
        this.guiUpdate(totalData.energy, totalData.price);
      }
    });

    this.reportByDevice(dvReportFromDate, dvReportToDate).subscribe(
      value => {
        if (value && Array.isArray(value)) {
          const xT = [];
          const yT = [];
          value.forEach(value1 => {

            xT.push(value1.sensor.bleNodeViewer.unicastAddress);
            yT.push(value1.energy);
          });
          this.xChartDeviceReport = xT;
          this.yChartDeviceReport = yT;
        }

      }
    );


    /* if (this.rangeDateFormGroup.get('reportType').value === ReportTypeEnum.Date) {
       const startDate = new Date(this.rangeDateFormGroup.get('start').value as Date);
       const endDate = new Date(this.rangeDateFormGroup.get('end').value as Date);
       this.reportByDateAndDevice(startDate, endDate);
     } else if (this.rangeDateFormGroup.get('reportType').value === ReportTypeEnum.Month) {
       this.reportByMonths();
     } else if (this.rangeDateFormGroup.get('reportType').value === ReportTypeEnum.Year) {
     }*/
  }


  rangeMonthSelected($event: RangeMonthSelected) {
    if ($event && $event?.startMonth && $event?.endMonth) {
      this.startMonth = $event.startMonth;
      this.endMonth = $event.endMonth;
    }
  }

  chartInit(data: Array<EnergyDataReport>) {
    const x = [];
    const y = [];
    const y1 = [];


    data.slice(0, -1).forEach(value => {
      x.push(value.date);
      y.push(value.energy);
      y1.push(value.price);
    });

    this.xValues = x;
    this.yValues = y;
    this.y1Values = y1;
    this.cd.detectChanges();
  }

  PriceSetting() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        rootNodeTree: this.rootNodeTree,
        price: this.priceForCalculating
      }
    };
    this.dialog.open(PriceConfigComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data) {
        console.log(res.data);
      }
    });
  }

  protected readonly Math = Math;
}
