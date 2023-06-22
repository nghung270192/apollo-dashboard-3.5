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
import {DialogComponent} from '@shared/components/dialog.component';
import {Router} from '@angular/router';
import {TbAnchorComponent} from '@shared/components/tb-anchor.component';
import {ShareControllerDialogConfig} from './share-controller-dialog-config';


export interface DataViewShareDialog {
  dialogSetting: ShareControllerDialogConfig<any, any>;
}

@Component({
  selector: 'tb-share-controller-dialog-controller',
  templateUrl: './share-controller-dialog.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: ShareControllerDialog}],
  styleUrls: ['./share-controller-dialog.component.scss']
})
export class ShareControllerDialog extends DialogComponent<ShareControllerDialog, null> implements OnInit, ErrorStateMatcher {

  entityComponent: any;

  detailsForm: FormGroup;
  @ViewChild('entityDetailsForm', {static: true}) entityDetailsFormAnchor: TbAnchorComponent;
  nodeTree: any;

  dialogSetting: ShareControllerDialogConfig<any, any>;


  submitted = false;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              @Inject(MAT_DIALOG_DATA) public data: DataViewShareDialog,
              public dialogRef: MatDialogRef<ShareControllerDialog>,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher) {
    super(store, router, dialogRef);
  }

  ngOnInit(): void {
    this.dialogSetting = this.data.dialogSetting;
    console.log(this.data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dialogSetting.entityComponent);
    const viewContainerRef = this.entityDetailsFormAnchor.viewContainerRef;
    viewContainerRef.clear();
    const injector: Injector = Injector.create(
      {
        providers: [{
          provide: 'controller',
          useValue: this.dialogSetting.controller
        }
        ],
        parent: this.injector
      }
    );
    const componentRef = viewContainerRef.createComponent(componentFactory, 0, injector);
    /**/
    this.entityComponent = componentRef.instance;

  }

  helpLinkId(): string {
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

  }
}
