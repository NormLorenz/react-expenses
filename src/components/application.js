import React, { Component } from 'react';
import './application.css';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { logout } from './helpers/authentication';
import { firebaseAuth } from '../constants/database';

import { Provider } from 'react-redux';
import store from '../store';

import Login from './login';
import Home from './home';
import Summary from './summary';
import Expenses from './expenses';
import Donations from './donations';
import Properties from './lists/properties';
import Places from './lists/places';
import Categories from './lists/categories';
import Charities from './lists/charities';
import ExpenseReport from './reports/expenses';
import DonationReport from './reports/donations';
import TripReport from './reports/trips';
import NotImplemented from './notimplemented';
import Placeholder from './placeholder';
import Trips from './trips';

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
  constructor(props) {
    super(props);
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
              <h3>React Expenses</h3>

              <div className='w3-bar w3-card-4 w3-light-grey w3-almost-medium'>
                <Link to='/' className='w3-bar-item w3-button'>Home</Link>
                <Link to='/summary' className='w3-bar-item w3-button'>Summary</Link>
                <Link to='/expenses' className='w3-bar-item w3-button'>Expenses</Link>
                <Link to='/donations' className='w3-bar-item w3-button'>Donations</Link>
                <Link to='/trips' className='w3-bar-item w3-button'>Trips</Link>
                <div className='w3-dropdown-hover'>
                  <button className='w3-button'>Lists</button>
                  <div className='w3-dropdown-content w3-bar-block w3-card-4'>
                    <Link to='/categories' className='w3-bar-item w3-button'>Categories</Link>
                    <Link to='/charities' className='w3-bar-item w3-button'>Charities</Link>
                    <Link to='/places' className='w3-bar-item w3-button'>Places</Link>
                    <Link to='/properties' className='w3-bar-item w3-button'>Properties</Link>
                  </div>
                </div>
                <div className='w3-dropdown-hover'>
                  <button className='w3-button'>Reports</button>
                  <div className='w3-dropdown-content w3-bar-block w3-card-4'>
                    <Link to='/donationreport' className='w3-bar-item w3-button'>Donations</Link>
                    <Link to='/expensereport' className='w3-bar-item w3-button'>Expenses</Link>
                    <Link to='/tripreport' className='w3-bar-item w3-button'>Trips</Link>
                  </div>
                </div>
                {this.state.authed ?
                  <button
                    style={{ border: 'none', background: 'transparent', position: 'relative', top: '7px' }}
                    onClick={() => { logout(); this.setState({ authed: false }); }}
                    className='w3-hover-none w3-hover-text-blue w3-right'>Logout
                  </button>
                  :
                  <span>
                    <Link to='/login' className='w3-bar-item w3-button w3-right'>Login</Link>
                  </span>
                }
              </div>

            </div>

            <div className='w3-container'>
              <div className='w3-row'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PrivateRoute authed={this.state.authed} path='/summary' component={Summary} />
                  <PrivateRoute authed={this.state.authed} path='/expenses' component={Expenses} />
                  <PrivateRoute authed={this.state.authed} path='/donations' component={Donations} />
                  <PrivateRoute authed={this.state.authed} path='/properties' component={Properties} />
                  <PrivateRoute authed={this.state.authed} path='/places' component={Places} />
                  <PrivateRoute authed={this.state.authed} path='/categories' component={Categories} />
                  <PrivateRoute authed={this.state.authed} path='/charities' component={Charities} />
                  <PrivateRoute authed={this.state.authed} path='/expensereport' component={ExpenseReport} />
                  <PrivateRoute authed={this.state.authed} path='/donationreport' component={DonationReport} />
                  <PrivateRoute authed={this.state.authed} path='/tripreport' component={TripReport} />
                  <PrivateRoute authed={this.state.authed} path='/trips' component={Trips} />
                  <Route path='/notimplemented' component={NotImplemented} />
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