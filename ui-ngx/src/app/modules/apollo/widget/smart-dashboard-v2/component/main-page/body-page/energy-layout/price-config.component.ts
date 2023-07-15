import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnInit,
  SkipSelf
} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

import {
  PriceForCalculating
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-layout.component';

export interface DataViewDialog1 {
  apollo: ApolloWidgetContext;
  apolloTreeId: string;
  price: Array<PriceForCalculating>;
}

export interface MyData {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'price-config',
  templateUrl: './price-config.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: PriceConfigComponent}],
  styleUrls: ['./price-config.component.scss']
})
export class PriceConfigComponent extends DialogComponent<PriceConfigComponent, null> implements OnInit {

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PriceConfigComponent>,
              private cd: ChangeDetectorRef,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog1) {
    super(store, router, dialogRef);
  }


  // selectedId: string = "";

  datasource: Array<ApolloTree> = [];
  apolloTreeId = '';


  value = '';
  allSelectedStatus = false;

  isOpen = false;

  formControl = new FormControl('');

  priceForCalculating: Array<PriceForCalculating> = [];
  displayedEnergyReportColumns = ['no', 'energy', 'price'];

  ngOnInit(): void {
    this.apolloTreeId = this.data.apolloTreeId;
    /*    this.data.apollo.apolloTreeService.getTenantApolloTree(new PageLink(100)).subscribe(res => {
          this.datasource = res.data;
          this.cd.detectChanges();
        });*/
    this.priceForCalculating = this.data?.price;
  }

  remove(name: string, id: string) {

  }

  cancel(): void {
    this.dialogRef.close(null);

  }

  save() {
    this.dialogRef.close({data: this.apolloTreeId});
  }


}

