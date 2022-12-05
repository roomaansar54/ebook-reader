import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { ThrowStmt } from '@angular/compiler';
import { of } from 'rxjs';
// import { IBook } from '../book.model'
// import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  i=0;
  bookData: any;
  isError = true;
  errorMessage = "";
  raw: any;
  elem = document.getElementsByTagName("mark");



  appearCount = false;
  searchText = '';
  count = 0;
  textURL!: string;

  appearNext = false
  endNext = false;


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
    this.bookService.getByID(id)
      .subscribe((data) => {
        this.bookData = data;
        if ("text/plain; charset=us-ascii" in this.bookData["formats"]) {
          this.textURL = this.bookData["formats"]["text/plain; charset=us-ascii"].split('org')[1]
        }
        else if ("text/plain; charset=charset=utf-8" in this.bookData["formats"]) {
          this.textURL = this.bookData["formats"]["text/plain; charset=charset=utf-8"]
        }
        this.bookService.getText(this.textURL)
          .subscribe((textdata) => {
            this.raw = textdata;
            this.raw = this.raw.split("\r\n\r\n");
          })
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
        if (box[i].classList.contains('largeFont')) {
          box[i].classList.remove('largeFont')
        }
        if (box[i].classList.contains('normalFont')) {
          box[i].classList.remove('normalFont')
        }


        box[i].classList.add('largestFont');
        console.log(box[i].className);
      }
    }


  }
  normalFont() {
    var box = document.getElementsByClassName("book")
    if (box != null) {
      for (var i = 0; i < box.length; i++) {
        if (box[i].classList.contains('largeFont')) {
          box[i].classList.remove('largeFont')
        }
        if (box[i].classList.contains('largestFont')) {
          box[i].classList.remove('largestFont')
        }

        box[i].classList.add('normalFont');
        console.log(box[i].className);
      }
    }
  }
  largeFont() {
    var box = document.getElementsByClassName("book")
    if (box != null) {
      for (var i = 0; i < box.length; i++) {
        if (box[i].classList.contains('largestFont')) {
          box[i].classList.remove('largestFont')
        }
        if (box[i].classList.contains('normalFont')) {
          box[i].classList.remove('normalFont')
        }
        box[i].classList.add('largeFont');
        console.log(box[i].className);
      }
    }

  }
  countMatches(searchText: string) {
    this.appearCount = true
    this.appearNext = true
    this.count = 0
    if (searchText === "") {

      this.count = 0
      this.appearCount = false
      this.appearNext = false

    }
    else {
      if (this.elem.length > 0){
        this.elem[0].scrollIntoView();
        // this.elem[0].style.backgroundColor= "saddlebrown";

  
      }
      for (let i of this.raw) {
        if (i.indexOf(searchText) != -1) {
          this.count = this.count + 1
        }
      }
    }

  }
  scrollToNext(){
    console.log(this.i)

      // var elem = document.getElementsByTagName("mark");
      // if (searchText === "") {
      //   this.elem = 

      // }
      // this.elem[this.i].style.backgroundColor= "yellow";

      // console.log(this.elem[this.i].style.backgroundColor)

        if (this.i < this.elem.length - 1){
          // document.getElementById("p2").style.color = "blue";

          // this.elem[this.i].style.backgroundColor= "saddlebrown";
          this.elem[this.i].scrollIntoView();
  
          this.i = this.i+1
        }
        else if (this.i === this.elem.length - 1){
          this.elem[this.i].scrollIntoView();
          this.i = 0 

        }
  
        else{
          this.i = 0
          // this.elem[0].scrollIntoView();

        }
  }
  scrollToPrevious(){
    console.log(this.i)
    if (this.i > 0){
      // document.getElementById("p2").style.color = "blue";

      // this.elem[this.i].style.backgroundColor= "saddlebrown";
      this.elem[this.i].scrollIntoView();
      this.i = this.i-1


    }
    // else if( this.i === 0){
    //   this.elem[this.i].scrollIntoView();

    // }
    else{
      this.i = this.elem.length - 1
      // this.elem[0].scrollIntoView();

    }


  }


}
