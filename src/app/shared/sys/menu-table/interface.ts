

/**
 * 列描述
 */
export interface SimpleTableColumn {
  /**
   * 类型
   * - `checkbox` 多选
   * - `radio` 单选
   * - `link` 链接，务必指定 `click`
   * - `badge` [徽标](https://ng.ant.design/components/badge/zh)，务必指定 `badge` 参数配置徽标对应值
   * - `tag` [标签](https://ng.ant.design/components/tag/zh)，务必指定 `tag` 参数配置标签对应值
   * - `img` 图片且居中(若 `className` 存在则优先)
   * - `number` 数字且居右(若 `className` 存在则优先)
   * - `currency` 货币且居右(若 `className` 存在则优先)
   * - `date` 日期格式且居中(若 `className` 存在则优先)，使用 `dateFormat` 自定义格式
   * - `yn` 将`boolean`类型徽章化 [document](http://ng-alain.com/docs/data-render#yn)
   */
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
  index?: string | string[];
  /**
   * 链接回调，若返回一个字符串表示导航URL会自动触发 `router.navigateByUrl`
   */
  click?: (record: any, instance?: any) => any;
  /**
   * 按钮组
   */
  buttons?: SimpleTableButton[];
  /**
   * 自定义渲染ID
   * @example
   * ```html
   * <ng-template st-row="custom" let-item let-index="index" let-column="column">
   *  {{ c.title }}
   * </ng-template>
   * ```
   */
  render?: string;
  /**
   * 列宽（数字型表示 `px` 值），例如：`100`、`10%`、`100px`
   *
   * **注意：** 固定列不支持百分比
   */
  width?: string | number;
  /**
   * 格式化列值
   */
  format?: Function;
  /**
   * 数字格式，`type=number` 有效
   */
  numberDigits?: string;
  /**
   * 日期格式，`type=date` 有效，（默认：`YYYY-MM-DD HH:mm`）
   */
  dateFormat?: string;
  /** 当不存在数据时以默认值替代 */
  default?: string;

  [key: string]: any;
}


/**
 * 按钮配置
 */
export interface SimpleTableButton {
  /**
   * 文本
   */
  text: string;
  /**
   * 文本 i18n
   */
  i18n?: string;
  /**
   * 格式化文本，较高调用频率，请勿过多复杂计算免得产生性能问题
   */
  format?: (record: any, btn: SimpleTableButton) => string;
  /**
   * 按钮类型
   * - `none` 无任何互动
   * - `del` 删除，默认开启 `pop: true`
   * - `modal` 对话框，需要指定 `component` 才会生效
   * - `static` 静态对话框，需要指定 `component` 才会生效
   * - `link` 链接，当 `click` 返回字符串时自动调用 `navigateByUrl` 导航
   */
  type?: 'none' | 'del' | 'modal' | 'static' | 'link';
  /**
   * 点击回调
   * - Function
   */
  click?:
 ((record: any) => any);

  /**
   * 下拉菜单，当存在时以 `dropdown` 形式渲染
   * - 只支持一级
   */
  children?: SimpleTableButton[];
  /**
   * 权限，等同 `can()` 参数值
   */
  acl?: any;

  [key: string]: any;
}
