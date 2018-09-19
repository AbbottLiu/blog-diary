import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SysService } from '@shared/sys/sys.service';
import { ModalColumn } from '../sys.interface';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'data-modal',
    templateUrl: './data-modal.component.html',
    styles: []
})
export class DataModalComponent implements OnInit, OnChanges {


  constructor(private http: SysService, private message: NzMessageService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {

    // if ( this.dataVisible) {
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
    console.log(this.data);
    // this.dataChange.emit(this.data);
  }

  // tslint:disable-next-line:member-ordering Modal 列定义
  @Input()
  public columns: ModalColumn[];
  // tslint:disable-next-line:member-ordering modal 数据
  @Input()
  public data: any;
  // tslint:disable-next-line:member-ordering
  @Output()
  public dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  // tslint:disable-next-line:member-ordering modal 标题
  public title: string | '';
  @Input()
  // tslint:disable-next-line:member-ordering modal 标题
  public httpUrl: string | '';

   // 用户 model
  // tslint:disable-next-line:member-ordering
  @Input()
  public dataVisible: boolean;
  // tslint:disable-next-line:member-ordering
  @Output()
  public dataVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataCancel() {
  this.dataVisible = false;
  this.data = [];
  this.dataVisibleChange.emit(false);
  this.dataChange.emit(this.data);
  }
  public dataOk() {

    this.dataVisible = false;
    // if (this.data.id !== null && this.data.id !== undefined && this.data.id !== '' ) {
    //   this.http.updateData(this.httpUrl, this.data).subscribe(
    //     (res) => {this.message.success(res as string ); },
    //     (err) => { console.log(err); }
    //   );
    // } else {
    //   this.http.addData(this.httpUrl, this.data).subscribe(
    //     (res) => {this.message.success(res as string ); },
    //     (err) => { console.log(err); }
    //   );
    // }
    this.dataVisibleChange.emit(false);
    this.dataChange.emit(this.data);
  }

}
