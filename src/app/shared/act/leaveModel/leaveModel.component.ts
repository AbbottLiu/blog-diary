import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { ActService } from '@shared/act/act.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Leave } from '@shared/act/act.entity';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'act-leave-Model',
    templateUrl: './leaveModel.component.html',
    styleUrls: ['./leaveModel.component.less']
})
export class LeaveModelComponent implements OnInit, OnChanges {

  constructor(
    private http: ActService,
    private message: NzMessageService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {

    // if ( this.leaveVisible) {
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
  public leave: Leave;
  // tslint:disable-next-line:member-ordering
  @Output()
  public leaveChange: EventEmitter<Leave> = new EventEmitter<Leave>();

   // 用户 model
  // tslint:disable-next-line:member-ordering
  @Input()
  public leaveVisible: boolean;
  // tslint:disable-next-line:member-ordering
  @Output()
  public leaveVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public leaveCancel() {
  this.leaveVisible = false;
  this.leave = new Leave();
  this.leaveVisibleChange.emit(false);
  this.leaveChange.emit(this.leave);
  }
  public leaveOk() {

    this.leaveVisible = false;
    if (this.leave.id !== null && this.leave.id !== undefined && this.leave.id !== '' ) {
      this.http.updateLeave(this.leave).subscribe(
        (res) => {this.message.success(res as string ); },
        (err) => { console.log(err); }
      );
    } else {
      this.http.addLeave(this.leave).subscribe(
        (res) => {this.message.success(res as string ); },
        (err) => { console.log(err); }
      );
    }
    this.leaveVisibleChange.emit(false);
    this.leaveChange.emit(this.leave);
  }


}
