import * as firebase from 'firebase';


export class AuthService {


    currentUser;
    token: string;
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    signIn(email, password, dialog) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
            dialog.closeAll();
            console.log('Logged in ');
        }).catch(error => console.log(error)
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
                    // console.log(user);
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
}
