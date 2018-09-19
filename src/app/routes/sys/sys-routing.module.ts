import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SysModule } from './sys.module';
import { DeptComponent } from './dept/dept.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PermissionComponent } from './permission/permission.component';
import { MenuComponent } from './menu/menu.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '' , redirectTo: 'dept', pathMatch: 'full'},
  { path: 'dept', component: DeptComponent , data: { title: '部门', titleI18n: 'sys-dept'} },
  { path: 'user', component: UserComponent , data: { title: '用户', titleI18n: 'sys-user'} },
  { path: 'role', component: RoleComponent , data: { title: '角色', titleI18n: 'sys-role'} },
  { path: 'menu', component: MenuComponent , data: { title: '菜单', titleI18n: 'sys-menu'} },
  { path: 'test', component: TestComponent },
  { path: 'permission', component: PermissionComponent , data: { title: '权限', titleI18n: 'sys-permission'} }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SysRoutingModule { }
