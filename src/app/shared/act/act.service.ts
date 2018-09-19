import { Injectable, Inject } from '@angular/core';
import { Page } from '@shared/sys/sys.entity';
import { _HttpClient } from '@delon/theme';
import { Model, Leave } from '@shared/act/act.entity';
import { PageUtils } from '@shared/sys/utils/PageUtils';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ObjectUtil } from '../util/OblectUtil';

@Injectable()
export class ActService {
    constructor(private http: _HttpClient,
      @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
    ) { }
    /*****************ACT Model 操作********************/
    addModel(model: Model) {
      return this.http.post('model/add', model);
    }
    deleteModel(model: Model): any {
      return this.http.delete('model/delete', {id: model.id} );
    }
    updateModel(model: Model) {
      return this.http.put('model/update', model);
    }
    getModelPager(page: Page<any>): any {
      const pa = PageUtils.pageDeleteList(page);
      return this.http.post('model/search', pa);
    }
    /***Leave 请假流程 */
    /**开始请假流程 */
    startLeave(leave: Leave) {
      return this.http.get('leave/start', leave );
    }

    getLeavePager(page: Page<Leave>) {
      const pa = PageUtils.pageDeleteList(page);
      return this.http.post('leave/search', pa);
    }
    deleteLeave(leave: Leave) {
      return this.http.delete('leave/delete', {id: leave.id} );
    }
    updateLeave(leave: Leave) {
      leave.userId = (this.tokenService.get() as any).id;
      return this.http.put('leave/update', leave);
    }
    addLeave(leave: Leave) {
      leave.userId = (this.tokenService.get() as any).id;
      console.log(leave);
      return this.http.post('leave/add', leave);
    }
}
