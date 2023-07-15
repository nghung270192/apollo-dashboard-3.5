import {ChangeDetectorRef, Component, Input, SimpleChanges} from '@angular/core';
import Chart from "chart.js/auto";

@Component({
  selector: 'tb-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss']
})
export class CircleChartComponent {


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
    if (this.xValues && Array.isArray(this.xValues) && this.yValues && Array.isArray(this.yValues)) {
      const canvasRef = document.getElementById(this.chartId);
      if (canvasRef) {
        const canvas = canvasRef;
        this.chart = new Chart(canvas as HTMLCanvasElement, {
          type: 'scatter',
          data: {
            labels: this.xValues,
            datasets: [
              {
                data: this.yValues, label: this.nameY,
                borderColor: 'orangered', fill: false, yAxisID: 'y', type: 'line'
              },
              {
                data: this.y1Values, yAxisID: 'y1', type: 'bar',
                backgroundColor: [
                  'rgba(50,104,245,0.2)'],
                borderColor: [
                  'rgb(255, 99, 132)'
                ],
                borderWidth: 1, label: this.nameY1,
                /*barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2*/
              }
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
              },
              y1: {
                type: 'linear',
                display: true,
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
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartInit();
      this.chart.update();
      this.cd.detectChanges();
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.xValues?.isFirstChange() && !changes.yValues?.isFirstChange() && !changes.y1Values?.isFirstChange()) {
      if (this.chart) {
        if (this.yValues) {
          this.chart.data.datasets[0].data = this.yValues;
        }
        if (this.y1Values) {
          this.chart.data.datasets[1].data = this.y1Values;
        }
        this.chart.data.labels = this.xValues;
        this.chart.update();
        this.cd.detectChanges();
      }
    }
  }
}
