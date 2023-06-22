import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  BaseDialogConfig,
  BaseDialogDirective
} from '@modules/apollo/widget/lots-available-v1/shared/models/base-dialog.directive';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  LayoutAssetCfg
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/select-layout-asset/select-layout-asset.model';
import {FormGroup} from '@angular/forms';
import {
  SelectLayoutAssetComponent
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/select-layout-asset/select-layout-asset.component';
import {AssetId} from '@shared/models/id/asset-id';
import {
  BleNetwork,
  NetworkConfigModel
} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';

@Component({
  selector: 'tb-upload-json-network',
  templateUrl: './upload-json-network.component.html',
  styleUrls: ['./upload-json-network.component.scss']
})
export class UploadJsonNetworkComponent
  extends BaseDialogDirective<UploadJsonNetworkComponent, AssetId, BleNetwork>
  implements AfterViewInit {

  isFileValid: any = false;
  bleNetwork: BleNetwork;
  networkConfigModel: NetworkConfigModel;

  constructor(public store: Store<AppState>,
              private cd: ChangeDetectorRef,
              public dialogRef: MatDialogRef<UploadJsonNetworkComponent, BleNetwork>,
              @Inject(MAT_DIALOG_DATA) public data: BaseDialogConfig<AssetId>) {
    super(store, dialogRef, data);
  }

  close() {
    this.dialogRef.close(this.bleNetwork);
  }


  uploadJsonNetwork($event) {
    const input = $event.target;
    if (input.files.length > 0) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = reader.result as string;
        const jsonData = JSON.parse(contents);
        this.networkConfigModel = jsonData as NetworkConfigModel;
        this.bleNetwork = new BleNetwork(this.networkConfigModel);
        this.isFileValid = true;
        console.log(this.bleNetwork);
      };
      reader.readAsText(input.files[0]);
    }
  }

  saveJsonNetworkToAsset() {
    console.log(this.networkConfigModel);
    if (this.networkConfigModel) {
      this.cd.detectChanges();
      if (this.data.config) {
        this.data.lax.ctx.attributeService.saveEntityAttributes(this.data.config, AttributeScope.SHARED_SCOPE,
          [{key: 'data_bleSigmesh', value: this.networkConfigModel}])
          .subscribe(value => {
            this.close();
          }, error => alert(error));
      } else {
        alert('Không tìm thấy Asset Id');
      }
    }

  }

  ngAfterViewInit(): void {
  }
}
