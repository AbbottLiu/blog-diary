import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { OauthService } from './oauth.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OauthRoutingModule,
    SharedModule,
  ],
  declarations: [LoginComponent, LogoutComponent],
  providers: [OauthService]
})
export class OauthModule { }
