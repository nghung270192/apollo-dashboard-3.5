import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/hub/hub.module';
import {GatewayModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/gateway/gateway.module';
import {AreaModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/area/area.module';

import {
  ApolloTreeModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/ApolloTree/apollo-tree.module';
import {ShareDialogModule} from './dialog/share-dialog.module';
import {EditEntityComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/share/edit-entity.component';
import {SceneModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/scene/scene.module';
import {LoadZbDevFromHubComponent} from './load-zb-dev-from-hub.component';
import {SharedModule} from '@shared/shared.module';
import {GroupModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/group/group.module';
import {AutomationModule} from "@modules/apollo/widget/smart-dashboard-v2/component/share/automation/automation.module";


@NgModule({
  declarations: [
    EditEntityComponent,
    LoadZbDevFromHubComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    HubModule,
    GatewayModule,
    AreaModule,
    ShareDialogModule,
    ApolloTreeModule,
    SceneModule,
    GroupModule,
    AutomationModule
  ],
  exports: [
    HubModule,
    AreaModule,
    GatewayModule,
    ShareDialogModule,
    SceneModule,
    ApolloTreeModule,
    EditEntityComponent,
    LoadZbDevFromHubComponent,
    GroupModule
  ]
})
export class SmartDashboarShareModule {
}
