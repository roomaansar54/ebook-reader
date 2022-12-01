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
// this.getData()
  }
  getData(){
    // this._service.get()
    // .subscribe(data =>{
    //   this.completeData=data
    //   // var id=0
    //   for (let result of this.completeData["results"]){
    //     // console.log(result["id"])

    //     this.ids.push(result["id"])
        
    //     // id = id + 1

    //   }
      // console.log(this.ids)
      for(let id=1;id < 1000; id++){

        this._service.getByID(id)
        .subscribe(data=>{
          this.singleIdData=data
          this.book.push({"id":this.singleIdData["id"],"image":this.singleIdData["formats"]["image/jpeg"],"download":this.singleIdData["formats"]["application/octet-stream"],"author":this.singleIdData["author"]})
          // console.log(this.book)
          // console.log(this.book[0].download)
          // this.images.push(this.singleIdData["formats"]["image/jpeg"])
          // this.downloads.push(this.singleIdData["formats"]["application/octet-stream"])
          // console.log(this.images)
          // console.log(data)
          // console.log(this.downloads,this.singleIdData["id"])

        })

      }

// console.log(this.dat["results"])
    
  }
  goToLink(id:number){
    window.open("https://www.gutenberg.org/files/"+id+"/"+id+"-0.zip", "_blank");
}

}
