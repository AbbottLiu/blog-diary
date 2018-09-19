import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ModelComponent } from './model/model.component';
import { ActRoutingModule } from './act-routing.module';
import { LeaveComponent } from './leave/leave.component';
import { TaskComponent } from './task/task.component';
const COMPONENTS = [ModelComponent, LeaveComponent, TaskComponent];
const SERVICES = [];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ActRoutingModule
    ],
    declarations: [COMPONENTS],
    providers: [SERVICES],
    exports: [],
    entryComponents: []
})
export class ActModule { }
