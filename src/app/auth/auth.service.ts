import * as firebase from 'firebase';
import { MatDialog } from '@angular/material';
import { Observable, Observer, observable } from 'rxjs';

export class AuthService {


    currentUser;
    token: string;
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token) => this.token = token
        ).catch(
            error => console.log(error)
        );
    }
    isUserAuthenticated() {
        console.log(this.token);
        return this.token != null;
    }

    signIn(email, password, dialog) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
            dialog.closeAll();
            console.log('Logged in ');
        }).catch(error => console.log(error)
        );
    }
    checkUser() {
        return firebase.auth().currentUser != null;
    }
    logout() {
        return firebase.auth().signOut();
    }
    social(service, dialog) {
        let userDetails;
        if (service === 'facebook') {
         userDetails = new firebase.auth.FacebookAuthProvider();
    } else if ( service === 'google') {
         userDetails = new firebase.auth.GoogleAuthProvider();
    }
    firebase.auth().signInWithPopup(userDetails).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential;
        // The signed-in user info.
        // this.currentUser = new Observable ( (observer) => {
        //      observer.next(result.user.providerData);
        // });
        this.currentUser = result.user.providerData;
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
}
