import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SysService } from '@shared/sys/sys.service';
import { DeptComponent } from '../../routes/sys/dept/dept.component';
import { DeptTreeComponent } from '@shared/sys/Dept-tree/Dept-tree.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { FormsModule} from '@angular/forms';
import { DeptTreeReadComponent } from './deptTreeRead/deptTreeRead.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { DivTreeSelectComponent } from './divTreeSelect.component';
import { RoleModalComponent } from '@shared/sys/role-modal/role-modal.component';
import { MenuModalComponent } from '@shared/sys/menu-modal/menu-modal.component';
import { UploadComponent } from './upload/upload.component';
import { MenuTableComponent } from '@shared/sys/menu-table/menu-table.component';
import { DataModalComponent } from '@shared/sys/data-modal/data-modal.component';
import { DateRangeComponent } from '@shared/sys/dateRange/dateRange.component';
const COMPONENT = [ UploadComponent, MenuModalComponent, MenuTableComponent ,  DataModalComponent,
   RoleModalComponent, DeptTreeComponent , DeptTreeReadComponent,
   UserModalComponent, DivTreeSelectComponent];
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgZorroAntdModule,
      NgZorroAntdModule.forRoot(),
      AlainThemeModule.forRoot()
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [...COMPONENT],
    providers: [SysService],
    // tslint:disable-next-line:max-line-length
    exports: [...COMPONENT],
    entryComponents: [ UserModalComponent ]
})
export class SysModule {
  // static forRoot() {
  //   return {
  //     ngModule: SysModule,
  //     providers: [
  //       SysService,
  //     ]
  //   };
  // }
}
