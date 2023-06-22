import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  parentNode: NodeTree;
}

@Component({
  selector: 'tb-map-setting',
  templateUrl: './map-setting.component.html',
  styleUrls: ['./map-setting.component.scss']
})
export class MapSettingComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: DataViewDialog, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

}
