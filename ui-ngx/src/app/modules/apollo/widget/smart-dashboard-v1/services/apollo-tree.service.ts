import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestConfig} from '@core/http/http-utils';
import {Observable, of} from 'rxjs';
import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {PageLink} from '@shared/models/page/page-link';
import {PageData} from '@shared/models/page/page-data';
import {AssetService} from '@core/http/asset.service';
import {AttributeService} from '@core/http/attribute.service';
import {AssetId} from '@shared/models/id/asset-id';
import {AttributeScope} from '@shared/models/telemetry/telemetry.models';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';

@Injectable({
  providedIn: 'root'
})
export class ApolloTreeService {
  constructor(
    private http: HttpClient,
    private assetService: AssetService,
    private attributeService: AttributeService
  ) {
  }

  public getApolloTree(apolloTreeId: string, config?: RequestConfig): Observable<ApolloTree> {
    return this.assetService.getAsset(apolloTreeId);
    // return this.http.get<ApolloTree>(`/api/tree/${apolloTreeId}`, defaultHttpOptionsFromConfig(config));
  }

  public getDatabaseApolloTree(apolloTreeId: string): Observable<Array<NodeTree>> {
    return new Observable<any>(subscriber => {
      this.attributeService.getEntityAttributes(new AssetId(apolloTreeId), AttributeScope.SERVER_SCOPE, ['nodeTrees'])
        .subscribe(value => {
            if (value && Array.isArray(value) && value.length > 0 && value[0].value) {
              if (typeof (value[0].value) === 'string')
                {subscriber.next(JSON.parse(value[0].value));}
              else if (typeof (value[0].value) === 'object')
                {subscriber.next((value[0].value));}
            } else {
              subscriber.next(null);
            }
          }
        );
    });
  }

  public saveDatabaseApolloTree(apolloTreeId: string, nodeTrees: Array<NodeTree>): Observable<any> {
    return this.attributeService.saveEntityAttributes(new AssetId(apolloTreeId), AttributeScope.SERVER_SCOPE, [{
      key: 'nodeTrees',
      value: nodeTrees
    }]);
  }

  public getTenantApolloTree(pageLink: PageLink, type: string = 'LAYOUT', config?: RequestConfig): Observable<PageData<ApolloTree>> {
    // return this.http.get<PageData<ApolloTree>>(`/api/tenant/tree${pageLink.toQuery()}&type=${type}`, defaultHttpOptionsFromConfig(config));

    this.assetService.getAssetTypes().subscribe(res => console.log(res));
    return this.assetService.getTenantAssetInfos(pageLink, type, config);
  }


  public save(apolloTree: ApolloTree, config?: RequestConfig): Observable<ApolloTree> {
    return this.assetService.saveAsset(apolloTree);
    // return this.http.post<ApolloTree>(`/api/tree/`,apolloTree, defaultHttpOptionsFromConfig(config));
  }

  public deleteApolloTree(apolloTreeId: string, config?: RequestConfig): Observable<any> {
    return this.assetService.deleteAsset(apolloTreeId, config);
    // return this.http.delete<ApolloTree>(`/api/tree/${apolloTreeId}`, defaultHttpOptionsFromConfig(config));
  }
}
