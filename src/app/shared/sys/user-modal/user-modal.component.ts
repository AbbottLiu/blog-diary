import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { User, Dept } from '@shared/sys/sys.entity';
import { SysService } from '../sys.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-modal',
    templateUrl: './user-modal.component.html',
    styles: []
})
export class UserModalComponent implements OnInit , OnChanges {

    constructor(private http: SysService, private message: NzMessageService) {
    }

    ngOnInit() {
    }
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {

      if ( this.userVisible) {
        if ( this.user.deptId !== null && this.user.deptId !== undefined && this.user.deptId !== '') {
          const dept = new Dept();
          dept.id = this.user.deptId;
          this.http.getCurrentDept(dept).subscribe(
            (res) => {this.user.dept = (res as Dept), console.log(this.user); },
            (err) => {console.log(err) ; },
            () => {}
          );
        } else {
          this.user.dept = new Dept();
        }
      }
    }

    // tslint:disable-next-line:member-ordering
    @Input()
    public user: User;
    // tslint:disable-next-line:member-ordering
    @Output()
    public userChange: EventEmitter<User> = new EventEmitter<User>();

     // 用户 model
    // tslint:disable-next-line:member-ordering
    @Input()
    public userVisible: boolean;
    // tslint:disable-next-line:member-ordering
    @Output()
    public userVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public userCancel() {
    this.userVisible = false;
    this.user = new User();
    this.userVisibleChange.emit(false);
    this.userChange.emit(this.user);
    }
    public userOk() {

      this.userVisible = false;
      if (this.user.id !== null && this.user.id !== undefined && this.user.id !== '' ) {
        this.http.updateUser(this.user).subscribe(
          (res) => {this.message.success(res as string ); },
          (err) => { console.log(err); }
        );
      } else {
        this.http.addUser(this.user).subscribe(
          (res) => {this.message.success(res as string ); },
          (err) => { console.log(err); }
        );
      }
      this.userVisibleChange.emit(false);
      this.userChange.emit(this.user);

    }
  // 部门Modal 参数
  // tslint:disable-next-line:member-ordering
  deptTree = false;
  // tslint:disable-next-line:member-ordering
  deptTreeSelect = new Dept();
  openDeptTree() {
    this.deptTree = true;
  }
  deptTreeCancel() {
    this.deptTree = false;
  }
  public select(any) {
    this.deptTreeSelect = any;
  }
  deptTreeOk() {
    this.user.deptId = this.deptTreeSelect.id;
    this.user.dept = this.deptTreeSelect;
    this.deptTree = false;
   }
}
