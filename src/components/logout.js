import React, { Component } from 'react'
import { logout } from '../helpers/authorization'

class Logout extends Component {
  constructor() {
    logout();
    // set Application state 'this.setState({ authed: false })'
  }

  render() {
    const divStyle = { width: '400px' };

    return (
      <div className='w3-container' style={divStyle}>
        <h3>Logout</h3>
        <div className='w3-margin'>
          Thankyou. You have been logged out of the application.
        </div>
      </div>
    )
  }
}

export default Logout;