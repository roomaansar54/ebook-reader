import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
    { path: '', component: BookSearchComponent },
    { path: 'book/:id', component: BookComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
