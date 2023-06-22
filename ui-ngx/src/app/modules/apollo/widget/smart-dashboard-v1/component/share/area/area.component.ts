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

import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntityType} from '@shared/models/entity-type.models';
import {NULL_UUID} from '@shared/models/id/has-uuid';
import {ActionNotificationShow} from '@core/notification/notification.actions';
import {TranslateService} from '@ngx-translate/core';
import {DataViewDialog} from '@modules/apollo/widget/smart-dashboard-v1/component/share/apollo-node-tree/add-entity-dialog.component';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloEntityComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/share/apollo-node-tree/apollo-entity.component';
import {AreaParamsSource} from '@modules/apollo/widget/smart-dashboard-v1/models/area/area.model';

@Component({
  selector: 'tb-asset',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent extends ApolloEntityComponent<AreaParamsSource, null, null> {

  entityType = EntityType;


  constructor(protected store: Store<AppState>,
              protected translate: TranslateService,
              @Inject('entityValue') protected entityValue: AreaParamsSource,
              public fb: FormBuilder,
              protected cd: ChangeDetectorRef) {
    super(store, fb, entityValue, cd);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  buildForm(entity: AreaParamsSource): FormGroup {
    return this.fb.group(
      {
        name: [entity ? entity.name : '', [Validators.required, Validators.maxLength(255)]],
        label: [entity ? entity.label : '', Validators.maxLength(255)],
      }
    );
  }

  updateForm(entity: NodeTree) {
    this.entityForm.patchValue({name: entity.name});
    this.entityForm.patchValue({label: entity.label});
  }


  onAssetIdCopied($event) {
    this.store.dispatch(new ActionNotificationShow(
      {
        message: this.translate.instant('asset.idCopiedMessage'),
        type: 'success',
        duration: 750,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      }));
  }
}
