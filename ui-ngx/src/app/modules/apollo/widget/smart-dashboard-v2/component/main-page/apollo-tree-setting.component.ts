import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApolloTreeService} from '@modules/apollo/widget/smart-dashboard-v2/services/apollo-tree.service';
import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';

export interface DataViewDialog {
  apolloTree: ApolloTree;
}

@Component({
  selector: 'tb-apollo-tree-setting',
  templateUrl: './apollo-tree-setting.component.html',
  styleUrls: ['./apollo-tree-setting.component.scss']
})
export class ApolloTreeSettingComponent extends DialogComponent<ApolloTreeSettingComponent, null> implements OnInit {

  name: string;
  label: string;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ApolloTreeSettingComponent>,
              private cd: ChangeDetectorRef,
              private apolloTreeService: ApolloTreeService,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);
  }

  ngOnInit(): void {
    this.name = this.data.apolloTree?.name;
    this.label = this.data.apolloTree?.label;
  }

  close() {
    this.dialogRef.close();
  }

  save($event) {

    this.data.apolloTree.name = this.name;
    this.data.apolloTree.label = this.label;

    this.apolloTreeService.save(this.data.apolloTree).subscribe(res => {
      this.dialogRef.close();
    });

  }
}
