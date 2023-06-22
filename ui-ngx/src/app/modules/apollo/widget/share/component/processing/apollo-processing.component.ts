import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'apollo-processing',
  templateUrl: './apollo-processing.component.html',
  styleUrls: ['./apollo-processing.component.scss']
})
export class ApolloProcessingComponent implements OnInit {
  @Input()size: any;
  @Input()show = false;
  constructor() { }

  ngOnInit(): void {
  }

}
