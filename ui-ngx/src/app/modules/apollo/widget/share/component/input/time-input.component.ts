import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tb-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TextTimeComponent implements OnInit {


  @Input()name: string;
  @Input()disable = false;
  @Input()max = 100;
  @Input()min = 0;
  @Input()text: any;
  @Output()textChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  value: any;
  ngOnInit(): void {

    this.value = this.text;
  }

  textChangeEvent(){
    this.textChange.emit(this.value);
  }
}
