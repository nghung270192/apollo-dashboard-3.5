import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {LotsAvailableContext} from '@modules/apollo/widget/lots-available-v1/lots-available-context';
import {EventCallback} from '@modules/apollo/widget/lots-available-v1/shared/models/lots-available.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  SelectLayoutAssetComponent
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/select-layout-asset/select-layout-asset.component';
import {
  LayoutAssetCfg
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/select-layout-asset/select-layout-asset.model';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {
  BleNetwork,
  NetworkConfigModel
} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {AssetId} from '@shared/models/id/asset-id';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  UploadJsonNetworkComponent
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/upload-json-network/upload-json-network.component';

@Component({
  selector: 'tb-lots-available-v1',
  templateUrl: './lots-available-v1.component.html',
  styleUrls: ['./lots-available-v1.component.scss'],
})
export class LotsAvailableV1Component implements OnInit, AfterViewInit {
  lax: LotsAvailableContext;
  layoutId = '';
  areaReport: any = {
    disconnected: 20,
    novalid: 30,
    valid: 40,
    total: 90,
  };

  bleNetwork: BleNetwork;

  @Input() ctx: WidgetContext;

  eventCallback: EventCallback = {
    openNew: this.openNew,
  };

  constructor(private cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    // super(store);

  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.lax = new LotsAvailableContext(this.ctx);
  }

  openNew(params: any) {
    console.log(params);
  }

  uploadJsonNetworkConfig() {

  }

  selectLayoutAsset() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        lax: this.lax,
        config: {
          assetLayoutId: '553c8ee0-0f4b-11ee-9603-ad08bae20e43'
        }
      }
    };
    this.dialog.open<any, any, LayoutAssetCfg>(SelectLayoutAssetComponent, dialogConfig)
      .afterClosed().subscribe(res => {
      if (res && res?.assetLayoutId) {
        this.layoutId = res.assetLayoutId;
      }
    });
  }


  uploadNetwork() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        lax: this.lax,
        config: new AssetId(this.layoutId)
      }
    };
    this.dialog.open<any, any, BleNetwork>(UploadJsonNetworkComponent, dialogConfig)
      .afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

}
