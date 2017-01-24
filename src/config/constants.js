import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC23XSSAuUCZEKOxV1yncmVuid8ltg00aM',
  authDomain: 'expenses-c2168.firebaseapp.com',
  databaseURL: 'https://expenses-c2168.firebaseio.com',
  storageBucket: 'expenses-c2168.appspot.com',
  messagingSenderId: '709287725606'
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth