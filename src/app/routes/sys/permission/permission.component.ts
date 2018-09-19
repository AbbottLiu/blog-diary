import { Component, OnInit } from '@angular/core';
import { ModalColumn } from '@shared/sys/sys.interface';
import { Menu } from '@delon/theme';
import { MenuEntity, Page } from '../../../shared/sys/sys.entity';
import { SimpleTableColumn } from '@delon/abc';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sys-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.less']
})
export class PermissionComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    // tslint:disable-next-line:member-ordering
    public modalColumns: ModalColumn[] = [
      { title: '名称', index: 'text',  width: '100px' , placeholder: '请输入名称'},
      { title: '国际化', index: 'i18n',  width: '80px' },
      // { title: '状态', index: 'enabled',
      //   filters: [  { text: 'true', value: '启用' }, { text: 'false' , value: '禁用' }],
      // filterMultiple: false, filter: () => true, sorter: () => true, width: '85px' },
      { title: '路由', index: 'link' , width: '100px'},
      { title: '外部链接', index: 'externalLink' , width: '300px' },
      { title: '图标',  index: 'icon' , width: '100px'},
      // { title: '描述', index: 'roleDesc' , width: '300px' },
      { title: '创建日期', index: 'createDate', type: 'date', dateFormat: 'YYYY-MM-DD HH:MM:SS', fixed: 'right', width: '100px' }
  ];
  // tslint:disable-next-line:member-ordering
  public data: MenuEntity = new  MenuEntity();
  // tslint:disable-next-line:member-ordering
  public title = '菜单';
  // tslint:disable-next-line:member-ordering
  public vizitable = false;

/*** 查询操作*********/

  // tslint:disable-next-line:member-ordering
  public open = false;
  // tslint:disable-next-line:member-ordering
  public page = new Page<any>();

  public openSearch() {
    this.open = !this.open;
  }

  public addPermission() {
    this.vizitable = true;
    this.data = new MenuEntity();
  }

  public reset() {

  }


  public searchPager() {

  }
  public change(any) {
    this.pi = any.pi;
    this.ps = any.ps;
    this.searchPager();
  }

  // tslint:disable-next-line:member-ordering
  public pi = 1;
  // tslint:disable-next-line:member-ordering
  public ps = 0;
  // tslint:disable-next-line:member-ordering
  public total = 0;
  // tslint:disable-next-line:member-ordering
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
      click: ((any) => {this.deletePermission(any); } ),
      },
      {
      text: '编辑',
      type: 'none',
      // component: UserModalComponent,
      click: ((any) => {this.updatePermission(any); })
      }
  ], width: '100px' },
  ];

  public  deletePermission(any) {

  }
  public updatePermission(any) {

  }
}
