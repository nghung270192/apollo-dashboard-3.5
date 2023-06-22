import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {
  ApolloWidgetContext,
  DataKey
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ZbStateParams} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee.model';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
}

export interface TableDatasource {
  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;
}

@Component({
  selector: 'tb-select-cmd-zigbee',
  templateUrl: './select-cmd-zigbee.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: SelectCmdZigbeeComponent}],
  styleUrls: ['./select-cmd-zigbee.component.scss']
})
export class SelectCmdZigbeeComponent extends DialogComponent<SelectCmdZigbeeComponent, null> implements
  OnInit, OnDestroy, AfterViewInit , ErrorStateMatcher {

  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;
  subscription: Subscription = null;


  displayedColumns: string[] = ['zbTimeUpdate','address', 'endpoint', 'nameState', 'value',  'tool'];
  dataSource = new MatTableDataSource<TableDatasource>([]);


  @ViewChild(MatSort) sort: MatSort;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private fb: FormBuilder,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher,
               public datepipe: DatePipe,
              public dialogRef: MatDialogRef<SelectCmdZigbeeComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);

  }

  ngOnInit(): void {
    this.subscription = this.data.apollo.apolloObserver.subscribe(res => {
      if (res && res?.model == DataKey.ZIGBEE_KEY) {
        const data = this.dataSource.data;
        data.push({
          zbStateParams: res.params,
          zbModelParams: res.key,
          zbTimeUpdate: this.datepipe.transform((new Date()), 'HH:mm:ss')
        });
        this.dataSource.data = data;
      }
    });
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid);
    return originalErrorState || customErrorState;
  }

  ngOnDestroy(): void {

    if (this.subscription) {this.subscription.unsubscribe();}
  }

  save($event) {
    this.dialogRef.close({data: $event});
  }

  ngAfterViewInit(): void {


    this.dataSource.sort = this.sort;
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
