import { Component, OnInit, Input, Inject } from '@angular/core';
import { Books } from '../dataModels/books.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {
  @Input() book;
  @Input() isReturnDateVisible: boolean;
  returnDate;
  dateColor = 'blue';
  overDue: number;
  constructor( private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {

    if (this.isReturnDateVisible) {
      this.returnDate = new Date(this.book.returnDate);
      const today = new  Date();
      const ONE_DAY = 1000 * 60 * 60 * 24;
      this.overDue = Math.ceil((this.returnDate.getTime()  - ( today.getTime())) / ONE_DAY);
      if (this.overDue < 0) {
        this.dateColor = 'red';
      }
    }
  }

}
