import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import iro from '@jaames/iro';

@Component({
  selector: 'ctl-controller',
  templateUrl: './ctl-controller.component.html',
  styleUrls: ['./ctl-controller.component.scss']
})
export class CtlControllerComponent implements OnInit, AfterViewInit {

  @Input() id = 'ctlPicker';
  @Input() size: any = 215;
  @Output() ctlChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cd: ChangeDetectorRef) {
  }

  idSetTimeOut: any;

  ngOnInit(): void {
    this.colorCallback = this.colorCallback.bind(this);
    this.colorToolInit = this.colorToolInit.bind(this);
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.colorToolInit();
    }, 10);
  }


  colorToolInit() {
    const myElement = document.getElementById(this.id);

    // @ts-ignore
    const colorPicker = new iro.ColorPicker(myElement, {
      // Set the size of the color picker
      width: this.size,
      // Set the initial color to pure red
      layout: [
        {
          component: iro.ui.Slider,
          options: {
            // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: 'kelvin',
            minTemperature: 2700,
            maxTemperature: 6500
          }
        },
      ]
    });

    colorPicker.on('color:change', this.colorCallback);
  }

  colorCallback(color: any) {
    if (this.idSetTimeOut) {
      clearTimeout(this.idSetTimeOut);
    }
    this.idSetTimeOut = setTimeout(() => {
      this.colorChangeEvent(color.kelvin);
    }, 500);
  }

  colorChangeEvent(hsl: any) {
    this.ctlChange.emit(Math.floor(hsl));
  }

}
