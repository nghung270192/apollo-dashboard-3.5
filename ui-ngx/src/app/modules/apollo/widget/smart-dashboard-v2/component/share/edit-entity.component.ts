import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tb-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss']
})
export class EditEntityComponent implements OnInit, OnDestroy {

  sub: Subscription = null;

  @Input() hasSetting = false;
  @Input() hasRemove = true;
  @Input() hasCheckbox = true;
  @Input() selection = false;
  @Input() apollo: ApolloWidgetContext = null;
  @Input() nodeTree: NodeTree = null;


  @Output() settingEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeEvent: EventEmitter<any> = new EventEmitter<any>();

  checkBoxForm = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
    if (this.apollo && this.nodeTree)
      {this.sub = this.apollo.apolloService.eventTaskSubject.subscribe(res => {
        if (res === EventTask.DELETE_ENTITIES && this.selection) {
          this.removeNodeTree(null);
        }
      });}
  }

  removeNodeTree($event) {
    if ($event) {
      $event.stopPropagation();
    }
    if (this.apollo && this.nodeTree) {
      this.apollo.apolloNodeTreeService.deleteApolloNodeTree(this.nodeTree?.id?.id).subscribe(res => {
        this.apollo.apolloService.eventTaskSubject.next(EventTask.RELOAD_ENITY);
      }, error => alert(error));
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {this.sub.unsubscribe();}
  }

}
