import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin,  Observable} from 'rxjs';
import {
  PelabAutoControl,
  PelabEntity,
  PelabLogin,
  PelabLoginResult,
  PelabManualControl
} from '@modules/apollo/widget/share/models/pelab/pelab.model';

@Injectable({
  providedIn: 'root'
})
export class PelabService {
  constructor(
    private http: HttpClient
  ) {
  }


  public login(baseUrl: string,
               apiKey: string,
               login: PelabLogin): Observable<PelabLoginResult> {

    return this.http.post<PelabLoginResult>(`/api/pelab/login`, login, {
      headers: {
        apiKey,
        baseUrl
      }
    });
  }

  public getDevice(baseUrl: string,
                   apiKey: string,
                   DeviceId: string,
                   Token: string): Observable<PelabEntity> {
    console.log(baseUrl, apiKey, DeviceId, Token);
    return this.http.post<PelabEntity>(`/api/pelab/deviceinfor`, {
      DeviceId, Token
    }, {
      headers: {
        apiKey,
        baseUrl
      }
    });
  }

  public getDevices(baseUrl: string,
                    apiKey: string,
                    DeviceIds: Array<string>,
                    Token: string): Observable<Array<PelabEntity>> {
    const tasks: Observable<PelabEntity>[] = [];
    if (DeviceIds && Array.isArray(DeviceIds)) {
      DeviceIds.forEach(id => {
        const req = this.http.post<PelabEntity>(`/api/pelab/deviceinfor`, {
          DeviceId: id, Token
        }, {
          headers: {
            apiKey,
            baseUrl
          }
        });
        tasks.push(req);
      });
      return forkJoin(tasks);
    }
    return undefined;
  }

  public loginAndGetDevices(baseUrl: string,
                            apiKey: string, login: PelabLogin): Observable<Array<PelabEntity>> {
    return new Observable<Array<PelabEntity>>(observable => {
      this.login(baseUrl, apiKey, login).subscribe(res => {
        this.getDevices(baseUrl, apiKey, res.devices, res.token).subscribe(res => {
          observable.next(res);
        });
      });
    });
  }

  public manualControl(baseUrl: string,
                       apiKey: string, data: PelabManualControl): Observable<any> {
    return this.http.post<any>(`/api/pelab/control/manual`, data, {
      headers: {
        apiKey,
        baseUrl
      }
    });
  }

  public autoControl(baseUrl: string,
                     apiKey: string, data: PelabAutoControl): Observable<any> {
    return this.http.post<any>(`/api/pelab/control/auto`, data, {
      headers: {
        apiKey,
        baseUrl
      }
    });
  }

}
