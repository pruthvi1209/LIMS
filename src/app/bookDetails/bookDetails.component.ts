import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BooksFetch } from '../../app/booksFetch.service';

@Component({
    selector: 'app-bookdetails',
    templateUrl: './bookDetails.component.html',
    styleUrls: ['./bookDetails.component.css']
  })

  export class BookDetailsComponent implements OnInit {
    @Input() book  ;
    @Input() isCloseVisible;
    @Input() addBook;
    @Input() copies;
    starList = [];
    constructor(private dialog: MatDialog, private bookService : BooksFetch){
    }
    ngOnInit(){
      for( let i=0; i<=4; i++){
        if(i<this.book.rating){
          this.starList[i] = true;
        } else {
          this.starList[i] =false;
        }
      }
    }
    closeDialog(){
      this.dialog.closeAll();
    }
    addingNewBook(){
      this.bookService.addBook(this.book);
  }
  }
