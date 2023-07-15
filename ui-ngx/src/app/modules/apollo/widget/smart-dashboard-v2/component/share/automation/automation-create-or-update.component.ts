import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnInit,
  SkipSelf
} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  ApolloEntityTypeModel,
  GatewayModel,
  NodeTreeType
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AutomationParamsToCreateNew} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';
import {ErrorStateMatcher} from '@angular/material/core';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  parentNodeTree: NodeTree;
  nodeTree: NodeTree;
  type: NodeTreeType;
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
  selector: 'tb-scene-create',
  templateUrl: './automation-create-or-update.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: AutomationCreateOrUpdateComponent}],
  styleUrls: ['./automation-create-or-update.component.scss'],
})
export class AutomationCreateOrUpdateComponent extends DialogComponent<AutomationCreateOrUpdateComponent, null>
  implements OnInit, ErrorStateMatcher {

  name: string;
  model: GatewayModel;
  EntityModel = GatewayModel;
  type: NodeTreeType;
  status1 = '';
  index = 0;
  configTaskId: any;
  subscribe: Observable<NodeTree>;

  autoNodeTree: NodeTree;
  automationParamsToCreateNew: AutomationParamsToCreateNew;
  defaultModel = ApolloEntityTypeModel.NodeTreeType;
  ApolloEntityTypeModel = ApolloEntityTypeModel;

  formGroup: FormGroup;
  addTrigger = false;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private fb: FormBuilder,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AutomationCreateOrUpdateComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);
    this.formGroup = this.buildForm(this.data?.nodeTree);

  }

  ngOnInit(): void {
    if (this.data?.nodeTree) {
      this.autoNodeTree = this.data?.nodeTree;

      this.model = this.autoNodeTree.model as GatewayModel;
      this.type = this.autoNodeTree.type;
    } else {
      this.type = this.data.type;
    }
  }

  buildForm(entity: NodeTree): FormGroup {

    return this.fb.group(
      {
        model: [entity ? entity.model : '', [Validators.required, Validators.maxLength(255)]],
      }
    );
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid);
    return originalErrorState || customErrorState;
  }

  createAndSave($event) {
    setTimeout(() => {
      this.dialogRef.close({data: 'create'});
    }, 100);

  }


  cancel(): void {
    this.dialogRef.close(null);
  }

}
