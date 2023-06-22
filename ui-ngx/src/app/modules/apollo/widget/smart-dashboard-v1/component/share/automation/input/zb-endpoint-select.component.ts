import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'tb-zb-endpoint-select',
  templateUrl: './zb-endpoint-select.component.html',
  styleUrls: ['./zb-endpoint-select.component.scss']
})
export class ZbEndpointSelectComponent implements OnInit,AfterViewInit {


  array: Array<number> =[];
  @Input()maxEndPoint = 0;
  @Input()endPoint: number;
  @Output()endPointChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
     this.array = Array(Number(this.maxEndPoint)).fill(0).map((e,i)=>i+1);
    }

  ngAfterViewInit(): void {
     this.array = Array(Number(this.maxEndPoint)).fill(0).map((e,i)=>i+1);
  }

}
