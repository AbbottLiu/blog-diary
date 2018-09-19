import { Component, OnInit, OnDestroy, ChangeDetectionStrategy,
  HostListener, TemplateRef, ViewChild, AfterViewChecked, Output, EventEmitter} from '@angular/core';
import { NzTreeNode, NzFormatEmitEvent, NzDropdownService, NzDropdownContextComponent, NzMessageService } from 'ng-zorro-antd';
import { SysService } from '@shared/sys/sys.service';
import { Dept } from '@shared/sys/sys.entity';
import { DeptUtils } from '../utils/DeptUtils';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
import { DeptComponent } from '../../../routes/sys/dept/dept.component';
import { DeptTreeReadComponent } from '@shared/sys/deptTreeRead/deptTreeRead.component';
import { FormsModule, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CoreModule } from '@core/core.module';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dept-tree',
    template: `<nz-tree  [nzCheckable]="false" [nzShowLine]="true" [(ngModel)]="nodes"
                [nzAsyncData]="true" (nzClick)="active($event.node)" (nzExpandChange)="mouseAction($event)">
                <ng-template #contextTemplate>
                <ul nz-menu nzInDropDown>
                  <li (click)="addDept($event)"><i class="anticon anticon-plus"></i>添加</li>
                  <li (click)="updateDept($event)"><i class="anticon anticon-edit"></i>修改</li>
                  <li (click)="deleteDept($event)"><i class="anticon anticon-delete" ></i>删除</li>
                </ul>
              </ng-template>
              <ng-template #nzTreeTemplate let-node>
              <span class="custom-node" draggable="true" aria-grabbed="true" [class.active]="activedNode?.key===node.key">
                <span *ngIf="!node.isLeaf" [class.shine-animate]="node.origin.isLoading"
                (contextmenu)="contextMenu($event,contextTemplate, node)">
                  <span class="folder-name">{{node.title}}</span>
                  <span class="folder-desc">{{node?.origin?.origin?.code}}</span>
                </span>
                <span *ngIf="node.isLeaf" (contextmenu)="contextMenu($event,contextTemplate, node)">
                  <span class="file-name">{{node.title}}</span>
                  <span class="file-desc">{{node?.origin?.origin?.code}}</span>
                </span>
              </span>
              </ng-template>
              </nz-tree>
              <nz-modal [(nzVisible)]="deptVisible" [nzContent]="deptModalContent"
               [nzTitle]="'部门设定'" [nzFooter]="deptFooter"  [nzClosable]="false" [nzMaskClosable]="false">
                        <!-- 对话框主体 -->
                <ng-template #deptModalContent>
                <form nz-form #form>
                  <nz-form-item>
                    <nz-form-label [nzSm]="8" [nzXs]="10" >父部们</nz-form-label>
                    <nz-form-control [nzSm]="8" [nzXs]="10">
                      <input nz-input  [(ngModel)]="dept?.parentDept.name" name="parentDept.name"
                       readonly="true" placeholder="'父部们'" (click)="openDeptTree()"/>
                      </nz-form-control>
                  </nz-form-item>
                  <nz-form-item>
                    <nz-form-label [nzSm]="8" [nzXs]="10" [nzRequired]="true">部门名称</nz-form-label>
                    <nz-form-control [nzSm]="8" [nzXs]="10" [nzValidateStatus]="nameValid===true? 'success':'error'">
                      <input nz-input [(ngModel)]="dept.name" name="name" placeholder="'部门名称'" (blur)="nameBlur()"/>
                      <nz-form-explain *ngIf="!nameValid">部门代码已存在</nz-form-explain>
                    </nz-form-control>
                  </nz-form-item>
                  <nz-form-item>
                    <nz-form-label [nzSm]="8" [nzXs]="10" [nzRequired]="true">部门代码</nz-form-label>
                    <nz-form-control [nzSm]="8" [nzXs]="10" [nzValidateStatus]="codeValid===true? 'success':'error'">
                    <input nz-input  [(ngModel)]="dept.code" name="code"  placeholder="'部门代码'"  (blur)="codeBlur()"/>
                    <nz-form-explain *ngIf="!codeValid">部门代码已存在</nz-form-explain>
                    </nz-form-control>
                  </nz-form-item>
              </form>
                </ng-template>
                <ng-template #deptFooter>
                  <div *ngIf="!(nameValid&&codeValid)">
                    <button nz-button nzType="default" (click)="deptCancel()">取消</button>
                    <button nz-button nzType="primary" (click)="deptOk()" disabled>保存</button>
                  </div>
                  <div *ngIf="nameValid&&codeValid">
                    <button nz-button nzType="default" (click)="deptCancel()">取消</button>
                    <button nz-button nzType="primary" (click)="deptOk()">保存</button>
                </div>
                </ng-template>
              </nz-modal>

              <nz-modal [(nzVisible)]="deptTree" [nzContent]="deptTreeModalContent"
              [nzTitle]="'父部门选择'" (nzOnCancel)="deptTreeCancel()" (nzOnOk)="deptTreeOk()" [nzClosable]="false" [nzMaskClosable]="false">
                        <!-- 对话框主体 -->
                <ng-template #deptTreeModalContent>
                  <dept-tree-read [nodes]="nodes"></dept-tree-read>
                </ng-template>
              </nz-modal>
                `,
    changeDetection: ChangeDetectionStrategy.Default,
    styleUrls: ['./Dept-tree.component.less']
})
export class DeptTreeComponent implements OnInit {
    dropdown: NzDropdownContextComponent;
    dragNodeElement;
    activedNode: NzTreeNode;
    public depts: Array<Dept>;
    public child: Array<Dept> = [];
    public nodes = [];
    @Output()
    selectDept = new EventEmitter<any>();
    // modal 操作
    public deptVisible = false;
    public deptCancel() {
      this.activedNode = null;
      this.dept = new Dept();
      this.valid();
      this.deptVisible = false;
    }
    public deptOk() {
      this.deptVisible = false;

      // 更新操作
      if (this.dept.id !== undefined && this.dept.id !== '' && this.dept.id !== null) {
         this.http.updateDept(this.dept).subscribe(
            (res) => { this.message.success(res as string); },
            (err) => { this.message.success(err as string); },
            () => { this.initDept(); }
          );
        } else {
        // 添加操作
          this.http.addDept(this.dept).subscribe(
            (res) => { this.message.success(res as string); },
            (err) => { this.message.success(err as string); },
            () => { this.initDept(); }
          );
        }
      this.dept = new Dept();
      this.valid();
      this.activedNode = null;
    }


