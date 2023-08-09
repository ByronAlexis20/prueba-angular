import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetalleComponent } from './components/news/news-detalle/news-detalle.component';
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './main/main.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupDetalleComponent } from './components/groups/group-detalle/group-detalle.component';
import { AppMaterialModule } from './app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './components/person/person.component';
import { IrSesionComponent } from './utils/ir-sesion/ir-sesion.component';

const routes: Routes = [
  { 
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo:'/login', pathMatch : 'full'},
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'news', children:[
      { path:'', data: {title: 'Noticias'}, component: NewsComponent},
      { path:':id',data:{title: 'Noticia'}, component: NewsDetalleComponent}
    ]
  },
  { path: 'home',data:{title: 'Inicio' }, component: MainComponent,canActivate:[AuthGuard],children: [
      { path: '', redirectTo:'/home/groups', pathMatch : 'full'},
      { path:'groups', children: [
          { path:'', data: {title: 'Noticias'}, component: GroupsComponent},
          { path:':id',data:{title: 'Noticia'}, component: GroupDetalleComponent}
        ]
      },
      { path:'person', children: [
        { path:'', data: {title: 'Persona'}, component: PersonComponent}
      ]
    }
    ]
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    MainComponent,
    NewsComponent,
    NewsDetalleComponent,
    GroupsComponent,
    GroupDetalleComponent,
    PersonComponent,
    IrSesionComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [RouterModule,AppMaterialModule]
})

export class AppRoutingModule { }
