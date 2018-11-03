import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-bookdetails',
    templateUrl: './bookDetails.component.html',
    styleUrls: ['./bookDetails.component.css']
  })

  export class BookDetailsComponent {
    @Input() book;
    constructor(){}
  }
