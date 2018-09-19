import { Page } from '@shared/sys/sys.entity';
/**
 * page 对象 属性copy 及 records 集合 去除
 */
export class PageUtils {
  public static pageDeleteList(page: Page<any>): Page<any>  {
    const pager = new Page<any>();
    Object.assign(pager, page);
    pager.records = [];
    pager.condition = strMapToObj(page.condition);
    return pager;
  }
}

function strMapToObj(strMap: Map<any, any>) {
  const obj = Object.create(null);
  strMap.forEach((value: any, key: any) => {
    obj[key] = value;
  });
  return obj;
}

function objToStrMap(obj) {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
  }
  return strMap;
}
