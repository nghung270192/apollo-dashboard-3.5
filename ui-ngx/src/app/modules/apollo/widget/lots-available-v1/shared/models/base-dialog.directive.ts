import {Directive, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PageComponent} from '@shared/components/page.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {LotsAvailableContext} from '@modules/apollo/widget/lots-available-v1/lots-available-context';

export interface BaseDialogConfig<D> {
  lax: LotsAvailableContext;
  config: D;
}

@Directive()
export abstract class BaseDialogDirective<T, D, R> extends PageComponent {
  constructor(
    protected store: Store<AppState>,
    protected dialogRef: MatDialogRef<T, R>,
    protected data: BaseDialogConfig<D>) {
    super(store);

  }

  cancel() {
    this.dialogRef.close();
  }

  get dataIsValid(): boolean {
    return !!this.data && !!this.data?.lax && !!this.data?.config;
  }

  abstract close();
}
