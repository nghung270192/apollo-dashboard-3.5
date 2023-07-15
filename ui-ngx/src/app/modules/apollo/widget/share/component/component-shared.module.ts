import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApolloProcessingComponent} from './processing/apollo-processing.component';
import {TextInputComponent} from './input/text-input.component';
import {TbDeviceSelectionComponent} from './input/tb-device-selection.component';
import {BleNetkeySelectionInputComponent} from './input/ble-netkey-selection-input.component';
import {BleAppkeySelectionInputComponent} from './input/ble-appkey-selection-input.component';
import {BleGroupSelectionInputComponent} from './input/ble-group-selection-input.component';
import {BleNodeSelectionInputComponent} from './input/ble-node-selection-input.component';
import {GroupControlComponent} from './group-control/group-control.component';
import {RoundSliderComponent} from './group-control/round-slider.component';
import {FastLightnessControlComponent} from './group-control/fast-lightness-control.component';
import {HslControllerComponent} from './color-control/hsl-controller.component';
import {ZigbeeModelSelectionComponent} from './input/zigbee-model-selection.component';
import {BleSceneSelectionInputComponent} from './input/ble-scene-selection-input.component';
import {ZbNodeSelectionInputComponent} from './input/zb-node-selection-input.component';
import {TextNumberComponent} from './input/number-input.component';
import {ZbNodeSelectionInputWithIdComponent} from './input/zb-node-selection-input-with-id.component';
import {TextTimeComponent} from './input/time-input.component';
import {WeekendInputComponent} from './input/weekend-input.component';
import {ButtonWithProcessingComponent} from './button/button-with-processing.component';
import {HassEntitySelectionComponent} from './input/hass-entity-selection.component';
import {DqSmartEntitiesSelectionComponent} from './input/dq-smart-entities-selection.component';
import {PelabEntitiesSelectionComponent} from './input/pelab-entities-selection.component';
import {DqSmartDomainSelectionComponent} from './input/dq-smart-domain-selection.component';
import {DropdownComponent} from './input/drop-down.component';
import {HubodelSelectionComponent} from './input/hub-model-selection.component';
import {GoogleChartModule} from './google-chart/google-chart.module';
import {YearSelectorModule} from './year-selector/year-selector.module';
import {SharedModule} from '@shared/shared.module';
import {CtlControllerModule} from "@modules/apollo/widget/share/component/ctl-control/ctl-controller.module";


@NgModule({
  declarations: [HubodelSelectionComponent,
    ApolloProcessingComponent,
    TextInputComponent,
    TbDeviceSelectionComponent,
    BleNetkeySelectionInputComponent,
    BleAppkeySelectionInputComponent,
    BleGroupSelectionInputComponent,
    BleNodeSelectionInputComponent,
    GroupControlComponent,
    RoundSliderComponent,
    FastLightnessControlComponent,
    HslControllerComponent,
    ZigbeeModelSelectionComponent,
    BleSceneSelectionInputComponent,
    ZbNodeSelectionInputComponent,
    TextNumberComponent,
    ZbNodeSelectionInputWithIdComponent,
    TextTimeComponent,
    WeekendInputComponent,
    ButtonWithProcessingComponent,
    HassEntitySelectionComponent,
    DqSmartEntitiesSelectionComponent,
    DqSmartDomainSelectionComponent,
    PelabEntitiesSelectionComponent,
    DropdownComponent],
  imports: [
    CommonModule,
    GoogleChartModule,
    SharedModule,
    YearSelectorModule,
    CtlControllerModule
  ],
  exports: [
    CtlControllerModule,
    HubodelSelectionComponent,
    ApolloProcessingComponent,
    TextInputComponent,
    TbDeviceSelectionComponent,
    BleNetkeySelectionInputComponent,
    BleAppkeySelectionInputComponent,
    BleGroupSelectionInputComponent,
    BleNodeSelectionInputComponent,
    GroupControlComponent,
    HslControllerComponent,
    ZigbeeModelSelectionComponent,
    BleSceneSelectionInputComponent,
    ZbNodeSelectionInputComponent,
    TextNumberComponent,
    ZbNodeSelectionInputWithIdComponent,
    TextTimeComponent,
    WeekendInputComponent,
    ButtonWithProcessingComponent,
    HassEntitySelectionComponent,
    DqSmartEntitiesSelectionComponent,
    DqSmartDomainSelectionComponent,
    PelabEntitiesSelectionComponent,
    DropdownComponent,
    GoogleChartModule,
    YearSelectorModule
  ]
})
export class ComponentSharedModule {
}
