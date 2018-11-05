import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-bookdetails',
    templateUrl: './bookDetails.component.html',
    styleUrls: ['./bookDetails.component.css']
  })

  export class BookDetailsComponent implements OnInit {
    @Input() book;
    starList = [];
    constructor(private dialog: MatDialog){
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
  }
