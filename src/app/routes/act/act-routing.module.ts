import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ActModule } from './act.module';
import { ModelComponent } from './model/model.component';
import { LeaveComponent } from './leave/leave.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path: '', redirectTo: 'model', pathMatch: 'full'},
  {path: 'model' , component: ModelComponent },
  {path: 'leave' , component: LeaveComponent },
  {path: 'task' , component: TaskComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class ActRoutingModule { }
