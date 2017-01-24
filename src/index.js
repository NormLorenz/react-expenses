import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Router, Route, hashHistory } from 'react-router';

import app from './components/app';
import summary from './components/summary';
import expenses from './components/expenses';
import properties from './components/properties';
import categories from './components/categories';
import reports from './components/reports';
import about from './components/about';
import { firebaseAuth } from './config/constants'

// import firebase from 'firebase';

// let config = {
//   apiKey: 'AIzaSyC23XSSAuUCZEKOxV1yncmVuid8ltg00aM',
//   authDomain: 'expenses-c2168.firebaseapp.com',
//   databaseURL: 'https://expenses-c2168.firebaseio.com',
//   storageBucket: 'expenses-c2168.appspot.com',
//   messagingSenderId: '709287725606'
// };

// firebase.initializeApp(config);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={app}>
      <Route path='/summary' component={summary} />
      <Route path='/expenses' component={expenses} />
      <Route path='/properties' component={properties} />
      <Route path='/categories' component={categories} />
      <Route path='/reports' component={reports} />
      <Route path='/about' component={about} />
    </Route>
  </Router>
), document.getElementById('root'));