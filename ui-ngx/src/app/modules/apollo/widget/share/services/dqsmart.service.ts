import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HassEntity} from 'home-assistant-js-websocket';
import {InterceptorHttpParams} from "@core/interceptors/interceptor-http-params";
import {InterceptorConfig} from "@core/interceptors/interceptor-config";

@Injectable({
  providedIn: 'root'
})
export class DqsmartService {
  constructor(
    private http: HttpClient
  ) {
  }


  public getStates(hassUrl: string, hassToken: string): Observable<Array<HassEntity>> {

    return this.http.get<any>(`/api/dqsmart/states`, {
      headers: {
        token: hassToken, baseUrl: hassUrl
      }
    });
  }

  /*
    public getState(hassUrl: string, hassToken: string, entityId: string): Observable<any> {

      return this.http.get<any>(`/api/dqsmart/states/${entityId}`, {
        headers: {
          "token": hassToken, "baseUrl": hassUrl
        }
      });
    }
  */


  public getState(hassUrl: string, hassToken: string, entityId: string): Observable<any> {
    /*
        return this.http.get<any>(`/api/dqsmart/states/${entityId}`, {
          headers: {
            "token": hassToken, "baseUrl": hassUrl
          }
        });*/

    return this.http.get<any>(`/api/dqsmart/`, {
      headers: {
        token: hassToken, baseUrl: hassUrl, api: `/api/states/${entityId}`
      }
    });
  }

  public checkApi(hassUrl: string, hassToken: string): Observable<any> {

    return this.http.get<any>(`/api/dqsmart/`, {
      headers: {
        token: hassToken, baseUrl: hassUrl, api: '/api/'
      },
      params: new InterceptorHttpParams(new InterceptorConfig(true, true, false))
    });
  }

  public callServices(hassUrl: string,
                      hassToken: string,
                      domain: string,
                      service: string,
                      serviceData: any): Observable<any> {

    /*    return this.http.post<any>(`/api/dqsmart/services/${domain}/${service}`, serviceData, {
          headers: {
            "token": hassToken, "baseUrl": hassUrl
          }
        });*/


    return this.http.post<any>(`/api/dqsmart/`, serviceData, {
      headers: {
        token: hassToken, baseUrl: hassUrl, api: `/api/services/${domain}/${service}`
      }
    });
  }


  /* public getTenantApolloTree(pageLink: PageLink,type: string = '', config?: RequestConfig): Observable<PageData<ApolloTree>>{
     return this.http.get<PageData<ApolloTree>>(`/api/tenant/tree${pageLink.toQuery()}&type=${type}`, defaultHttpOptionsFromConfig(config));
   }


   public saveApolloTree(apolloTree: ApolloTree, config?: RequestConfig): Observable<ApolloTree> {
     return this.http.post<ApolloTree>(`/api/tree/`,apolloTree, defaultHttpOptionsFromConfig(config));
   }
 */

}
