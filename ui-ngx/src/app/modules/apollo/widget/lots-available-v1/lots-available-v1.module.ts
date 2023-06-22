import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LotsAvailabelSharedModule } from './shared/lots-availabel-shared.module';
import { LotsAvailableV1Component } from './lots-available-v1.component';

@NgModule({
  declarations: [LotsAvailableV1Component],
  imports: [CommonModule, SharedModule, LotsAvailabelSharedModule],
  exports: [LotsAvailableV1Component],
})
export class LotsAvailableV1Module {}
