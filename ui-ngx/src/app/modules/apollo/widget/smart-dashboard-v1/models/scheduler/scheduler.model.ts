import {
  HubNodeTreeImpl,
  NodeTree,
  NodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {Observable} from 'rxjs';
import {InputScript} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {renderAutoOutput} from '@modules/apollo/widget/smart-dashboard-v1/models/automation/automation.model';

export const WeekdaysMapping: Record<number, string> = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun'
};


export function renderSchedulerInput(input: InputScript): any {
  return {
    times: input.fromTimes,
    weekdays: input.fromWeekDays
  };
}


export class SchedulerNodeTree extends NodeTreeImpl {

  inputScript: InputScript;
  outputScript: InputScript;


  constructor(private nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    super(nodeTree);
  }

  createOrUpdate(): Observable<any> {
    return new Observable<any>(obs => {
      this.apollo.apolloNodeTreeService.saveApolloNodeTree(this.nodeTree).subscribe(res => {
        obs.next('Create or update to database ok');
        const nodeController: NodeTreeImpl = new NodeTreeImpl(res);
        this.apollo.apolloNodeTreeService.getApolloNodeTree(nodeController.additionalInfo?.hubNodeTreeId?.id).subscribe(
          res => {
            obs.next('Found tb hub');
            const hubNodeTreeImpl: HubNodeTreeImpl = new HubNodeTreeImpl(res);
            this.apollo.hubService.schedulerService.createOrUpdate(
              hubNodeTreeImpl.tbDeviceId,
              nodeController.id.id,
              nodeController.additionalInfo?.enable,
              renderSchedulerInput(nodeController.additionalInfo?.inputScript),
              renderAutoOutput(nodeController.additionalInfo?.outputScript)
            ).subscribe(res => {
              obs.next('Create or update scheduler successfully');
              obs.complete();
            }, error => obs.error(error));
          }, error => obs.error('Not found hub tb device')
        );
      }, error => obs.error('Can\'t create or update to database'));
    });
  }

  remove(): Observable<any> {
    return new Observable<any>(observable => {
      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.additionalInfo?.hubNodeTreeId.id).subscribe(
        res => {
          const hubNodeTree: HubNodeTreeImpl = new HubNodeTreeImpl(res);
          this.apollo.hubService.schedulerService.remove(hubNodeTree.tbDeviceId, [this.id.id]).subscribe(
            res => {
              this.apollo.apolloNodeTreeService.deleteApolloNodeTree(this.id.id).subscribe(res => {
                observable.next('Removed successfully');
                observable.complete();
              }, error => observable.error('Can\'t Remove node tree in database'));

            }, error => observable.error('Can\'t Remove node tree in Hub')
          );
        }, error => observable.error('Not found hub tb device'));
    });
  }


}
