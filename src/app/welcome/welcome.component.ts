import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Books } from '../dataModels/books.model';
import { BooksFetch } from '../booksFetch.service';
import { MatDialog } from '@angular/material';
import { AuthComponent } from '../auth/auth.component';
import { SignUpComponent } from '../auth/signUp/signUp.component';
import { AuthService } from '../auth/auth.service';
import { UIService } from '../../shared/ui.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private booksService: BooksFetch, public dialog: MatDialog, private authService: AuthService, private uiService: UIService,
    private router: Router) {
  }
  searchString = '';
  filteredBooks: Books[];
  lastSearch = [];
  allBooks: Books[];
  showResult = false;
  category = [];
  ngOnInit() {
    this.booksService.getAllBooks().subscribe(books => {
      this.allBooks = books;
      this.filteredBooks = this.allBooks;
      books.forEach(book => {
        if (!this.category.includes(book.category)) {
          this.category.push(book.category);
        }
      });
    },
    (e) => this.uiService.showSnackar('Unable to fetch data',null,5000));
  }
  onBooksFound(formData) {
    // console.log(formData);
    // this.searchString = formData.searchText.toLowerCase();
    // const filter = formData.filter.toLowerCase();
    // const category = formData.category.toLowerCase();
    // if (filter === 'title') {
    //   this.filteredBooks = this.allBooks.filter((book) => {
    //     return book.title.toLowerCase().includes(this.searchString);
    //   });
    // } else if (filter === 'author') {
    //   this.filteredBooks = this.allBooks.filter((book) => {
    //     return book.author.toLowerCase().includes(this.searchString);
    //   });
    // }
    // this.filteredBooks = this.filteredBooks.filter((book) => {
    //   return book.category.toLowerCase().includes(category);
    // });
    // this.showResult = true;
  }

  popUp() {
    const dialogRef = this.dialog.open(AuthComponent);
  }
  register() {
    const dialogRef = this.dialog.open(SignUpComponent);
  }
  logout() {
    this.authService.logout();
  }
  navigate() {
    this.uiService.loadingStateChanged.next(true);
    if (this.authService.currentUser.email === 'admin@admin.com') {
      this.router.navigate(['/adminProfile']);
    } else {
      this.router.navigate(['/userProfile']);
    }
  }
  findBooksWithText(searchParms){
    this.searchString = searchParms[0] ? searchParms[0].toLowerCase() : ' ';
    this.filteredBooks = this.allBooks.filter( (book) => {
    if( searchParms[1].toLowerCase() === 'author'){
      return book.author.toLowerCase().includes(searchParms[0]);
    } else {
      return book.title.toLowerCase().includes(searchParms[0]);
    }
    });
    if(this.filteredBooks.length > 0){
      this.lastSearch = this.filteredBooks;
    }
    this.filteredBooks = this.filteredBooks.length === 0 ? this.lastSearch : this.filteredBooks;
    if(searchParms[2]!== "all") {
      this.filteredBooks = this.filteredBooks.filter((book) =>{
        return book.category === searchParms[2];
      })
    }
  }
}
