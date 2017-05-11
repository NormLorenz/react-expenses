import React, { Component } from 'react';
import './application.css';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { logout } from '../helpers/authentication';
import { firebaseAuth } from '../constants/database';

import { Provider } from 'react-redux';
import store from '../store';

import Login from './login';
import Home from './home';
import Summary from './summary';
import Expenses from './expenses';
import Properties from './properties';
import Categories from './categories';
import Reports from './reports';
// import Readme from './readme';
import Placeholder from './placeholder';

// https://github.com/tylermcginnis/react-router-firebase-auth

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

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
      <Provider store={store}>
        <Router>
          <div>

            <div className='w3-container'>
              <ul className='w3-navbar w3-card-4 w3-light-grey'>
                <li><Link to='/' className='w3-hover-none w3-hover-text-blue w3-text-grey w3-large'>React Expenses</Link></li>
                <li className='w3-right w3-medium'>



                  {this.state.authed ?
                    <button
                      style={{ border: 'none', background: 'transparent', position: 'relative', top: '7px' }}
                      onClick={() => { logout(); this.setState({ authed: false }); }}
                      className='w3-hover-none w3-hover-text-blue w3-text-grey'>Logout
                    </button>
                    :
                    <span>
                      <Link to='/login' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Login</Link>
                    </span>
                  }





                </li>
                <li className='w3-right w3-medium'><Link to='/reports' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Reports</Link></li>
                <li className='w3-right w3-medium'><Link to='/categories' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Categories</Link></li>
                <li className='w3-right w3-medium'><Link to='/properties' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Properties</Link></li>
                <li className='w3-right w3-medium'><Link to='/expenses' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Expenses</Link></li>
                <li className='w3-right w3-medium'><Link to='/summary' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Summary</Link></li>
              </ul>

              <h3>React Expenses</h3>
              <div className='w3-bar w3-card-4 w3-light-grey'>
                <Link to='/' className='w3-bar-item w3-button'>Home</Link>
                <Link to='/summary' className='w3-bar-item w3-button'>Summary</Link>
                <Link to='/expenses' className='w3-bar-item w3-button'>Expenses</Link>
                <a href='#' className='w3-bar-item w3-button'>Contributions</a>
                <div className='w3-dropdown-hover'>
                  <button className='w3-button'>Lists</button>
                  <div className='w3-dropdown-content w3-bar-block w3-card-4'>
                    <Link to='/properties' className='w3-bar-item w3-button'>Properties</Link>
                    <Link to='/categories' className='w3-bar-item w3-button'>Categories</Link>
                    <a href='#' className='w3-bar-item w3-button'>Charities</a>
                  </div>
                </div>
                <div className='w3-dropdown-hover'>
                  <button className='w3-button'>Reports</button>
                  <div className='w3-dropdown-content w3-bar-block w3-card-4'>
                    <Link to='/reports' className='w3-bar-item w3-button'>Expenses</Link>
                    <a href='#' className='w3-bar-item w3-button'>Contributions</a>
                  </div>
                </div>
                <a href='#' className='w3-bar-item w3-button w3-right'>Logout</a>
              </div>

            </div>

            <div className='w3-container'>
              <div className='w3-row'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PrivateRoute authed={this.state.authed} path='/summary' component={Summary} />
                  <PrivateRoute authed={this.state.authed} path='/expenses' component={Expenses} />
                  <PrivateRoute authed={this.state.authed} path='/properties' component={Properties} />
                  <PrivateRoute authed={this.state.authed} path='/categories' component={Categories} />
                  <PrivateRoute authed={this.state.authed} path='/reports' component={Reports} />
                  <Route render={() => <h4>No Match</h4>} />
                </Switch>
              </div>
            </div>

            <Placeholder />

          </div>
        </Router>
      </Provider >
    );

  }
}

export default Application;