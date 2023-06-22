import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubModule} from '@modules/apollo/widget/smart-dashboard-v1/component/share/hub/hub.module';
import {GatewayModule} from '@modules/apollo/widget/smart-dashboard-v1/component/share/gateway/gateway.module';
import {AreaModule} from '@modules/apollo/widget/smart-dashboard-v1/component/share/area/area.module';

import {ApolloTreeModule} from '@modules/apollo/widget/smart-dashboard-v1/component/share/ApolloTree/apollo-tree.module';
import {ShareDialogModule} from './dialog/share-dialog.module';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    HubModule,
    GatewayModule,
    AreaModule,
    ShareDialogModule,
    ApolloTreeModule
  ],
  exports: [
    HubModule,
    AreaModule,
    GatewayModule,
    ShareDialogModule,
    ApolloTreeModule,
   ]
})
export class SmartDashboarShareModule {
}
