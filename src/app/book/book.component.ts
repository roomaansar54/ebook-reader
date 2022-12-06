import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  i = 0;
  bookData: any;
  isError = true;
  errorMessage = "";
  bookText: any;
  elem = document.getElementsByTagName("mark");



  appearCount = false;
  searchText = '';
  count = 0;
  textURL!: string;

  appearNext = false


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
            this.bookText = textdata;
            this.bookText = this.bookText.split("\r\n\r\n");
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
    
    // at start count and buttons should not appear
    this.appearCount = true
    this.appearNext = true
    this.count = 0
    // console.log(this.elem.length)
    this.i = 0
    if (searchText === "") {

      this.count = 0
      this.appearCount = false
      this.appearNext = false

    }
    else {
      // if (this.elem.length === 0){
      //   // console.log(this.elem.length)
      //   this.i = -1
      //   this.appearNext = false
      // }else{
      //   this.elem[0].scrollIntoView();
  
      // }
  
// console.log(this.appearNext)

// console.log(this.bookText.join())
  
      // for (let element of this.raw) {
        
      //   if (element.indexOf(searchText) != -1) {
          const re = new RegExp(searchText, 'gi');

          // matching the pattern
          const co = this.bookText.join().match(re).length;
  
          this.count = this.count + co

        //   console.log("index:",this.bookText.join().indexOf(searchText))
        //   console.log("count:",this.count)
        // // }
        // this.elem[0].scrollIntoView();
       
      // }
      if (this.count === 0){
        this.i = -1
        this.appearNext= false
      }
    }

  }

  scrollToNext() {
    console.log(this.i)
      if (this.elem.length === 1 ) {
        this.appearNext = false
        this.i = 0
        this.elem[0].scrollIntoView();

    
      }
      else{
        if (this.i < this.elem.length - 1) {
          this.i = this.i + 1
    
          this.elem[this.i].style.backgroundColor = "saddlebrown";
          this.elem[this.i - 1].style.backgroundColor = "yellow";
          this.elem[this.i].scrollIntoView();
    
        }
        else if (this.i === this.elem.length - 1) {
          this.i = 0
          this.elem[this.i].scrollIntoView();
          this.elem[this.i].style.backgroundColor = "saddlebrown";
          this.elem[this.i - 1].style.backgroundColor = "yellow";
    
    
    
        }
    
      }
  }


  scrollToPrevious() {
    console.log(this.i)
    if (this.i > 0 && this.i < this.elem.length) {

      // this.elem[this.i].style.backgroundColor= "saddlebrown";
      this.i = this.i - 1
      this.elem[this.i].scrollIntoView();
      this.elem[this.i].style.backgroundColor = "saddlebrown";
      this.elem[this.i + 1].style.backgroundColor = "yellow";
    }
    else if (this.i === 0) {
      this.i = this.elem.length - 1

      this.elem[this.i].scrollIntoView();


    }

  }


}
