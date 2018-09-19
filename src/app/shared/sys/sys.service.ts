import { Injectable } from '@angular/core';
import { _HttpClient, } from '@delon/theme';
import { Dept, Page, User, Role, MenuEntity } from '@shared/sys/sys.entity';
import { PageUtils } from '@shared/sys/utils/PageUtils';
import { valueFunctionProp } from 'ng-zorro-antd/src/core/util/convert';
/**
 *
 *
 * @export
 * @class SysService
/**
 *
 *
 * @export
 * @class SysService
 */
@Injectable()
export class SysService {

    constructor(private http: _HttpClient ) {}
    /**
     * 获取顶级父部们
     */
    getParentDept() {
      return this.http.get('dept/parent');
    }
    /**
     *根据父部们 获取子部门
     * @memberof SysService
     */
    getChildrenByParent(parent: Dept) {
      return this.http.post('dept/children', parent);
    }
    /**
     * 添加 部门
     * @param dept
     */
    addDept(dept: Dept) {
      return this.http.post('dept/add', dept);
    }
    /**
     *  删除部门
     * @param dept
     */
    deleteDept(dept: Dept) {
      return this.http.post('dept/delete', dept);
    }
    /**
     *修改部门
     * @param {Dept} dept
     * @memberof SysService
     */
    updateDept(dept: Dept) {
      return this.http.post('dept/modify', dept);
    }
    /**
     *根据 部门 Id 获取 部门信息
     */
    getParentDeptByDept(dept: Dept) {
      return this.http.post('dept/parent', dept);
    }
    /**
     *获取当前部门
     */
    getCurrentDept(dept: Dept) {
      return this.http.post('dept/current', dept);
    }
    /**
     *验证 部门名称
     * @param {String} name
     * @returns
     * @memberof SysService
     */
    validateDeptName(name: String ) {
      return this.http.get('dept/name', { name: name });
    }
    /**
     *验证 部门代码
     * @param {String} code
     * @returns
     * @memberof SysService
     */
    validateDeptCode(code: String) {
      return this.http.get('dept/code', { code: code });
    }
        /**
     *验证 部门名称
     * @param {String} name
     * @returns
     * @memberof SysService
     */
    validateDeptName1(name: String ) {
      return this.http.get('dept/name1', { name: name });
    }
    /**
     *验证 部门代码
     * @param {String} code
     * @returns
     * @memberof SysService
     */
    validateDeptCode1(code: String) {
      return this.http.get('dept/code1', { code: code });
    }
/*****************************用户 操作**************************************************************/
    getUserPager(page: Page<any>) {
      const pa = PageUtils.pageDeleteList(page);
      return this.http.post('user/search', pa);
    }

    deleteUser(user: User) {
      return this.http.delete('user/delete', {id: user.id} );
    }
    updateUser(user: User) {
      return this.http.post('user/modify', user);
    }
    addUser(user: User) {
      return this.http.post('user/add', user);
    }
 /*****************************角色 操作**************************************************************/
    getRolePager(page: Page<Role>) {
      const pa = PageUtils.pageDeleteList(page);
      return this.http.post('role/search', pa);
    }
    deleteRole(role: Role) {
      return this.http.delete('role/delete', {id: role.id} );
    }
    updateRole(role: Role) {
      return this.http.put('role/update', role);
    }
    addRole(role: Role) {
      return this.http.post('role/add', role);
    }
  /*****************************菜单 操作**************************************************************/
    getMenuPager(page: Page<MenuEntity>) {
      const pa = PageUtils.pageDeleteList(page);
      return this.http.post('menu/search', pa);
    }
    deleteMenu(menu: MenuEntity) {
      return this.http.post('menu/delete', menu );
    }
    updateMenu(menu: MenuEntity) {
      return this.http.put('menu/update', menu);
    }
    addMenu(menu: MenuEntity) {
      return this.http.post('menu/add', menu);
    }
    initMenu() {
      return this.http.get('menu/init');
    }
  /*****************************图片 操作**************************************************************/
    removImage(any) {
      return this.http.delete('upload/user/image/delete', {imageUrl: any});
    }
  /********************************通用 modal url ***************************************/
  updateData(url: string , data: any) {
    return this.http.post(url + '/update', data);
  }
  addData(url: string , data: any) {
    return this.http.put(url + '/add', data);
  }
}

