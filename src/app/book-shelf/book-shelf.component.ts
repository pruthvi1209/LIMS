import { Component, OnInit, Input, Inject } from '@angular/core';
import { Books } from '../dataModels/books.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { BookDetailsComponent } from '../bookDetails/bookDetails.component';
import { BooksFetch } from '../booksFetch.service';
import { Http } from '@angular/http';
import { UIService } from '../../shared/ui.service';

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
  constructor(private userService: UserService, private authService: AuthService, public dialog: MatDialog,
    private bookService: BooksFetch, private http: Http, private uiService: UIService) {
  }

  ngOnInit() {
    if (this.isReturnDateVisible) {
      this.returnDate = new Date(this.returnDate);
      const today = new Date();
      const ONE_DAY = 1000 * 60 * 60 * 24;
      this.overDue = Math.ceil((this.returnDate.getTime() - (today.getTime())) / ONE_DAY);
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
    instance.isCloseVisible = true;
    instance.addBook = false;
    instance.copies = false;
  }
  deleteBook(isbn) {
    const curretnUI = document.getElementById(isbn)
    curretnUI.style.opacity = "0.5";
    const token = this.authService.token;
    this.bookService.getAllBooks().subscribe((books) => {
      length = books.length;
      let newBooks = books.filter((book) => {
        return book.isbn != isbn;
      });
      this.http.put('https://my-libarary.firebaseio.com/books.json', newBooks).subscribe((value) => {
        if (value.status === 200) {
          this.uiService.showSnackar("Book Deleted", null, 3000);
          document.getElementById(isbn).style.display = "none";
        }
      },
        (e) => {
          this.uiService.showSnackar(e.message, null, 6000);
          document.getElementById(isbn).style.opacity = "1";
        });
    },
    )}
}
