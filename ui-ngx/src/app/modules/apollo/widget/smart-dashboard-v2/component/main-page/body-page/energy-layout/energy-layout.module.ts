import {NgModule, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnergyLayoutComponent} from './energy-layout.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  BleSigmeshModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/ble-sigmesh.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';
import {
  DeviceLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/device-layout.module';
import {
  MonthSelectorComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/month-selector.component';
import {ChartModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/chart/chart.module';
import {
  PriceConfigComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/price-config.component';

@NgModule({
  declarations: [
    EnergyLayoutComponent,
    MonthSelectorComponent,
    PriceConfigComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    BleSigmeshModule,
    ToolbarSharedModule,
    DeviceLayoutModule,
    ChartModule
  ],
  exports: [
    EnergyLayoutComponent
  ],
})
export class EnergyLayoutModule {
}
