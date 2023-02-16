import { NewsService } from './news.service';
import { Component, OnInit } from '@angular/core';
import { INews } from './news';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  // selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  pageTitle = 'News Detail'
  errorMsg = '';
  news : INews | undefined;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private newsService: NewsService,
      private location: Location
    ) { }

  ngOnInit(): void
  {
    const newsId = Number(this.route.snapshot.paramMap.get('id'));
    if(newsId)
    {
      this.getNews(newsId);
    }
    // this.news.NewsId = 1;
    // this.news.Subject = "Test subj 2";
  }

  getNews_1(newsId: number): void {
    this.newsService.getNews(newsId)
      .subscribe(data => {
        this.news = data;
        console.log('Final News payload : ', data);
      });
    };

      // .subscribe(data => this.news = data);
      //  .subscribe(data => console.log('Final News payload :', data));
      // Data received, bug in htmnl template to display

      // .subscribe(d)


  getNews_2(newsId: number): void {
    this.newsService.getNews(newsId)
      .subscribe(
          data => {
            this.news = data
          },
          err => {
            console.log(err);
          }
      );
    }


    getNews(newsId: number): void {
      this.newsService.getNews(newsId)
        .subscribe(data => {
          this.news.NewsId = 1;  // data.NewsId;
          this.news.Subject = "test subj";  // data.Subject;
        });
      };



  //  getNews(newsId: number): void {
  //    this.newsService.getNews(newsId).subscribe({
  //      next: ns => this.news = ns,
  //      error: err => this.errorMsg = err
  //    });
  //  }

  goBack(): void {
    // this.router.navigate(['/newslist']);
    this.location.back();
  }
}
