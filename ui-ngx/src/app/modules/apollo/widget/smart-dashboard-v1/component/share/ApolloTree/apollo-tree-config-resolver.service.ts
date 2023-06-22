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

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {mergeMap, tap} from 'rxjs/operators';
import {AppState} from '@core/core.state';
import {ApolloEntityConfig} from '@modules/apollo/widget/smart-dashboard-v1/component/share/apollo-node-tree/apollo-entity-config';
import {MainModule} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/main.module';
import {ApolloTreeService} from '@modules/apollo/widget/smart-dashboard-v1/services/apollo-tree.service';
import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {ApolloTreeParamsToCreateNew} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-tree.model';
import {ApolloTreeComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/share/ApolloTree/apollo-tree.component';


@Injectable({
  providedIn: MainModule
})

export class ApolloTreeConfigResolver {

  config: ApolloEntityConfig<ApolloTree, ApolloTreeParamsToCreateNew, null> = new ApolloEntityConfig<ApolloTree, ApolloTreeParamsToCreateNew, null>();

  constructor(private store: Store<AppState>,
              private apolloTreeService: ApolloTreeService) {

    this.config.entityComponent = ApolloTreeComponent;
    this.config.loadEntity = id => this.apolloTreeService.getApolloTree(id.id);

    this.config.createEntities = (params, parent) => {
      const nodeTree: ApolloTree = {
        name: params.name,
        type: params.type,
        label: params.label
      };

      return this.apolloTreeService.save(nodeTree);
    };
  }


}
