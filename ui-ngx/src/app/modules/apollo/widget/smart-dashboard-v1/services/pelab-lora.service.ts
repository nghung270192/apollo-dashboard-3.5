import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import {defaultHttpOptionsFromConfig, RequestConfig} from '@core/http/http-utils';
import {Observable} from 'rxjs';
 import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {PageLink} from '@shared/models/page/page-link';
import {PageData} from '@shared/models/page/page-data';
import {DeviceInfo} from '@shared/models/device.models';

@Injectable({
  providedIn: 'root'
})
export class PelabLoraService{
  constructor(
    private http: HttpClient

  ) { }
/*
  public getApolloTree(apolloTreeId: string, config?: RequestConfig): Observable<ApolloTree> {
    return this.http.get<ApolloTree>(`/api/tree/${apolloTreeId}`, defaultHttpOptionsFromConfig(config));
  }


  public getTenantApolloTree(pageLink: PageLink,type: string = '', config?: RequestConfig): Observable<PageData<ApolloTree>>{
    return this.http.get<PageData<ApolloTree>>(`/api/tenant/tree${pageLink.toQuery()}&type=${type}`, defaultHttpOptionsFromConfig(config));
  }


  public saveApolloTree(apolloTree: ApolloTree, config?: RequestConfig): Observable<ApolloTree> {
    return this.http.post<ApolloTree>(`/api/tree/`,apolloTree, defaultHttpOptionsFromConfig(config));
  }*/

}