    // 部门 设定
    // tslint:disable-next-line:member-ordering
    public dept: Dept;

    // 部门 添加
    addDept(any) {
      this.dept = new Dept();
      this.dropdown.close();
      this.activedNode = null;
      this.deptVisible = true;
    }
    updateDept(any) {
      this.dropdown.close();
      this.getParentByDept();
      this.deptVisible = true;

    }
    deleteDept(any) {
      this.dropdown.close();
      if (this.dept.hasChildren) {
        this.message.error('请先删除子部门!');
        return ;
      }
      this.http.deleteDept(this.dept).subscribe(
        (res) => { this.message.success(res as string); },
        (err) => { this.message.success(err as string); },
        () => { this.initDept(); }
      ) ;

    }

    // deptTree Modal
    // tslint:disable-next-line:member-ordering
    deptTree = false;
    // tslint:disable-next-line:member-ordering
    @ViewChild(DeptTreeReadComponent)
    // 树形弹出框 选择的部门
    deptTreeSelect: DeptTreeReadComponent;

    // 开启 deptTree
    openDeptTree() {
      // this.deptTreeSelect.dept = null;
      this.deptTree = true;
    }

    deptTreeCancel() {
      this.deptTree = false;
    }
    deptTreeOk() {
      this.dept.parentId = this.deptTreeSelect.dept.id;
      this.dept.parentDept = this.deptTreeSelect.dept;
      this.deptTree = false;
     }

     // 验证 数据
     // tslint:disable-next-line:member-ordering
     nameValid = true;
     // tslint:disable-next-line:member-ordering
     codeValid = true;
     nameBlur() {
      if ( this.dept.id === undefined || this.dept.id === '' || this.dept.id === null ) {
        this.http.validateDeptName(this.dept.name).subscribe(
          (res) => {this.nameValid = res as boolean; }
        );
      } else {
        this.http.validateDeptName1(this.dept.name).subscribe(
          (res) => {this.nameValid = res as boolean; }
        );
      }

     }
     codeBlur() {
      if ( this.dept.id === undefined || this.dept.id === '' || this.dept.id === null ) {
        this.http.validateDeptCode(this.dept.code).subscribe(
          (res) => {this.codeValid = res as boolean; }
        );
      } else {
        this.http.validateDeptCode1(this.dept.code).subscribe(
          (res) => {this.codeValid = res as boolean; }
        );
      }

     }

     public valid() {
      this.nameValid = true;
      this.codeValid = true;
     }
    constructor(private http: SysService, private nzDropdownService: NzDropdownService, private message: NzMessageService) { }



    ngOnInit() {
      this.dept = new Dept();
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

    active(node) {
      if (this.activedNode) {
        this.activedNode = null;
      }
      node.isSelected = true;
      this.activedNode = node;
      this.selectDept.emit((this.activedNode.origin.origin));
    }

    /**
     * 获取 子部门
     */
    getChild( e: NzFormatEmitEvent) {
      this.http.getChildrenByParent (e.node.origin.origin).subscribe(
        (res) => { this.child = DeptUtils.Noddes(res as Array<Dept>), e.node.addChildren(this.child); },
        (err) => { }
      );
    }
    getParentByDept() {
      this.http.getParentDeptByDept(this.dept).subscribe(
        (res) => { this.dept.parentDept = (res as Dept) || new Dept() ; },
        (err) => { console.log(err) ; }
      );
    }
/**
 * @param {MouseEvent} event
 * @memberof DeptTreeComponent
 */
@HostListener('mouseleave', [ '$event' ])
    mouseLeave(event: MouseEvent): void {
      event.preventDefault();
      if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
        this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
      }
    }

    @HostListener('mousedown', [ '$event' ])
    mouseDown(): void {
      // do not prevent
      // console.log(this.dragNodeElement);
      if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
        this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
      }
    }

  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: NzTreeNode): void {
    this.dropdown = this.nzDropdownService.create($event, template);
    if (this.activedNode) {
      this.activedNode = null;
    }
    node.isSelected = true;
    this.activedNode = node;
    this.dept = node.origin.origin;
  }


    selectDropdown(any) {
      console.log(this.activedNode);

      this.dropdown.close();
      this.deptVisible = true;
      // do something\
      console.log(any);

    }
}

