import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Books } from './dataModels/books.model';
import { UIService } from '../shared/ui.service';

@Injectable()

export class BooksFetch {
    constructor(private http: Http, private uiService: UIService) { }
    allbooks = [];
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
    addBook(newBook){
        this.getAllBooks().subscribe((books)=>{
            let duplicateBook = false;
            books.forEach((book)=>{
                if(book.isbn=== newBook.isbn){
                    duplicateBook = true;
                }
            })
            if(duplicateBook){
            this.uiService.showSnackar('Book Already Exsits', null , 3000);
            return;
            } else{
                books.push(newBook)
                this.http.put('https://my-libarary.firebaseio.com/books.json',books).subscribe((value) =>{
                if(value.status === 200) {
                this.uiService.showSnackar('Book added Sucessfully',null,4000);
                }
            },
            (e) =>{ this.uiService.showSnackar(e.message,null,3000)});
            }
        })
    }
}

