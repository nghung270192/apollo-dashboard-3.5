import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {FormBuilder, Validators} from '@angular/forms';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {NetworkConfigModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/network.model';
import {NodeTreeInfoBaseImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  nodeTree: NodeTree;
}

@Component({
  selector: 'tb-gateway-setting',
  templateUrl: './gateway-setting.component.html',
  styleUrls: ['./gateway-setting.component.scss']
})
export class GatewaySettingComponent extends DialogComponent<GatewaySettingComponent, null> implements OnInit, AfterViewInit {

  apolloNodeTree: NodeTreeImpl;
  addTrigger = false;

  name: string;
  model: GatewayModel = GatewayModel.APOLLO;
  GatewayModel = GatewayModel;

  additionalInfo: NodeTreeInfoBaseImpl;


  status1 = '';
  importStatus = '';

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<GatewaySettingComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);
    this.importNetworkConfig = this.importNetworkConfig.bind(this);

  }

  ngOnInit(): void {

    this.apolloNodeTree = new NodeTreeImpl(this.data.nodeTree);

    this.name = this.apolloNodeTree.name;
    this.model = this.apolloNodeTree.model as GatewayModel;
    this.additionalInfo = new NodeTreeInfoBaseImpl(this.apolloNodeTree?.additionalInfo);
    this.cd.detectChanges();
  }

  public importNetworkConfig(networkJson) {
    if (this.additionalInfo && this.additionalInfo.tbDeviceId) {
      this.data.apollo.ctx.attributeService.saveEntityAttributes(this.additionalInfo.tbDeviceId, AttributeScope.SHARED_SCOPE,
        [{key: 'data_bleSigmesh', value: networkJson as NetworkConfigModel}]).subscribe(res => {
        this.importStatus = 'Successful';
        this.cd.detectChanges();
      }, error => this.importStatus = error);
    }
  }

  importEvent($event) {
    const input = $event.target;
    if (input.files.length > 0) {
      const reader = new FileReader();

      reader.onload = function() {
        const text = reader.result;
        this.importNetworkConfig(text);
      }.bind(this);
      reader.readAsText(input.files[0]);
    }
  }

  exportEvent() {
  }

  /*  save($event) {
      this.apolloNodeTree.name = this.name;
      this.apolloNodeTree.model = this.model;

      this.apolloNodeTree.additionalInfo = this.additionalInfo;

      this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(this.apolloNodeTree.toApolloNodeTree())
        .subscribe(res => {
          this.status1 = "Cập nhật thực thể thành công";
          this.cd.detectChanges();
        }, error => this.status1 = error);
    }*/
  close() {
    this.dialogRef.close({data: 'update'});
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  ngAfterViewInit(): void {

  }


}
