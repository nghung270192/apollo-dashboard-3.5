import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'apollo-group-control',
  templateUrl: './group-control.component.html',
  styleUrls: ['./group-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupControlComponent implements OnInit, AfterViewInit {


  constructor(private cd: ChangeDetectorRef) {

  }

  lightnessValue = 50;

  @Input() id: any = 'group-controller';
  @Input() width: any;
  @Input() height: any;
  @Input() size: any = 250;

  @Input() lightness: any = 0;
  @Input() state: any = 0;

  @Output() lightnessChange = new EventEmitter<number>();
  @Output() stateChange = new EventEmitter<boolean>();
  enable_fast_control = false;

  ngOnInit(): void {
    /*    if(this.rgb){
          console.log("Has RGB");
        }else{
          console.log("Has no RGB");
        }*/
  }

  eventLightnessChange(value: number) {
    this.lightness = value;
    this.lightnessChange.emit(this.lightness);
  }

  eventStateChange(value: boolean) {
    this.stateChange.emit(value);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.enable_fast_control = true;
      this.cd.detectChanges();
    }, 10);
  }

}
