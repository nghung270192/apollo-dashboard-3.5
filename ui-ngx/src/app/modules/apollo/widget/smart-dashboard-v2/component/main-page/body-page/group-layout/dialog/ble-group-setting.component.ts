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
import {forkJoin, Observable} from 'rxjs';
import {GroupParamsToCreateNew} from '@modules/apollo/widget/smart-dashboard-v2/models/group/group.model';
import {DialogComponent} from '@shared/components/dialog.component';
import {BaseData, HasId} from '@shared/models/base-data';
import {ErrorStateMatcher} from '@angular/material/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  parentNodeTree: NodeTree;
  nodeTree: NodeTree;
  title: string;
}

enum State {
  'IDLE',
  'CREATE',
  'WATING',
  'ERROR',
  'DONE'
}

@Component({
  selector: 'tb-group-setting',
  templateUrl: './ble-group-setting.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: BleGroupSettingComponent}],
  styleUrls: ['./ble-group-setting.component.scss']
})
export class BleGroupSettingComponent extends DialogComponent<BleGroupSettingComponent, BaseData<HasId>>
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
  /*  firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });*/
  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;

  formGroup: FormGroup;
  groupParamsToCreateNew: GroupParamsToCreateNew;
  addTrigger = false;

  nodeTrees: Array<NodeTree> = [];

  constructor(protected store: Store<AppState>,
              protected router: Router,
              public dialogRef: MatDialogRef<BleGroupSettingComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog,
              private fb: FormBuilder,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher) {
    super(store, router, dialogRef);
    this.formGroup = this.buildForm(this.data?.nodeTree);


  }

  buildForm(entity: NodeTree): FormGroup {
    return this.fb.group(
      {
        model: [entity ? entity?.model : '', [Validators.required, Validators.maxLength(255)]],
      }
    );
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  createAndSave(nodeTree: NodeTree) {

    setTimeout(() => {
      this.dialogRef.close({data: 'update', nodeTree});
    }, 100);
  }


  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid);
    return originalErrorState || customErrorState;
  }

  ngOnDestroy(): void {
    if (this.configTaskId) {
      clearInterval(this.configTaskId);
    }
  }


}
