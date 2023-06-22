import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'tb-scheduler-input',
  templateUrl: './scheduler-input.component.html',
  styleUrls: ['./scheduler-input.component.scss']
})
export class SchedulerInputComponent implements OnInit {

  @Input() time: string;
  @Output() timeChange: EventEmitter<string>=new EventEmitter<string>();

  @Input() days: Array<number> = [];
  @Output() daysChange: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  formControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  log($event){
    console.log($event);
  }
}
