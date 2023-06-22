import {Component, Input, OnInit} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {forkJoin, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AttributeService} from '@core/http/attribute.service';

@Component({
  selector: 'tb-device-history-analyze',
  templateUrl: './device-history-analyze.component.html',
  styleUrls: ['./device-history-analyze.component.scss']
})
export class DeviceHistoryAnalyzeComponent implements OnInit {

  @Input() rootNode: NodeTree;
  @Input() apollo: ApolloWidgetContext;

  constructor(private attributeService: AttributeService) {
  }

  ngOnInit(): void {
    this.apollo.apolloNodeTreeService.getByApolloTree(this.rootNode.apolloTreeId.id, null, 'HUB', '')
      .subscribe(hubs => {
        of(hubs.data)
          .pipe(
            switchMap(value => Promise.all(
              value.map(
                value1 => this.attributeService.getEntityTimeseries(value1.additionalInfo?.tbDeviceId,
                  ['data_bleSigmesh'], 1680282000000, 1682490215969))
            )),
          ).subscribe(data => {
          forkJoin(data).pipe(
            map((value) => value.map((dt, index) => ({index, data: dt})))
          ).subscribe(
            value => console.log(value)
          );
        });
      });
  }

}
