import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import {IBook} from '../book.model'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookData:any;
  b!:IBook ;
  book:Array<IBook>=[];
  iddd!: number;
  image!:string;
  books$:any;
  errorMsg!: string;
  errorMessage: any;

  // book: IBook | undefined

  constructor(    
    private location: Location, 
    private route: ActivatedRoute,
    private bookService:BookService

    ) { }

  ngOnInit(): void {

    this.getBook()

  }
  
  getBook(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
   console.log(id)
    this.bookService.getByID(id)
      .subscribe((data) => {
        this.bookData = data;
        this.iddd=this.bookData["id"];
        this.book.push({"id":this.bookData["id"],"image":this.bookData["formats"]["image/jpeg"],"download":this.bookData["formats"]["text/html"] })
        console.log(this.iddd)
        // this.book.id = this.bookData["id"]
      },
      (error) => {
        console.log(error)
        if (error.status === 404){
          this.errorMessage = "The searched book is not found";
        }
        

      }
      );
  }
  goBack(){
    this.location.back();

  }
  

}
