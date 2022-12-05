import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { IBook } from '../book.model'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookData: any;
  isError = true;
  errorMessage="";
  raw: any;

  appearCount = false;
  searchText = '';
  count = 0;
  textURL!: string;


  // book: IBook | undefined

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private bookService: BookService

  ) { }

  ngOnInit(): void {

    this.getBook()

  }

  getBook(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    // console.log(id)
    this.bookService.getByID(id)
      .subscribe((data) => {
        this.bookData = data;
        if ("text/plain; charset=us-ascii" in this.bookData["formats"] ){
          this.textURL = this.bookData["formats"]["text/plain; charset=us-ascii"].split('org')[1]
        }
        else if ("text/plain; charset=charset=utf-8" in this.bookData["formats"] ){
          this.textURL = this.bookData["formats"]["text/plain; charset=charset=utf-8"]
        }
        this.bookService.getText(this.textURL)
        .subscribe((data) => {
          // console.log(this.textURL)
            this.raw = data;
            this.raw = this.raw.split("\r\n\r\n");
            // console.log(this.raw)
          },

          
        )
      },
        (error) => {
          this.isError = true
          console.log(error, this.isError)
          if (error.status === 404) {
            this.errorMessage = "The searched book is not found";
          }


        }
      );
  }
  goBack() {
    this.location.back();

  }
  largestFont() {
    var box = document.getElementsByClassName("book")
    if (box != null) {
      for (var i = 0; i < box.length; i++) {

        box[i].classList.add('largestFont');
        console.log(box[i].className);
      }
    }


  }
  normalFont() {
    var box = document.getElementsByClassName("book")
    if (box != null) {
      for (var i = 0; i < box.length; i++) {

        box[i].classList.add('normalFont');
        console.log(box[i].className);
      }

      // box.classList.value=""
    }
  }
  largeFont() {
    var box = document.getElementsByClassName("book")
    if (box != null) {
      for (var i = 0; i < box.length; i++) {
        box[i].classList.add('largeFont');
        console.log(box[i].className);
      }// box.classList.value=""
    }

  }
  countMatches(searchText: string) {
    this.appearCount = true
    this.count = 0
    if (searchText === "") {
      this.count = 0
      this.appearCount = false


    }
    else {
      for (let i of this.raw) {
        if (i.indexOf(searchText) != -1) {
          // if (i.contins(searchText) === true){
          this.count = this.count + 1
          // console.log(this.count)
        }
        // this.count=  (i.match(/searchText/g) || []).length;
      }
    }

  }


}
