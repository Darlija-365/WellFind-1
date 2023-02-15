import { Component, OnDestroy, OnInit } from '@angular/core';
import { INews } from './news';
import { NewsService } from './news.service';

@Component({
  // selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit, OnDestroy {

  newsList: INews[] = [];

  pageTitle = 'News Articles';
  errorMessage: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList_1(): void {
    this.newsService.getNewsList().subscribe(
        data => {
          this.newsList = data
        },
        err => {
          console.log(err);
        }
    );

    getNewsList(): void {
      this.newsService.getNewsList().subscribe({

      })

    }


    //  .subscribe(nl => this.newsList = nl);
    // .subscribe(nl => console.log(nl));           // print GET data to console
  }

  ngOnDestroy(): void {
    // Unsubscribe for http not required ?
    // this.newsService.getNewsList().unsubscribe();

  }

}
