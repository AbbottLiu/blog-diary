import { Component, Input, HostBinding, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, NgZone, OnInit,
   TemplateRef, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import * as DataSet from '@antv/data-set';
// tslint:disable-next-line:import-spacing
import G2  from '@antv/g2';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'div-bar',
    template: '<div #container></div>',
    styles: []
})
export class BarComponent implements OnInit, OnDestroy, OnChanges, OnInit {



    // 输入图标数据
    @Input() data:  Array<{
        x: any;
        y: any;
        [key: string]: any;
    }> | {};
    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Input() height: number | 500;

    // endregion
    @ViewChild('container') node: ElementRef;

    chart: any;
    initFlag = false;

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.initFlag = true;
        setTimeout(() => this.install(), 100);
    }

    install() {
        // clean
        this.node.nativeElement.innerHTML = '';

        // 创建数据集
        const ds = new DataSet();
        // 为数据集创建数据视图并载入数据
        /// ds.createView()
        const dv = ds.createView().source(this.data);

        // 把除第一列外的其他字段按照 fold 方法展开
        const fields = [];
        for ( const k in this.data[0]) {
            if (k !== 'origin') {
                fields.push(k);
            }
        }
        // 自定义数据
        const origins = [];
        for ( const k in this.data[0]) {
            if (k === 'origin') {
                origins.push(k);
            }
        }
        // 保存第一列字段名
        const axis = fields.reverse().pop();

        // 视图的数据转换
        dv.transform({
            type: 'fold',
            fields: fields, // 展开字段集
            key: 'keyField', // key字段
            value: 'valueField', // value字段
            origin: origins
        });

        // 创建一个 G2 图标的实例
        const chart = new G2.Chart({
            container: this.node.nativeElement,
            forceFit: true,
            height: this.height
        });

        // 为 chart 指定视图
        chart.source(dv);

        // // X 轴配置
        // const defs = {};
        // defs[axis] = {
        //     type: 'time',
        //     range:[0,1]
        // };

        // chart.scale(defs)

        // Y 轴配置
        chart.axis('valueField', {
            label: {
                formatter: val => {
                    return val ;
                }
            }
        });

        chart.tooltip({
            crosshairs: {
            type: 'line'
            }
        });

        chart.line().position(`${axis}*valueField`).color('keyField');
        chart.point().position(`${axis}*valueField`).color('keyField').size(4).shape('circle').style({
            stroke: '#fff',
            lineWidth: 1
        });
                // 图标 配置 click 事件
                chart.on('click', ev => {
                    // const item = ev.items[0]; // 获取tooltip要显示的内容
                    let item =  [];
                    // tslint:disable-next-line:typeof-compare
                    if ( ev.data !== undefined) {
                        if ( ev.data._origin['origin'] !== undefined) {
                            item = ev.data._origin['origin'];
                        }

                    }
                    this.select.emit(item);
                });
        chart.render();
    }

    uninstall() {
        if (this.chart) this.chart.destroy();
    }

    ngOnChanges(changes: {[P in keyof this]?: SimpleChange } & SimpleChanges): void {
        if (this.initFlag)
            this.install();
    }

    ngOnDestroy(): void {
        this.uninstall();
    }

}
