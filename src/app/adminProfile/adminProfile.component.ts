import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminProfile',
  templateUrl: './adminProfile.component.html',
  styleUrls: ['./adminProfile.component.css']
})
export class AdminProfileComponent implements OnInit {
  booksCount=0;
  constructor() { }

  ngOnInit() {
    this.booksCount = 45;
  }

}
