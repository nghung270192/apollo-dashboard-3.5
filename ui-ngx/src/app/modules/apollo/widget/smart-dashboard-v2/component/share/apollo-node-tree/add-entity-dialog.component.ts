///
/// Copyright © 2016-2022 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import {Component, ComponentFactoryResolver, Inject, Injector, OnInit, SkipSelf, ViewChild} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
/*import { TbAnchorComponent } from '@shared/components/tb-anchor.component';
import { EntityComponent } from './entity.component';*/
import {DialogComponent} from '@shared/components/dialog.component';
import {Router} from '@angular/router';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {TbAnchorComponent} from '@shared/components/tb-anchor.component';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {ApolloEntityComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/share/apollo-node-tree/apollo-entity.component';
import {AreaParamsSource} from '@modules/apollo/widget/smart-dashboard-v2/models/area/area.model';
import {ApolloEntityConfig} from '@modules/apollo/widget/smart-dashboard-v2/component/share/apollo-node-tree/apollo-entity-config';


export interface DataViewDialog {
  apollo?: ApolloWidgetContext;
  parentNodeTree?: NodeTree;
  type?: NodeTreeType;
  curNodeTree?: NodeTree;
  title?: string;
  config?: ApolloEntityConfig<any, any, any>;
}

@Component({
  selector: 'tb-add-entity-dialog-controller',
  templateUrl: './add-entity-dialog.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: ApolloNodeTreeCreateV2}],
  styleUrls: ['./add-entity-dialog.component.scss']
})
export class ApolloNodeTreeCreateV2 extends DialogComponent<ApolloNodeTreeCreateV2, null> implements OnInit, ErrorStateMatcher {

  entityComponent: ApolloEntityComponent<NodeTree, null, null>;

  detailsForm: FormGroup;
  @ViewChild('entityDetailsForm', {static: true}) entityDetailsFormAnchor: TbAnchorComponent;
  nodeTree: any;

  entitiesTableConfig: ApolloEntityConfig<NodeTree, AreaParamsSource, null>;


  submitted = false;


  constructor(protected store: Store<AppState>,
              protected router: Router,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog,
              public dialogRef: MatDialogRef<ApolloNodeTreeCreateV2>,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher) {
    super(store, router, dialogRef);
  }

  ngOnInit(): void {
    this.entitiesTableConfig = this.data.config;

    /*        this.entitiesTableConfig = this.data.entitiesTableConfig;
           this.translations = this.entitiesTableConfig.entityTranslations;
           this.resources = this.entitiesTableConfig.entityResources;
           this.entity = {};*/
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.entitiesTableConfig.entityComponent);
    const viewContainerRef = this.entityDetailsFormAnchor.viewContainerRef;
    viewContainerRef.clear();
    const injector: Injector = Injector.create(
      {
        providers: [
          {
            provide: 'data',
            useValue: this.data
          }, {
            provide: 'entityValue',
            useValue: this.nodeTree
          }
        ],
        parent: this.injector
      }
    );
    const componentRef = viewContainerRef.createComponent(componentFactory, 0, injector);
    /**/
    this.entityComponent = componentRef.instance;
    this.entityComponent.isEdit = true;
    this.detailsForm = this.entityComponent.entityForm;


    console.log(this.detailsForm);
    console.log(this.entityComponent);

  }

  helpLinkId(): string {
    /*    if (this.resources.helpLinkIdForEntity && this.entityComponent.entityForm) {
          return this.resources.helpLinkIdForEntity(this.entityComponent.entityForm.getRawValue());
        } else {
          return this.resources.helpLinkId;
        }*/
    return '';
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid && this.submitted);
    return originalErrorState || customErrorState;
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  add(): void {
    this.submitted = true;
    if (this.detailsForm.valid) {
      this.nodeTree = {...this.entityComponent.entityFormValue()};
      this.entitiesTableConfig.createEntities(this.nodeTree, this.data.parentNodeTree).subscribe(
        (entity) => {
          this.dialogRef.close(entity);
        }
      );
    }
  }
}
