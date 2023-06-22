import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestConfig} from '@core/http/http-utils';
import {Observable, of} from 'rxjs';
import {PageLink} from '@shared/models/page/page-link';
import {PageData} from '@shared/models/page/page-data';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {AttributeService} from '@core/http/attribute.service';
import {TreeEntities} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-tree-data.model';
import {WidgetContext} from '@home/models/widget-component.models';
import {type} from 'os';
import {RootNodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {ApolloTreeId} from '@modules/apollo/widget/share/models/apollo-tree-id';

@Injectable({
  providedIn: 'root'
})
export class ApolloNodeTreeService {

  private _isChanged = false;

  private treeNode: TreeEntities = new TreeEntities([]);

  constructor(
    private ctx: WidgetContext,
    private http: HttpClient,
    private attributeService: AttributeService
  ) {
    /*    this.attributeService.getEntityAttributes(new AssetId("664355c0-d8e6-11ed-810f-819e8f02e9b8"),
          AttributeScope.SERVER_SCOPE, ["nodeTrees"]).subscribe(res => {
          console.log(new Date());
          console.log(res);
          if (res && Array.isArray(res) && res.length > 0) {
            if (res[0].value && Array.isArray(res[0].value))
              this.treeNode = new TreeEntities(res[0].value);

            /!*        const nodeTree: NodeTree = {
                      "additionalInfo": {},
                      "tenantId": null,
                      "customerId": null,
                      "apolloTreeId": {
                        "entityType": EntityType.ASSET,
                        "id": "76332290-d8e0-11ed-810f-819e8f02e9b8"
                      },
                      "parentId": null,
                      "name": "TUBE V1.4 - CA:BA:3E:E7:85:13004201807190-2600-0013-85E7-3EBACA020000",
                      "type": NodeTreeType.ROOT,
                      "model": "APOLLO",
                      "label": null
                    };

                    this.treeNode.save(nodeTree).subscribe(res => {
                      const nodeTree1: NodeTree = {
                        "additionalInfo": {},
                        "tenantId": null,
                        "customerId": null,
                        "apolloTreeId": {
                          "entityType": EntityType.ASSET,
                          "id": "76332290-d8e0-11ed-810f-819e8f02e9b8"
                        },
                        "parentId": res.id,
                        "name": "TUBE V1.4 - CA:BA:3E:E7:85:13004201807190-2600-0013-85E7-3EBACA020000",
                        "type": NodeTreeType.GATEWAY,
                        "model": "APOLLO",
                        "label": null
                      };
                      this.treeNode.save(nodeTree1).subscribe(res => {
                        console.log(res);
                      });
                    });*!/
          }
        });*/

    const data = this.ctx.widget.config.settings.treeData;
    if (data && Array.isArray(data)) {
      this.treeNode = new TreeEntities(data);
    }
  }

  getRoot(aolloNodeTreeId: string): Observable<NodeTree> {

    return new Observable<any>(observable => {
      this.getByApolloTree(null, new PageLink(10), 'ROOT', '')
        .subscribe(res => {
          const arrNodeTree: Array<NodeTree> = res.data;
          if (arrNodeTree.length) {
            observable.next(arrNodeTree[0]);
            observable.complete();
          } else {
            console.log('Root is node found. Auto create a new Root node tree');
            const root = new RootNodeTree(new ApolloTreeId(aolloNodeTreeId));
            this.saveApolloNodeTree(root).subscribe(res => {this.isChanged = false; observable.next(res);}, error => observable.error(error), () => observable.complete());
          }
        }, error => observable.error(error));
    });
  }

  public updateTreeNode(nodeTrees: Array<NodeTree>): Observable<any> {
    if (!!nodeTrees && Array.isArray(nodeTrees)) {
      this.treeNode = new TreeEntities(nodeTrees);
    } else {
      this.treeNode = new TreeEntities([]);
    }
    return of(this.treeNode);
  }

  public getApolloNodeTree(apolloNodeTreeId: string, config?: RequestConfig): Observable<NodeTree> {
    // return this.http.get<NodeTree>(`/api/node-tree/${apolloNodeTreeId}`, defaultHttpOptionsFromConfig(config));
    return this.treeNode.getNode(apolloNodeTreeId);
  }

  public getTenantApolloNodeTree(pageLink: PageLink, type: string = '', model: string = '',
                                 config?: RequestConfig): Observable<PageData<NodeTree>> {
    // return this.http.get<PageData<NodeTree>>(`/api/tenant/node-tre
    // e${pageLink.toQuery()}&type=${type}`, defaultHttpOptionsFromConfig(config));
    return this.treeNode.getAllNodesAndFilter(pageLink, type, model);
  }

  public getByApolloTree(apolloTreeId: string, pageLink: PageLink, type: string = '', model: string = '',
                         config?: RequestConfig): Observable<PageData<NodeTree>> {
    // return this.http.get<PageData<NodeTree>>(`/api/node-tree/tree/${apolloTreeId}$
    // {pageLink.toQuery()}&type=${type}&model=${model}`, defaultHttpOptionsFromConfig(config));
    return this.treeNode.getAllNodesAndFilter(pageLink, type, model);
  }

  public getChildren(apolloNodeTreeId: string, pageLink: PageLink, type: string = '',
                     config?: RequestConfig): Observable<Array<NodeTree>> {
    // return this.http.get<PageData<NodeTree>>(`/api/node-tree/device-type/${apolloNodeTreeId}${pageLink.toQuery()}
    // &type=${type}`, defaultHttpOptionsFromConfig(config));
    return this.treeNode.getChildrenOfNode(apolloNodeTreeId);
  }

  public saveApolloNodeTree(apolloTree: NodeTree, config?: RequestConfig): Observable<NodeTree> {
    // return this.http.post<NodeTree>(`/api/node-tree/`, apolloTree, defaultHttpOptionsFromConfig(config));
    this.isChanged = true;
    return this.treeNode.save(apolloTree);
  }

  /*  createNodeTrees(nodeTrees: Array<NodeTree>, apollo: ApolloWidgetContext): Observable<any> {
      let request = [];
      nodeTrees.forEach(nodeTree => {
        request.push(apollo.apolloNodeTreeService.saveApolloNodeTree(nodeTree));
      });
      return forkJoin(request);
    }*/

  /*  public saveApolloNodeTrees(nodeTrees: Array<NodeTree>, config?: RequestConfig): Observable<Array<NodeTree>> {
      let request = [];
      nodeTrees.forEach(nodeTree => {
        request.push(this.http.post<NodeTree>(`/api/node-tree/`, nodeTree, defaultHttpOptionsFromConfig(config)));
      });
      return forkJoin(request);
    }*/

  public deleteApolloNodeTree(apolloNodeTreeId: string, config?: RequestConfig): Observable<any> {
    // return this.http.delete(`/api/node-tree/${apolloNodeTreeId}`, defaultHttpOptionsFromConfig(config));
    this.isChanged = true;
    return this.treeNode.delete(apolloNodeTreeId);
  }

  public saveTreeNode() {
    this.treeNode.getAllNodesAndFilter(null, null, null).subscribe(res => {
      this.ctx.widget.config.settings.treeData = res.data;
      console.log(this.ctx.widget.config);
    });
  }


  get isChanged(): boolean {
    return this._isChanged;
  }

  set isChanged(state: boolean) {
    this._isChanged = state;
  }
}
