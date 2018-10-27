import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable()

export class UserService {
    usersData;
    activeUser;
    constructor(private http: Http, private authService: AuthService) {
    }

    getData(): Promise<any> {
        const token = this.authService.token;
        console.log(token);
        return new Promise((resolve) => {
            this.usersData = this.http.get('https://lib1209-216918.firebaseio.com/users.json?auth=' + token).
            pipe(map((response: Response) => {
                const data = response.json();
                return (data);
            }));
            resolve(this.usersData);
        });
    }

    getUserData(): Promise<any> {
        let currentUser;
        return new Promise((resolve, reject) => {
            this.getData().then((value) => {
                value.subscribe((userData) => {
                    userData.forEach(user => {
                        if (user.email.includes(this.authService.currentUser.email)) {
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
