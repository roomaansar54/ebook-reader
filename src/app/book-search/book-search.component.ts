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
  completeData: any;
  results: any;


  constructor(private bookService:BookService) { }

  ngOnInit(): void {
  }


  search(term: string): void {
    this.bookService.search(term).subscribe(
      data =>{
        if (term.length === 0){
          this.results=[]
          this.completeData=[]
        }
        else{
          this.completeData = data 
          this.results=this.completeData["results"]
          console.log(this.completeData)
  
        }
      })
    }
  }




