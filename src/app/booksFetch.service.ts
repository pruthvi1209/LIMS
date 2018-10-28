import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()

export class BooksFetch {
    constructor(private http: Http) { }
    allbooks = [];
    filteredBooks = new Subject<any[]>();
    getAllBooks() {
        return this.http.get('https://my-libarary.firebaseio.com/books.json').pipe(map((response: Response) => {
            const data = response.json();
            return data;
        }));
    }
    getBooksWithISBN(isbn) {
        if (isbn) {
        isbn.forEach(id => {
        this.getAllBooks().subscribe((books) => {
                 books.filter( (book) => {
                    if (book.isbn === id) {
                        this.filteredBooks.next(book);
                    }
                } );
            });
        });
    }
}
}
