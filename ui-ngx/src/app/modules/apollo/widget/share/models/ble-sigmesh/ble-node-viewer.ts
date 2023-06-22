import {
  BleMeshModelId,
  DeviceType,
  ProductI,
  CommonProductName,
  BleProductId,
  ProductModel
} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';

import {EntityIcon} from '@modules/apollo/widget/share/models/entity-icon';
import {BleNode, NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';

export class BleNodeViewer extends BleNode {
  private _deviceType: DeviceType = null;
  private _product: ProductI = null;
  private productIdModel: BleProductId = new BleProductId();
  private _renderIcon = '';
  private _renderIconUrl = '';

  constructor(private node?: NodeModel) {
    super(node);

    this._deviceType = this.productIdModel.findProductModelByPid(node);
    this._product = this.productIdModel.findProductByPid(node);
    this._renderIcon = this.getIcon(this._product);
    this._renderIconUrl = `./assets/apollo/icon/${this._renderIcon}.svg`;
  }


  get renderIconUrl(): string {
    return this._renderIconUrl;
  }

  get renderIcon(): string {
    return this._renderIcon;
  }

  get deviceType(): DeviceType {
    return this._deviceType;
  }

  get product(): ProductI {
    return this._product;
  }

  public hasModelOfElement(modelId: string, element: number): boolean {
    const model = this.node?.elements[element].models.find(md => md.modelId === modelId);
    return !!model;
  }

  public hasModel(modelId: string): boolean {
    if (this.node?.elements && Array.isArray(this.node?.elements)) {
      const ele = this.node.elements.find(element => {
        const model = element.models.find(md => md.modelId === modelId);
        if (model) {
          return true;
        }
      });
      if (ele) {
        return true;
      }
    }
    return false;
  }

  private getIcon(productId: ProductI): EntityIcon {

    const icon: EntityIcon = EntityIcon.deviceUnknown;

    if (!productId) {
      return icon;
    }

    if (productId?.icon) {
      return productId?.icon;
    }
    return icon;
  }

  private getIconUrl(productId: ProductI): string {

    return `./assets/apollo/icon/${this.getIcon(productId)}.svg`;

  }


}
