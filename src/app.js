import React, { Component } from 'react';
import './app.css';
import firebase from 'firebase';
//import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Link } from 'react-router'

const ReactToastr = require("react-toastr");
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class App extends Component {

  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  addAlert() {
    console.log('hi');
    this.refs.container.success(
      "New property record written to Firebase!",
      "Success", {
        timeOut: 5000,
        extendedTimeOut: 1000,
        preventDuplicates: false
      });
    // window.open("http://youtu.be/3SR75k7Oggg");
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
        <ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
        <button onClick={this.addAlert.bind(this)}>Alert</button>
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
  return <h4>Welcome back!</h4>;
}

function GuestGreeting(props) {
  return <h4>Please sign up.</h4>;
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