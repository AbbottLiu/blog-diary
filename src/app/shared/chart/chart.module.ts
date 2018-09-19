import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LineComponent } from './line.component';
import { BarComponent } from './bar.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        NgZorroAntdModule.forRoot(),
        AlainThemeModule.forRoot()

    ],
    declarations: [LineComponent, BarComponent],
    providers: [],
    exports: [LineComponent, BarComponent],
    entryComponents: []
})
export class ChartModule { }
