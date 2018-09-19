import 'reflect-metadata';
// 获取成员类型
export function type(target: any, propertyKey: string) {
    return Reflect.getMetadata('design:type', target, propertyKey);
}
export function types(target: any) {
    Reflect.getMetadataKeys('design:type', target);
}
// 获取成员参数类型
export function paramtype(target: any, propertyKey: string) {
    return Reflect.getMetadata('design:paramtypes', target, propertyKey);
}
export function paramtypes(target: any) {
    return  Reflect.getMetadata('design:paramtypes', target);
}
// 获取成员返回类型
export function returntype(target: any, propertyKey: string) {
    // 获取所有元数据 key (由 TypeScript 注入)
    return Reflect.getMetadataKeys(target, propertyKey);
}

export class ObjectUtil {
    constructor() {}
    public static getArray(array: any[], fieldName: string) {
            const list = new  Array<string>();
            for (const arr of array ) {
                const str: string[] = Object.values(arr);
                list.push(str[ Object.keys(arr).indexOf(fieldName)]);
            }
            return list;
    }

    public static getObjArray(array: any[], fieldName: string, fieldValue: string) {
        const list = new  Array<any>();
        for (const arr of array ) {
            const str: string[] = Object.values(arr);
            if (str[Object.keys(arr).indexOf(fieldName)] = fieldValue) {
                list.push(arr);
            }
        }
        return list;
}
    public static getDiffArray(array: any[], fieldName: string) {
        const list = new  Array<string>();
        for (const arr of array ) {

            const str: string[] = Object.values(arr);
            if (!list.includes(str[ Object.keys(arr).indexOf(fieldName)])) {
                list.push(str[ Object.keys(arr).indexOf(fieldName)]);
            }
        }
        return list;
}
/**
 * get请求 参数转化 ?id=xx&name=xxx
 * @param obj
 */
public static transformRequest(obj?: any): string {
  const params =  [];

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = '';
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='));
  });

  return '?' + params.join('&');
}

}
