export class Books {
    author: string;
    category: string;
    copies: number;
    isbn: string;
    publisher: string;
    rating: number;
    title: string;
    url: string;
    year: string;
    description: string;
    constructor( author: string, category: string, copies: number, isbn: string, publisher: string,
                rating: number, title: string, url: string, year: string, description :string){
                    this.author= author ;
                    this.category= category ;
                    this.copies= copies;
                    this.isbn= isbn ;
                    this.publisher=  publisher ;
                    this.rating= rating;
                    this.title= title ;
                    this.url= url;
                    this.year= year;  
                    this.description = description;
                }

    }
