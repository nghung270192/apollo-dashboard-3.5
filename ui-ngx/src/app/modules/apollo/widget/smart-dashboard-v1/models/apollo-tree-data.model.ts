import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {Observable, of} from 'rxjs';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree-id';
import {guid} from '@core/utils';
import {PageData} from '@shared/models/page/page-data';
import {PageLink, sortItems} from '@shared/models/page/page-link';
import {map} from 'rxjs/operators';
import {Direction} from '@shared/models/page/sort-order';
import {NodeTreeTypeLabelMapping} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';


export class TreeEntities {
  nodeTrees: Map<string, NodeTree> = new Map<string, NodeTree>([]);

  constructor(entities?: Array<NodeTree>) {

    this.nodeTrees = entities.reduce((mapTemp, item) => {
      mapTemp.set(item.id.id, item);
      return mapTemp;
    }, new Map<string, NodeTree>());
  }

  /**
   *
   * @param nodeTree
   */
  save(nodeTree: NodeTree): Observable<NodeTree> {
    if (!nodeTree?.id) {
      nodeTree.id = new ApolloNodeTreeId(guid());
      nodeTree.createdTime = new Date().getTime();
    }
    if (nodeTree?.parentId) {
      const parent = this.nodeTrees.get(nodeTree.parentId.id);

      if (parent && parent.path) {
        nodeTree.path = parent.path + nodeTree.id.id;
      }
    } else {
      nodeTree.path = nodeTree.id.id;
    }

    this.nodeTrees.set(nodeTree.id.id, nodeTree);

    return of(nodeTree);
  }

  delete(nodeTreeId: string) {
    const nodeTree = this.nodeTrees.get(nodeTreeId);
    if (nodeTree && nodeTree.path) {
      this.nodeTrees.forEach((node, key) => {
        if (node && node.path.includes(nodeTree.path)) {
          this.nodeTrees.delete(key);
        }
      });
    }
    return of(nodeTree);
  }

  getNode(nodeTreeId: string): Observable<NodeTree> {
    return of(this.nodeTrees.get(nodeTreeId));
  }

