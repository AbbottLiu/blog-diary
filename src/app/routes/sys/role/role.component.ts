import { Component, OnInit } from '@angular/core';
import { SysService } from '@shared/sys/sys.service';
import { Page, User, Dept, Role } from '@shared/sys/sys.entity';
import { NzMessageService } from 'ng-zorro-antd';
import { SimpleTableColumn } from '@delon/abc';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sys-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
    public page: Page<any> = new Page<any>();
    public role: Role = new Role();

    constructor(private http: SysService, private message: NzMessageService) { }

    ngOnInit() {
    }
    // 显示 查询 条件
    // tslint:disable-next-line:member-ordering
    public open = false;
    public openSearch() {
      this.open = !this.open;
    }
    public searchPager() {
      this.page.size = this.ps;
      this.page.current = this.pi;
      this.http.getRolePager(this.page).subscribe(
        (res) => {
          const pa = res as Page<any>;
          // pa.records.forEach (
          //   (item: any, index: number) => {
          //     item.index = index + 1;
          // });
          this.total = pa.total;
          this.page.records = pa.records;
         },
        (err) => {this.message.error(err.error) ; }
      );
    }
    public reset() {
      this.page = new Page<any>();
    }

    public addRole() {
      this.role = new  Role();
      this.roleModal = true;
      // this.http.addRole(this.role).subscribe(
      //   (res) => { this.message.success(res as string ), this.searchPager(); }
      // );
    }

    public updateRole(role: Role) {
      this.role = role;
      this.roleModal = true;
      // this.http.updateRole(this.role).subscribe(
      //   (res) => { this.message.success(res as string ), this.searchPager(); }
      // );
    }
    public  deleteRole(role: Role) {
      this.http.deleteRole(role).subscribe(
        (res) => { this.message.success(res as string ), this.searchPager(); }
      );
    }

    // tslint:disable-next-line:member-ordering
    public pi = 1;
    // tslint:disable-next-line:member-ordering
    public ps = 10;
    // tslint:disable-next-line:member-ordering
    public total = 0;
    // format: (item: any) => { item = item === true ? 'true' : 'false' ; },
    // tslint:disable-next-line:member-ordering
    public columns: SimpleTableColumn[] = [
      { title: '序号' , render: 'custom', width: '60px' },
      { title: '名称', index: 'roleName', fixed: 'left', width: '80px' },
      { title: '类型', index: 'type', fixed: 'left', width: '80px' },
      { title: '状态', index: 'enabled',
        // tslint:disable-next-line:max-line-length
        filters: [  { text: 'true', value: '启用' }, { text: 'false' , value: '禁用' }], filterMultiple: false, filter: () => true, sorter: () => true, width: '85px' },
      { title: '排序号', index: 'sort' , width: '100px'},
      { title: '描述', index: 'roleDesc' , width: '300px' },
      { title: '创建日期', index: 'createDate', type: 'date', dateFormat: 'YYYY-MM-DD HH:MM:SS', fixed: 'right', width: '100px' },
      { title: '操作', buttons: [
        {
        text: '删除',
        type: 'del',
        click: ((any) => {this.deleteRole(any); } ),
        },
        {
        text: '编辑',
        type: 'none',
        // component: UserModalComponent,
        click: ((any) => {this.updateRole(any); })
        },
        {
          text: '权限',
          type: 'none',
          // component: UserModalComponent,
          click: ((any) => {this.updateRole(any); })
          }
    ], width: '150px' },
  ];
    change(any) {
      this.pi = any.pi;
      this.ps = any.ps;
      this.searchPager();
    }
  // role-modal 操作
  // tslint:disable-next-line:member-ordering
  public roleModal = false;

}
