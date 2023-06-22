import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectLayoutAssetComponent} from './select-layout-asset/select-layout-asset.component';
import {SharedModule} from '@shared/shared.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/toolbar-shared/toolbar-shared.module';
import { UploadJsonNetworkComponent } from './upload-json-network/upload-json-network.component';


@NgModule({
  declarations: [
    SelectLayoutAssetComponent,
    UploadJsonNetworkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolbarSharedModule
  ],
  exports: [
    SelectLayoutAssetComponent,
    ToolbarSharedModule
  ]
})
export class DialogModule {
}
