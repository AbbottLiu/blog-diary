import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { SysService } from '@shared/sys/sys.service';
import { User } from '@delon/theme';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'upload',
    templateUrl: './upload.component.html',
    styles: [`
    :host ::ng-deep i {
      font-size: 32px;
      color: #999;
    }
    :host ::ng-deep .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
    `]
})
export class UploadComponent implements OnInit, OnChanges {

  constructor(private http: SysService, private message: NzMessageService) {
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.user !== null && this.user.avatar !== undefined) {
      this.fileList = [
        {
        status: 'done',
        url: this.user.avatar
        }
      ];
    }
  }
  // 上传组件相关属性 方法
  uploadName = '';
  @Input()
  public user: User;
  @Output()
  public userChange: EventEmitter<User> = new EventEmitter<User>();
  fileList = [];
  previewImage = '';
  previewVisible = false;
  url = 'upload/user/image';

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  upload(any) {
  //   if (any.file.response !== undefined) {
  //       this.uploadName = any.file.response;
  //       }
            // 删除 操作
            if (any.file.status === 'removed') {
              // this.uploadName = any.file.response;
              this.http.removImage(any.file.url).subscribe(
                  (res) => { if (res as boolean) { this.user.avatar = null; }  },
                  (err) => { this.message.error(err); }
              );
              }
          // 上传 完毕 回写 名称 及 路径
          if (any.file.status === 'done') {
              this.user.avatar = any.file.response.url;
          }
  }

}