  getAllNodesAndFilter(pageLink: PageLink, type: string = '', model: string = ''): Observable<PageData<NodeTree>> {
    let dataFilter = [...this.nodeTrees.values()];

    if (type) {
      dataFilter = dataFilter
        .filter(node => type && node.type === type);
    }
    if (model) {
      dataFilter = dataFilter
        .filter(node => model && node.model === model);
    }
    if (pageLink) {

      if (pageLink?.textSearch) {
        dataFilter = dataFilter.filter(value =>
          value.type?.toLowerCase()?.indexOf(pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          NodeTreeTypeLabelMapping[value.type]?.toLowerCase()?.indexOf(pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          value.name?.toLowerCase()?.indexOf(pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          value.model?.toLowerCase()?.indexOf(pageLink.textSearch?.trim()?.toLowerCase()) > -1 ||
          value.label?.toLowerCase()?.indexOf(pageLink.textSearch?.trim()?.toLowerCase()) > -1
        );
      }
      if (pageLink?.sortOrder) {
        dataFilter = dataFilter.sort((a, b) => sortItems(a, b, pageLink?.sortOrder.property, pageLink?.sortOrder.direction == Direction.ASC));
      }

      const dataPerPage = dataFilter.slice((pageLink.page) * pageLink.pageSize, (pageLink.page + 1) * pageLink.pageSize);
      const nPage = Math.ceil(dataFilter.length / pageLink.pageSize);


      const page: PageData<NodeTree> = {
        data: dataPerPage,
        totalElements: dataFilter.length,
        hasNext: pageLink.page < nPage,
        totalPages: nPage
      };
      return of(page);
    } else {
      const page: PageData<NodeTree> = {
        data: dataFilter,
        totalElements: dataFilter.length,
        hasNext: false,
        totalPages: 1
      };
      return of(page);
    }
  }

  getChildrenOfNode(nodeTreeId: string): Observable<Array<NodeTree>> {
    /*    const data = [...this.nodeTrees.values()].filter(node => node.parentId?.id === nodeTreeId);


        const page: PageData<NodeTree> = {
          data: data,
          hasNext: false,
          totalElements: data.length,
          totalPages: 1

        };
        return of(page);*/

    return of([...this.nodeTrees.values()]).pipe(
      map(nodes => nodes.filter(node => node.parentId?.id === nodeTreeId)));
  }


  /*

    private flatten(device-type: Array<NodeTree>): Array<NodeTree> {
      return [].concat(device-type.map(x => ({...x})), device-type.map(x => this.flatten(x.device-type || []))).flat(1);
    }

    private searchTree(node: NodeTree, id: string): NodeTree {
      let result = null;
      if (node.id.id === id) {
        result = node;
        return result;
      } else if (Array.isArray(node.device-type) && node.device-type.length > 0) {
        for (let i = 0; i < node.device-type.length; i++) {
          let res = this.searchTree(node.device-type[i], id);
          if (res != null) {
            return res;
          }
        }
      }
      return null;
    }

    private findPadth(id: string, path: Array<string> = []) {
      let node = this.getEntity(id);
      if (node.type === NodeTreeType.ROOT) {
        path.push(node.name);
        return path;
      } else {
        path.push(node.name);
        return this.findPadth(node.parentId.id, path);
      }
    }

    private deleteNode(topNode: NodeTree, id: string) {
      if (topNode.device-type != null) {
        let i;
        for (i = 0; i < topNode.device-type.length; i++) {
          if (topNode.device-type[i].id.id === id) {
            topNode.device-type.splice(i, 1);
            return;
          } else this.deleteNode(topNode.device-type[i], id);
        }
      } else return;
    }

    private updateNode(topNode: NodeTree, updatedData: NodeTree) {

      const deleteNode = (topNode: NodeTree, id: string) => {
        if (topNode.device-type != null) {
          let i;
          for (i = 0; i < topNode.device-type.length; i++) {
            if (topNode.device-type[i].id.id === id) {
              topNode.device-type.splice(i, 1);
              return;
            } else this.deleteNode(topNode.device-type[i], id);
          }
        } else return;
      }

    }

    getFlatten() {
      return this.flatten([this.entities]);
    }

    resetTree() {
      // this.entities = rootEntity;
    }

    getEntity(id: string): NodeTree {
      return this.searchTree(this.entities, id);
    }

    getNodeTree(id: string): Observable<NodeTree> {
      return of(this.getFlatten().find(res => res.id.id === id));
    }

    updateEntity(entity: NodeTree) {
      const updateNode = (topNode: NodeTree, updateEntity: NodeTree) => {
        if (topNode.device-type != null) {
          let i;
          for (i = 0; i < topNode.device-type.length; i++) {
            if (topNode.device-type[i].id.id === updateEntity.id.id) {
              topNode.device-type[i] = updateEntity;
              return;
            } else updateNode(topNode.device-type[i], updateEntity);
          }
        } else return;
      };

      updateNode(this.entities, entity);
    }

    getParentEntity(id: string): NodeTree {
      let node = this.getEntity(id);
      if (!!node) {
        return this.getEntity(node.parentId.id);
      } else return null;
    }

    getRootEntity(): NodeTree {
      return this.entities;
    }

    create(parent: string, node: NodeTree): boolean {
      const addDataToId = (node: NodeTree, id: string, device-type: NodeTree) => {
        if (node.id.id === id) {
          node.device-type = [...(node.device-type || []), device-type];
          return true;
        } else if (Array.isArray(node.device-type) && node.device-type.length > 0) {
          for (let i = 0; i < node.device-type.length; i++) {
            let res = addDataToId(node.device-type[i], id, device-type);
            if (res) return true;
          }
        }
        return false;

      };
      return addDataToId(this.entities, parent, node);
    }

    getPathEntity(id: string): string {
      let path = this.findPadth(id, []);

      let pathString = "Không xác định";

      if (Array.isArray(path)) {
        pathString = "";
        path = path.reverse() as Array<string>;
        for (let i of path) {
          pathString += i + "/";
        }
      }
      return pathString;
    }

    removeEntity(id: string) {
      this.deleteNode(this.entities, id);
    }

    printTree() {
      console.log(this.entities);
    }
  */

}
