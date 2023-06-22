import {Component, Input, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {
  NodeTree,
  NodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';

import {BleNetwork, NetworkConfigModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';

@Component({
  selector: 'tb-ble-page',
  templateUrl: './ble-page.component.html',
  styleUrls: ['./ble-page.component.scss']
})
export class BlePageComponent implements OnInit {

  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;

  constructor() {
  }

  bleNetwork: BleNetwork;

  ngOnInit(): void {
    if (this.nodeTree) {
      const gateway = new NodeTreeImpl(this.nodeTree);
      if (gateway && gateway?.additionalInfo) {
        const info: NodeTreeInfoBaseImpl
          = new NodeTreeInfoBaseImpl(gateway?.additionalInfo);
          this.apollo.ctx.attributeService.getEntityAttributes(info.tbDeviceId,AttributeScope.SHARED_SCOPE,['data_bleSigmesh']).subscribe(
            att=>{
              const data = att.find((key) => {
                if (key.key === 'data_bleSigmesh') {
                  return att;
                }
              });
              if (data) {
                this.bleNetwork = new BleNetwork(JSON.parse(data.value));
                console.log(this.bleNetwork);
              } else {
                console.log('khong tim thay ble json data ');
              }
            }
          );
      }
    }

  }

}
