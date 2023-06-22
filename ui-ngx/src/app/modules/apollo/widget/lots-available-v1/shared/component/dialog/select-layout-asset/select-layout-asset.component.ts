import {AfterViewInit, ChangeDetectorRef, Component, Inject, Injectable, OnInit} from '@angular/core';
import {
  BaseDialogConfig,
  BaseDialogDirective
} from '@modules/apollo/widget/lots-available-v1/shared/models/base-dialog.directive';
import {AppState} from '@core/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {FormControl, FormGroup} from '@angular/forms';
import {AssetInfo} from '@shared/models/asset.models';
import {
  LayoutAssetCfg
} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/select-layout-asset/select-layout-asset.model';

@Component({
  selector: 'tb-select-layout-asset',
  templateUrl: './select-layout-asset.component.html',
  styleUrls: ['./select-layout-asset.component.scss']
})
export class SelectLayoutAssetComponent
  extends BaseDialogDirective<SelectLayoutAssetComponent, LayoutAssetCfg, LayoutAssetCfg>
  implements OnInit, AfterViewInit {

  formGroup: FormGroup;
  assetIdFormControl: FormControl = new FormControl<string>('option1');

  layouts: Array<AssetInfo> = [];

  constructor(public store: Store<AppState>,
              private cd: ChangeDetectorRef,
              public dialogRef: MatDialogRef<SelectLayoutAssetComponent, LayoutAssetCfg>,
              @Inject(MAT_DIALOG_DATA) public data: BaseDialogConfig<LayoutAssetCfg>) {
    super(store, dialogRef, data);

    this.formGroup = new FormGroup<any>({
      assetId: this.assetIdFormControl
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.assetIdFormControl.setValue(this.data.config?.assetLayoutId);
  }

  close() {
    this.dialogRef.close({assetLayoutId: this.formGroup.get('assetId').value});
  }

  compareInput(o1: string, o2: string) {
    return o1 === o2;
  }

  ngAfterViewInit(): void {
    this.data.lax.getLayoutAssets().subscribe(
      value => {
        console.log(value);
        this.layouts = value;
        this.cd.detectChanges();
      }
    );
  }

  addNewLayout() {

  }
}
