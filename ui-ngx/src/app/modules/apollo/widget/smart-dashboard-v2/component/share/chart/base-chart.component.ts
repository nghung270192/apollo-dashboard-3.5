import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'tb-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})

export class BaseChartComponent implements AfterViewInit, OnChanges {


  chart: Chart;


  @Input() chartId = 'myChart';
  @Input() name = 'Đồ thị';
  @Input() xValues: Array<any> = [];
  @Input() yValues: Array<any> = [];
  @Input() nameY = 'Điện tiêu thụ (Kwh)';
  @Input() y1Values: Array<any> = [];
  @Input() nameY1 = 'Chi phí (VND)';

  constructor(private cd: ChangeDetectorRef) {
  }


  chartInit() {
    if (this.chart) {
      this.chart.destroy();
      this.chart.reset();
    }
    const canvasRef = document.getElementById(this.chartId);
    if (canvasRef) {
      const canvas = canvasRef;
      this.chart = new Chart(canvas as HTMLCanvasElement, {
        type: 'scatter',
        data: {
          labels: this.xValues,
          datasets: [
            {
              data: this.yValues,
              label: this.nameY,
              borderWidth: 1,
              yAxisID: 'y', type: 'bar',
              backgroundColor: [
                'rgb(255,40,0)'],
              borderColor: [
                'rgb(0,0,0)'
              ],
              maxBarThickness: 20,

            },
            /* {
              data: this.y1Values, yAxisID: 'y1', type: 'bar',
              backgroundColor: [
                'rgb(50,104,245)'],
              borderColor: [
                'rgb(255, 99, 132)'
              ],
              borderWidth: 1, label: this.nameY1,
              /!*barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2*!/
            }*/
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: this.name
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: true,
              // barThickness: 6,  // number (pixels) or 'flex'
              // maxBarThickness: 8 // number (pixels)
            },
            y1: {
              type: 'linear',
              display: (Array.isArray(this.y1Values) && this.y1Values.length > 0),
              position: 'right',
              beginAtZero: true,

              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up

              },
            },
          }
        },
      });
    }

    /*    if (this.xValues && Array.isArray(this.xValues) && this.xValues.length > 1
          && this.yValues && Array.isArray(this.yValues)) {
          this.chart.data.datasets.push({
            data: this.yValues, label: this.nameY, borderWidth: 1,
            yAxisID: 'y', type: 'bar',
            backgroundColor: [
              'rgb(255,40,0)'],
            borderColor: [
              'rgb(0,0,0)'
            ],
          });
        }*/
    if (this.y1Values && Array.isArray(this.y1Values) && this.y1Values.length > 0) {
      this.chart.data.datasets.push({
        data: this.y1Values, yAxisID: 'y1', type: 'bar',
        backgroundColor: [
          'rgb(50,104,245)'],
        borderColor: [
          'rgb(255, 99, 132)',
        ],
        maxBarThickness: 20,
        borderWidth: 1,
        label: this.nameY1
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartInit();
      this.chart.update();
      this.cd.detectChanges();
    }, Math.floor(Math.random() * 1000) + 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.xValues?.isFirstChange() && !changes.yValues?.isFirstChange() && !changes.y1Values?.isFirstChange()) {
      if (this.chart) {
        if (this.yValues.length > 0) {
          this.chart.data.datasets[0].data = this.yValues;
        }
        if (this.y1Values.length > 0) {
          this.chart.data.datasets[1].data = this.y1Values;
        }
        this.chart.data.labels = this.xValues;
        this.chart.update();
        this.cd.detectChanges();
      }
    }
  }
}
