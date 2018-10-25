import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()

export class BooksFetch {
    constructor(private http: Http) { }
    allbooks = [];
    getAllBooks() {
        return this.http.get('https://my-libarary.firebaseio.com/books.json').pipe(map((response: Response) => {
            const data = response.json();
            return data;
        }));
    }
    getBooksWithISBN(isbn) {
        
    }
}
