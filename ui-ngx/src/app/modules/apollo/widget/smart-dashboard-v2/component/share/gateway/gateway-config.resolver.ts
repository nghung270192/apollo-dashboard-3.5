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

import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
 import {ApolloEntityConfig} from '@modules/apollo/widget/smart-dashboard-v2/component/share/apollo-node-tree/apollo-entity-config';
import {ApolloNodeTreeService} from '@modules/apollo/widget/smart-dashboard-v2/services/apollo-node-tree.service';
import {MainModule} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/main.module';
 import {GatewayComponent} from './gateway.component';
import {GatewayParamsToCreateNew} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway.model';

@Injectable({
  providedIn: MainModule
})

export class GatewayConfigResolver {

  config: ApolloEntityConfig<NodeTree, GatewayParamsToCreateNew, null> = new ApolloEntityConfig<NodeTree, GatewayParamsToCreateNew, null>();

  constructor(private store: Store<AppState>,
              private apolloNodeTreeService: ApolloNodeTreeService) {
    this.config.entityComponent = GatewayComponent;

    this.config.loadEntity = id => this.apolloNodeTreeService.getApolloNodeTree(id.id);
    this.config.createEntities = (params, parent) => {
      const nodeTree: NodeTree = {
        parentId: parent.id,
        apolloTreeId: parent.apolloTreeId,
        name: params.name,
        label: params.label,
        model: params.model,
        type: NodeTreeType.GATEWAY
      };
      return this.apolloNodeTreeService.saveApolloNodeTree(nodeTree).pipe(
        tap(() => {
        }),
        mergeMap((nodeTree) => this.apolloNodeTreeService.getApolloNodeTree(nodeTree.id.id)
        ));
    };
  }

}
