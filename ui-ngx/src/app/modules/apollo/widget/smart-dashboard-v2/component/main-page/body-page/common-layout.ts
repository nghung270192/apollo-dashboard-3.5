import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {PageComponent} from '@shared/components/page.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {ResizeObserver} from '@juggle/resize-observer';
import {Observable, of} from 'rxjs';

export interface CommonLayoutI {
  removeNodeTree($event, nodeTree: NodeTree);

  clickNodeTree($event, nodeTree: NodeTree);

  settingNodeTree($event, nodeTree: NodeTree);
}

export class CommonLayout extends PageComponent{

  checkAll = false;
  public widgetResize$: ResizeObserver;

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  public calcSpaceBetween(maxItem, parentWidth, childWidth) {
    let nElementPerLine = parentWidth / childWidth;
    nElementPerLine = Math.min(maxItem, Math.floor(nElementPerLine));
    let spaceRemain = parentWidth - childWidth * nElementPerLine;
    let margin = Math.floor(spaceRemain / (nElementPerLine + 1));
    if (margin < 10 && nElementPerLine > 0) {
      spaceRemain = parentWidth - childWidth * (nElementPerLine - 1);
      margin = Math.floor(spaceRemain / (nElementPerLine));
    }
    return margin;
  }


  convertIcon(icon: string): Observable<string> {
    if (icon) {
      return of(`url(${icon})`);
    } else {
      return of(`url()`);
    }
  }

  public removeClickEvent($event) {
    if ($event) {

      $event.stopPropagation();
      $event.preventDefault();
    }
  }


}
