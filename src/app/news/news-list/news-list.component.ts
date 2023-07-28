import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiResponse, News } from 'src/app/interfaces/apiResponse';
import { NewsService } from 'src/app/services/news.service';
import { Subject, takeUntil } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { NewsDetailsComponent } from '../news-details/news-details.component';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {
  protected onDestroy = new Subject<void>();
  news: News[] = [];
  newsFormArray: FormGroup[];

  constructor(
    private newsService: NewsService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.newsFormArray = [];
  }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(): void {
    this.newsService
      .getAllNews()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (res: any) => {
          this.news = res.result
          this.newsFormArray = this.news.map(newsItem => {
            return this.fb.group({
              title: [newsItem?.title],
              subtitle: [newsItem?.subtitle],
              shortDescription: [newsItem?.shortDescription],
              imageUrl: [newsItem?.imageUrl]
            });
          });
        },
      })
  }
  
  showDialog( item: any) {
    let dialogRef = this.dialog.open( NewsDetailsComponent, {
        width: '1000px', height: '800px', data: item });
    dialogRef.afterClosed().subscribe(result => {
          console.log('dialog cerrado');
    });
  }
}
