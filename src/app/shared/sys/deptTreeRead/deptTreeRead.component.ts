import { Component, OnInit, Output, EventEmitter, AfterViewChecked, Input } from '@angular/core';
import { Dept } from '@shared/sys/sys.entity';
import { DeptUtils } from '@shared/sys/utils/DeptUtils';
import { SysService } from '@shared/sys/sys.service';
import { NzMessageService, NzDropdownContextComponent, NzTreeNode, NzDropdownService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dept-tree-read',
    template: `<nz-tree  [nzCheckable]="false" [nzShowLine]="true" [(ngModel)]="nodes"
                [nzAsyncData]="true" (nzClick)="active($event.node)" (nzExpandChange)="mouseAction($event)">
              <ng-template #nzTreeTemplate let-node>
              <span class="custom-node" draggable="true" aria-grabbed="true" [class.active]="activedNode?.key===node.key">
                <span *ngIf="!node.isLeaf" [class.shine-animate]="node.origin.isLoading">
                  <span class="folder-name">{{node.title}}</span>
                  <span class="folder-desc">{{node?.origin?.origin?.code}}</span>
                </span>
                <span *ngIf="node.isLeaf">
                  <i class="anticon anticon-file"></i>
                  <span class="file-name">{{node.title}}</span>
                  <span class="file-desc">{{node?.origin?.origin?.code}}</span>
                </span>
              </span>
              </ng-template>
              </nz-tree>`,
    styles: [`:host ::ng-deep .ant-tree {
      overflow: hidden;
      margin: 0 -24px;
      padding: 0 24px;
    }

    :host ::ng-deep .ant-tree li {
      padding: 4px 0 0 0;
    }

    @keyframes shine {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .shine-animate {
      animation: shine 2s ease infinite;
    }

    .custom-node {
      cursor: pointer;
      line-height: 26px;
      margin-left: 4px;
      display: inline-block;
      margin: 0 -1000px;
      padding: 0 1000px;
    }

    .active {
      background: #1890FF;
      color: #fff;
    }

    .is-dragging {
      background-color: transparent !important;
      color: #000;
      opacity: 0.7;
    }

    .file-name, .folder-name, .file-desc, .folder-desc {
      margin-left: 4px;
    }

    .file-desc, .folder-desc {
      padding: 2px 8px;
      background: #87CEFF;
      color: #FFFFFF;
    }
    `]
})
/**
 * 部门树选择
 */
export class DeptTreeReadComponent implements OnInit {

  dropdown: NzDropdownContextComponent;
  dragNodeElement;
  activedNode: NzTreeNode;
  public depts: Array<Dept>;
  public child: Array<Dept> = [];
  @Input()
  public nodes = [];
  public dept: Dept;
  constructor(private http: SysService, private message: NzMessageService) { }



  ngOnInit() {
    this.initDept();
  }
  // 初始化 部门菜单
  initDept() {
    this.http.getParentDept().subscribe(
      (res) => {this.depts = res as Array<Dept>,
        this.nodes = DeptUtils.Noddes(this.depts); },
      (err) => {}
    );
  }
  mouseAction( e: NzFormatEmitEvent): void {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
          this.getChild(e);
        }
  }
  // tslint:disable-next-line:member-ordering
  @Output()
  click = new EventEmitter<any>();
  active(node) {
    if (this.activedNode) {
      this.activedNode = null;
    }
    node.isSelected = true;
    this.activedNode = node;
    this.dept = this.activedNode.origin.origin;
    this.click.emit(this.dept);
  }

  /**
   * 获取 子部门
   */
  getChild( e: NzFormatEmitEvent) {
    this.http.getChildrenByParent(e.node.origin.origin).subscribe(
      (res) => { this.child = DeptUtils.Noddes(res as Array<Dept>), e.node.addChildren(this.child); },
      (err) => { }
    );
  }

}
