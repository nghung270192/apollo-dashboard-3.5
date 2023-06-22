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

import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Device} from '@shared/models/device.models';
import {PageLink} from '@shared/models/page/page-link';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  ApolloDeviceModel,
  ApolloSceneSource
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {BleNetwork} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {DeviceId} from '@shared/models/id/device-id';
import {
  ApolloEntityTypeModel,
  GatewayModel,
  NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {SceneModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';
import {CreateDeviceCommon} from '@modules/apollo/widget/smart-dashboard-v2/component/share/device/create-device-common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'tb-scene-from-apollo',
  templateUrl: './create-scene-from-apollo.component.html',
  styleUrls: ['./create-scene-from-apollo.component.scss']
})
export class CreateSceneFromApolloComponent extends CreateDeviceCommon implements OnInit, OnChanges {

  @Input() apollo: ApolloWidgetContext;
  @Input() parentNodeTree: NodeTree;
  @Input() addTrigger: boolean;
  @Output() nodesChange: EventEmitter<Array<NodeTree>> = new EventEmitter<Array<NodeTree>>();
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();

  devices: Array<Device> = [];

  deviceType: ApolloDeviceModel;
  DeviceTypeArray = Object.values(ApolloDeviceModel);
  ApolloDeviceType = ApolloDeviceModel;

  sceneSource: ApolloSceneSource = ApolloSceneSource.GROUP;
  ApolloSceneSourceArray = Object.values(ApolloSceneSource);
  ApolloSceneSource = ApolloSceneSource;

  nodeTrees: Array<NodeTree> = [];

  bleGroupSource: Array<GroupModel> = [];
  groupTarget: string;
  nodeTarget: string;

  hubNodeTrees: Array<NodeTree> = [];
  hubNodeTreeSelected: NodeTree;

  bleSceneSource: Array<SceneModel> = [];
  bleScene: Array<string> = [];

  bleNetwork: BleNetwork;
  formGroup: FormGroup;

  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
    super();
    this.formGroup = fb.group({
      sceneModel: ['', [Validators.required, Validators.maxLength(255)]],
      sceneSource: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    //console.log(this.parentNodeTree);
    this.apollo.apolloNodeTreeService.getByApolloTree(this.parentNodeTree.apolloTreeId.id,
      new PageLink(100), 'HUB', '').subscribe(
      res => {
        this.hubNodeTrees = res.data;
        this.cd.detectChanges();
      }
    );
    /*
        this.apolloGatewayAdditionalInfo
          = new ApolloGatewayAdditionalInfoImp(this.additionalInfor as ApolloGatewayAdditionalInfo);
      //todo: get device by customer
        this.apollo.ctx.deviceService.getTenantDeviceInfos(new PageLink(100), "Gateway").subscribe(res => {
          this.devices = res.data;
          //console.log(this.devices);
          this.cd.detectChanges();
          if (this.apolloGatewayAdditionalInfo.tbDeviceId != null)
            this.apollo.ctx.deviceService.getDevice(this.apolloGatewayAdditionalInfo.tbDeviceId.id).subscribe(res => {
              this.deviceSelected = res.id.id;
              this.cd.detectChanges();
              //console.log(this.deviceSelected);
            })
        })
    */

  }

  reloadSceneFromHub() {
    let hub: NodeTreeInfoBaseImpl;
    if (this.hubNodeTreeSelected && this.hubNodeTreeSelected?.additionalInfo) {
      hub = new NodeTreeInfoBaseImpl(this.hubNodeTreeSelected?.additionalInfo);
    }
    if (hub) {

      if (this.formGroup.get('sceneModel').value===ApolloDeviceModel.BLE_SIG_MESH) {

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
              this.bleGroupSource = this.bleNetwork.groups.getDetailGroups(hub.bleGroups);

              if (this.bleNetwork && this.bleNetwork.scenes && Array.isArray(this.bleNetwork.scenes.sceneArray)) {
                this.bleSceneSource = this.bleNetwork.scenes.sceneArray;
              }
            } else {
              confirm('Chưa import ble network. Vui lòng cấu hình Hub');
            }
          }
        );
      } else if (this.deviceType===ApolloDeviceModel.ZIGBEE) {

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
    if (this.bleScene && Array.isArray(this.bleScene)) {
      this.bleScene.forEach(number => {
        const sceneModel = this.bleNetwork.scenes.getSceneDetail(number);
        let sceneTarget = '';
        if (this.sceneSource===ApolloSceneSource.ALL) {
          sceneTarget = 'FFFF';
        } else if (this.sceneSource===ApolloSceneSource.GROUP) {
          sceneTarget = this.groupTarget;
        } else if (this.sceneSource===ApolloSceneSource.DEVICE) {
          sceneTarget = this.nodeTarget;
        }

        const nodeTree: NodeTree = {
          name: sceneModel.name,
          type: NodeTreeType.SCENE,
          apolloTreeId: this.parentNodeTree.apolloTreeId,
          parentId: this.parentNodeTree.id,
          additionalInfo: {
            sceneTarget,
            model: this.formGroup.get('sceneModel').value,
            hubNodeTreeId: this.hubNodeTreeSelected.id,
            entity: sceneModel
          },
          model: GatewayModel.APOLLO
        };
        this.nodeTrees.push(nodeTree);
      });
      //console.log(this.nodeTrees);
    }
  }

  loadNetwork(tbDeviceId: DeviceId) {
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
            confirm('Chưa import ble network.');
          }
        }
      );
    }
  }

  save(): void {
    this.createNodeEntity();
    if (this.nodeTrees && Array.isArray(this.nodeTrees) && this.nodeTrees.length > 0) {
      this.loading = true;
      super.createNodeTrees(this.nodeTrees, this.apollo).subscribe(res => {
        this.createEvent.emit();
        this.loading = false;
      });
    } else {
      alert('Không thành công vì danh sách ngữ cảnh trống');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange()===false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.save();
    }
  }
}
