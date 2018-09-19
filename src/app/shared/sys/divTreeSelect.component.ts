import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'div-TreeSelect',
    template: `    <nz-tree-select
                      style="width: 100px"
                      [nzShowLine]="true"
                      [nzNodes]="nodes"
                      nzShowSearch
                      [nzAllowClear]="true"
                      nzPlaceHolder="Please select"
                      [ngModel]="value"
                      [nzDropdownMatchSelectWidth]="true"
                      (ngModelChange)="onChange($event)">
                    </nz-tree-select>`,
    styles: []
})
export class DivTreeSelectComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    // tslint:disable-next-line:member-ordering
    @Input()
    public nodes: NzTreeNode[];
    // tslint:disable-next-line:member-ordering
    @Output()
    public value: NzTreeNode;
    // tslint:disable-next-line:member-ordering
    public valueChange: EventEmitter<NzTreeNode> = new EventEmitter<NzTreeNode>();
    onChange(any) {
      this.valueChange.emit(any);
    }

}
