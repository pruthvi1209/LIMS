export class User {
    email: string;
    name: string;
    role: string;
    borrowedBooks: OwedBook[];
    wishList: Favorites[];

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
        this.isbn = isbn ;
        this.returnDate = returnDate;
        this. borrowedDate = borrowedDate;
        this.isRenewed = isRenewed;

 }

}

 export class Favorites {
    isbn: number;
    constructor(isbn: number) {
        this.isbn = isbn;
    }
}
