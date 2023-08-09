import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  isLoading?: boolean;
  displayedColumns:string[] = ['title', 'shortDescription', 'acciones'];
  dataSource: MatTableDataSource<News> = new MatTableDataSource<News>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  constructor(
    private router: Router, private activedRoute:ActivatedRoute,
    private newsService: NewsService
  ) {
    
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.isLoading = true;
    this.newsService.getAll().subscribe(
      (r: News[])=>{
        this.isLoading = false;
        this.dataSource.data = r;
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  view(o:News){
    this.router.navigate([o.newId], { relativeTo: this.activedRoute });
  }
}
