/*
    Copyright ©  2021-2022 The Apollo Dien Quang Authors

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/


import {Component, OnInit} from '@angular/core';
import {AuthService} from '@core/auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {PageComponent} from '@shared/components/page.component';
import {FormBuilder} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Constants} from '@shared/models/constants';
import {Router} from '@angular/router';

import {OAuth2ClientInfo} from '@shared/models/oauth2.models';

@Component({
  selector: 'tb-intro',
  templateUrl: './intro-dashboard.component.html',
  styleUrls: ['./intro-dashboard.component.scss']
})
export class IntroDashboardComponent  {

  background = 'assets/apollo/image/apollo_logo.svg';

  introMp4 = 'assets/apollo/video/apollo_dashboard.mp4';
  introWebm = 'assets/apollo//video/apollo_dashboard.webm';
/*
  loginFormGroup = this.fb.group({
    username: '',
    password: ''
  });
  oauth2Clients: Array<OAuth2ClientInfo> = null;*/

  // constructor(protected store: Store<AppState>,
  //             private authService: AuthService,
  //             public fb: FormBuilder,
  //             private router: Router) {
  //   super(store);
  // }

  ngOnInit() {
    // this.oauth2Clients = this.authService.oauth2Clients;
  }

  gotoLogin(): void {
    window.open('https://smart.dienquang.com/home', '_blank');
  }
}
