import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { SysService } from '@shared/sys/sys.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Role } from '@shared/sys/sys.entity';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'role-modal',
    templateUrl: './role-modal.component.html',
    styles: []
})
export class RoleModalComponent implements OnInit , OnChanges {


  constructor(private http: SysService, private message: NzMessageService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {

    // if ( this.roleVisible) {
    //   if ( this.user.deptId !== null && this.user.deptId !== undefined && this.user.deptId !== '') {
    //     const dept = new Dept();
    //     dept.id = this.user.deptId;
    //     this.http.getCurrentDept(dept).subscribe(
    //       (res) => {this.user.dept = (res as Dept), console.log(this.user); },
    //       (err) => {console.log(err) ; },
    //       () => {}
    //     );
    //   } else {
    //     this.user.dept = new Dept();
    //   }
    // }
  }

  // tslint:disable-next-line:member-ordering
  @Input()
  public role: Role;
  // tslint:disable-next-line:member-ordering
  @Output()
  public roleChange: EventEmitter<Role> = new EventEmitter<Role>();

   // 用户 model
  // tslint:disable-next-line:member-ordering
  @Input()
  public roleVisible: boolean;
  // tslint:disable-next-line:member-ordering
  @Output()
  public roleVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public roleCancel() {
  this.roleVisible = false;
  this.role = new Role();
  this.roleVisibleChange.emit(false);
  this.roleChange.emit(this.role);
  }
  public roleOk() {

    this.roleVisible = false;
    if (this.role.id !== null && this.role.id !== undefined && this.role.id !== '' ) {
      this.http.updateRole(this.role).subscribe(
        (res) => {this.message.success(res as string ); },
        (err) => { console.log(err); }
      );
    } else {
      this.http.addRole(this.role).subscribe(
        (res) => {this.message.success(res as string ); },
        (err) => { console.log(err); }
      );
    }
    this.roleVisibleChange.emit(false);
    this.roleChange.emit(this.role);

  }

}
