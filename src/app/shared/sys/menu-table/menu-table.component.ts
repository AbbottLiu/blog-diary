import { Component, OnInit, Input, Output, EventEmitter,
   OnChanges, Optional, Inject, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { MenuEntity } from '@shared/sys/sys.entity';
import { SimpleTableColumn, SimpleTableButton} from './interface';
import { ModalHelperOptions, ALAIN_I18N_TOKEN,
  AlainI18NService, ModalHelper, _HttpClient, CNCurrencyPipe, YNPipe, DatePipe } from '@delon/theme';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { filter } from 'rxjs/operators';
import { ElementDef } from '@angular/core/src/view';
import { SimpleTableExport } from '@delon/abc/src/simple-table/simple-table-export';
import { DecimalPipe, DOCUMENT } from '@angular/common';
import { deepCopy } from '@delon/util';
export interface TreeNodeInterface {
  id: string;
  key: number;
  name: string;
  age: number;
  level: number;
  expand: boolean;
  address: string;
  child?: TreeNodeInterface[];
}
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'menu-table',
    templateUrl: './menu-table.component.html',
    styles: []
})
export class MenuTableComponent implements OnInit , OnChanges {

    constructor(
          private renderer: Renderer2,
          private router: Router,
          @Optional() private acl: ACLService,
          private modal: ModalHelper,
          @Optional()
          @Inject(ALAIN_I18N_TOKEN)
          private i18nSrv: AlainI18NService,
          @Inject(DOCUMENT) private doc: any,
        ) {
        }

    ngOnInit() {
      this._init = true;
      this.data = [];
      this.updateColumns();
      this.init();

    }
    // tslint:disable-next-line:member-ordering
    private _init = false;
    // tslint:disable-next-line:member-ordering
    @Input()
    data: MenuEntity[];
    // tslint:disable-next-line:member-ordering
    @Input()
    columns: Array<SimpleTableColumn>;
    // tslint:disable-next-line:member-ordering
    @Output()
    dataChange: EventEmitter<MenuEntity> = new EventEmitter<MenuEntity>();

    ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges) {
      if (changes.columns && this._init) this.updateColumns();
      this.init();
    }

    // tslint:disable-next-line:member-ordering
    expandDataCache = {};
    /**
     * 初始化 data 数据 新增 expand 等属性
     */
    init() {
      if ( this.data !== undefined && this.data !== null && this.data !== []) {
        if (this.data.length > 0) {
          this.data.forEach(item => {
            this.expandDataCache[ item.id ] = this.convertTreeToList(item);
          });
        }
      }
    }

    collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
      if ($event === false) {
        if (data.child) {
          data.child.forEach(d => {
            const target = array.find(a => a.id === d.id);
            target.expand = false;
            this.collapse(array, target, false);
          });
        } else {
          return;
        }
      }
    }

    convertTreeToList(root: object): TreeNodeInterface[] {
      const stack = [];
      const array = [];
      const hashMap = {};
      stack.push({ ...root, level: 0, expand: false });

      while (stack.length !== 0) {
        const node = stack.pop();
        this.visitNode(node, hashMap, array);
        if (node.child && node.hasChild) {
          for (let i = node.child.length - 1; i >= 0; i--) {
            stack.push({ ...node.child[ i ], level: node.level + 1, expand: false, parent: node });
          }
        }
      }
      return array;
    }

    visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
      if (!hashMap[ node.id ]) {
        hashMap[ node.id] = true;
        array.push(node);
      }
    }



     //#region buttons
  private _btnClick(e: any , btn: SimpleTableButton) {
    console.log(e);
    if (!btn.click) return;
    return btn.click(e);
  }

  _btnText(record: any, btn: SimpleTableButton) {
    if (btn.format) return btn.format(record, btn);
    return btn.text;
  }

  //#endregion

  private updateColumns() {

    const copyColumens = deepCopy(this.columns) as SimpleTableColumn[];
    for (const item of copyColumens) {

    }
    console.log(copyColumens);

  }

}
