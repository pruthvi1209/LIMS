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
    userAccountModification(modification: string, isbn) {
        this.getUserData().then ( () => {
        const token = this.authService.token;
        const date = new Date();
        const currentDate = date.toDateString();
        const returnDate = date.setDate(date.getDate() + 7).toString();
        switch (modification) {

            case 'borrowBook'   :       let alreadyBookExists = false;
                                        const newSubscription = new OwedBook(
                                        isbn,
                                        date.toDateString(),
                                        currentDate,
                                        false);
                                        if (!this.currentUser.borrowedBooks) {
                                            console.log("Array creted");
                                            this.currentUser.borrowedBooks = [];
                                        } else {
                                            this.currentUser.borrowedBooks.forEach( book => {
                                                if (book.isbn === isbn) {
                                                    console.log('book already exists');
                                                    alreadyBookExists = true;
                                                }
                                            });
                                        }
                                        if (!alreadyBookExists) {
                                            this.currentUser.borrowedBooks.push(newSubscription);
                                            }
                                    break;

            case 'renewBook'    :   this.currentUser.borrowedBooks.forEach(book => {
                                            if (book.isbn === isbn && !book.isRenewed) {
                                                book.isRenewed = true;
                                                book.borrowedDate = currentDate;
                                                book.returnDate = date.toDateString();
                                            }
                                        });
                                    break;

            case 'wishList'     :   let alreadyFavExists = false;
                                    const newFav = new Favorites(isbn);
                                        if (!this.currentUser.wishList) {
                                            this.currentUser.wishList = [];
                                        } else {
                                            this.currentUser.borrowedBooks.forEach( book => {
                                                if (book.isbn === isbn) {
                                                    console.log('book already exists');
                                                    alreadyFavExists = true;
                                                }
                                            });
                                        }
                                        if (!alreadyFavExists) {
                                            this.currentUser.borrowedBooks.push(newSubscription);
                                            }
                                    break;
            case 'return'       :  const index = isbn;
                                   console.log('Retun Book', index);
                                        if (index >= 0 ) {
                                            this.currentUser.borrowedBooks.splice(index, 1);
                                            }
                                    break;
            case 'unFav'        : const favNo = isbn;
                                    if (favNo >= 0 ) {
                                            this.currentUser.wishList.splice(favNo, 1);
                                            console.log('deleted');
                                            }
                                    break;
        }
        this.http.put('https://lib1209-216918.firebaseio.com/users/' + this.userIndex + '.json?auth=' + token, this.currentUser).
        subscribe((value) => {
            if (value['status'] === 200) {
                this.userDataChanged.next(true);
                this.uiservice.loadingStateChanged.next(true);
                console.log( 'ok');
            }
        },
        (error) => {
            console.log( error);
        });
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
