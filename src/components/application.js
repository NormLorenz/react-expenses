import React, { Component } from 'react';
import './application.css';

import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router';
import { logout } from '../helpers/authorization';
import { firebaseAuth } from '../config/constants';

import Login from './login';
import Register from './register';
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
                <li><Link to='/' className='w3-hover-none w3-hover-text-blue w3-text-grey'>React Expenses</Link></li>
                <li className='w3-right'>
                  {this.state.authed
                    ? <button
                      style={{ border: 'none', background: 'transparent' }}
                      onClick={() => {
                        logout()
                        this.setState({ authed: false })
                        router.transitionTo('/')
                      } }
                      className='w3-hover-none w3-hover-text-blue w3-text-grey'>Logout</button>
                    : <span>
                      <Link to='/login' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Login</Link>
                      <Link to='/register' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Register</Link>
                    </span>}
                </li>
                <li className='w3-right'><Link to='/reports' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Reports</Link></li>
                <li className='w3-right'><Link activeClass='w3-large w3-text-black' to='/categories' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Categories</Link></li>
                <li className='w3-right'><Link to='/properties' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Properties</Link></li>
                <li className='w3-right'><Link to='/expenses' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Expenses</Link></li>
                <li className='w3-right'><Link to='/summary' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Summary</Link></li>
              </ul>
            </div>

            <div className='w3-container'>
              <div className='w3-row'>
                <Match pattern='/' exactly component={Home} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
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


// return (
//       <div>
//         <h2>Business Expenses and Receipts</h2>
//         <ul className='w3-navbar w3-border w3-blue-grey'>
//           <li><Link className='w3-hover-blue' to='/'>Home</Link></li>
//           <li><Link className='w3-hover-blue' to='/summary'>Summary</Link></li>
//           <li><Link className='w3-hover-blue' to='/expenses'>Expenses</Link></li>
//           <li><Link className='w3-hover-blue' to='/properties'>Properites</Link></li>
//           <li><Link className='w3-hover-blue' to='/categories'>Categories</Link></li>
//           <li><Link className='w3-hover-blue' to='/reports'>Reports</Link></li>
//           <li><Link className='w3-hover-blue' to='/about'>About</Link></li>
//         </ul>
//         {this.props.children}
//       </div>
// );

// <Router history={hashHistory}>
//   <Route path='/' component={app}>
//     <Route path='/summary' component={summary} />
//     <Route path='/expenses' component={expenses} />
//     <Route path='/properties' component={properties} />
//     <Route path='/categories' component={categories} />
//     <Route path='/reports' component={reports} />
//     <Route path='/about' component={about} />
//   </Route>
// </Router>

// <nav className='navbar navbar-default navbar-static-top'>
//   <div className='container'>

//     <div className='navbar-header'>
//       <Link to='/' className='navbar-brand'>React Expenses</Link>
//     </div>

//     <ul className='nav navbar-nav pull-right'>
//       <li><Link to='/summary' className='navbar-brand'>Summary</Link></li>
//       <li><Link to='/expenses' className='navbar-brand'>Expenses</Link></li>
//       <li><Link to='/properties' className='navbar-brand'>Properties</Link></li>
//       <li><Link to='/categories' className='navbar-brand'>Categories</Link></li>
//       <li><Link to='/reports' className='navbar-brand'>Reports</Link></li>
//       <li>
//         {this.state.authed
//           ? <button
//             style={{ border: 'none', background: 'transparent' }}
//             onClick={() => {
//               logout()
//               this.setState({ authed: false })
//               router.transitionTo('/')
//             } }
//             className='navbar-brand'>Logout</button>
//           : <span>
//             <Link to='/login' className='navbar-brand'>Login</Link>
//             <Link to='/register' className='navbar-brand'>Register</Link>
//           </span>}
//       </li>
//     </ul>

//   </div>
// </nav>
