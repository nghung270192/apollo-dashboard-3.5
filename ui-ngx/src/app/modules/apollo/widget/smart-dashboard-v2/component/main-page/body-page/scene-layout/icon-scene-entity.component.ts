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
import {DomainType} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {MatDialog} from '@angular/material/dialog';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {
  providerSceneNodeTreeControllerClass,
  SceneNodeTreeController
} from '@modules/apollo/widget/smart-dashboard-v2/models/scene/scene-controller.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';

@Component({
  selector: 'icon-scene-entity',
  templateUrl: './icon-scene-entity.component.html',
  styleUrls: ['./icon-scene-entity.component.scss']
})
export class IconSceneEntityComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() size: any;
  @Input() nodeTree: NodeTree;
  @Input() apollo: ApolloWidgetContext;
  @Input() isEdited = false;
  selection = false;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() settingEvent: EventEmitter<any> = new EventEmitter<any>();

  icon = 'unknown_device';
  color = 'black';


  name = 'Unknown';
  isProcessing = false;
  state = 'off';
  switchIsShow = false;
  switchState = false;
  nodeTreeImpl: NodeTreeImpl;

  domain: DomainType = DomainType.unknown;
  deviceNode: SceneNodeTreeController;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nodeTreeImpl = new NodeTreeImpl(this.nodeTree);
    this.name = this.nodeTreeImpl.name;
    let classProvider: string;
    if (this.nodeTreeImpl.model===GatewayModel.APOLLO) {
      classProvider = GatewayModel.APOLLO + '_' + this.nodeTreeImpl?.additionalInfo?.model;
    } else {
      classProvider = this.nodeTreeImpl.model;
    }
    const classDevice = providerSceneNodeTreeControllerClass[classProvider];
    if (classDevice) {
      this.deviceNode = new classDevice(this.nodeTree, this.apollo, this.cd, this.dialog);
    }

  }

  renderSwitch(): any {

  }

  renderState(): string {
    return '';
  }

  async slideTogle($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.isProcessing = true;
  }

  entityClick($event) {

    $event.stopPropagation();
    $event.preventDefault();
    if (this.isEdited===false) {
      this.isProcessing = true;
      if (this.deviceNode)
        {this.deviceNode.call().subscribe(res => {
          this.isProcessing = false;
          this.cd.detectChanges();
        });}
    } else {
      this.selection = !this.selection;
    }
  }

  removeClick($event, selection: boolean) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    if (selection)
      {this.apollo.apolloNodeTreeService.deleteApolloNodeTree(this.nodeTreeImpl.id.id).subscribe(res => {
        this.apollo.apolloService.eventTaskSubject.next(EventTask.RELOAD_ENITY);
      });}
  }

  settingClick($event) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    /*    this.deviceNode?.unSubscribe();
        this.ngOnInit();
        this.ngAfterViewInit();
        this.cd.detectChanges();*/
  }

  getIcon(): string {
    return 'iot-scene';
  }

  getState(): boolean {
    return false;
  }

  getColor(): string {
    return 'green';
  }

  hasToggle(): boolean {
    return false;
  }


  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

}
