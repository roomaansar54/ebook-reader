import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import  {HttpClientModule} from '@angular/common/http';
import { BookSearchComponent } from './book-search/book-search.component';
import { BooksComponent } from './books/books.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from './highlight.pipe';
// import { AngularEpubViewerModule } from 'angular-epub-viewer';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookSearchComponent,
    BooksComponent,
    HighlightPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
