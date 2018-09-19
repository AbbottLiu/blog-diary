import { Component, OnInit } from '@angular/core';
import { Page } from '@shared/sys/sys.entity';
import { Model } from '@shared/act/act.entity';
import { ActService } from '@shared/act/act.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SimpleTableColumn } from '@delon/abc';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'act-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.less']
})
export class ModelComponent implements OnInit {

  public page: Page<any> = new Page<any>();
  public model: Model = new Model();

  constructor(private http: ActService, private message: NzMessageService) { }

  ngOnInit() {
  }
  // 显示 查询 条件
  // tslint:disable-next-line:member-ordering
  public open = false;
  public openSearch() {
    this.open = !this.open;
  }
  public searchPager() {
    this.page.size = this.ps;
    this.page.current = this.pi;
    this.http.getModelPager(this.page).subscribe(
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

  public addRole() {
    this.model = new  Model();
    this.modelModal = true;
    // this.http.addRole(this.role).subscribe(
    //   (res) => { this.message.success(res as string ), this.searchPager(); }
    // );
  }

  public updateRole(model: Model) {
    this.model = model;
    console.log(model);
    this.modelModal = true;
    // this.http.updateRole(this.role).subscribe(
    //   (res) => { this.message.success(res as string ), this.searchPager(); }
    // );
  }
  public  deleteRole(model: Model) {
    this.http.deleteModel(model).subscribe(
      (res) => { this.message.success(res as string ), this.searchPager(); }
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
    { title: '名称' , index: 'name', width: '60px' },
    { title: 'key', index: 'key', fixed: 'left', width: '80px' },
    // { title: '描述', index: 'description', fixed: 'left', width: '80px' },
    { title: '版本', index: 'revision', fixed: 'left', width: '80px' },
    // { title: '状态', index: 'enabled',
    //   // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //   filters: [  { text: 'true', value: '启用' }, { text: 'false' , value: '禁用' }], filterMultiple: false, filter: () => true, sorter: () => true, width: '85px' },
    { title: '更新日期', index: 'lastUpdateTime', type: 'date', dateFormat: 'YYYY-MM-DD HH:MM:SS', fixed: 'right', width: '100px' },
    { title: '操作', buttons: [
      {
      text: '删除',
      type: 'del',
      click: ((any) => {this.deleteRole(any); } ),
      },
      {
      text: '编辑',
      type: 'none',
      // component: UserModalComponent,
      click: ((any) => {this.updateRole(any); })
      }
  ], width: '150px' },
];
  change(any) {
    this.pi = any.pi;
    this.ps = any.ps;
    this.searchPager();
  }
// model-modal 操作
// tslint:disable-next-line:member-ordering
public modelModal = false;


}
