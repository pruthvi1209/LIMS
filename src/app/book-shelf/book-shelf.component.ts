import { Component, OnInit, Input, Inject } from '@angular/core';
import { Books } from '../dataModels/books.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {
  @Input() book: Books;
  constructor( ) {
    // console.log(this.book);
  }

  ngOnInit() {
  }

}
