import { Component, Inject  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { Subject, takeUntil } from "rxjs";
import { News } from 'src/app/interfaces/apiResponse';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent {

  protected onDestroy = new Subject<void>();
  news?: News;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    public dialogRef: MatDialogRef<NewsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { 
    this.news = this.data.value;
  }

  ngOnInit(): void {
    
  }

  exitDialog(){
    this.dialogRef.close();
  }
}
