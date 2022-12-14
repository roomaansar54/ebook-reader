import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import * as $ from 'jquery';
// declare var $: any;  

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  box:any;
  bookContinuousData:any;
  showPre = false;
  searchPage:number = 1;
  i = 0;
  bookData: any;
  isError = true;
  errorMessage = "";
  bookText: any;
  elem = document.getElementsByTagName("mark");
  paginationPage_span:any;
 currentPage = 1;
  CountPerEachPage = 2;
  previousPage:any;
  nextPage:any;
//   //json object mapping for content
//   paginationObject = [
//   {
//   content : "Hi,"
//   },
//   {
//   content : "Hello...."
//   },
//   {
//   content : "I"
//   },
//   {
//   content : "Amardeep."
//   },
//   {
//   content : "My"
//   },
//   {
//   content : "Best"
//   },
//   {
//   content : "Friend"
//   },
//   {
//   content : "is"
//   },
//   {
//   content : "Paramesh"
//   },
//   {
//   content : "Nathi"
//   },
//   {
//   content : ".........."
//   },];
  showMyTable: any;
  booklength: any;
//   //function for go to previous page
//   getPereviousPage(length:number,content:any) {
//   if (this.currentPage > 1) {
//   this.currentPage--;
//   this.validateEachPage(this.currentPage,content,length)
// }
//   }
//   //function for go to next page
//   getNextPage(length:number,content:any) {
//   if (this.currentPage < length) {
//   this.currentPage++;
//   this.validateEachPage(this.currentPage,content,length)
// }
//   }
//   //function for validating real time condition like if move to last page, last page disabled etc
// validateEachPage(paginationPage : number,content:any,length:any) {
//   this.nextPage = document.getElementById("nextPage");
//   this.previousPage = document.getElementById("previousPage");
//   this.showMyTable = document.getElementById("showTable");
//   this.paginationPage_span = document.getElementById("paginationPage");
  //validating pages based on page count
  // if (paginationPage < 1)
  // paginationPage = 1;
  // if (paginationPage >length)
  // paginationPage = length;
  // this.showMyTable.innerHTML = "";
  // for (var i = (paginationPage - 1) * this.CountPerEachPage; i < (paginationPage * this.CountPerEachPage); i++) {
  // this.showMyTable.innerHTML += content[i] + "<br>";
  // }
  // this.paginationPage_span.innerHTML = paginationPage;
  // if (paginationPage == 1) {
  // this.previousPage.style.visibility = "hidden";
  // } else {
  // this.previousPage.style.visibility = "visible";
  // }
  // if (paginationPage == length) {
  // this.nextPage.style.visibility = "hidden";
  // } else {
  // this.nextPage.style.visibility = "visible";
  // }
  // }
  // //function per number of Pages
  // numberOfPages() {
  // return Math.ceil(this.paginationObject.length / this.CountPerEachPage);
  // }
  

  appearCount = false;
  searchText = '';
  count = 0;
  textURL!: string;

  appearNext = false

  $doc:any;
  pageHeight :any;
 
  cou :any;
   $li :any;
   indexArray:any;
  co: any;
