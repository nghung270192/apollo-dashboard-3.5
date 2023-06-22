import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  SkipSelf
} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ApolloEntityTypeModel,
  GatewayModel,
  NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ApolloDeviceModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {DialogComponent} from '@shared/components/dialog.component';
import {BaseData, HasId} from '@shared/models/base-data';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {DeviceParamsToCreateNew} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  parentNodeTree: NodeTree;
}

enum State {
  'IDLE',
  'CREATE',
  'WATING',
  'ERROR',
  'DONE'
}

@Component({
  selector: 'tb-apollo-node-tree-create-or-update',
  templateUrl: './device-create-or-update.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: DeviceCreateOrUpdateComponent}],
  styleUrls: ['./device-create-or-update.component.scss']
})
export class DeviceCreateOrUpdateComponent extends DialogComponent<DeviceCreateOrUpdateComponent, BaseData<HasId>>
  implements OnInit, OnDestroy, ErrorStateMatcher {

  name: string;
  model: GatewayModel;
  EntityModel = GatewayModel;
  type: NodeTreeType;
  status1 = '';
  index = 0;
  private state = State.IDLE;
  configTaskId: any;
  subscribe: Observable<NodeTree>;
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this.fb.group({
    thirdCtrl: ['', Validators.required],
  });
  formControl = new FormControl('');
  deviceType: ApolloDeviceModel;
  DeviceTypeArray = Object.values(ApolloDeviceModel);
  ApolloDeviceType = ApolloDeviceModel;
  nodeTrees: Array<NodeTree> = [];

  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;

  formGroup: FormGroup;
  deviceParamsToCreateNew: DeviceParamsToCreateNew;

  addTrigger = false;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeviceCreateOrUpdateComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher) {
    super(store, router, dialogRef);
    this.formGroup = this.buildForm(this.deviceParamsToCreateNew);
  }

  ngOnInit(): void {
  }

  buildForm(entity: DeviceParamsToCreateNew): FormGroup {
    return this.fb.group(
      {
        model: [entity ? entity.model : '', [Validators.required, Validators.maxLength(255)]],
        deviceType: [entity ? entity.deviceType : '', [Validators.required, Validators.maxLength(255)]],
      }
    );
  }

  createAndSave($event) {
    setTimeout(() => {
      this.dialogRef.close({data: 'create'});
    }, 100);
  }


  private setState(state: State) {
    this.state = state;
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  /*private configTask() {
    switch (this.state) {
      case State.IDLE:
        this.status1 = "Đang xử lý... 0%";
        this.index = 0;
        if (this.nodeTrees && Array.isArray(this.nodeTrees) && this.nodeTrees.length > 0) {
          this.setState(State.CREATE);
        } else {
          confirm("Không tìm thấy thiết bị");
          if (this.configTaskId)
            clearInterval(this.configTaskId);
        }
        break;
      case State.CREATE:
        if (this.index < this.nodeTrees.length) {


          this.status1 = "Đang xử lý..." + Number((this.index + 1) * (100 / this.nodeTrees.length)).toString() + "%";
          this.subscribe = this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(this.nodeTrees[this.index]);
          this.setState(State.WATING);
        } else {

          this.setState(State.DONE);
        }
        break;
      case State.WATING:
        this.subscribe.subscribe(res => {
          console.log(res);
          this.index++;
          this.setState(State.CREATE);
        }, error => {

          // this.status1 = "Đã có lỗi sảy ra khi tạo node" + this.nodeTrees[this.index].additionalInfo?.name;
          this.setState(State.ERROR);
          this.status1 = error
        });
        break;
      case State.DONE:
        this.status1 = "Đã xử lý xong... 100%";
        if (this.configTaskId)
          clearInterval(this.configTaskId);
        break;
      case State.ERROR:
        if (this.configTaskId)
          clearInterval(this.configTaskId);
        break;

    }
  }*/

  /*
    startConfig($event) {
      this.status1 = "Đang tạo " + this.nodeTrees.length + " thiết bị...";
      let request = [];
      this.nodeTrees.forEach(nodeTree => {
        request.push(this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(nodeTree));
      });
      forkJoin(request).subscribe(results => {
        this.status1 = "Đã thêm " + this.nodeTrees.length + " thiết bị";

        setTimeout(() => {
          this.dialogRef.close({data: "create"});
        }, 1000);
      });

      /!*    this.state = State.IDLE;
          if (this.configTaskId)
            clearInterval(this.configTaskId);
          this.configTaskId = setInterval(this.configTask, 100);*!/
    }*/

  ngOnDestroy(): void {
    /*    if (this.configTaskId)
          clearInterval(this.configTaskId);*/
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid);
    return originalErrorState || customErrorState;
  }


}
