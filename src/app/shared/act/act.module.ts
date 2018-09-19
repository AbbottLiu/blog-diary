import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ActService } from './act.service';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { ModelModalComponent } from './modelModal/modelModal.component';
import { LeaveModelComponent } from './leaveModel/leaveModel.component';
import { DateRangeComponent } from '@shared/sys/dateRange/dateRange.component';
import { ImageModalComponent } from './imageModal/imageModal.component';
const SERVICES = [ActService];
const COMPONENTS = [ModelModalComponent, LeaveModelComponent, DateRangeComponent, ImageModalComponent];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        NgZorroAntdModule.forRoot(),
        AlainThemeModule.forRoot()
    ],
    declarations: [...COMPONENTS],
    providers: [...SERVICES],
    exports: [...COMPONENTS],
    entryComponents: []
})
export class ActModule { }
