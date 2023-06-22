import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {HubController} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {ZigbeeDevice} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee.model';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'tb-load-zb-dev-from-hub',
  templateUrl: './load-zb-dev-from-hub.component.html',
  styleUrls: ['./load-zb-dev-from-hub.component.scss']
})
export class LoadZbDevFromHubComponent implements OnInit, OnChanges {

  zbNodeSource: Array<ZigbeeDevice> = [];


  value: Array<ZigbeeDevice>;
  allSelectedStatus=false;

  formControl = new FormControl('');

  @ViewChild('allSelected') allSelected: MatSelect;


  @Input() apollo: ApolloWidgetContext;
  @Input() hubNodeTreeSelected: NodeTree;
  @Input() name = 'Chọn Node';
  @Input() multiple = false;

  @Input() nodes: Array<ZigbeeDevice>;
  @Output() nodesChange: EventEmitter<Array<ZigbeeDevice>> = new EventEmitter<Array<ZigbeeDevice>>();
  @Output() closedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.renderDeviceFromHub();
  }

  renderDeviceFromHub() {
    /*    let hub: NodeTreeInfoBaseImpl;
        if (this.hubNodeTreeSelected && this.hubNodeTreeSelected?.additionalInfo) {
          hub = new NodeTreeInfoBaseImpl(this.hubNodeTreeSelected?.additionalInfo);
        }*/
    if (this.hubNodeTreeSelected) {
      const hubController = new HubController(this.hubNodeTreeSelected, this.apollo);
      hubController.zbGetDevices().subscribe(
        res => {
          console.log(res);
          if (res && Array.isArray(res)) {
            this.zbNodeSource = res;
          }
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderDeviceFromHub();
  }

  optionClick() {
    let newStatus = true;
    this.allSelected.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedStatus = newStatus;
  }

}
