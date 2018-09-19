import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Model } from '@shared/act/act.entity';
import { HttpResponse, HttpRequest, HttpClient } from '@angular/common/http';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { ObjectUtil } from '../../util/OblectUtil';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'act-model-Modal',
    templateUrl: './modelModal.component.html',
    styleUrls: ['./modelModal.component.less']
})
export class ModelModalComponent implements OnInit {
    @Input()
    nzVisible: boolean|false;
    @Output()
    nzVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input()
    nzTitle: string |'标题';
    @Input()
    nzWidth: string |'520px';
    @Input()
    model: Model = new Model();

    constructor(private http: HttpClient, private msg: NzMessageService) { }

    ngOnInit() {
    }

    // tslint:disable-next-line:member-ordering
    current = 0;
    pre(): void {
      this.current -= 1;
    }

    next(): void {
      this.current += 1;
    }

    // upload 组件
    // tslint:disable-next-line:member-ordering
    file: UploadFile[] = [] ;
    beforeUpload = (file: UploadFile): boolean => {
      console.log(file);
      const isBPMN = file.type === 'text/xml';
      if (!isBPMN) {
        this.msg.error('不支持的文件类型!');
      } else {
        this.file.push(file);
      }
      return false;
    }
    handleUpload(): void {
      const formData = new FormData();
      // tslint:disable-next-line:no-any{
        formData.append('file', this.file[0] as any);
      // You can use any AJAX library you like
      const req = new HttpRequest('POST', 'model/upload' + ObjectUtil.transformRequest(this.model), formData, {
        // processData: fasle;
         reportProgress: true,
      });
      this.http
        .request(req)
        .pipe(filter(e => e instanceof HttpResponse))
        .subscribe(
          (event: {}) => {
            this.msg.success('保存成功');
          },
          err => {
            this.msg.error('保存失败');
          },
          () => {
            this.file = [];
          }
        );
    }
    // 取消
    cancle() {
      this.file = [];
      this.nzVisible = false;
      this.nzVisibleChange.emit(this.nzVisible);
    }
    ok() {
      this.nzVisible = false;
      this.nzVisibleChange.emit(this.nzVisible);
      this.handleUpload();
    }

}
