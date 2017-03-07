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
        <h4>Logout</h4>

        <div className='w3-margin'>
          Thank you. You have been logged out of the application.
        </div>
      </div>
    )
  }
}

export default Logout;