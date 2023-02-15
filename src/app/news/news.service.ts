import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { INews } from './news';

@Injectable({
  providedIn: 'root'   // Service available from entire App
})

export class NewsService {

  constructor(private http: HttpClient) {}

  private newsListUrl = 'https://wellfind.azurewebsites.net/api/GetNewsList';

  getNewsList_1(): Observable<INews[]> {
    return this.http.get<INews[]>(this.newsListUrl).pipe(
        tap(data => console.log('All', JSON.stringify(data)) ),
        catchError(this.handleError)
      );
  }

  getNewsList() {
    return this.http.get<any[]>(this.newsListUrl)
      .pipe(map(data => data.map( res => {
        return {
          NewsId: res.NewsId,
          Subject: res.Subject,
          Body: res.Body,
          Tag: res.Tag,
          Deleted: res.Deleted,
          TypeId: res.TypeId,
          StatusId: res.StatusId,
          CreatedDate: res.CreatedDate,
          CreatedById: res.CreatedById
        };
      })
    ));
  }

  // Not work in this case
  getNewsList_3() {
    return this.http.get<any[]>(this.newsListUrl)
      .pipe(map(data =>
        JSON.parse(data[0]).map(res => {
          return {
            NewsId: res.NewsId,
            Subject: res.Subject,
            Body: res.Body,
            Tag: res.Tag,
            Deleted: res.Deleted,
            TypeId: res.TypeId,
            StatusId: res.StatusId,
            CreatedDate: res.CreatedDate,
            CreatedById: res.CreatedById
          };
        })
      ));
    }

// ==============================================

  private newsUrl = 'https://wellfind.azurewebsites.net/api/GetNews';

  getNews_1(newsId: number): Observable<INews | undefined> {
    const getNewsUrl = `${this.newsUrl}/?newsId=${newsId}`;
    return this.http.get<INews>(getNewsUrl).pipe(
      tap(ns => {
        const outcome = ns ? 'fetched' : 'did not find';
        this.log( `${outcome} news id =${newsId}` );
      }),
      // tap(data => console.log('News : ', JSON.stringify(data)) ),   // logging result
      // catchError(this.handleError)
    );
  }

  getNews_2(newsId: number): Observable<INews | undefined> {
    const getNewsUrl = `${this.newsUrl}/?newsId=${newsId}`;
    return this.http.get<any>(getNewsUrl)
      .pipe(map(data => {
        return {
          NewsId: data[0].NewsId,
          Subject: data[0].Subject,
          Body: data[0].Body,
          Tag: data[0].Tag,
          Deleted: data[0].Deleted,
          TypeId: data[0].TypeId,
          StatusId: data[0].StatusId,
          CreatedDate: data[0].CreatedDate,
          CreatedById: data[0].CreatedById
        };
      },
      // map( data => data[0]),

      // tap(ata => console.log('News : ', JSON.stringify(data)) ),   // logging result
       catchError(this.handleError)
    ));
  }

  getNews(newsId: number): Observable<INews | undefined> {
    const getNewsUrl = `${this.newsUrl}/?newsId=${newsId}`;
    return this.http.get<any>(getNewsUrl)
      .pipe(map(data =>
        JSON.parse(data[0]).map( res => {
          return {
            NewsId: data[0].NewsId,
            Subject: data[0].Subject,
            Body: data[0].Body,
            Tag: data[0].Tag,
            Deleted: data[0].Deleted,
            TypeId: data[0].TypeId,
            StatusId: data[0].StatusId,
            CreatedDate: data[0].CreatedDate,
            CreatedById: data[0].CreatedById
          };
        })
    ));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
    } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
*/


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }

}
