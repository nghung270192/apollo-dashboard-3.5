import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
 import {HubController} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {SceneModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';

@Component({
  selector: 'tb-ble-sig-mesh-tab',
  templateUrl: './ble-sig-mesh-tab.component.html',
  styleUrls: ['./ble-sig-mesh-tab.component.scss']
})
export class BleSigMeshTabComponent implements OnInit {
  columnsAnalyze: Array<string> = ['No', 'Address', 'Name', 'Model'];
  groupDatasource: Array<GroupModel> = [];
  nodeDatasource: Array<NodeModel> = [];
  sceneDatasource: Array<SceneModel> = [];
  buttons = {
    deleteNetwork: {
      name: 'false',
      loading: false
    },
    initNetwork: {
      name: 'false',
      loading: false
    },
    startPermitJoin: {
      name: 'false',
      loading: false
    },
    stopPermitJoin: {
      name: 'false',
      loading: false
    },
  };
  hubController: HubController;
  isShow = false;
  public loading = new Array(4);

  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.hubController = new HubController(this.nodeTree, this.apollo);

   /* if(this.hubController && this.hubController.hubInfo){
      if(this.hubController.hubInfo?.bleGroups && Array.isArray(this.hubController.hubInfo?.bleGroups)){
        this.groupDatasource = this.apollo.
      }
    }*/

  }

  deleteNetwork(name: string) {
    this.isShow = true;
    this.buttons[name].loading = true;
    if (confirm('Delete BLE Sig Mesh Network')) {
      this.hubController.bleResetNetwork().subscribe(res => {
        this.buttons[name].loading = false;
        this.cd.detectChanges();
      }, error => {
        this.buttons[name].loading = false;
        this.cd.detectChanges();
      });
    }
  }

/*  initNetwork(name: string) {
    this.buttons[name]['loading'] = true;
    this.hubController.zbInitNetwork().subscribe(res => {
      this.buttons[name]['loading'] = false;
      this.cd.detectChanges();
    }, error => {
      this.buttons[name]['loading'] = false;
      this.cd.detectChanges();
    });
  }*/



}
