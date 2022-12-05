import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BookService } from '../book.service';
import { IBook } from '../book.model';
@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
[x: string]: any;
  completeData: any;
  results: any;
  nothing: boolean = false ;
  books:Array<IBook>=[]



  constructor(private bookService:BookService) { }

  search: string =""

  ngOnInit(): void {
    this.searchBA()
  }

// search books and authors
  searchBA(): void {
    this.completeData=[]
    this.books=[]
    this.nothing=false
    this.bookService.search(this.search).subscribe(
      data =>{
        // empty the search results
        // if (this.search.length === 0){
        //   this.results=[]
        //   this.completeData=[]
        // }
        // else{
          this.completeData = data
          for (let result of this.completeData["results"]){
            this.books.push({
            "id":result["id"],"download":result["formats"]["text/html"],
            "image":result["formats"]["image/jpeg"],
            "author":result["authors"][0].name,
            "title": result["title"]
          })    
          }
          if (this.books.length === 0){
            this.nothing = true
          }
  
          // console.log(this.books)
  
        // }
      })
    }
    downloadLink(id:number){
      window.open("https://www.gutenberg.org/files/"+id+"/"+id+"-0.zip", "_blank");
  }

    
  
}




