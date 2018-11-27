import firebase from 'firebase'
require('firebase/firestore')
const config = {
    apiKey: "AIzaSyBunPHxl5IqQWXHNSuvDi-5PD3fiIGnShU",
    authDomain: "room-test-aed39.firebaseapp.com",
    databaseURL: "https://room-test-aed39.firebaseio.com",
    projectId: "room-test-aed39",
    storageBucket: "room-test-aed39.appspot.com",
    messagingSenderId: "395432526596"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const db = firebase.firestore();
export const settings = {/* your settings... */ timestampsInSnapshots: true };
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const provider2 = new firebase.auth.GoogleAuthProvider();
db.settings(settings);
export default firebase;