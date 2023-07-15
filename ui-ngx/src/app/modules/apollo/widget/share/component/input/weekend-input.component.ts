import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  value?: number;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'tb-weekend-input',
  templateUrl: './weekend-input.component.html',
  styleUrls: ['./weekend-input.component.scss']
})
export class WeekendInputComponent implements OnInit {

  task: Task = {
    name: 'All day',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Mon', completed: false, color: 'primary', value: 0},
      {name: 'Tue', completed: false, color: 'primary', value: 1},
      {name: 'Wed', completed: false, color: 'primary', value: 2},
      {name: 'Thu', completed: false, color: 'primary', value: 3},
      {name: 'Fri', completed: false, color: 'primary', value: 4},
      {name: 'Sat', completed: false, color: 'primary', value: 5},
      {name: 'Sun', completed: false, color: 'primary', value: 6},
    ],
  };

  time: any;
  @Input() days: Array<number> = [];
  @Output() daysChange: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
    if (this.days && Array.isArray(this.days)) {
      this.days.forEach(day => {
        const idx = this.task.subtasks.findIndex(t => t.value === day);
        if (idx >= 0) {this.task.subtasks[idx].completed = true;}
      });
    }


  }

  log($event) {
    console.log($event);
  }


  allComplete = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
    this.renderDays();
  }

  renderDays() {
    this.days = [];
    this.task.subtasks.forEach(day => {
      if (day.completed == true) {this.days.push(day.value);}
    });
     this.daysChange.emit(this.days);
  }
}
