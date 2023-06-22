import {Component, Input} from '@angular/core';
import {
  NotificationInternalService
} from '@modules/apollo/widget/smart-dashboard-v2/services/notification-internal.service';

@Component({
  selector: 'notification',
  template: `
    <h2 *ngIf="(error$ | async) as error">Hello {{ error }}!</h2>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class NotificationComponent {
  error$ = this.service.error$;

  constructor(private readonly service: NotificationInternalService) {
  }
}
