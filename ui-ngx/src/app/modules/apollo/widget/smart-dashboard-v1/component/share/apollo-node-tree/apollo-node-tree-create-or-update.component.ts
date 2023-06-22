import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {FormBuilder, Validators} from '@angular/forms';
import {NodeTreeEntity} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  parentNodeTree: NodeTree;
}

@Component({
  selector: 'tb-apollo-node-tree-create-or-update',
  templateUrl: './apollo-node-tree-create-or-update.component.html',
  styleUrls: ['./apollo-node-tree-create-or-update.component.scss']
})
export class ApolloNodeTreeCreateOrUpdateComponent implements OnInit {

  name: string;
  type: NodeTreeType;
  NodeTreeType = NodeTreeType;
  status1 = '';
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });


  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ApolloNodeTreeCreateOrUpdateComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
  }

  ngOnInit(): void {
  }

  tranformToCreateOther(type: NodeTreeType) {

    this.dialogRef.close({openType: type});

  }

  createAndSave($event) {
    const nodeTree: NodeTree = new NodeTreeEntity(this.name, this.data.parentNodeTree.apolloTreeId,
      this.data.parentNodeTree.id, this.type, null);
    // console.log(nodeTree);
    this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(nodeTree)
      .subscribe(res => {
        setTimeout(() => {
          this.dialogRef.close({data: 'create'});
        }, 1000);
        this.status1 = 'Tạo thực thể thành công';
      }, error => this.status1 = error);
  }


}
