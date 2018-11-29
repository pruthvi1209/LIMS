import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Books } from '../../dataModels/books.model';
import { BooksFetch } from '../../../app/booksFetch.service';
import { UIService } from '../../../shared/ui.service';
@Component({
templateUrl: './newBook.component.html',
styleUrls: ['./newBook.component.css'],
selector:'app-newBook'
})

export class NewBookComponent {
    dataAvailable = false;
    newBook: Books;
    constructor( private http: Http, private bookService: BooksFetch, private uiService :UIService){}
fetchData(formData){
        this.http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + formData.value.isbn).subscribe((response) => {
        console.log(response.json().items)    
        if(response.json().items){
            const data = response.json().items[0].volumeInfo;
            const categories = data.categories ? data.categories[0] : 'all';
            this.newBook = new Books (data.authors[0],categories,formData.value.copies ? formData.value.copies : 10,
                            formData.value.isbn,data.publisher,data.averageRating,data.title,data.imageLinks['thumbnail'],data.publishedDate, data.description)
            this.dataAvailable = true;
            }
            else{
                this.uiService.showSnackar("No data found, add book with all details", null, 5000);
            }
        },
        (e) => {console.log(e)});
}

}