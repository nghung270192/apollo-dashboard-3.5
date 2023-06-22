import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  defaultCenterLocationOpenStreetMap,
  MapType,
  MapTypeMappingLable,
  NodeTreeInfoBaseImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

interface DataViewDialog {
  apollo: ApolloWidgetContext;
  nodeTree: NodeTree;
}

@Component({
  selector: 'tb-dialog-controller-area-setting',
  templateUrl: './area-setting.component.html',
  styleUrls: ['./area-setting.component.scss']
})
export class AreaSettingComponent extends DialogComponent<AreaSettingComponent, null> implements OnInit {

  name: string;

  nodeTree: NodeTreeImpl;
  info: NodeTreeInfoBaseImpl;


  mapType: MapType = MapType.openStreetMap;
  MapType = MapType;
  MapTypeSrouce = Object.values(MapType);
  MapTypeMappingLable = MapTypeMappingLable;

  // mapLocation: MapLocation = defaultCenterLocationOpenStreetMap;
  urlIcon = '';


  iconBlock = '';
  iconStreetMap = '';
  backgroundIcon = '';
  lat: number = defaultCenterLocationOpenStreetMap.lat;
  lng: number = defaultCenterLocationOpenStreetMap.lat;
  label: string = defaultCenterLocationOpenStreetMap.label;
  urlImageMap = '';

  latForm = new FormControl('');
  lngForm = new FormControl('');
  mapTypeForm = new FormControl('');


  constructor(protected store: Store<AppState>,
              protected router: Router, public dialogRef: MatDialogRef<AreaSettingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialog, private cd: ChangeDetectorRef) {
    super(store, router, dialogRef);
  }

  ngOnInit(): void {

    if (this.data?.nodeTree) {
      this.nodeTree = new NodeTreeImpl(this.data?.nodeTree);
    }
    if (this.nodeTree) {
      this.name = this.nodeTree.name;
      if (this.nodeTree.additionalInfo) {
        this.info = new NodeTreeInfoBaseImpl(this.nodeTree.additionalInfo);
        if (this.info) {
          this.iconBlock = this.info.iconBlock;
          this.iconStreetMap = this.info.iconOnMap;
          this.mapType = this.info.mapType;
          this.backgroundIcon = this.info.backgroundIcon;
          this.urlImageMap = this.info.urlImageMap;
          this.urlIcon = this.info.urlIcon;
        }
      }
    }
    this.cd.detectChanges();
  }

  openDialogUploadImageIconEntity($event) {
    /*
        $event.stopPropagation();
        $event.preventDefault();*/

    const input = $event.target;
    if (input.files.length > 0) {

      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);


      reader.onload = function() {
        const icon = reader.result as string;
        if (icon) {
          this.iconBlock = icon;
        }
      }.bind(this);
    }

  }

  openDialogUploadImageIconStreetMapEntity($event) {
    const input = $event.target;
    if (input.files.length > 0) {

      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);

      reader.onload = function() {
        const icon = reader.result as string;
        if (icon) {
          this.urlImageMap = '';
          this.iconStreetMap = icon;
        }
      }.bind(this);
    }

  }

  openDialogUploadImageMapEntity($event) {
    const input = $event.target;
    if (input.files.length > 0) {

      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);

      reader.onload = function() {
        const icon = reader.result as string;
        if (icon) {
          this.iconStreetMap = '';
          this.urlImageMap = icon;
        }
      }.bind(this);
    }

  }

  convertIcon(icon: string): Observable<string> {
    if (icon) {
      return of(`url(${icon})`);
    } else {
      return of(`url()`);
    }
  }

  save(event) {
    this.nodeTree.name = this.name;
    this.nodeTree.additionalInfo.backgroundIcon = this.backgroundIcon;
    this.nodeTree.additionalInfo.iconBlock = this.iconBlock;
    this.nodeTree.additionalInfo.iconOnMap = this.iconStreetMap;
    this.nodeTree.additionalInfo.mapType = this.mapType;
    this.nodeTree.additionalInfo.urlIcon = this.urlIcon;
    this.nodeTree.additionalInfo.urlImageMap = this.urlImageMap;

    this.data.apollo.apolloNodeTreeService.saveApolloNodeTree(this.nodeTree.toApolloNodeTree())
      .subscribe(res => {
        this.cd.detectChanges();
        this.dialogRef.close({data: this.nodeTree.toApolloNodeTree()});
      }, error => console.log(error));

  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
