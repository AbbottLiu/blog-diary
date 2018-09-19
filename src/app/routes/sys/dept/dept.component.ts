import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { SysService } from '@shared/sys/sys.service';
import { Page, User, Dept } from '@shared/sys/sys.entity';
import { SimpleTableColumn } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';
import { UserModalComponent } from '@shared/sys/user-modal/user-modal.component';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sys-dept',
    templateUrl: './dept.component.html',
    styleUrls: ['./dept.component.less']
})
export class DeptComponent implements OnInit {
    public  validateForm: FormGroup;
    public page: Page<any>;
    public dept: Dept;
    public columns: SimpleTableColumn[] = [
      { title: '序号' , render: 'custom', width: '60px' },
      { title: '用户名', index: 'username', fixed: 'left', width: '80px' },
      { title: '真实名', index: 'realName', fixed: 'left', width: '80px' },
      { title: '头像', index: 'avatar', type: 'img', width: '85px' },
      { title: '邮箱', index: 'email' , width: '100px' },
      { title: '电话', index: 'tel' , width: '100px'},
      { title: '性别', index: 'gender', width: '50px' },
      /// { title: '部门名称', index: 'dept.name' , fixed: 'right', width: '100px'},
      { title: '创建日期', index: 'createDate', type: 'date', dateFormat: 'YYYY-MM-DD HH:MM:SS', fixed: 'right', width: '100px' },
      { title: '操作', buttons: [
        {
        text: '删除',
        type: 'del',
        click: ((any) => {this.deleteUser(any); } ),
        },
        {
        text: '编辑',
        type: 'none',
        // component: UserModalComponent,
        click: ((any) => {this.updateUser(any); })
        }
    ], width: '100px' },
  ];
    constructor(private http: SysService, private message: NzMessageService) {
     //  this.page.condition.set('username', '');
     }

    ngOnInit() {
      this.page = new Page();
      this.user = new User();
        }
    // 选择部门
    public selectDept(any) {
      this.dept = any;
      this.searchPager();
    }
    public addUser() {
      this.userVisible = true;
    }
    public deleteUser(user: User) {
      this.http.deleteUser(user).subscribe(
        (res) => { this.message.success(res), this.searchPager(); },
      );
    }
    public updateUser(user: User) {
      this.user = user;
      this.userVisible = true;
    }
    public blur() {
      console.log(this.page);
    }
    // 用户 model
    // tslint:disable-next-line:member-ordering
    public userVisible = false;
    public userCancel() {
      this.userVisible = false;
    }
    public userOk() {
      this.userVisible = false;
    }

    //
    // tslint:disable-next-line:member-ordering
    public  open = false;
    openSearch() {
      this.open = !this.open;
    }
    reset() {
      this.page = new Page<any>();
      this.dept = new Dept();
      this.pi = 1;
      this.ps = 10;
      this.total = 0;
    }
    // tslint:disable-next-line:member-ordering
    public user: User;

    // tslint:disable-next-line:member-ordering
    public pi = 1;
    // tslint:disable-next-line:member-ordering
    public ps = 10;
    // tslint:disable-next-line:member-ordering
    public total = 0;
    public searchPager() {
      this.page.size = this.ps;
      this.page.current = this.pi;
      if ( this.dept !== null && this.dept !== undefined ) {
        this.page.condition.set('deptId', this.dept.id);
      }
      this.http.getUserPager(this.page).subscribe(
        (res) => {
          const pa = res as Page<any>;
          // pa.records.forEach (
          //   (item: any, index: number) => {
          //     item.index = index + 1;
          // });
          this.total = pa.total;
          this.page.records = pa.records;
         },
        (err) => {this.message.error(err.error); }
      );
    }
  change(any) {
    this.pi = any.pi;
    this.ps = any.ps;
    this.searchPager();
  }

}
