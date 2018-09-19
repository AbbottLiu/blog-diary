import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef, HostListener, TemplateRef } from '@angular/core';
import {  NzDropdownContextComponent, NzTreeNode, NzFormatEmitEvent, NzDropdownService, NzMessageService } from 'ng-zorro-antd';
import { Menu } from '@delon/theme';
import { SysService } from '@shared/sys/sys.service';
import {SimpleTableComponent, SimpleTableColumn, SimpleTableData} from '@delon/abc';
import { Page } from '@shared/sys/sys.entity';
import { MenuEntity } from '../../../shared/sys/sys.entity';
import { HttpClient } from '@angular/common/http';
export interface TreeNodeInterface {
  key: number;
  id: string ;
  name: string;
  age: number;
  level: number;
  expand: boolean;
  address: string;
  children?: TreeNodeInterface[];
}
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sys-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
    ngOnInit(): void {
    }
    constructor(private http: SysService, private message: NzMessageService) {

    }

    // tslint:disable-next-line:member-ordering
    public  loading: boolean;
    openSearch() {
      this.open = !this.open;
    }
    reset() {
      this.page = new Page<any>();
    }
    searchPager() {
      // this.http.getMenuPager(this.page).subscribe(
      //   (res) => { this.page.records = (res as Page<any>).records; },
      //   (err) => {}
      // );
      this.http.initMenu().subscribe(
        (res) => { const list = (res as MenuEntity[]); this.page.records = list ;  },
        (err) => {}
      );

    }
    deleteMenu(any) {
      this.http.deleteMenu(any).subscribe(
        (res) => { this.message.success(res as string) ; },
        (err) => { this.message.error(err as string) ; }
      );
        }
    updateMenu(any) {
      console.log(any);
      this.message.info(any);
    }
    // tslint:disable-next-line:member-ordering
    public page: Page<any> = new Page<any>();
    // tslint:disable-next-line:member-ordering
    public open = false;
    public addMenu() {
    }


    // simple-table
    // tslint:disable-next-line:member-ordering
    public columns: SimpleTableColumn[] = [
      { title: '名称', index: 'text', fixed: 'left', width: '100px' },
      { title: '国际化', index: 'i18n', fixed: 'left', width: '80px' },
      // { title: '状态', index: 'enabled',
      //   filters: [  { text: 'true', value: '启用' }, { text: 'false' , value: '禁用' }],
      // filterMultiple: false, filter: () => true, sorter: () => true, width: '85px' },
      { title: '路由', index: 'link' , width: '100px'},
      { title: '外部链接', index: 'externalLink' , width: '300px' },
      { title: '图标',  index: 'icon' , width: '100px'},
      // { title: '描述', index: 'roleDesc' , width: '300px' },
      { title: '创建日期', index: 'createDate', type: 'date', dateFormat: 'YYYY-MM-DD HH:MM:SS', fixed: 'right', width: '100px' },
      { title: '操作', buttons: [
        {
        text: '删除',
        type: 'del',
        click: ((any) => {this.deleteMenu(any); } ),
        },
        {
        text: '编辑',
        type: 'none',
        // component: UserModalComponent,
        click: ((any) => {this.updateMenu(any); })
        }
    ], width: '100px' },
  ];



  // tslint:disable-next-line:member-ordering
  expandDataCache = {};



  init() {
    this.page.records.forEach(item => {
      this.expandDataCache[ item.id ] = this.convertTreeToList(item);
      console.log(this.expandDataCache);
    });
  }

  // treeFormate(menus: MenuEntity[]) {
  //   for (const menu of menus) {
  //       menu.name = menu.text;
  //       if (menu.children !== [] || menu.children !== null || menu.children !== undefined) {
  //           menu.children = this.treeFormate(menu.children);
  //       }
  //   }
  //   return menus;
  // }


  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
    if (!hashMap[ node.id ]) {
      hashMap[ node.id ] = true;
      array.push(node);
    }
  }

}
