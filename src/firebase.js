import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: 'AIzaSyAkj47q4t1djLkdQfmSGC2XOSCzs52oSo4',
    authDomain: 'fipugram.firebaseapp.com',
    projectId: 'fipugram',
    storageBucket: 'fipugram.appspot.com',
    messagingSenderId: '1003961861611',
    appId: '1:1003961861611:web:fba9233c32e8a61b8905ae',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

export { firebase, db, storage };
