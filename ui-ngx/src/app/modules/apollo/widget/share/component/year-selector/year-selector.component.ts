import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tb-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {

  @Input() year: number = new Date().getFullYear();
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();


  constructor() {
  }

  ngOnInit() {
  }

  increaseYear() {
    this.year++;
    this.yearChange.emit(this.year);
  }

  decreaseYear() {
    this.year--;
    this.yearChange.emit(this.year);
  }
}
