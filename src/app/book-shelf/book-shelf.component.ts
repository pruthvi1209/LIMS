import { Component, OnInit, Input, Inject } from '@angular/core';
import { Books } from '../dataModels/books.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { BookDetailsComponent } from '../bookDetails/bookDetails.component';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {
  @Input() book;
  @Input() isReturnDateVisible: boolean;
  @Input() returnDate;
  @Input() index;
  @Input() isFav;
  dateColor = 'blue';
  overDue: number;
  constructor( private userService: UserService, private authService: AuthService, public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.isReturnDateVisible) {
      this.returnDate = new Date(this.returnDate);
      const today = new  Date();
      const ONE_DAY = 1000 * 60 * 60 * 24;
      this.overDue = Math.ceil((this.returnDate.getTime()  - ( today.getTime())) / ONE_DAY);
      if (this.overDue < 0) {
        this.dateColor = 'red';
      }
    }
  }
returnBook(modification, isbn) {
  this.isReturnDateVisible = !this.isReturnDateVisible;
  this.userService.userAccountModification(modification, isbn);
}
openModal(book) {
  const dialogRef = this.dialog.open(BookDetailsComponent);
  const instance = dialogRef.componentInstance;
  instance.book = this.book;
}
}
