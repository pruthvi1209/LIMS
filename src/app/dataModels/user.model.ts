export class User {
    email: string;
    name: string;
    role: string;
    borrowedBooks: OwedBook[];
    whisList: Favorites[];

    constructor(email: string, name: string, role: string) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

 export class OwedBook {

    isbn: number;
    returnDate: string;
    borrowedDate: string;
    isRenewed: boolean;
    constructor( isbn: number , returnDate: string , borrowedDate: string, isRenewed: boolean) {
        isbn = this.isbn ;
        returnDate = this.returnDate;
        borrowedDate = this.borrowedDate;
        isRenewed = this.isRenewed;

 }

}

 export class Favorites {
    isbn: number;
    constructor(isbn: number) {
        this.isbn = isbn;
    }
}
