import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SysService } from '@shared/sys/sys.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuEntity } from '@shared/sys/sys.entity';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'menu-modal',
    templateUrl: './menu-modal.component.html',
    styles: []
})
export class MenuModalComponent implements OnInit {
    constructor(private http: SysService, private message: NzMessageService) {
    }

    ngOnInit() {
    }
    // ngOnChanges(changes: {[propName: string]: SimpleChange}) {

    //   if ( this.userVisible) {
    //     if ( this.user.deptId !== null && this.user.deptId !== undefined && this.user.deptId !== '') {
    //       const dept = new Dept();
    //       dept.id = this.user.deptId;
    //       this.http.getCurrentDept(dept).subscribe(
    //         (res) => {this.user.dept = (res as Dept), console.log(this.user); },
    //         (err) => {console.log(err) ; },
    //         () => {}
    //       );
    //     } else {
    //       this.user.dept = new Dept();
    //     }
    //   }
    // }

    menuCancel() {

    }
    menuOk() {

    }

    // tslint:disable-next-line:member-ordering
    @Input()
    public menu: MenuEntity;
    // tslint:disable-next-line:member-ordering
    @Output()
    public menuChange: EventEmitter<MenuEntity> = new EventEmitter<MenuEntity>();

     // 用户 model
    // tslint:disable-next-line:member-ordering
    @Input()
    public menuVisible: boolean;
    // tslint:disable-next-line:member-ordering
    @Output()
    public menuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public userCancel() {
    this.menuVisible = false;
    this.menu = new MenuEntity();
    this.menuVisibleChange.emit(false);
    this.menuChange.emit(this.menu);
    }
    public userOk() {

      this.menuVisible = false;
      if (this.menu.id !== null && this.menu.id !== undefined && this.menu.id !== '' ) {
        this.http.updateMenu(this.menu).subscribe(
          (res) => {this.message.success(res as string ); },
          (err) => { console.log(err); }
        );
      } else {
        this.http.addMenu(this.menu).subscribe(
          (res) => {this.message.success(res as string ); },
          (err) => { console.log(err); }
        );
      }
      this.menuVisibleChange.emit(false);
      this.menuChange.emit(this.menu);

    }
  // 部门Modal 参数
  // deptTree = false;
  // deptTreeSelect = new Dept();
  // openDeptTree() {
  //   this.deptTree = true;
  // }
  // deptTreeCancel() {
  //   this.deptTree = false;
  // }
  // public select(any) {
  //   this.deptTreeSelect = any;
  // }
  // deptTreeOk() {
  //   this.user.deptId = this.deptTreeSelect.id;
  //   this.user.dept = this.deptTreeSelect;
  //   this.deptTree = false;
  //  }
}
