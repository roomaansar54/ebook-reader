import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookSearchComponent } from '../book-search/book-search.component';
import { IBook } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  completeData: any;
  results: any;
  books:Array<IBook>=[]

  constructor(
    private bookService:BookService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.bookService.get()
    .subscribe(data =>{
      this.completeData=data
      this.results = this.completeData["results"] // var id=0
      for (let result of this.completeData["results"]){
        this.books.push({"id":result["id"],"download":result["formats"]["text/html"],"image":result["formats"]["image/jpeg"]})

        
        // id = id + 1

      }
      console.log(this.books)
    })
      // console.log(this.ids)
      // for(let id=1;id < 1000; id++){

      //   this.bookService.getByID(id)
      //   .subscribe(data=>{
      //     this.singleIdData=data
      //     this.book.push({"id":this.singleIdData["id"],"image":this.singleIdData["formats"]["image/jpeg"],"download":this.singleIdData["formats"]["application/octet-stream"]})
      //     // console.log(this.book)
          // console.log(this.book[0].download)
          // this.images.push(this.singleIdData["formats"]["image/jpeg"])
          // this.downloads.push(this.singleIdData["formats"]["application/octet-stream"])
          // console.log(this.images)
          // console.log(data)
          // console.log(this.downloads,this.singleIdData["id"])

        // })

}

open(){
  this.dialog.open(BookSearchComponent, {
    disableClose: false,
  }).afterClosed().subscribe(() => {
  });
}

// console.log(this.dat["results"])
    
  
  goToLink(id:number){
    window.open("https://www.gutenberg.org/files/"+id+"/"+id+"-0.zip", "_blank");
}
}
