import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, Type} from '@angular/core';
import {WidgetContext} from '@home/models/widget-component.models';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {HOME_COMPONENTS_MODULE_TOKEN} from '@home/components/tokens';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {AttributeService} from '@core/http/attribute.service';
import {Authority} from '@shared/models/authority.enum';

@Component({
  selector: 'tb-smart-dashboard-v1',
  templateUrl: './smart-dashboard-v1.component.html',
  styleUrls: ['./smart-dashboard-v1.component.scss']
})
export class SmartDashboardV1Component implements OnInit, AfterViewInit {

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
      'lorawan'
    ];

    iconArr.forEach(icon => {
      this.matIconRegistry.addSvgIcon(icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/apollo/icon/${icon}.svg`)
      );
    });

    this.matIconRegistry.addSvgIcon('bulb_light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/bulb-light.svg')
    );

    this.matIconRegistry.addSvgIcon('spot_light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/spot-light.svg')
    );
    this.matIconRegistry.addSvgIcon('strip_light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/strip-light.svg')
    );

    this.matIconRegistry.addSvgIcon('unknown_light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/light-unknown.svg')
    );

    /*    this.matIconRegistry.addSvgIcon("unknown_light",
          this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/apollo/icon/light-unknown.svg")
        );*/


    this.matIconRegistry.addSvgIcon('unknown_device',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/device-unknown.svg')
    );

    this.matIconRegistry.addSvgIcon('gateway_v1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/gateway_v1.svg')
    );
    this.matIconRegistry.addSvgIcon('hub_v1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/hub_v1.svg')
    );
    this.matIconRegistry.addSvgIcon('rgb_control',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/rgb-control.svg')
    );

    this.matIconRegistry.addSvgIcon('set-lightness-0',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/set-lightness-0.svg')
    );
    this.matIconRegistry.addSvgIcon('set-lightness-10',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/set-lightness-10.svg')
    );
    this.matIconRegistry.addSvgIcon('set-lightness-50',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/set-lightness-50.svg')
    );
    this.matIconRegistry.addSvgIcon('set-lightness-80',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/set-lightness-80.svg')
    );
    this.matIconRegistry.addSvgIcon('set-lightness-100',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/set-lightness-100.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-temperature',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/temperature.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-humidity',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/humidity.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-light.svg')
    );
    this.matIconRegistry.addSvgIcon('smart-button',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/smart-button.svg')
    );
    this.matIconRegistry.addSvgIcon('water-sensor',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/water-sensor.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-scene',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-scene.svg')
    );
    this.matIconRegistry.addSvgIcon('map-view',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/map-view.svg')
    );
    this.matIconRegistry.addSvgIcon('air-conditioner',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/air-conditioner.svg')
    );
    this.matIconRegistry.addSvgIcon('curtains-opened',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/curtains.svg')
    );
    this.matIconRegistry.addSvgIcon('curtains-closed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/curtains-closed.svg')
    );
    this.matIconRegistry.addSvgIcon('media-player',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/media-player.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-group-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-group-light.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-group-scene',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-group-scene.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-binary-input',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/binary_input.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-motion-binary-input',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-motion-sensor.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-smoke-binary-input',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-motion-sensor.svg')
    );
    this.matIconRegistry.addSvgIcon('iot-common-sensor',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-common-sensor.svg'));

    this.matIconRegistry.addSvgIcon('iot-light-switch',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/apollo/icon/iot-light-switch.svg'));


  }

  ngAfterViewInit(): void {
    if (this.ctx && this.ctx.currentUser.authority !== Authority.SYS_ADMIN) {
      this.apollo = new ApolloWidgetContext(this.ctx, this.store);
      console.log(this.apollo);
      this.enable = true;
    }
  }
}
