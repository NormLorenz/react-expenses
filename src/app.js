import React, { Component } from 'react';
import './app.css';
import firebase from 'firebase';
//import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Link } from 'react-router'

class App extends Component {

  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      })
    });
  }

  render() {
    return (
      <div>
        <h2>Business Expenses and Receipts</h2>
        <ul className='w3-navbar w3-border w3-blue-grey'>
          <li><Link className='w3-hover-blue' to='/'>Home</Link></li>
          <li><Link className='w3-hover-blue' to='/summary'>Summary</Link></li>
          <li><Link className='w3-hover-blue' to='/expenses'>Expenses</Link></li>
          <li><Link className='w3-hover-blue' to='/properties'>Properites</Link></li>
          <li><Link className='w3-hover-blue' to='/categories'>Categories</Link></li>
          <li><Link className='w3-hover-blue' to='/reports'>Reports</Link></li>
          <li><Link className='w3-hover-blue' to='/about'>About</Link></li>
        </ul>
        {this.props.children}
        <h4>{this.state.speed}</h4>
        <Greeting isLoggedIn={false} />
      </div>
    );
  }
}

export default App;

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}


// import React from 'react';

// import LinkContainer from './LinkContainer';

// // Don't use a stateless function, to allow users to set a ref.
// /* eslint-disable react/prefer-stateless-function */
// export default class IndexLinkContainer extends React.Component {
//   render() {
//     return (
//       <LinkContainer {...this.props} onlyActiveOnIndex />
//     );
//   }
// }
// /* eslint-enable react/prefer-stateless-function */