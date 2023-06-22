import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  ApolloDeviceModel,
  ApolloSceneSource
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {DeviceId} from '@shared/models/id/device-id';
import {
  ApolloEntityTypeModel,
  GatewayModel,
  NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {CreateDeviceCommon} from '@modules/apollo/widget/smart-dashboard-v1/component/share/device/create-device-common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'tb-group-from-apollo',
  templateUrl: './create-group-from-apollo.component.html',
  styleUrls: ['./create-group-from-apollo.component.scss']
})
export class CreateGroupFromApolloComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  @Input() apollo: ApolloWidgetContext;
  @Input() addTrigger: boolean;
  @Input() parentNodeTree: NodeTree;
  @Output() nodesChange: EventEmitter<Array<NodeTree>> = new EventEmitter<Array<NodeTree>>();
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  nodeTrees: Array<NodeTree> = [];

  devices: Array<Device> = [];

  deviceType: ApolloDeviceModel;
  DeviceTypeArray = Object.values(ApolloDeviceModel);
  ApolloDeviceType = ApolloDeviceModel;

  sceneSource: ApolloSceneSource;
  ApolloSceneSourceArray = Object.values(ApolloSceneSource);
  ApolloSceneSource = ApolloSceneSource;


  bleGroupSource: Array<GroupModel> = [];
  groupTarget: Array<string> = [];

  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeSelected: NodeTree;

  name = 'New Group';

  /*
    bleSceneSource: Array<SceneModel> = [];
    bleScene: Array<string> = [];
  */

  bleNetwork: BleNetwork;
  formGroup: FormGroup;

  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
    super();
    this.formGroup = fb.group({
      groupModel: ['', [Validators.required, Validators.maxLength(255)]],
      multiple: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id,
      new PageLink(100), 'HUB', '').subscribe(
      res => {
        this.hubNodeTrees = res.data;
        this.cd.detectChanges();
      }
    );
  }

  reloadSceneFromHub() {
    console.log('here');
    let hub: NodeTreeInfoBaseImpl;
    if (this.hubNodeTreeSelected && this.hubNodeTreeSelected?.additionalInfo) {
      hub = new NodeTreeInfoBaseImpl(this.hubNodeTreeSelected?.additionalInfo);
    }
    if (hub) {
      switch (this.formGroup.get('groupModel').value) {
        case ApolloDeviceModel.BLE_SIG_MESH:
          this.apollo.ctx.attributeService.getEntityAttributes(hub.tbDeviceId,
            AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
            att => {
              const data = att.find((key) => {
                if (key.key === 'data_bleSigmesh') {
                  return att;
                }
              });
              if (data) {
                this.bleNetwork = new BleNetwork(JSON.parse(data.value));
                if (hub.bleGroups && Array.isArray(hub.bleGroups))
                  {this.bleGroupSource = this.bleNetwork.groups.getDetailGroups(hub.bleGroups);}
                /*
                              if (this.bleNetwork && this.bleNetwork.scenes && Array.isArray(this.bleNetwork.scenes.sceneArray)) {
                                this.bleSceneSource = this.bleNetwork.scenes.sceneArray;
                              }*/
              } else {
                alert('Chưa import ble network. Vui lòng cấu hình Hub');
              }
            }
          );
          break;
        case ApolloDeviceModel.ZIGBEE:
          break;
      }

    }
  }/*
  loadNodeFromGroupSelected() {
    this.bleNodeSource = this.bleNetwork.groups.getNodesDetailFromGroups(this.bleGroup, this.bleNetwork.nodes.nodeArray);
    this.bleNodes  = this.bleNetwork.groups.getNodesFromGroups(this.bleGroup, this.bleNetwork.nodes.nodeArray);
    //console.log(this.bleNodeSource, this.bleNodes);
  }
*/

  /*  loadNodeFromGroupSelected() {
      this.bleNodeSource = this.bleNetwork.groups.getNodesDetailFromGroups(this.bleGroup, this.bleNetwork.nodes.nodeArray);
      this.bleNodes  = this.bleNetwork.groups.getNodesFromGroups(this.bleGroup, this.bleNetwork.nodes.nodeArray);
      //console.log(this.bleNodeSource, this.bleNodes);
    }*/

  createNodeEntity() {
    this.nodeTrees = [];
    if (this.groupTarget && Array.isArray(this.groupTarget) && this.groupTarget.length > 0) {
      const groups = this.bleNetwork.groups.getDetailGroups(this.groupTarget);
      if (groups && Array.isArray(groups) && groups.length > 0) {
        if (this.formGroup.get('multiple').value) {
          const nodeTree: NodeTree = {
            name: this.name,
            type: NodeTreeType.GROUP,
            apolloTreeId: this.parentNodeTree.apolloTreeId,
            parentId: this.parentNodeTree.id,
            additionalInfo: {
              multiple: this.formGroup.get('multiple').value,
              model: this.formGroup.get('groupModel').value,
              hubNodeTreeId: this.hubNodeTreeSelected.id,
              entity: this.groupTarget
            },
            model: GatewayModel.APOLLO
          };
          this.nodeTrees.push(nodeTree);
        } else {
          this.nodeTrees = groups.map(group => ({
                name: group.name,
                type: NodeTreeType.GROUP,
                apolloTreeId: this.parentNodeTree.apolloTreeId,
                parentId: this.parentNodeTree.id,
                additionalInfo: {
                  model: this.formGroup.get('groupModel').value,
                  hubNodeTreeId: this.hubNodeTreeSelected.id,
                  entity: group
                },
                model: GatewayModel.APOLLO
              })
          );
          /*        }
                  groups.forEach(group => {
                    let nodeTree: NodeTree = {
                      name: group.name,
                      type: NodeTreeType.GROUP,
                      apolloTreeId: this.parentNodeTree.apolloTreeId,
                      parentId: this.parentNodeTree.id,
                      additionalInfo: {
                        multiple: this.multiple,
                        model: this.formGroup.get('groupModel').value,
                        hubNodeTreeId: this.hubNodeTreeSelected.id,
                        entity: group
                      },
                      model: GatewayModel.APOLLO
                    };
                    // this.nodeTrees.push(nodeTree);
                  });*/
        }
      }
      //console.log(this.nodes);
    }
  }


  returnData() {
    /*    if (this.deviceSelected != null)
          this.apolloGatewayAdditionalInfo.tbDeviceId = new DeviceId(this.deviceSelected);
        this.additionalInforChange.emit(this.apolloGatewayAdditionalInfo.toData());*/
  }

  loadNetwork(tbDeviceId:
                DeviceId
  ) {
    if (tbDeviceId) {
      this.apollo.ctx.attributeService.getEntityAttributes(tbDeviceId,
        AttributeScope.SHARED_SCOPE, ['data_bleSigmesh']).subscribe(
        att => {
          const data = att.find((key) => {
            if (key.key === 'data_bleSigmesh') {
              return att;
            }
          });
          if (data) {
            this.bleNetwork = new BleNetwork(JSON.parse(data.value));

          } else {
            alert('Chưa import ble network.');
          }
        }
      );
    }
  }

  save():
    void {
    this.createNodeEntity();
    if (this.nodeTrees && Array.isArray(this.nodeTrees) && this.nodeTrees.length > 0) {
      this.loading = true;
      super.createNodeTrees(this.nodeTrees, this.apollo).subscribe(res => {
        this.createEvent.emit();
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách nhóm trống');
    }
  }

  ngOnChanges(changes:
                SimpleChanges
  ):
    void {
    if (changes
      .addTrigger && changes.addTrigger.isFirstChange() == false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue
    ) {
      this.save();
    }
  }
}
