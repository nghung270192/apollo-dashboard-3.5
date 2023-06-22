import {Directive, OnInit} from '@angular/core';
import {PageComponent} from '@shared/components/page.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';


// @dynamic
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ShareControllerComponent<T> extends PageComponent implements OnInit {


  protected constructor(protected store: Store<AppState>,
                        protected controller: T) {
    super(store);
  }

  ngOnInit() {
  }
}
