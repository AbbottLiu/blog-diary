import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { Menu } from '@delon/theme';
import { HostListener } from '@angular/core';
import { ObjectLayoutWidget } from '@delon/form';
import { Console } from '@angular/core/src/console';
export class BaseEntity {
  constructor(
      public id?: string,
      public createDate?: Date,
      public modifyDate?: Date,
      public deleteStatus?: boolean
  ) {}
}

export class Page<T> {
  constructor(
    // 总数
    public total?: number,
    // 每页 数量
    public size?: number,
    // 当前 页
    public current?: number,
    // 升序 参数
    public ascs?: Array<String>,
    // 降序 参数
    public descs?: Array<String>,
    // 查询参数
    public condition?: Map<String, Object> ,
    // 查询列表
    public records?: Array<T>
  ) {
    this.condition = new Map<String, Object>();
    this.ascs = new Array<String>();
    this.descs = new Array<String>();
  }
}
export class Dept extends BaseEntity {
  // code: any;
  // name: any;
  constructor(
    public name?: string,
    public hasChildren?: boolean,
    public code?: string,
    public parentId?: string,
    public sort?:  Number,
    public children?: 	Array<Dept>,
    public parentDept?:  Dept
  ) {
    super();
    this.name = '';
    this.parentDept = { name: ''};
  }
}

export class MenuEntity implements Menu {

  [key: string]: any;
  text: string;
  i18n?: string;
  group?: boolean;
  link?: string;
  externalLink?: string;
  target?:  '_blank' | '_self' | '_parent' | '_top';
  icon?: string;
  badge?: number;
  badge_dot?: boolean;
  badge_status?: string;
  hide?: boolean;
  acl?: any;
  shortcut?: boolean;
  shortcut_root?: boolean;
  reuse?: boolean;
  children?: Menu[];
  parentMenu?: MenuEntity;
  parentId?: string;
  _type?: number;
  _selected?: boolean;
  _hidden?: boolean;
  _open?: boolean;
  _depth?: number;
  name?: string;
  id?: string;
  constructor(
      hasChild?: boolean,
      id?: any,
      key?: any,
      text?: string,
      i18n?: string,
      group?: boolean,
      link?: string,
      externalLink?: string,
      target?:  '_blank' | '_self' | '_parent' | '_top',
      icon?: string,
      badge?: number,
      badge_dot?: boolean,
      badge_status?: string,
      hide?: boolean,
      acl?: any,
      shortcut?: boolean,
      shortcut_root?: boolean,
      reuse?: boolean,
      children?: MenuEntity[],
      parentMenu?: MenuEntity,
      parentId?: string,
      _type?: number,
      _selected?: boolean,
      _hidden?: boolean,
      _open?: boolean,
      _depth?: number,
      name?: string
  ) {
     this.text = '';
     this.parentMenu = { name: '', text: ''};
  }


}
export class User extends BaseEntity {
  constructor(
    public id?: string,
    public password?: string,
    public realName?: string,
    public email?: string,
    public tel?: string,
    public gender?: string,
    public deptId?: string,
    public avatar?: string,
    public username?: string,
    public createDate?: Date ,
    public updateDate?:  Date ,
    public authorities?: Role,
    public dept?: Dept
  ) {
    super();
    this.dept = new Dept();
  }
}
export class Role extends BaseEntity {
  constructor (
    public roleName?: string ,
    public roleDesc?: string,
    public type?: string,
    public sort?: string,
     public enabled?: string,
    public menus?: Array<Menu>
    //  public permissions?: 	Array<Permission>
  ) {
    super();
  }
}

