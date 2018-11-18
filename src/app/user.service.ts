import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { UIService } from '../shared/ui.service';
import { User, OwedBook, Favorites } from './dataModels/user.model';
import { Subject } from 'rxjs';

@Injectable()

export class UserService {
    usersData;
    activeUser;
    userIndex = 0;
    currentUser: User;
    userDataChanged = new Subject<boolean>();
    constructor(private http: Http, private authService: AuthService, private uiservice: UIService) {
    }

    getData() {
        const token = this.authService.token;
        return this.http.get('https://lib1209-216918.firebaseio.com/users.json?auth=' + token).
            pipe(map((response: Response) => {
                const data = response.json();
                return (data);
            }));
    }

    createNewUser(userDetails) {
        const token = this.authService.token;
        const newUser = new User(userDetails.email, userDetails.displayName, 'user');
        this.usersData.push(newUser);
        this.http.put('https://lib1209-216918.firebaseio.com/users.json?auth=' + token, this.usersData).subscribe((value) => {
            if (value['status'] === 200) {
                this.uiservice.loadingStateChanged.next(true);
                this.userIndex = this.usersData.length;
                this.currentUser = newUser;
            }
        });
    }
    userAccountModification(modification: string, isbn, index?) {
        let hitFirebase = true;
        let snackMessage: string;
        this.getUserData().then(() => {
            const token = this.authService.token;
            const date = new Date();
            const currentDate = date.toDateString();
            const returnDate = date.setDate(date.getDate() + 7).toString();
            switch (modification) {

                case 'borrowBook': let alreadyBookExists = false;
                                    const newSubscription = new OwedBook(
                                        isbn,
                                        date.toDateString(),
                                        currentDate,
                                        false);
                                    if (!this.currentUser.borrowedBooks) {
                                        this.currentUser.borrowedBooks = [];
                                    } else {
                                        this.currentUser.borrowedBooks.forEach(book => {
                                            if (book.isbn === isbn) {
                                                this.uiservice.showSnackar('Book already exists', null, 2000);
                                                alreadyBookExists = true;
                                                hitFirebase = false;
                                            }
                                        });
                                    }
                                    if (!alreadyBookExists) {
                                        this.currentUser.borrowedBooks.push(newSubscription);
                                    }
                                    snackMessage =  'Book borrowed sucessfully';
                                    break;

                case 'renewBook': this.currentUser.borrowedBooks.forEach(book => {
                                    if (book.isbn === isbn && !book.isRenewed) {
                                        book.isRenewed = true;
                                        book.borrowedDate = currentDate;
                                        book.returnDate = date.toDateString();
                                    }
                                    });
                                    snackMessage = 'Book Renwed sucessfully';
                                    break;

                case 'wishList':  let alreadyFavExists = false;
                                  const newFav = new Favorites(isbn);
                                    if (!this.currentUser.wishList) {
                                        this.currentUser.wishList = [];
                                    } else {
                                        this.currentUser.wishList.forEach(book => {
                                            if (book.isbn === isbn) {
                                                this.uiservice.showSnackar('Book already exists', null, 2000);
                                                alreadyFavExists = true;
                                                hitFirebase = false;

                                            }
                                        });
                                    }
                                    if (!alreadyFavExists) {
                                        this.currentUser.wishList.push(newFav);
                                    }
                                    snackMessage =  'Book added to Wishlist sucessfully';
                                    console.log(document.getElementById(isbn));
                                    break;
                case 'return':
                                if (index >= 0) {
                                    this.currentUser.borrowedBooks.splice(index, 1);
                                }
                                snackMessage =  'Book returned sucessfully';
                                document.getElementById(isbn).style.display = 'none';
                                break;
                case 'unFav': const favNo = index;
                                if (favNo >= 0) {
                                    this.currentUser.wishList.splice(favNo, 1);
                                }
                                snackMessage =  'Book removed  sucessfully';
                                document.getElementById(isbn).style.display = 'none';
                                break;
                                }
            if (hitFirebase === true) {
            this.http.put('https://lib1209-216918.firebaseio.com/users/' + this.userIndex + '.json?auth=' + token, this.currentUser).
                subscribe((value) => {
                    if (value['status'] === 200) {
                        this.userDataChanged.next(true);
                        this.uiservice.loadingStateChanged.next(true);
                        this.uiservice.showSnackar( snackMessage , null, 2000);
                    }
                },
                    (error) => {
                        this.uiservice.showSnackar(error.message, null, 2000);
                    });
                }
                });
    }

    getUserData(): Promise<any> {
        let userDataSubscription;
        return new Promise((resolve, reject) => {
            userDataSubscription = this.getData().subscribe(
                (userData) => {
                    this.usersData = userData;
                    for (let i = 0; i < userData.length; i++) {
                        if (userData[i].email === this.authService.currentUser.email) {
                            this.currentUser = userData[i];
                            this.userIndex = i;
                            resolve(this.currentUser);
                            this.uiservice.loadingStateChanged.next(true);
                            userDataSubscription.unsubscribe();
                        }
                    }
                },
                (error) => this.uiservice.loadingStateChanged.next(true),
                () => {
                    if (!this.currentUser) {
                        this.createNewUser(this.authService.currentUser);
                    }
                    console.log('end');
                });
        });
    }
}
