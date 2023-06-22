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
import {PageLink} from '@shared/models/page/page-link';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {
  ApolloTreeConfigResolver
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/ApolloTree/apollo-tree-config-resolver.service';
import {
  ApolloNodeTreeCreateV2,
  DataViewDialog
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/apollo-node-tree/add-entity-dialog.component';
import {
  ApolloTreeSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/apollo-tree-setting.component';
import {DatePipe} from '@angular/common';

export interface DataViewDialog1 {
  apollo: ApolloWidgetContext;
  apolloTreeId: string;
}

export interface MyData {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'tb-widget-setting',
  templateUrl: './widget-setting.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: WidgetSettingComponent}],
  styleUrls: ['./widget-setting.component.scss']
})
export class WidgetSettingComponent extends DialogComponent<WidgetSettingComponent, null> implements OnInit, ErrorStateMatcher {

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<WidgetSettingComponent>,
              private cd: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher,
              public dialog: MatDialog,
              private apolloTreeConfigResolver: ApolloTreeConfigResolver,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog1, private datePipe: DatePipe) {
    super(store, router, dialogRef);
    this.upload = this.upload.bind(this);
  }


  // selectedId: string = "";

  datasource: Array<ApolloTree> = [];
  apolloTreeId = '';


  value = '';
  allSelectedStatus = false;

  isOpen = false;

  formControl = new FormControl('');

  ngOnInit(): void {
    this.apolloTreeId = this.data.apolloTreeId;
    this.data.apollo.apolloTreeService.getTenantApolloTree(new PageLink(100)).subscribe(res => {
      this.datasource = res.data;
      this.cd.detectChanges();
    });
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid);
    return originalErrorState || customErrorState;
  }

  addApolloTree() {
    const entityDialogParams: DataViewDialog = {
      apollo: this.data.apollo,
      config: this.apolloTreeConfigResolver.config
    };
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: entityDialogParams
    };

    this.dialog.open(ApolloNodeTreeCreateV2, dialogConfig).afterClosed().subscribe(res => {
      this.data.apollo.apolloTreeService.getTenantApolloTree(new PageLink(100)).subscribe(res => {
        this.datasource = res.data;
        this.cd.detectChanges();
      });
    });
  }

  importApolloTree($event, apolloTree: ApolloTree) {
    const input = $event.target;
    if (input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (reader1) => {
        const result = reader1.target.result;
        this.upload(result, apolloTree);
      };
      /*; (reader) => {
        const text = reader.result;
        this.upload(text);
      }.bind(this);*/
      reader.readAsText(input.files[0]);
    }
  }

  remove(name: string, id: string) {
    if (confirm('Xóa: ' + name)) {
      this.data.apollo.apolloTreeService.deleteApolloTree(id).subscribe(res => {
        this.ngOnInit();
      });
    }
  }

  setting(apolloTree: ApolloTree) {
    const dialogConfig: MatDialogConfig = {
        disableClose: true,
        panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
        data: {
          apolloTreeService: this.data.apollo.apolloTreeService,
          apolloTree
        }
      }
    ;
    this.dialog.open(ApolloTreeSettingComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res && res?.data) {
        // this.ngAfterViewInit();
      }
    });
  }

  download(apolloTree: ApolloTree) {
    this.data.apollo.apolloTreeService.getDatabaseApolloTree(apolloTree.id.id).subscribe((att) => {
      if (att) {
        const exportData = att;
        const name = apolloTree.name + ' ' + this.datePipe.transform(apolloTree.createdTime, 'ddmmyy-HHMMSS');
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData)));
        element.setAttribute('download', name + '.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    });
  }


  upload(data: any, apolloTree: ApolloTree) {
    this.data.apollo.apolloTreeService.saveDatabaseApolloTree(apolloTree.id.id, JSON.parse(data)).subscribe((att) => {
    });
  }

  cancel(): void {
    this.dialogRef.close(null);

  }

  save() {
    this.dialogRef.close({data: this.apolloTreeId});
  }


}

