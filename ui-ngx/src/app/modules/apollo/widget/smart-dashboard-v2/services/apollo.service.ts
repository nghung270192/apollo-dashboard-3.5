import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  eventTaskSubject = new Subject<EventTask>();
  saveDashboardSubject = new Subject<any>();


  constructor() {
  }
}
