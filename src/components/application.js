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
//import ReduxContainer from '../containers/redux';
import TestContainer from './test';

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
              <ul className='w3-navbar w3-card-8 w3-light-grey'>
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
                      <Link to="/login" className='w3-hover-none w3-hover-text-blue w3-text-grey'>Login</Link>
                    </span>
                  }
                </li>

                <li className='w3-right w3-medium'><Link to='/test' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Test</Link></li>
                <li className='w3-right w3-medium'><Link to='/reports' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Reports</Link></li>
                <li className='w3-right w3-medium'><Link to='/categories' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Categories</Link></li>
                <li className='w3-right w3-medium'><Link to='/properties' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Properties</Link></li>
                <li className='w3-right w3-medium'><Link to='/expenses' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Expenses</Link></li>
                <li className='w3-right w3-medium'><Link to='/summary' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Summary</Link></li>
              </ul>
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
                  <Route path='/test' component={TestContainer} />
                  <Route render={() => <h4>No Match</h4>} />
                </Switch>
              </div>
            </div>

          </div>
        </Router>
      </Provider>
    );

  }
}

export default Application;