import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'tb-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.scss']
})
export class GoogleChartComponent implements OnInit {
  private data = 0;
  xValues = [];
  yValues = [];

  @ViewChild('myChart', {static: true}) canvasRef: ElementRef | undefined;

  private chart: Chart | undefined;

  ngOnInit() {

    this.generateNewData();
    console.log(this.yValues);
    if (this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.xValues,
          datasets: [
            {
              data: this.yValues,
              borderColor: 'red',
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
      setInterval(() => {
        this.updateChartData();
      }, 1000);
    }
  }


  setXYValule(x, y) {
    this.xValues.push(x);
    this.yValues.push(y);
  }


  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = this.getRandomNumber(startTime, endTime);
    return new Date(randomTime);
  }

  generateNewData() {

    this.setXYValule(this.getRandomDate(new Date(2023, 1, 1), new Date(2023, 5, 1)), 10);
    this.setXYValule(new Date(), 15);
    this.setXYValule(new Date(), 20);
    this.setXYValule(new Date(), 25);
    this.setXYValule(new Date(), 30);
    this.setXYValule(new Date(), 35);
    this.setXYValule(new Date(), 40);
    this.setXYValule(new Date(), 45);
    this.setXYValule(new Date(), 50);
    this.setXYValule(new Date(), 55);
    this.setXYValule(new Date(), 60);
  }

  updateChartData() {
    if (this.chart) {
      this.generateNewData();
      // Update the chart
      this.chart.update();
    }
  }
}
