import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()

export class UserService {
    usersData;
    activeUser;
    constructor(private http: Http) {
    }

    getData(): Promise<any> {
        return new Promise((resolve) => {
            this.usersData = this.http.get('https://lib1209-216918.firebaseio.com/users.json').pipe(map((response: Response) => {
                const data = response.json();
                return (data);
            }));
            resolve(this.usersData);
        });
    }

    getAuthorization(email): Promise<any> {
        let currentUser;
        return new Promise((resolve, reject) => {
            this.getData().then((value) => {
                value.subscribe((userData) => {
                    userData.forEach(user => {
                        if (user.email.includes(email)) {
                            currentUser = user;
                        }
                    });
                    if (currentUser) {
                        resolve(currentUser);
                    } else {
                        reject();
                    }
                });
            });
        });
    }
}
