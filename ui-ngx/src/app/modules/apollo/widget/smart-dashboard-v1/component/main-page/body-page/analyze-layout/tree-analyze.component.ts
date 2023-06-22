import {Component, Input, OnInit} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {
  NodeTreeType,
  NodeTreeTypeLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {forkJoin, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export interface DataTable {
  type: NodeTreeType;
  amount: number;
}

@Component({
  selector: 'tb-tree-analyze',
  templateUrl: './tree-analyze.component.html',
  styleUrls: ['./tree-analyze.component.scss']
})
export class TreeAnalyzeComponent implements OnInit {
  columnsAnalyze: Array<string> = ['No', 'type', 'amount'];

  datasource: Array<DataTable> = [];

  NodeTreeTypeLabelMapping = NodeTreeTypeLabelMapping;

  @Input() rootNode: NodeTree;
  @Input() apollo: ApolloWidgetContext;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    if (this.apollo && this.rootNode) {
      /*
            console.log(from(Object.values(NodeTreeType)));
            of(Object.values(NodeTreeType)).pipe(
              switchMap(type => from(type)),
              switchMap(type => this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNode.apolloTreeId.id, null, type, null)),
              map((data, type) => ({
                type: Object.values(NodeTreeType)[type],
                amount: data.totalElements
              }))
            ).subscribe(data => {
              console.log(data)
            });
      */

      of(Object.values(NodeTreeType)).pipe(
        switchMap(types => Promise.all(
          types.map(type => (this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNode.apolloTreeId.id, null, type, null).pipe())
          ))
        ),
      ).subscribe(data => {
        forkJoin(data).pipe(
          map((value) => value.map((dt, index) => ({
            type: Object.values(NodeTreeType)[index],
            amount: dt.totalElements
          })))
        ).subscribe(
          value => this.datasource = value
        );
      });

    }
  }

}
