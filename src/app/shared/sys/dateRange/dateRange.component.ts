import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { equal } from 'assert';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'date-Range',
    templateUrl: './dateRange.component.html',
    styleUrls: ['./dateRange.component.less']
})
export class DateRangeComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    this.status = false;
  }
  // tslint:disable-next-line:member-ordering
  status = false;
  ngOnChanges(changes: SimpleChanges): void {

    }

    constructor() { }

    ngOnInit() {
      this.status = true;
    }
    // tslint:disable-next-line:member-ordering
    @Input()
    startValue: any | null;
    // tslint:disable-next-line:member-ordering
    @Input()
    endValue: any | null;
    // tslint:disable-next-line:member-ordering
    @Output()
    startValueChange: EventEmitter<Date> = new EventEmitter<Date>();
    // tslint:disable-next-line:member-ordering
    @Output()
    endValueChange: EventEmitter<Date> = new EventEmitter<Date>();
    // tslint:disable-next-line:member-ordering
    endOpen = false;
    disabledStartDate = (startValue: Date): boolean => {
      if (!startValue || !this.endValue) {
        return false;
      }
      return startValue.getTime() > this.endValue.getTime();
    }
    disabledEndDate = (endValue: Date): boolean => {
      if (!endValue || !this.startValue) {
        return false;
      }
      return endValue.getTime() <= this.startValue.getTime();
    }
    onStartChange(date: Date): void {
      this.startValue = date;
      this.startValueChange.emit(this.startValue);
    }
    onEndChange(date: Date): void {
      this.endValue = date;
      this.endValueChange.emit(this.endValue);
    }
    handleStartOpenChange(open: boolean): void {
      if (!open) {
        this.endOpen = true;
      }
      console.log('handleStartOpenChange', open, this.endOpen);
    }

    handleEndOpenChange(open: boolean): void {
      console.log(open);
      this.endOpen = open;
    }

}
