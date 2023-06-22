import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'tb-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})

export class BaseChartComponent implements AfterViewInit {


  chart: Chart;

  @Input() xValues: Array<any> = [];
  @Input() yValues: Array<any> = [];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {/*
    this.chartInit();
    console.log(this.xValues, this.yValues);*/
  }

  chartInit() {
    if (this.xValues && Array.isArray(this.xValues) && this.yValues && Array.isArray(this.yValues)) {
      const canvasRef = document.getElementById('myChart');
      if (canvasRef) {
        const canvas = canvasRef;
        this.chart = new Chart(canvas as HTMLCanvasElement, {
          type: 'line',
          data: {
            labels: this.xValues,
            datasets: [
              {data: this.yValues, borderColor: 'orangered', fill: false}
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
            }
          },
        });
      }
    }
  }

  ngAfterViewInit(): void {
    console.log(this.xValues, this.yValues);
    this.chartInit();
    this.chart.update();
    this.cd.detectChanges();
  }
}
