import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
templateUrl: './newBook.component.html',
styleUrls: ['./newBook.component.css'],
selector:'app-newBook'
})

export class NewBookComponent {
newBookfrom = new FormControl('');
}