import firebase from '@firebase/app';
import '@firebase/firestore'
import '@firebase/storage';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyA-1kRCY9vKbjSjDxj3wcLwSPj8bHtwRR0",
    authDomain: "holiday-plannerapp.firebaseapp.com",
    databaseURL: "https://holiday-plannerapp.firebaseio.com",
    projectId: "holiday-plannerapp",
    storageBucket: "holiday-plannerapp.appspot.com",
    messagingSenderId: "298272981793"
};

export const firebaseApp = firebase.initializeApp(config);
// console.log('kjkja', firebaseApp.name);
export const firebaseStorage = firebaseApp.storage().ref();
export const auth = null;
const db = firebaseApp.firestore();
db.settings({
    timestampsInSnapshots: true
});
export default db;