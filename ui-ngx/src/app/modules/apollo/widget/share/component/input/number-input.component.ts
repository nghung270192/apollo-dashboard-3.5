import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tb-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class TextNumberComponent implements OnInit {


  @Input()name: string;
  @Input()disable = false;
  @Input()max = 100;
  @Input()min = 0;
  @Input()text: number;
  @Output()textChange: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

   ngOnInit(): void {

   }

  textChangeEvent(){
    this.textChange.emit(this.text);
  }
}
