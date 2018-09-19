import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';
// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import { SysModule } from '@shared/sys/sys.module';
import { ChartModule } from '@shared/chart/chart.module';
import { SafePipePipe } from '@shared/util/SafePipe.pipe';
import { BooleanPipe } from '@shared/util/Boolean.pipe';
import { ActModule } from '@shared/act/act.module';
import { DateRangeComponent } from '@shared/sys/dateRange/dateRange.component';

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
  UEditorModule,
  NgxTinymceModule,
];
// endregion

// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [BooleanPipe, SafePipePipe];
// endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forChild(),
    DelonABCModule.forRoot(),
    DelonACLModule,
    DelonFormModule,

    // third libs
    ...THIRDMODULES,
    SysModule,
    ActModule,
    ChartModule
    // .forRoot()
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    SysModule,
    ActModule,
    ChartModule
    // .forRoot()
  ],
})
export class SharedModule {}
