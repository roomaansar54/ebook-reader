import { Component } from '@angular/core';
import { IBook } from './book.model';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ebook-reader';
  dat:any;
  ids: Array<number>=[]
  book:Array<IBook>=[]
  images:Array<string>=[]
  downloads:Array<string>=[]
  completeData:any;
  singleIdData:any;
  single:IBook | undefined
  constructor(private _service:BookService){}

  ngOnInit(){
this.getData()
  }
  getData(){
    this._service.get()
    .subscribe(data =>{
      this.completeData=data
      // var id=0
      for (let result of this.completeData["results"]){
        // console.log(result["id"])

        this.ids.push(result["id"])
        
        // id = id + 1

      }
      // console.log(this.ids)
      for(let id of this.ids){

        this._service.getByID(id)
        .subscribe(data=>{
          this.singleIdData=data
          this.book.push({"image":this.singleIdData["formats"]["image/jpeg"],"download":this.singleIdData["formats"]["application/octet-stream"]})
console.log(this.book)
          // this.images.push(this.singleIdData["formats"]["image/jpeg"])
          // this.downloads.push(this.singleIdData["formats"]["application/octet-stream"])
          // console.log(this.images)
          // console.log(data)
          // console.log(this.downloads,this.singleIdData["id"])

        })

      }

// console.log(this.dat["results"])
    })
  }

}