import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { DeptComponent } from './dept/dept.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PermissionComponent } from './permission/permission.component';
import { SysRoutingModule } from './sys-routing.module';
import { TestComponent } from './test/test.component';

@NgModule({
    imports: [ SharedModule, SysRoutingModule],
    declarations: [ MenuComponent , DeptComponent,  UserComponent, RoleComponent, PermissionComponent, TestComponent],
    providers: []
})
export class SysModule {
}
