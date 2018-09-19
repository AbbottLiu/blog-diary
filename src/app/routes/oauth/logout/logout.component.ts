import { Component, OnInit, OnDestroy, Inject, Optional  } from '@angular/core';
import { SettingsService, _HttpClient, MenuService, Menu } from '@delon/theme';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
  JWTTokenModel,
  ITokenService,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { OauthService } from '../oauth.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'oauth-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.less']
})
export class LogoutComponent implements OnInit, OnDestroy {

    public token = '';
    public form: FormGroup;
    public error = '';
    public loading = false;
    constructor(
      fb: FormBuilder,
      private http: OauthService,
      private router: Router,
      public msg: NzMessageService,
      private menuService: MenuService,
      private httpClient: _HttpClient,
      private settingsService: SettingsService,
      @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
          console.log(tokenService);
      this.form = fb.group({

          userName: [tokenService.get(JWTTokenModel).name || null, [Validators.required, Validators.minLength(2)]],
          password: [tokenService.get(JWTTokenModel).password || null, Validators.required],
          remember: [true]
      });
  }

  ngOnInit() {
  }

  // region: fields

  public get userName() { return this.form.controls.userName; }
  public get password() { return this.form.controls.password; }


  // endregion

  public submit() {
      this.error = '';
      this.userName.markAsDirty();
      this.password.markAsDirty();
      if (this.userName.invalid || this.password.invalid) return;
      // mock http
      this.loading = true;
      this.http.login(this.userName.value,  this.password.value).subscribe(
          (res) => { this.token = (res as any).body , this.tokenService.set({
              token : this.token,
              name: this.userName.value,
              loginName: this.userName.value,
              email: `cipchk@qq.com`,
              id: 10000,
              time: +new Date
          }
          ) , this.loading = false,
          // 登录 成功 初始化 菜单
          this.httpClient.post('menu/init', this.tokenService.get(JWTTokenModel)).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              ( res ) => { this.menuService.clear();  this.menuService.add(res as Menu[]); },
              ( err) => {console.log(err); }
             );
          this.router.navigate(['/mes']) ; },
          (err) => {
              this.msg.error(err)
              , this.loading = false;
           },
          () => {

          }
      );
  }

  ngOnDestroy(): void {
  }

}
