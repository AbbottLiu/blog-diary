interface Chart {
  x: any;
  y: any;
  [key: string]: any;
}
export class ChartUtils {
  constructor() {}
  /**
   * 将对象类型转化为 chat类型
   * xname:x对应的对象的 属性值
   * yname:y对应的对象的 属性值
   */
  public static  ArrayToCharArray (data: Array<any>, xname: string, yname: string): Array<Chart> {
     const charts = new Array<Chart>();
     for ( const k of data ) {
      const chart = {x: null, y: null, origin: null};
      if (k[xname] !== undefined) {
          chart.x = k[xname];
      }
      if (k[yname] !== undefined) {
          chart.y = k[yname];
      }
      chart.origin = k;
      charts.push(chart);
      }
     return charts;
  }
}
