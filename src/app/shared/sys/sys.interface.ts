
// tslint:disable-next-line:no-empty-interface
export interface ModalColumn {
  type?:
  | 'icon'
  | 'img'
  | 'number'
  | 'date';
/**
 * 列标题
 */
title: string;
/**
 * 列标题 i18n
 */
i18n?: string;
/**
 * 列数据在数据项中对应的 key，支持 `a.b.c` 的嵌套写法，例如：
 * - `id`
 * - `price.market`
 * - `[ 'price', 'market' ]`
 */
index?: string ;
/**
 *  输入组件 提示信息
 */
placeholder?: string | '请输入';
/**
 * 链接
 */
click?: (record: any, instance?: any) => any;

[key: string]: any;
}

export interface ModalData {
  text: string;
  [key: string]: any;
}
