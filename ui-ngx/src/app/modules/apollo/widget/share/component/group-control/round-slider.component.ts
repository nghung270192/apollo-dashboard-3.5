import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import * as $ from 'jquery';
import 'round-slider';

@Component({
  selector: 'apollo-round-slider',
  templateUrl: './round-slider.component.html',
  styleUrls: ['./round-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundSliderComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() id: any;
  @Input() value = 0;
  @Input() showValue: any = false;
  @Input() radius?: any;
  @Input() width?: any;
  @Input() size = 100;
  @Output() valueChange = new EventEmitter<number>();
  @Output() stateChange = new EventEmitter<boolean>();

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

  roundSliderInit() {
    const data = $('#' + this.id).roundSlider({
      sliderType: 'min-range',
      circleShape: 'pie',
      startAngle: '315',
      lineCap: 'round',
      radius: this.radius,
      width: this.width | this.radius * 25 / 100,
      step: 1,
      min: 0,
      max: 100,
      value: this.value,
      svgMode: true,
      pathColor: '#C2E9F7',
      borderWidth: 0,

      startValue: 0,
      showTooltip: this.showValue,
      editableTooltip: false,
      change: (e: any) => {
        this.value = e.value;
        this.valueChange.emit(this.value);
      },
      tooltipFormat: (args: any) => `<div style = 'font-size:${this.size / 2.5}px;'> ` + args.value + '%' + '<div>'
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.roundSliderInit();
      this.cd.detectChanges();
    }, 10);

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      const obj = $('#' + this.id).data('roundSlider');
      if (obj) {
        obj.setValue(this.value, 1);
      }
    }

  }

  powerButtonChange(data: boolean) {
    this.stateChange.emit(data);
    if (data) {
      this.value = 100;
    } else {
      this.value = 0;
    }
    const obj = $('#' + this.id).data('roundSlider');
    if (obj) {
      obj.setValue(this.value, 1);
    }
  }

}
