import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsComponent } from './news-details/news-details.component';

const routes: Routes = [
  { path: 'noticias', component: NewsListComponent },
  {
    path: 'noticias/:id',
    component: NewsDetailsComponent,
  }, 
];

@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class NewsModule { }
