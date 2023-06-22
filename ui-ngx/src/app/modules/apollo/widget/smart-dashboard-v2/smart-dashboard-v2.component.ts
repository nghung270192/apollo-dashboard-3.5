import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, Type} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {HOME_COMPONENTS_MODULE_TOKEN} from '@home/components/tokens';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {AttributeService} from '@core/http/attribute.service';
import {Authority} from '@shared/models/authority.enum';

@Component({
  selector: 'tb-smart-dashboard-v2',
  templateUrl: './smart-dashboard-v2.component.html',
  styleUrls: ['./smart-dashboard-v2.component.scss']
})
export class SmartDashboardV2Component implements OnInit, AfterViewInit {

  apollo: ApolloWidgetContext;
  @Input() ctx: WidgetContext;

  enable = false;

  constructor(
    private store: Store<AppState>,
    @Inject(HOME_COMPONENTS_MODULE_TOKEN) public homeComponentsModule: Type<any>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private attributeService: AttributeService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef) {
    this.iconInit();
  }

  ngOnInit(): void {
    /*  const result = PRODUCT_ID.map(obj => `'${obj.pid.toString(16)}':'${obj.pid2Enum}'`);
      console.log(result);*/

  }

  iconInit() {
    const iconArr: Array<string> = [
      'dqhome.re1',
      'dqhome.re2',
      'dqhome.re3',
      'dqhome.re4',
      'dqhome.re6',
      'lumi.remote.b1acn01',
      'lumi.remote.b286acn01',
      'lumi.sensor_motion.aq2',
      'lumi.sensor_wleak.aq1',
      'lumi.vibration.aq1',
      'lumi.weather',
      'automation',
      'tube-light',
      'temperature',
      'motion-sensor',
      'light-bulb-v2',
      'bulb-light-rgb-v4',
      'iot-motion-sensor',
      'bluetooth',
      'wifi',
      'zigbee',
      'lorawan',
      'power',
      'bulb-radar',
      'bulb-light',
      'spot-light',
      'strip-light',
      'light-unknown',
      'device-unknown',
      'gateway_v1',
      'hub_v1',
      'rgb-control',
      'temperature',
      'humidity',
      'iot-light',
      'smart-button',
      'water-sensor',
      'iot-scene',
      'map-view',
      'air-conditioner',
      'curtains',
      'curtains-closed',
      'media-player',
      'iot-group-light',
      'iot-group-scene',
      'iot-binary-input',
      'iot-motion-binary-input',
      'iot-smoke-binary-input',
      'iot-common-sensor',
      'iot-light-switch',
      'rfid'
    ];

    iconArr.forEach(icon => {
      this.matIconRegistry.addSvgIcon(icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/apollo/icon/${icon}.svg`)
      );
    });

  }

  ngAfterViewInit(): void {
    if (this.ctx && this.ctx.currentUser.authority !== Authority.SYS_ADMIN) {
      this.apollo = new ApolloWidgetContext(this.ctx, this.store);
      console.log(this.apollo);
      this.enable = true;
    }
  }
}
