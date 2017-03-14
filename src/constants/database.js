import firebase from 'firebase';

// const config = {
//   apiKey: 'AIzaSyC23XSSAuUCZEKOxV1yncmVuid8ltg00aM',
//   authDomain: 'expenses-c2168.firebaseapp.com',
//   databaseURL: 'https://expenses-c2168.firebaseio.com',
//   storageBucket: 'expenses-c2168.appspot.com',
//   messagingSenderId: '709287725606'
// };

const config = {
  apiKey: 'AIzaSyC70EfVJ08gG5PFhWa6o-tHnojftsP7HCQ',
  authDomain: 'posts-c2d22.firebaseapp.com',
  databaseURL: 'https://posts-c2d22.firebaseio.com',
  storageBucket: 'posts-c2d22.appspot.com',
  messagingSenderId: '654370730649'
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const database = firebase.database();