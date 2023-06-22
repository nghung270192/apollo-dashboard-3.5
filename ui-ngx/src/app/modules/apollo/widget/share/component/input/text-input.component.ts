import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tb-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {


  @Input()name: string;
  @Input()text: string;
  @Input()disable = false;
  @Output()textChange: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

   ngOnInit(): void {

   }

  textChangeEvent(){
    this.textChange.emit(this.text);
  }
}
