import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-detalle',
  templateUrl: './news-detalle.component.html',
  styleUrls: ['./news-detalle.component.scss']
})
export class NewsDetalleComponent {
  news?: News;
  constructor(
    private router: Router, private activedRoute:ActivatedRoute,
    private newsService: NewsService
  ) {
    this.activedRoute.paramMap.subscribe(params => {
      this.getNews(Number(params.get("id")));
    })

  }
  getNews(id: number) {
    this.newsService.getById(id).subscribe(
      ((el: News)=>
        (this.news = el)
      )
    );
  }
  regresar(){
    this.router.navigate(['../'], { relativeTo: this.activedRoute });
  }
}
