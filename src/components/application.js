import React, { Component } from 'react';
import './application.css';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { logout } from '../helpers/authorization';
import { firebaseAuth } from '../config/constants';

//import Login from './login';
import Home from './home';
import Summary from './summary';
import Expenses from './expenses';
import Properties from './properties';
import Categories from './categories';
import Reports from './reports';

// javascript object
const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
    logout(callback) {
    this.isAuthenticated = false
    setTimeout(callback, 100)
  }
}

const Protected = () => <h3>Protected</h3>

// stateless function ES6 syntax - pure, no state, not lifecycle but can use propTypes and defaultProps
const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true ? (
    <p>
      <button onClick={() => {
        fakeAuth.logout(() => history.push('/'))
      }}>Log out</button>
    </p>
  ) : (
    <p>
      <Redirect to={{
        pathname: '/login'
      }} />
    </p>
  )
))

// stateless function ES6 syntax - pure, no state, not lifecycle but can use propTypes and defaultProps
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated === true ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )}/>
)

// stateful class ES6 syntax
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return (
        <Redirect to={from} />
      )
    }

    else {
      return (
        <div>
          <p>You must log in to view protected pages</p>
          <button onClick={this.login}>Log in</button>
        </div>
      )
    }
  }
}

// stateful function ES6 syntax - 
class Application extends Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      loading: true,
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h4>Loading</h4> : (
      <Router>
        <div>

          <div className='w3-container'>
            <AuthButton />
            <ul className='w3-navbar w3-card-8 w3-light-grey'>
              <li><Link to='/' className='w3-hover-none w3-hover-text-blue w3-text-grey w3-large'>React Expenses</Link></li>

              <li className='w3-right w3-medium'>
                {this.state.authed ?
                  <button
                    style={{ border: 'none', background: 'transparent', position: 'relative', top: '7px' }}
                    onClick={() => {
                      logout();
                      this.setState({ authed: false });
                      //Router.transitionTo('/'); //
                      //<Redirect to={'/'} />
                    } }
                    className='w3-hover-none w3-hover-text-blue w3-text-grey'>Logout</button>
                  :
                  <Link to='/login' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Login</Link>
                }
              </li>

              <li className='w3-right w3-medium'><Link to='/reports' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Reports</Link></li>
              <li className='w3-right w3-medium'><Link to='/categories' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Categories</Link></li>
              <li className='w3-right w3-medium'><Link to='/properties' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Properties</Link></li>
              <li className='w3-right w3-medium'><Link to='/expenses' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Expenses</Link></li>
              <li className='w3-right w3-medium'><Link to='/summary' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Summary</Link></li>
              <li className='w3-right w3-medium'><Link to='/protected' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Protected</Link></li>
            </ul>
          </div>

          <div className='w3-container'>
            <div className='w3-row'>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/summary' component={Summary} />
              <PrivateRoute path='/expenses' component={Expenses} />
              <PrivateRoute path='/properties' component={Properties} />
              <PrivateRoute path='/categories' component={Categories} />
              <PrivateRoute path='/reports' component={Reports} />
              <PrivateRoute path="/protected" component={Protected} />
            </div>
          </div>

        </div>
      </Router>
    );

  }
}

export default Application;


// import React, { PropTypes } from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'

// ////////////////////////////////////////////////////////////
// // 1. Click the public page
// // 2. Click the protected page
// // 3. Log in
// // 4. Click the back button, note the URL each time

// const AuthExample = () => (
//   <Router>
//     <div>
//       <AuthButton/>
//       <ul>
//         <li><Link to="/public">Public Page</Link></li>
//         <li><Link to="/protected">Protected Page</Link></li>
//       </ul>
//       <Route path="/public" component={Public}/>
//       <Route path="/login" component={Login}/>
//       <PrivateRoute path="/protected" component={Protected}/>
//     </div>
//   </Router>
// )

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100)
//   }
// }

// const AuthButton = withRouter(({ push }) => (
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome! <button onClick={() => {
//         fakeAuth.signout(() => push('/'))
//       }}>Sign out</button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   )
// ))

// const PrivateRoute = ({ component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// const Public = () => <h3>Public</h3>
// const Protected = () => <h3>Protected</h3>

// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false
//   }

//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true })
//     })
//   }

//   render() {
//     const { from } = this.props.location.state || { from: { pathname: '/' } }
//     const { redirectToReferrer } = this.state

//     if (redirectToReferrer) {
//       return (
//         <Redirect to={from}/>
//       )
//     }

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     )
//   }
// }

// export default AuthExample