import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {DomainType} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {MatDialog} from '@angular/material/dialog';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceControllerComponent,
  EDevCallbackEvent
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Subscription} from 'rxjs';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';

@Component({
  selector: 'icon-entity',
  templateUrl: './icon-entity.component.html',
  styleUrls: ['./icon-entity.component.scss']
})
export class IconEntityComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() size: any;
  @Input() nodeTree: NodeTree;
  @Input() apollo: ApolloWidgetContext;
  @Input() isEdited = false;
  @Input() checkAll = false;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() settingEvent: EventEmitter<any> = new EventEmitter<any>();


  icon = 'unknown_device';
  color = 'black';


  name = 'Unknown';
  isProcessing = false;
  state = 'off';
  switchIsShow = false;
  switchState = false;

  selection = false;

  domain: DomainType = DomainType.unknown;
  deviceController: DeviceControllerAbstract;
  subscription: Subscription;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private elementRef: ElementRef) {
    this.callback = this.callback.bind(this);
  }

  ngOnInit(): void {
    this.name = this.nodeTree?.name;
    const classComponent = new DeviceControllerComponent();
    if (classComponent) {
      const classDevice = classComponent.getClass(this.nodeTree);
      if (classDevice) {
        this.deviceController = new classDevice(this.nodeTree, this.apollo, this.cd, this.dialog, this.callback);
      }
    }

  }

  renderSwitch(): any {

  }

  callback(data) {
    this.cd.detectChanges();
  }

  renderState(): string {

    if (this.deviceController) {
      return this.deviceController?.renderState()?.renderState;
    }
    return 'Unknown state';
  }

  renderDeviceTypeicon(): string {

    if (this.deviceController) {
      return this.deviceController?.renderDeviceTypeIcon();
    }


    return 'unknown_device';
  }

  async slideToggle($event) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.isEdited === false) {
      this.isProcessing = true;
      this.deviceController.toggle({index: 0}).subscribe(res => {
        this.isProcessing = false;
        this.cd.detectChanges();
      });
    }
  }

  entityClick(event) {
    if (this.isEdited === false) {
      this.deviceController?.entityClick();
    } else {
      this.selection = !this.selection;
    }
  }

  removeClick($event) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    this.apollo.apolloNodeTreeService.deleteApolloNodeTree(this.nodeTree.id.id).subscribe(res => {
      this.apollo.apolloService.eventTaskSubject.next(EventTask.RELOAD_ENITY);
    });
  }

  settingClick($event) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    // this.settingEvent.emit(this.iotDevice.entityId);
  }


  getIcon(): string {
    if (this.deviceController) {
      return this.deviceController?.renderIcon();
    }
    return 'unknown_device';
  }

  getState(): boolean {
    if (this.deviceController) {
      return this.deviceController?.renderState().rawState.onOffState;
    }

    return false;
  }

  getColor(): string {
    if (this.deviceController) {
      return this.deviceController?.renderState()?.rawState?.color;
    }
    return 'black';
  }

  hasToggle(): boolean {
    if (this.deviceController) {
      return this.deviceController?.hasToggle();
    }
    return false;
  }

  ngOnDestroy(): void {

    if (this.deviceController) {
      this.deviceController?.unSubscribe();
      this.subscription?.unsubscribe();
    }
  }

  ngAfterViewInit(): void {

    if (this.deviceController) {
      this.deviceController.subscribe();
    }

    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checkAll && changes.checkAll.isFirstChange() === false
      && changes.checkAll?.previousValue !== changes.checkAll?.currentValue) {
      this.selection = this.checkAll;
    }
  }
}