;
 

  // book: IBook | undefined

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private bookService: BookService

  ) { }

  ngOnInit(): void {
    // this.validateEachPage(1);

    this.getBook();

    // this.$doc = $('#doc *');
    // var pageHeight = 700;
    
    // this.cou = 0
    
    // while (this.$doc.length && ++this.cou < 100) {
    
    //   this.$li = $('<li>');
    //   $('ul').append(this.$li);
    
    //   var min = 0;
    //   var max = this.$doc.length;
    //   var mid;
    
    //   console.log('new search');
    //   console.log(min, max);
    //   console.log("mid",mid)

    
    //   while ((max - min) > 5) {
    
    //     console.log(min, max);
    
    //     this.$li.empty();
    //     mid = Math.floor((max + min) / 2);
    //     this.$li.append(this.$doc.slice(0, mid + 1));
    
    //     if (this.$li.height() > pageHeight) {
    //       max = mid
    //     } else {
    //       min = mid;
    //     }
    //   }
    
    //   this.$li.css('height', pageHeight);
    //   this.$doc.splice(0, min + 1);
    // }
    
    
  // var i = document.getElementsByTagName("li")

  // for (let d in i){
  //   // i[d].classList.add("li");
  //   i[d].style.backgroundColor="blue"
  //   i[d].style.border="1px solid black"
  //   // i[d].style.border="1px solid black"
  //   i[d].style.display = "inline-block"
  //   i[d].style.width = "450px"
  //   i[d].style.verticalAlign="top"
  //   i[d].style.margin="5px"
  //   i[d].style.listStyleType="none"
  //   i[d].style.listStyleType="none"
  //   i[d].style.padding="20px"
  // }
  


  }

  getBook(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.bookService.getByID(id)
      .subscribe((data) => {
        this.bookData = data;
        if ("text/plain; charset=us-ascii" in this.bookData["formats"]) {
          this.textURL = this.bookData["formats"]["text/plain; charset=us-ascii"].split('org')[1]
        }
        else if ("text/plain; charset=utf-8" in this.bookData["formats"]) {
          this.textURL = this.bookData["formats"]["text/plain; charset=utf-8"].split('org')[1]
        }
        else if("text/plain; charset=iso-8859-1" in this.bookData["formats"]){
          this.textURL = this.bookData["formats"]["text/plain; charset=iso-8859-1"].split('org')[1]


        }
        this.bookService.getText(this.textURL)
          .subscribe((textdata) => {
            this.bookText = textdata;
            this.bookContinuousData = this.bookText.split("\r\n\r\n");
            // this.bookText = this.bookText.split("\r\n\r\n");
            // const array = [2, 5, 9];

            // console.log(array);
            
            // const index = array.indexOf(5);
            // if (index > -1) { // only splice array when item is found
            //   array.splice(index, 1); // 2nd parameter means remove one item only
            // }
            
            // // array = [2, 9]
            // console.log(array); 
            this.indexArray=[]
            
            // console.log(this.bookText)
            // for (let i of this.bookText){
            //   if (i === ""){
            //      var index = this.bookText.indexOf(i);
            //     //  this.indexArray.append(index)
            //      this.bookText.splice(index, 1)

            //   }
            // }
            this.booklength= Math.ceil(this.bookText.length / this.CountPerEachPage);
            console.log("book length",this.bookText.length)
            // this.validateEachPage(this.currentPage,this.bookText,this.booklength)
            // console.log(this.bookText)

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
    this.box = this.showPre === true? document.getElementsByClassName("pre"): document.getElementsByClassName("book");
    if (this.box != null) {
      for (var i = 0; i < this.box.length; i++) {
        if (this.box[i].classList.contains('largeFont')) {
          this.box[i].classList.remove('largeFont')
        }
        if (this.box[i].classList.contains('normalFont')) {
          this.box[i].classList.remove('normalFont')
        }


        this.box[i].classList.add('largestFont');
        // console.log(this.box[i].className);
      }
    }


  }
  normalFont() {
    this.box = this.showPre === true? document.getElementsByClassName("pre"): document.getElementsByClassName("book");
    if (this.box != null) {
      for (var i = 0; i < this.box.length; i++) {
        if (this.box[i].classList.contains('largeFont')) {
          this.box[i].classList.remove('largeFont')
        }
        if (this.box[i].classList.contains('largestFont')) {
          this.box[i].classList.remove('largestFont')
        }

        this.box[i].classList.add('normalFont');
        // console.log(this.box[i].className);
      }
    }
  }
  largeFont() {
    this.box = this.showPre === true? document.getElementsByClassName("pre"): document.getElementsByClassName("book");
    if (this.box != null) {
      for (var i = 0; i < this.box.length; i++) {
        if (this.box[i].classList.contains('largestFont')) {
          this.box[i].classList.remove('largestFont')
        }
        if (this.box[i].classList.contains('normalFont')) {
          this.box[i].classList.remove('normalFont')
        }
        this.box[i].classList.add('largeFont');
        // console.log(this.box[i].className);
      }
    }

  }
  normalSpacing(){
    this.box = this.showPre === true? document.getElementsByClassName("pre"): document.getElementsByClassName("book");
    if (this.box != null) {
      for (var i = 0; i < this.box.length; i++) {
        if (this.box[i].classList.contains('add-broader-space')) {
          this.box[i].classList.remove('add-broader-space')
        }
        if (this.box[i].classList.contains('add-narrow-space')) {
          this.box[i].classList.remove('add-narrow-space')
        }
        this.box[i].classList.add('add-normal-space');
        // console.log(this.box[i].className);
      }
    }

  }
  narrowSpacing(){
    this.box = this.showPre === true? document.getElementsByClassName("pre"): document.getElementsByClassName("book");
    if (this.box != null) {
      for (var i = 0; i < this.box.length; i++) {
        if (this.box[i].classList.contains('add-normal-space')) {
          this.box[i].classList.remove('add-normal-space')
        }
        if (this.box[i].classList.contains('add-broader-space')) {
          this.box[i].classList.remove('add-broader-space')
        }
        this.box[i].classList.add('add-narrow-space');
        // console.log(this.box[i].className);
      }
    }


  }
  broaderSpacing(){
    this.box = this.showPre === true? document.getElementsByClassName("pre"): document.getElementsByClassName("book");
    if (this.box != null) {
      for (var i = 0; i < this.box.length; i++) {
        if (this.box[i].classList.contains('add-normal-space')) {
          this.box[i].classList.remove('add-normal-space')
        }
        if (this.box[i].classList.contains('add-narrow-space')) {
          this.box[i].classList.remove('add-narrow-space')
        }
        this.box[i].classList.add('add-broader-space');
        // console.log(this.box[i].className);
      }
    }

  }


  // need this function becuse using elem.length gives ng error thtat value updated after checking
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
          if (this.showPre === true){
            this.co = this.bookText.match(re).length;

          }
          else{
            this.co = this.bookContinuousData.join().match(re).length;
          }
  
          this.count = this.count + this.co

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

  gotoPage(p:number){
    document.getElementById(`page${p}`)?.scrollIntoView()
  }
  changeDisplay(){
    this.showPre =! this.showPre
    console.log(this.showPre)

  }


}
