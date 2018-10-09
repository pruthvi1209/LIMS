import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BooksFetch } from '../booksFetch.service';
import { Books } from '../dataModels/books.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() foundBooks = new EventEmitter<any[]>();
  @Input() category ;
  searchForm: FormGroup;

  searchBy = [ 'Author', 'Title'];
  books: Books [];
  searchText = '';
  constructor( private booksService: BooksFetch) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup ({
      'searchText' : new FormControl (null),
      'filter': new FormControl ('Title'),
      'category': new FormControl ()
    });
    }
  getbooks() {
    this.foundBooks.emit(this.searchForm.value);
  }
}
