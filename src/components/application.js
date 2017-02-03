import React, { Component } from 'react';
import './application.css';

import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router';
import { logout } from '../helpers/authorization';
import { firebaseAuth } from '../config/constants';

import Login from './login';
import Home from './home';
import Summary from './summary';
import Expenses from './expenses';
import Properties from './properties';
import Categories from './categories';
import Reports from './reports';

function MatchWhenAuthed({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
  )
}

function MatchWhenUnauthed({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/summary' />}
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
      <BrowserRouter>
        {({router}) => (
          <div>
            <div className='w3-container'>
              <ul className='w3-navbar w3-card-8 w3-light-grey'>
                <li><Link to='/' className='w3-hover-none w3-hover-text-blue w3-text-grey w3-large'>React Expenses</Link></li>
                <li className='w3-right w3-medium'>
                  {this.state.authed ?
                    <button
                      style={{ border: 'none', background: 'transparent', position: 'relative', top: '7px' }}
                      onClick={() => {
                        logout();
                        this.setState({ authed: false });
                        router.transitionTo('/');
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
              </ul>
            </div>

            <div className='w3-container'>
              <div className='w3-row'>
                <Match pattern='/' exactly component={Home} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/summary' component={Summary} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/expenses' component={Expenses} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/properties' component={Properties} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/categories' component={Categories} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/reports' component={Reports} />
                <Miss render={() => <h3>No Match</h3>} />
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    );

  }
}

export default Application;