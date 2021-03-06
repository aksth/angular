import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators'
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable(({providedIn: 'root'}))
export class PostsService{

    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http
        .post<{name: string}>(
          'https://angular-course-4b875.firebaseio.com/posts.json',
          postData,
          {
              observe: 'response'
          }
        )
        .subscribe(responseData => {
          console.log(responseData);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        return this.http
        .get<{[key: string]: Post}>('https://angular-course-4b875.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({
                "Custom-Header":'Hello'
            }),
            params: searchParams
        })
          .pipe(
            //map((responseData: {[key: string]: Post}) => {
              map((responseData) => {
              const postsArray: Post[] = [];
              for(const key in responseData){
                if(responseData.hasOwnProperty(key)){
                  postsArray.push({...responseData[key], id: key})
                }
              }
              return postsArray;
            }),
            catchError(errorRes => {
                //do some intermediate actions with error and continue the normal process
                return throwError(errorRes);
            }));
    }

    deletePosts(){
        return this.http.delete('https://angular-course-4b875.firebaseio.com/posts.json',
        {
            observe: 'events',
            responseType: 'text'
        }).pipe(tap(event => {
            console.log("event below: ");
            console.log(event);
            if(event.type === HttpEventType.Sent){
                console.log("Delete Request Sent")
            }
            if(event.type === HttpEventType.Response){
                console.log(event.body)
            }
        }));
    }

}