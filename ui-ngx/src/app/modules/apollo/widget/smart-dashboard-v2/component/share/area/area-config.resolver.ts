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
import {AppState} from '@core/core.state';

import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {AreaParamsSource} from '@modules/apollo/widget/smart-dashboard-v2/models/area/area.model';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {
  ApolloEntityConfig
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/apollo-node-tree/apollo-entity-config';
import {AreaComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/share/area/area.component';
import {ApolloNodeTreeService} from '@modules/apollo/widget/smart-dashboard-v2/services/apollo-node-tree.service';


@Injectable({providedIn: 'root'})

export class AreaConfigResolver {

  config: ApolloEntityConfig<NodeTree, AreaParamsSource, null> = new ApolloEntityConfig<NodeTree, AreaParamsSource, null>();

  constructor(private store: Store<AppState>,
              private apolloNodeTreeService: ApolloNodeTreeService) {

    this.config.entityComponent = AreaComponent;
    this.config.loadEntity = id => this.apolloNodeTreeService.getApolloNodeTree(id.id);
    this.config.createEntities = (params, parent) => {
      const nodeTree: NodeTree = {
        parentId: parent.id,
        apolloTreeId: parent.apolloTreeId,
        name: params.name,
        label: params.label,
        type: NodeTreeType.AREA
      };
      return this.apolloNodeTreeService.saveApolloNodeTree(nodeTree);
    };

  }


}
