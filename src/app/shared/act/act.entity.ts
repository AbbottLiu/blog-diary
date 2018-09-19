import { BaseEntity } from '../sys/sys.entity';
export class  Model {
  constructor(
    public id?: string,
    public revision?: Number,
    public name?: String ,
    public key?: string ,
    public category?: String ,
    public createTime?: Date,
    public lastUpdateTime?: Date,
    public description?: string
  ) {
  }
}
export class Leave extends BaseEntity {
  constructor(
    public userId?: string,
    public reason?: string,
      /**
       * 报销审批状态：1-待审核 2-审核中 3-审批通过 4-驳回
       */
    public status?: string,
    public procInsId?: string,
    public startDate?: Date,
    public endDate?: Date
  ) {
    super();
  }
}
