import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'image-Modal',
    templateUrl: './imageModal.component.html',
    styleUrls: ['./imageModal.component.less']
})
export class ImageModalComponent implements OnInit {

  @Input()
  nzVisible: boolean|false;
  @Output()
  nzVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  nzTitle: string |'标题';
  @Input()
  nzWidth: string |'520px';

  constructor( private msg: NzMessageService) { }

  ngOnInit() {
  }

  // upload 组件
  ok() {
    this.nzVisible = false;
    this.nzVisibleChange.emit(this.nzVisible);
  }


}
