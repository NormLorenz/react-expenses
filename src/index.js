import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyC70EfVJ08gG5PFhWa6o-tHnojftsP7HCQ",
  authDomain: "posts-c2d22.firebaseapp.com",
  databaseURL: "https://posts-c2d22.firebaseio.com",
  storageBucket: "posts-c2d22.appspot.com",
  messagingSenderId: "654370730649"
};

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
