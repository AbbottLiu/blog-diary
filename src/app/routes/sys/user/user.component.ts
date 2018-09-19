import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DeptTreeReadComponent } from '../../../shared/sys/deptTreeRead/deptTreeRead.component';
import { Dept } from '../../../shared/sys/sys.entity';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sys-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
    @ViewChild(DeptTreeReadComponent)
    dept: DeptTreeReadComponent;
    constructor() { }

    ngOnInit() {
      console.log(this.dept);
    }
    cilck(any) {
      console.log(this.dept.dept);
    }


}
