import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'apollo-fast-lightness-control',
  templateUrl: './fast-lightness-control.component.html',
  styleUrls: ['./fast-lightness-control.component.scss']
})
export class FastLightnessControlComponent implements OnInit, OnChanges {

  DATA: any = [
    {value: 0, name: 'OFF', color: 'rgb(0, 0, 0)'},
    {value: 10, name: '10', color: 'rgb(0, 0, 0)'},
    {value: 50, name: '50', color: 'rgb(0, 0, 0)'},
    {value: 80, name: '80', color: 'rgb(0, 0, 0)'},
    {value: 100, name: '100', color: 'rgb(0, 0, 0)'},
  ];

  @Input() size: any = 50;
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log(this.size);
  }

  buttonClick($event: number) {
    this.value = $event;
    this.valueChange.emit(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd.detectChanges();
  }

}
