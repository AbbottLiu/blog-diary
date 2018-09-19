import { Component, OnInit } from '@angular/core';
import { ActService } from '../../../shared/act/act.service';
import { Leave } from '@shared/act/act.entity';
import { Page } from '@shared/sys/sys.entity';
import { NzMessageService } from 'ng-zorro-antd';
import { SimpleTableColumn } from '@delon/abc';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sip-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.less']
})
export class LeaveComponent implements OnInit {
    constructor(private http: ActService , private message: NzMessageService) { }
    ngOnInit() {
      // this.http.startLeave().subscribe(
      //   (res) => {console.log(res as string);
      //   },
      //   (err) => {},
      // );
    }
    // tslint:disable-next-line:member-ordering
    public page: Page<any> = new Page<any>();
    // tslint:disable-next-line:member-ordering
    public leave: Leave = new Leave();
    // 显示 查询 条件
    // tslint:disable-next-line:member-ordering
    public open = false;
    public openSearch() {
      this.open = !this.open;
    }
    public searchPager() {
      this.page.size = this.ps;
      this.page.current = this.pi;
      this.http.getLeavePager(this.page).subscribe(
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

    public addLeave() {
      this.leave = new  Leave();
      this.leaveModal = true;
      // this.http.addleave(this.leave).subscribe(
      //   (res) => { this.message.success(res as string ), this.searchPager(); }
      // );
    }

    public updateLeave(leave: Leave) {
      this.leave = leave;
      this.leave.startDate = new Date(leave.startDate);
      this.leave.endDate = new Date(leave.endDate);
      this.leaveModal = true;
      // this.http.updateleave(this.leave).subscribe(
      //   (res) => { this.message.success(res as string ), this.searchPager(); }
      // );
    }
    public  deleteLeave(leave: Leave) {
      this.http.deleteLeave(leave).subscribe(
        (res) => { this.message.success(res as string ), this.searchPager(); }
      );
    }
    public startLeave(leave: Leave) {
      this.http.startLeave(leave).subscribe(
        (res) => { this.message.success(res as string ) ; },
        (err) => { console.log(err ); }
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
      { title: '申请人', index: 'userId', fixed: 'left', width: '80px' },
      { title: '原因', index: 'reason', fixed: 'left', width: '100px' },
      { title: '状态', index: 'status' , width: '50px'},
      { title: '请假时间', render: 'dateRange' , fixed: 'left', width: '200px' },
      { title: '更新日期', index: 'updateDate', type: 'date', dateFormat: 'YYYY-MM-DD HH:MM:SS', fixed: 'right', width: '100px' },
      { title: '操作', buttons: [
        {
        text: '删除',
        type: 'del',
        click: ((any) => {this.deleteLeave(any); } ),
        },
        {
        text: '编辑',
        type: 'none',
        // component: UserModalComponent,
        click: ((any) => {this.updateLeave(any); })
        },
        {
          text: '送签',
          type: 'none',
          // component: UserModalComponent,
          click: ((any) => {this.startLeave(any); })
          }
    ], width: '150px' },
  ];
    change(any) {
      this.pi = any.pi;
      this.ps = any.ps;
      this.searchPager();
    }
  // leave-modal 操作
  // tslint:disable-next-line:member-ordering
  public leaveModal = false;

}
