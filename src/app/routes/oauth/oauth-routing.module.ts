import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login' , pathMatch: 'full'},
  {path: 'logout', component: LogoutComponent , data: { title: '登出', titleI18n: 'pro-logout'  }},
  {path: 'login', component: LoginComponent , data: { title: '登录', titleI18n: 'pro-login'  }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
