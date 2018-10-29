import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Books } from './dataModels/books.model';

@Injectable()

export class BooksFetch {
    constructor(private http: Http) { }
    allbooks = [];
    // filteredBooks = new Subject<any[]>();
    getAllBooks() {
        return this.http.get('https://my-libarary.firebaseio.com/books.json').pipe(map((response: Response) => {
            const data = response.json();
            return data;
        }));
    }
    getBooksWithISBN(isbn): Promise<Books> {
         return new Promise( (resolve) => {
            this.getAllBooks().subscribe((books) => {
            this.allbooks = books;
                 books.forEach( (book) => {
                    if (book.isbn.toString() === isbn) {
                        resolve(book);
                    }
                } );
            });
        });
}
}

