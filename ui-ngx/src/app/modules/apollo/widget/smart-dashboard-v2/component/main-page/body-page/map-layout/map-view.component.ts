import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import * as L from 'leaflet';
import {Icon, IconOptions, LatLngLiteral, Marker, PointExpression} from 'leaflet';
import {FormControl} from '@angular/forms';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {
  defaultCenterLocationOpenStreetMap,
  MapLocation,
  MapType
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  DeviceControllerComponent,
  EDevCallbackEvent,
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  AreaSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/area-layout/area-setting.component';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';

interface ApolloMarker {
  leafMaker: Marker;
  entity: NodeTreeImpl;
}


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function pointToLatLng(x, y): L.LatLng {
  return L.CRS.Simple.pointToLatLng({x, y} as L.PointExpression, 18 - 1);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function latLngToPoint(latLng: LatLngLiteral): L.Point {
  return L.CRS.Simple.latLngToPoint(latLng, 18 - 1);
}

@Component({
  selector: 'widget-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  // @Input() mapView: Boolean = false;
  @Input() apollo: ApolloWidgetContext;
  @Input() parentNodeTree: NodeTree;
  @Input() childrenNodeTree: Array<NodeTree> = [];

  @Output() entitySingleClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() entityDoubleClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() reloadEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() callbackEvent: (event: EventTask) => void;

  deviceControllerComponent: DeviceControllerComponent = new DeviceControllerComponent();

  markers: Marker[] = [];
  apolloMarker: Array<ApolloMarker> = [];

  parentNode: NodeTreeImpl;

  private map: L.Map;

  width = 1500;
  height = 900;
  _isScale = true;
  _iconScale = 1;
  _lastScale = 1;
  _defaultIconSize: L.Point = new L.Point(40, 40);
  _defaultIconAnchor: L.Point = new L.Point(20, 20);
  iconSize?: PointExpression | undefined;
  iconAnchor?: PointExpression | undefined;


  entityForm = new FormControl('');
  nodeTrees: Array<NodeTreeImpl> = [];

  TIMEOUT_UPDATE = 1000;
  setTimeOutId: any;

  isDrag = false;

  deviceListToSubscribe: Array<DeviceControllerAbstract> = [];
  parent: NodeTree;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.initOpenStreetMap = this.initOpenStreetMap.bind(this);
    this.initImageMap = this.initImageMap.bind(this);
    this.updateBounds = this.updateBounds.bind(this);
    this.saveData = this.saveData.bind(this);
    this.changeIconSize = this.changeIconSize.bind(this);
    this.entityClick = this.entityClick.bind(this);
    this.refeshMapView = this.refeshMapView.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.eventCallbackDevice = this.eventCallbackDevice.bind(this);
    this.saveNodeTree = this.saveNodeTree.bind(this);
  }


  ngOnInit(): void {
    this.parent = this.parentNodeTree;
    // this.loadMap();
    // console.log(this.apollo.ctx.widget.id);
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    if (this.parent) {
      this.parentNode = new NodeTreeImpl(this.parent);
      if (this.childrenNodeTree && Array.isArray(this.childrenNodeTree)) {
        this.nodeTrees = this.childrenNodeTree.filter(
          node => node.type === NodeTreeType.AREA || node.type === NodeTreeType.DEVICE || node.type === NodeTreeType.GROUP
            || node.type === NodeTreeType.GATEWAY || node.type === NodeTreeType.HUB)
          .map(value => new NodeTreeImpl(value));
      }
      if (this.parentNode?.additionalInfo?.mapType === MapType.openStreetMap) {
        this.initOpenStreetMap();
      } else {
        this.initImageMap();
      }
    }
  }


  private maker: Array<L.Marker> = [];

  private initOpenStreetMap() {

    const nodeTree = this.nodeTrees.find(nodeMap => {
      if (nodeMap?.additionalInfo?.mapStreetLocation) {
        return nodeMap;
      }
    });

    let option: any = {};
    let icon = './assets/apollo/icon/map-place.png';
    if (nodeTree?.additionalInfo?.iconOnMap) {
      icon = nodeTree?.additionalInfo?.iconOnMap;
    }
    // let entity:EntityClass
    if (nodeTree && nodeTree?.additionalInfo?.mapStreetLocation) {
      option = {
        center: [nodeTree?.additionalInfo?.mapStreetLocation.lat, nodeTree?.additionalInfo?.mapStreetLocation.lng],
        zoom: 10.5
      };

    } else {
      option = {
        // Set latitude and longitude of the map center (required)
        center: [defaultCenterLocationOpenStreetMap.lat, defaultCenterLocationOpenStreetMap.lng],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 6
      };
    }
    this.map = L.map(this.apollo.ctx.widget.id, option);
    L.icon({
      iconUrl: icon,
      iconSize: [25, 41], // size of the icon
      iconAnchor: [9, 40], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
    });
    L.control.scale().addTo(this.map);
    // Create a Tile Layer and add it to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    this.map.pm.addControls({
      position: 'topleft',
      drawControls: true,
      drawMarker: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawRectangle: false,
      drawPolyline: false,
      drawPolygon: false,
      dragMode: true,
      customControls: true,
      editMode: false,
      cutPolygon: false,
      removalMode: false,
      rotateMode: false,
    });

    this.nodeTrees.map(nodeImpl => {
      let location = defaultCenterLocationOpenStreetMap;
      let label = defaultCenterLocationOpenStreetMap.label;
      if (nodeImpl?.additionalInfo?.mapStreetLocation) {
        location = nodeImpl?.additionalInfo?.mapStreetLocation;
      }
      /*      if (entity?.mapLabel)
              label = entity.mapLabel;
            else*/
      label = nodeImpl.name.slice(0, 20) + (nodeImpl.name.length > 20 ? '...' : '');

      const maker = L.marker([location.lat, location.lng], {
        icon: L.icon({
          iconUrl: nodeImpl?.additionalInfo?.iconOnMap ? nodeImpl?.additionalInfo?.iconOnMap : './assets/apollo/icon/map-place.png',
          iconSize: [this._defaultIconSize.x, this._defaultIconSize.y], // size of the icon
          iconAnchor: [this._defaultIconAnchor.x, this._defaultIconAnchor.x], // point of the icon which will correspond to marker's location
          tooltipAnchor: [this._defaultIconAnchor.x, 0] // point from which the popup should open relative to the iconAnchor
        })
      })
        .addTo(this.map)
        .bindTooltip(label, {permanent: true, direction: 'right'})
        .on('pm:dragend', (e) => {
          if (e.shape === 'Marker') { // @ts-ignore
            location = e?.sourceTarget.getLatLng();
            nodeImpl.additionalInfo.mapStreetLocation = location;
            this.saveNodeTree(nodeImpl);
          }

        }).on('dblclick', (e) => {
          delete (maker.dragging as any)._draggable;
          delete (maker.dragging as any)._enabled;
          if (!this.isDrag) {
            this.entityDoubleClick.emit(nodeImpl);
          }

        }).on('click', (e) => {
          delete (maker.dragging as any)._draggable;
          delete (maker.dragging as any)._enabled;
          if (!this.isDrag) {
            this.entityClick(nodeImpl);
          }

        });
    });

    this.map.on('pm:create', (e) => {

    });
    this.addEventMap();
    this.subscribeState();
    this.cd.detectChanges();
  }

  private initImageMap(): void {
    this.loadImageMap();
  }

  private updateBounds(updateImage?: boolean, lastCenterPos?: any) {
    const w = this.width;
    const h = this.height;
    const southWest = pointToLatLng(0, h);
    const northEast = pointToLatLng(w, 0);
    const bounds = new L.LatLngBounds(southWest, northEast);
    let imageUrl = './assets/apollo/image/ban-ve-chi-tiet-gateway.jpg';
    if (this.parentNode?.additionalInfo?.urlImageMap) {
      imageUrl = this.parentNode?.additionalInfo?.urlImageMap;
    }
    const imageOverlay = L.imageOverlay(imageUrl, bounds).addTo(this.map);

    const padding = 400 * 18;
    const southWest1 = pointToLatLng(-padding, h + padding);
    const northEast1 = pointToLatLng(w + padding, -padding);
    const maxBounds = new L.LatLngBounds(southWest1, northEast1);
    (this.map as any)._enforcingBounds = true;
    this.map.setMaxBounds(maxBounds);
    if (lastCenterPos) {
      lastCenterPos.x *= w;
      lastCenterPos.y *= h;
      const center = pointToLatLng(lastCenterPos.x, lastCenterPos.y);
      this.map.panTo(center, {animate: false});
    }
    (this.map as any)._enforcingBounds = false;
  }

  private loadImageMap(): void {


    const center = pointToLatLng(this.width / 2, this.height / 2);
    this.map = L.map(this.apollo.ctx.widget.id, {
        minZoom: 1, maxZoom: 25,
        zoomDelta: 0.1,
        zoomSnap: 0,
        center,
        wheelPxPerZoomLevel: 500,
        scrollWheelZoom: true,
        zoomControl: true,
        zoom: 16,
        crs: L.CRS.Simple,
        attributionControl: false,
        tap: L.Browser.safari && L.Browser.mobile
      }
    );

    const prevWidth = this.width;
    const prevHeight = this.height;
    const lastCenterPos = latLngToPoint(this.map.getCenter());
    lastCenterPos.x /= prevWidth;
    lastCenterPos.y /= prevHeight;

    this.updateBounds(true, lastCenterPos);

    this.map.pm.addControls({
      position: 'topleft',
      drawControls: true,
      drawMarker: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawRectangle: false,
      drawPolyline: false,
      drawPolygon: false,
      dragMode: true,
      customControls: true,
      editMode: false,
      cutPolygon: false,
      removalMode: false,
      rotateMode: false,
    });
    this.markers = [];
    this.apolloMarker = [];
    this.nodeTrees.forEach(nodeTree => {
      let location: MapLocation = {
        lng: pointToLatLng(0, 0).lng,
        lat: pointToLatLng(0, 0).lat,
        label: ''
      };
      let label = '';
      if (nodeTree.additionalInfo?.mapImageLocation) {
        location = nodeTree.additionalInfo?.mapImageLocation;
      }

      /*if (nodeTree.additionalInfo?.mapLabel)
        label = nodeTree.additionalInfo?.mapLabel
      else*/
      label = nodeTree.name.slice(0, 20) + (nodeTree.name.length > 20 ? '...' : '');

      const maker = L.marker([location.lat, location.lng], {
        icon: this.convertIcon(nodeTree)
      })
        .addTo(this.map)
        .bindTooltip(label, {permanent: true, direction: 'right'})
        .on('pm:dragend', (e) => {
          if (e.shape === 'Marker') { // @ts-ignore
            location = e?.sourceTarget.getLatLng();
            nodeTree.additionalInfo.mapImageLocation = {lng: location.lng, lat: location.lat, label};
            this.saveNodeTree(nodeTree);
          }

        }).on('dblclick', (e) => {
          delete (maker.dragging as any)._draggable;
          delete (maker.dragging as any)._enabled;
          if (!this.isDrag) {
            this.entityDoubleClick.emit(nodeTree);
          }
        }).on('click', (e) => {
          delete (maker.dragging as any)._draggable;
          delete (maker.dragging as any)._enabled;
          if (!this.isDrag) {
            this.entityClick(nodeTree);
          }

        });
      this.markers.push(maker);
      this.apolloMarker.push({entity: nodeTree, leafMaker: maker});
    });
    this.addEventMap();
    this.subscribeState();
    this.cd.detectChanges();
  }

  addEventMap() {
    if (this.map) {
      this.map.on('pm:globaldragmodetoggled', (e) => {
        this.isDrag = e.enabled;
        if (e.enabled === false) {
          this.saveData();
        }
      });
      this.map.on('zoom', (e) => this.changeIconSize(e));
    }
  }

  changeIconSize(e) {
    if (this._isScale) {
      const transformation = new L.Transformation(1, 0, 1, 0);
      const scale = 1 / (e.sourceTarget.getZoomScale(16));
      this._lastScale = scale;
      this.markers.forEach(leafletMarker => {
        const icon = leafletMarker.getIcon();
        this.iconSize = transformation.transform(this._defaultIconSize, scale * this._iconScale);
        this.iconAnchor = transformation.transform(this._defaultIconAnchor, scale * this._iconScale);
        icon.options.iconSize = this.iconSize;
        icon.options.iconAnchor = this.iconAnchor;
        leafletMarker.setIcon(icon);
      });
    }
  }


  convertIcon(nodeTreeImp: NodeTreeImpl): Icon {

    const options: IconOptions = {
      iconUrl: './assets/apollo/icon/map-place.png',
      iconSize: [this._defaultIconSize.x, this._defaultIconSize.y], // size of the icon
      iconAnchor: [this._defaultIconAnchor.x, this._defaultIconAnchor.x], // point of the icon which will correspond to marker's location
      tooltipAnchor: [this._defaultIconAnchor.x, 0] // point from which the popup should open relative to the iconAnchor
    };

    if (nodeTreeImp.additionalInfo.iconOnMap) {
      options.iconUrl = nodeTreeImp.additionalInfo.iconOnMap;
    } else {
      if (nodeTreeImp.type === NodeTreeType.AREA) {
        options.iconUrl = './assets/apollo/icon/map-place.png';
      } else if (nodeTreeImp.type === NodeTreeType.GROUP) {
        options.iconUrl = './assets/apollo/icon/iot-group-light.svg';
      } else if (nodeTreeImp.type === NodeTreeType.GATEWAY) {
        options.iconUrl = './assets/apollo/icon/gateway_v1.svg';
      } else if (nodeTreeImp.type === NodeTreeType.HUB) {
        options.iconUrl = './assets/apollo/icon/hub_v1.svg';
      } else if (nodeTreeImp.type === NodeTreeType.DEVICE) {

        const classDevice = this.deviceControllerComponent.getClass(nodeTreeImp.toApolloNodeTree());
        const device: DeviceControllerAbstract = new classDevice(nodeTreeImp.toApolloNodeTree(), this.apollo, this.cd, this.dialog, null);
        options.iconUrl = device?.renderIconUrlOnMap();
      } else {

      }
    }
    return L.icon(options);
  }

  refeshMapView() {
    if (this.map !== undefined) {
      this.map.remove();
    }
    this.loadMap();
  }

  saveData() {
    this.callbackEvent(EventTask.SAVE_DATABASE);
  }

  saveNodeTree(nodeTree: NodeTreeImpl) {
    this.apollo.apolloNodeTreeService.saveApolloNodeTree(nodeTree.toApolloNodeTree()).subscribe(res => {
      //
    });
  }

  selectedEntityEvent() {
    /*    if (Array.isArray(this.parent?.device-type)) {
          this.parent.device-type = this.parent?.device-type.map(ett => {
            if (this.entityId.includes(ett.id.id))
              ett.mapPlace = true;
            else ett.mapPlace = false;
            return ett;
          })
          this.refeshMapView();
        }*/
  }

  unsubscribeState() {

    if (this.deviceListToSubscribe && Array.isArray(this.deviceListToSubscribe)) {
      this.deviceListToSubscribe.forEach(res => res?.unSubscribe());
    }
  }

  subscribeState() {
    this.unsubscribeState();
    this.deviceListToSubscribe = [];

    if (this.apolloMarker && Array.isArray(this.apolloMarker)) {
      const deviceMaker = this.apolloMarker.filter(value => value.entity.type === NodeTreeType.DEVICE);
      of(deviceMaker).pipe(
        map((value) => value.map((nodeTreeImp: ApolloMarker) => {
          const classDevice = this.deviceControllerComponent.getClass(nodeTreeImp.entity.toApolloNodeTree());
          return new classDevice(nodeTreeImp.entity.toApolloNodeTree(), this.apollo, this.cd, this.dialog, this.eventCallbackDevice);
        }))).subscribe(res => {
          if (res && Array.isArray(res)) {
            this.deviceListToSubscribe = res;
            this.deviceListToSubscribe.forEach(value => value.subscribe());

          }
        }
      );
      /*      this.apolloMarker.forEach(value => {
              if (value.entity.type===NodeTreeType.DEVICE) {
                this.deviceListToSubscribe
              }
            })*/
    }
  }

  entityClick(nodeTree: NodeTreeImpl) {
    const classDevice = this.deviceControllerComponent.getClass(nodeTree.toApolloNodeTree());
    const device: DeviceControllerAbstract = new classDevice(nodeTree.toApolloNodeTree(),
      this.apollo, this.cd, this.dialog, this.eventCallbackDevice);
    // device?.toggle().subscribe(value => console.log(value));
  }

  onOff(entity: NodeTree) {
    /*if (entity.model===EntityModel.apolloBLE) {
      // if(entity.targetType ==EntityType.DEVICE){
      let hubEntity = this.treeEntities.getEntity(entity.hubEntityId);
      let bleNode: NodeControl = this.apollo.viewData.nodes.get(entity.targetId);
      if (bleNode) {

        bleNode.toggle(hubEntity.targetId, bleNode.state).subscribe(
          res => {
            console.log(res);

          },
          error => {
            console.log(error);
          }
        );
      }

      /!*}else if(entity.targetType ==EntityType.GROUP){

      }*!/
    } else if (entity.model===EntityModel.dqSmart) {

    }*/
  }

  eventCallbackDevice(event: EDevCallbackEvent) {
    if (event === EDevCallbackEvent.UPDATE_NEW_STATE) {
      this.updateStatus();
    }
  }

  updateStatus() {
    if (this.setTimeOutId) {
      clearTimeout(this.setTimeOutId);
    }
    this.setTimeOutId = setTimeout(() => {
      this.apolloMarker.forEach(lf => {
        {
          /*let icon = lf.leafMaker.getIcon();
          icon.options.iconUrl = bleNode.iconUrlCommon;*/
          const icon = this.convertIcon(lf.entity);
          icon.options.iconAnchor = this.iconAnchor;
          icon.options.iconSize = this.iconSize;
          lf.leafMaker.setIcon(icon);
        }
      });
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes?.apollo && changes?.apollo?.firstChange === false) {
      this.refeshMapView();
    } else if (changes && changes?.parentNodeTree && changes?.parentNodeTree?.firstChange === false) {
      this.refeshMapView();
    } else if (changes && changes?.childrenNodeTree && changes?.childrenNodeTree?.firstChange === false) {
      this.refeshMapView();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeState();
  }


  setting() {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      data: {
        apollo: this.apollo,
        nodeTree: this.parent,
      }
    };
    const sub = this.dialog.open(AreaSettingComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
        if (res && res?.data) {
          this.parent = res?.data;
          this.refeshMapView();
        }
      });
    }
  }

}
