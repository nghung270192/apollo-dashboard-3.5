/*
 * Copyright (c) 2023.
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';

import { NodeTree } from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import { ApolloWidgetContext } from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import { PageLink } from '@shared/models/page/page-link';
import { MatDialog } from '@angular/material/dialog';
import { EntitySearchDirection } from '@shared/models/relation.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { EventTask } from '@modules/apollo/widget/smart-dashboard-v1/models/common-type.model';


@Component({
  selector: 'tb-analyze-layout',
  templateUrl: './analyze-layout.component.html',
  styleUrls: ['./analyze-layout.component.scss']
})

export class AnalyzeLayoutComponent implements OnInit, AfterViewInit {
  columnsAnalyzeDevices: Array<string> = ['No', 'createdTime', 'name', 'model'];

  datasource: Array<NodeTree> = [];

  enableProcessing = [];
  removeProcessing = [];

  textSearchMode = false;
  directions = EntitySearchDirection;
  direction: EntitySearchDirection;
  pageLink: PageLink = new PageLink(5);
  hidePageSize = false;
  totalElements = 0;

  isEdited = false;
  eventTaskDefault = EventTask.SAVE_DATABASE;
  EventTask = EventTask;


  @ViewChild('searchInput') searchInputField: ElementRef;
  @ViewChild('paginator-device-table') paginatorDeviceTable: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() apollo: ApolloWidgetContext;
  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog, private ngZone: NgZone, protected store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
