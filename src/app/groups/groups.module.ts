import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsDetailsComponent } from './groups-details/groups-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../utils/auth.guards';

const routes: Routes = [
  { path: 'grupos', component: GroupsListComponent, canActivate: [AuthGuard] },
  {
    path: 'grupos/:id',
    component: GroupsDetailsComponent,
    canActivate: [AuthGuard]
  }, 
];

@NgModule({
  declarations: [
    GroupsListComponent,
    GroupsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class GroupsModule { }
