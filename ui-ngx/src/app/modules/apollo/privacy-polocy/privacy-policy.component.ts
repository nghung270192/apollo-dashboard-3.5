///
/// Copyright © 2021-2022 The Apollo Dien Quang Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tb-privacy-polocy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  logo = 'assets/apollo/image/apollo_logo.svg';

/*  gotoThingsboard(): void {
    window.open('https://smart.dienquang.com', '_blank');
  }*/

  constructor() { }

  ngOnInit(): void {
  }

}
