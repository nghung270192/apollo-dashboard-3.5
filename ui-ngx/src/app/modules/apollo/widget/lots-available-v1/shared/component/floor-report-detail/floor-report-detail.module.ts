import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorReportDetailComponent } from './floor-report-detail.component';



@NgModule({
    declarations: [
        FloorReportDetailComponent
    ],
    exports: [
        FloorReportDetailComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FloorReportDetailModule { }
