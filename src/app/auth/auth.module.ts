import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { NewsListComponent } from '../news/news-list/news-list.component';
import { GroupsListComponent } from '../groups/groups-list/groups-list.component';
import { PersonFormComponent } from '../form-module/person-form/person-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: 'noticias', component:  NewsListComponent},
      { path: 'grupos', component:  GroupsListComponent},
      { path: 'personas', component:  PersonFormComponent},
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    NewsListComponent,
    GroupsListComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
