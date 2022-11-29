import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get('https://gutendex.com/books')
  }
  getByID(id:number){
    return this.http.get('https://gutendex.com/books/'+id)

  }

  // https://www.gutenberg.org/cache/epub/2641/pg2641.cover.medium.jpg


  // getText(){
  //   return this.http.get('https://www.gutenberg.org/files/2641/2641-0.txt',{ responseType: 'text'});
  // }
  getRawData(link:string): Observable<any> {
    // const api = '/files/2641/2641-0.txt';
    return this.http.get(link,{ responseType: 'text' });    
  }

}