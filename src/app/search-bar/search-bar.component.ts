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
  @Output() findWithText = new EventEmitter<any[]>();
  @Input() category ;
  searchText: FormControl;
  searchBy = [ 'Author', 'Title'];
  books: Books [];
  myfilter = this.searchBy[1];
  searchParams= ['', this.myfilter];
  dropDown = "all";
  advance= false;
  constructor() {
  }

  ngOnInit() {
    this.searchText = new   FormControl();
    this.searchText.valueChanges.subscribe((term) =>{
    this.searchBook(term);
    })
    }
    searchBook( text? ){
    this.searchParams=[text ? text : ' ', this.myfilter, this.dropDown ? this.dropDown : 'all'];
    this.findWithText.emit(this.searchParams);
    }
    // showFilters() {
    //   console.log(this.advance)
    //   return this.advance;
    // }
}