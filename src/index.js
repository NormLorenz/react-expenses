import React from 'react';
import { render } from 'react-dom';
//import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Router, Route, hashHistory } from 'react-router'

import app from './app';
import summary from './summary'
import expenses from './expenses'
import properties from './properties'
import categories from './categories'
import reports from './reports'
import about from './about'

import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyC70EfVJ08gG5PFhWa6o-tHnojftsP7HCQ',
  authDomain: 'posts-c2d22.firebaseapp.com',
  databaseURL: 'https://posts-c2d22.firebaseio.com',
  storageBucket: 'posts-c2d22.appspot.com',
  messagingSenderId: '654370730649'
};

firebase.initializeApp(config);

render((
  <Router history={hashHistory}>
    <Route path='/' component={app}>
      <Route path='/summary' component={summary}/>
      <Route path='/expenses' component={expenses}/>
      <Route path='/properties' component={properties}/>
      <Route path='/categories' component={categories}/>
      <Route path='/reports' component={reports}/>
      <Route path='/about' component={about}/>
    </Route>
  </Router>
), document.getElementById('root'))