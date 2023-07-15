import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import iro from '@jaames/iro';

@Component({
  selector: 'hsl-controller',
  templateUrl: './hsl-controller.component.html',
  styleUrls: ['./hsl-controller.component.scss']
})
export class HslControllerComponent implements OnInit, AfterViewInit {

  @Input() id = 'colorPicker';
  @Input() size: any = 215;
  @Output() hslChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() hslDefaultChange: EventEmitter<any> = new EventEmitter<any>();

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
      color: '#f00'
    });
    colorPicker.color.hsl = {h: 180, s: 100, l: 100};
    colorPicker.on('color:change', this.colorCallback);
  }

  colorCallback(color: any) {
    if (this.idSetTimeOut)
      {clearTimeout(this.idSetTimeOut);}
    this.idSetTimeOut = setTimeout(() => {
      this.colorChangeEvent(color.hsl);
      if (color.saturation > 100) {
        color.saturation = 100;
      }
    }, 500);
  }

  colorChangeEvent(hsl: any) {
    const value: any = {
      h: Math.floor(hsl?.h / 360 * 65535),
      s: Math.floor(hsl?.s / 100 * 65535),
      l: Math.floor(hsl?.l / 100 * 65535),
    };
    this.hslDefaultChange.emit(hsl);
    this.hslChange.emit(value);
  }

}
