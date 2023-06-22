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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IntroDashboardComponent} from './pages/intro-dashboard.component';
import {IntroHelpComponent} from './pages/intro-help.component';

@NgModule({
  declarations: [
    IntroDashboardComponent,
    IntroHelpComponent,
  ],
  imports: [
  ],exports:[
    IntroDashboardComponent,
    IntroHelpComponent,
  ]
})
export class IntroModule {
}
