import {ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  GENERATE_ENERGEY_DATA, TodayEnergySensorData
} from './simmulation-energy-sensor-data';
import {
  EnergySensorDaily,
  EnergySensorMonthly, EnergySensorMonthlyChart,
  EnergySensorParameters
} from './energy-sensor-management.model';
import {EnergySensorManagement} from './energy-sensor-management';
import {DatePipe} from '@angular/common';
import Chart from 'chart.js/auto';
import {BleEnergySensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-energy-sensor';
import {
  DialogControllerDirective
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/dialog-controller.directive';


export interface DialogData {
  nodeTreeController: BleEnergySensor;
}

export interface EnergyParameter {
  [key: string]: {
    name: string;
    value: any;
    unit: string;
  };

}

@Component({
  selector: 'tb-energy-sensor-management',
  templateUrl: './energy-sensor-management.component.html',
  styleUrls: ['./energy-sensor-management.component.scss']
})
export class EnergySensorManagementComponent
  extends DialogControllerDirective<EnergySensorManagementComponent, BleEnergySensor>
  implements OnInit {
  chart: Chart;
  yearSelected: number = new Date().getUTCFullYear();
  monthSelected: number = new Date().getUTCMonth();

  dataMonths: Array<EnergySensorMonthly>;
  dataOfMonth: EnergySensorMonthlyChart;
  todaData: EnergySensorParameters;
  monthDataDetailMode = false;
  energy: EnergySensorManagement;
  energyParametersKey: Array<string> = ['current', 'power', 'voltage', 'total'];

  energyParameters: EnergyParameter = {
    current: {value: 0, name: 'Dòng', unit: 'mA'},
    power: {value: 0, name: 'Công suất', unit: 'W'},
    voltage: {value: 0, name: 'Điện áp', unit: 'V'},
    energy: {value: 0, name: 'Năng lượng', unit: 'KWh'},
    total: {value: 0, name: 'Năng lượng', unit: 'KWh'},
    date: {value: '', name: 'Ngày', unit: ''}
  };

  isLoading = true;

  xValues = [];
  yValues = [];

  firstDataOfToday: EnergySensorDaily;
  lastDataOfToday: EnergySensorDaily;

  @Input() energySensorDailies: Array<EnergySensorDaily>;

  constructor(
    public dialogRef: MatDialogRef<EnergySensorManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    super(dialogRef, data);
    this.chartInit = this.chartInit.bind(this);
    this.updateNewestData = this.updateNewestData.bind(this);
  }

  generateDemoData() {

  }

  ngOnInit(): void {
    this.updateYearDate(new Date().getFullYear());
    this.data.nodeTreeController.updateNewData(this.updateNewestData);
  }

  updateNewestData(unicastAddress: string, data: EnergySensorDaily) {
    this.convertData(data);

    if (this.firstDataOfToday && data.date > this.firstDataOfToday.date) {
      this.energyParameters.energy.value = data.data.energy - this.firstDataOfToday.data.energy;
      this.energyParameters.energy.value = Math.round(this.energyParameters.energy.value * 1000) / 1000;
    }

    this.cd.detectChanges();
  }

  updateYearDate(year: number) {

    this.dataMonths = [];
    this.dataOfMonth = null;
    this.isLoading = true;

    this.data.nodeTreeController.getEnergySensorDataTimeSeries(new Date(year, 0, 0, 0, 0, 0, 0),
      new Date(year, 11, 31, 23, 59, 59, 999))
      .subscribe(value => {
        if (value && Array.isArray(value)) {
          this.energy = new EnergySensorManagement(value);
          this.dataMonths = this.energy.getDataOfYear(this.yearSelected);
          this.getDataToday();
        }
        this.isLoading = false;
        this.cd.detectChanges();
      });
  }

  getDataToday() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 0, 0, 0, 0);
    this.data.nodeTreeController.getEnergySensorDataTimeSeries(startDate, endDate)
      .subscribe(value => {
        if (value && Array.isArray(value)) {
          const todayData = new EnergySensorManagement(value);
          this.firstDataOfToday = todayData.getFirstData();
          this.lastDataOfToday = todayData.getLastData();
          console.log(this.firstDataOfToday, this.lastDataOfToday);
          if (this.firstDataOfToday && this.lastDataOfToday) {
            this.convertData(this.lastDataOfToday);
            /*this.energyParameters.current.value = this.lastDataOfToday.data.current;
            this.energyParameters.power.value = this.lastDataOfToday.data.power;
            this.energyParameters.voltage.value = this.lastDataOfToday.data.voltage;
            this.energyParameters.total.value = this.lastDataOfToday.data.energy;
            this.energyParameters.date.value = this.datePipe.transform(new Date(this.lastDataOfToday.date), 'HH:mm:ss dd/MM/yyyy');*/
            if (this.firstDataOfToday && this.lastDataOfToday.date > this.firstDataOfToday.date) {
              this.energyParameters.energy.value = this.lastDataOfToday.data.energy - this.firstDataOfToday.data.energy;
              this.energyParameters.energy.value = Math.round(this.energyParameters.energy.value * 1000) / 1000;
            }
          }
        } else {
          //khong tim thay data cua ngay hom nay => lay data cuoi cung
          const lastData = this.energy.getLastData();
          this.convertData(lastData);

          console.log(lastData);
        }
        this.cd.detectChanges();
      });
  }

  convertData(data: EnergySensorDaily) {
    this.energyParameters.current.value = data.data.current;
    this.energyParameters.power.value = data.data.power;
    this.energyParameters.voltage.value = data.data.voltage;
    this.energyParameters.total.value = data.data.energy;
    this.energyParameters.date.value = this.datePipe.transform(new Date(data.date), 'HH:mm:ss dd/MM/yyyy');
  }


  enterMonthDateMode() {
    this.dataOfMonth = this.energy.getDateOfMonthToDrawChart(this.yearSelected, this.monthSelected);
    // setTimeout(this.chartInit, 100);
    this.chartInit();
    this.monthDataDetailMode = true;
  }

  exitMonthDateMode() {
    this.monthDataDetailMode = false;
  }

  chartInit() {
    this.xValues = [];
    this.yValues = [];

    console.log(this.dataOfMonth);
    this.dataOfMonth.dataDaily.forEach(value => {
      this.xValues.push(new Date(value.date).getDate());
      this.yValues.push(value.energy);
    });

    this.cd.detectChanges();

    /*const canvasRef = document.getElementById('myChart');
    if (canvasRef) {
      const canvas = canvasRef;
      this.chart = new Chart(canvas as HTMLCanvasElement, {
        type: 'line',
        data: {
          labels: xValues,
          datasets: [
            {
              data: yValues,
              borderColor: 'orangered',
              fill: false,
            }
          ],
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
              display: false,
              labels: {
                color: '#0d6dfdb0',
                font: {
                  family: 'IRANSansWeb',
                },
              },
            },
          },
        },
      });
    }*/
  }

  updateChartData() {
    /*    if (this.chart) {
          // const data = this.generateNewData();
          this.chart.data.datasets[0].data.map((ele) => {
            ele = Number(ele) + 1;
            console.log(ele);
          });

          // Update the chart
          this.chart.update();
        }*/
  }

  clearHistoryDate() {
    this.data.nodeTreeController.clearHistoryEnergySensorData().subscribe(
      value => {
        this.updateYearDate(new Date().getFullYear());
      }
    );
  }

}
