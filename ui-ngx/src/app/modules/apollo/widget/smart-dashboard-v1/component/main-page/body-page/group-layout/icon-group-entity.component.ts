import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {DomainType} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/home-assistant.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';

import {
  GroupController,
  providerGroupNodeTreeControllerClass
} from '@modules/apollo/widget/smart-dashboard-v1/models/group/group-controller.model';
import {Subscription} from 'rxjs';
import {
  BleGroupSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/group-layout/dialog/ble-group-setting.component';

@Component({
  selector: 'icon-group-entity',
  templateUrl: './icon-group-entity.component.html',
  styleUrls: ['./icon-group-entity.component.scss']
})
export class IconGroupEntityComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() size: any = 100;
  @Input() nodeTree: NodeTree;
  @Input() apollo: ApolloWidgetContext;
  @Input() isEdited = false;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() settingEvent: EventEmitter<any> = new EventEmitter<any>();

  icon = 'unknown_device';
  color = 'black';


  name = 'Unknown';
  isProcessing = false;
  switchIsShow = false;
  switchState = false;
  nodeTreeImpl: NodeTreeImpl;

  isOn = false;
  state = false;
  subscription: Subscription;
  selection = false;

  domain: DomainType = DomainType.unknown;
  groupController: GroupController;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nodeTreeImpl = new NodeTreeImpl(this.nodeTree);
    let classProvider: string;
    if (this.nodeTreeImpl.model === GatewayModel.APOLLO) {
      classProvider = GatewayModel.APOLLO + '_' + this.nodeTreeImpl?.additionalInfo?.model;
    } else {
      classProvider = this.nodeTreeImpl.model;
    }
    const classDevice = providerGroupNodeTreeControllerClass[classProvider];
    this.groupController = new classDevice(this.nodeTree, this.apollo, this.cd, this.dialog);
    this.name = this.nodeTreeImpl.name;
    this.cd.detectChanges();
  }

  renderSwitch(): any {

  }

  renderState(): string {
    return '';
  }

  renderName(): string {
    if (this.groupController) {
      return this.groupController?.renderName();
    }
    return 'Unknown';
  }

  async slideToggle($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.isProcessing = true;
    this.groupController.setState(!this.state).subscribe(
      res => {
        console.log(res);
        this.state = !this.state;
        this.isOn = this.state;
        this.isProcessing = false;
        this.cd.detectChanges();
      });
  }

  async setState($event, state: boolean) {
    $event.stopPropagation();
    $event.preventDefault();
    this.isProcessing = true;
    this.groupController.setState(state).subscribe(
      res => {
        this.state = state;
        this.isOn = this.state;
        this.isProcessing = false;
        this.cd.detectChanges();
      });
  }

  entityClick($event) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    if (this.isEdited) {
      this.selection = !this.selection;
    } else {
      this.groupController.openDialogController();
    }
  }

  settingClick($event) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        apollo: this.apollo,
        parentNodeTree: null,
        nodeTree: this.nodeTree,
        type: ''
      }
    };
    this.dialog.open(BleGroupSettingComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data === 'update' && res?.nodeTree) {
        this.nodeTree = res?.nodeTree;
        this.ngOnInit();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*    if (changes
          ['nodeTree'] && changes['nodeTree'].isFirstChange() == false
          && changes['nodeTree']?.previousValue != changes['nodeTree']?.currentValue
        ) {
          this.ngOnInit();
        }*/

  }


  getIcon(): string {
    return 'iot-group-light';
  }

  getState(): boolean {
    return false;
  }

  getColor(): string {
    return this.state ? 'red' : 'black';
  }

  hasToggle(): boolean {
    return true;
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
  }

}
