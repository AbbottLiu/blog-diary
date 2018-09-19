import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OauthService } from '../oauth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService, _HttpClient, SettingsService, Menu } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { Console } from '@angular/core/src/console';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oauth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  public token = '';
  public form: FormGroup;
  public error = '';
  public loading = false;
  constructor(
    fb: FormBuilder,
    private http: OauthService,
    private HttpClient: _HttpClient,
    private router: Router,
    public msg: NzMessageService,
    private menuService: MenuService,
    private httpClient: _HttpClient,
    private settingsService: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    //    console.log(tokenService);
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
    // this.HttpClient.get('login', { username: this.userName.value, password: this.password.value })
    // .subscribe(
    //   (res) => { console.log(res) , this.token = (res as any).body ; },
    //   () => {this.loading = this.HttpClient.loading; }
    // );
  //  this.loading = this.HttpClient.loading;
    this.http.login(this.userName.value,  this.password.value).subscribe(
        (res) => { this.token = (res as any).body , this.tokenService.set({
          token : this.token,
          name: this.userName.value,
          loginName: this.userName.value,
          email: `cipchk@qq.com`,
          id: 10000,
          time: +new Date
        }) , this.router.navigate(['/mes'])       //  this.initMenu()
        ; },
        (err) => {console.log(err) ; },
        () => {this.loading = false; }
      );

}

ngOnDestroy(): void {
}
// 初始化 menu 菜单
initMenu() {

         // 登录 成功 初始化 菜单
         this.httpClient.post('menu/init').subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          ( res ) => { this.menuService.clear();  this.menuService.add(res as Menu[]); },
          ( err) => {console.log(err); }
         );

}

}
