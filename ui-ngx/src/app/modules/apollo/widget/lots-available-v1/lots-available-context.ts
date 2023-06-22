import {WidgetContext} from '@home/models/widget-component.models';
import {Observable} from 'rxjs';
import {PageLink} from '@shared/models/page/page-link';
import {map} from 'rxjs/operators';
import {AssetInfo} from '@shared/models/asset.models';


export class LotsAvailableContext {
  constructor(public ctx: WidgetContext) {
  }

  getLayoutAssets(): Observable<Array<AssetInfo>> {
    return this.ctx.assetService.getTenantAssetInfos(new PageLink(100), 'LOTS AVAILABLE').pipe(
      map(value => value.data.map(
        value1 => value1)
      )
    )
      ;
  }

  test() {

  }
}
