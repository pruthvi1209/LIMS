import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { UIService } from '../../shared/ui.service';

@Injectable()
export class AuthService {


    currentUser;
    token: string;

    constructor(private uiService: UIService) {}
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    signIn(email, password, dialog) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
            console.log(value.user.email);
            if (value.user.email === 'admin@admin.com') {
                this.currentUser = 'admin';
            }
            dialog.closeAll();
            console.log('Logged in ');
        }).catch(error => {
            this.uiService.showSnackar(error.message, null, 5000);
            dialog.closeAll();
        }
        );
    }
    checkUser() {
        return this.currentUser != null;
    }
    logout() {
        return firebase.auth().signOut();
    }
    social(service, dialog) {
        let userDetails;
        if (service === 'facebook') {
            userDetails = new firebase.auth.FacebookAuthProvider();
        } else if (service === 'google') {
            userDetails = new firebase.auth.GoogleAuthProvider();
        }
        firebase.auth().signInWithPopup(userDetails).then((result) => {
            dialog.closeAll();
        }).catch(function (error) {
            // Handle Errors here.
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }
    autoAuth(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    user.getIdToken().then(
                        (token: string) => {
                            this.token = token;
                        });
                    resolve();
                    this.currentUser = user;
                } else {
                    reject();
                    this.currentUser = null;
                    this.token = null;
                }
            });
        });
    }
    initailAuth() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken().then(
                    (token: string) => {
                        this.token = token;
                    });
                this.currentUser = user;
                // console.log(user);
            } else {
                this.currentUser = null;
                this.token = null;
            }
        });

    }
    forgotPassword(eamil) {
        firebase.auth().sendPasswordResetEmail(eamil).then(() => {
        this.uiService.showSnackar('Password Recovery mail sent', null , 3000);
        }).catch((e) => {
        this.uiService.showSnackar(e.message, null , 3000);
        });
    }
}
