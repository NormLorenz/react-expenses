import React, { Component } from 'react'
import { login } from '../helpers/authorization'

class Login extends Component {

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   login(this.email.value, this.pw.value)
  // }

  handleSubmit(e) {
    e.preventDefault();
    login(this.email.value, this.pw.value);
  }
  
  render() {
    const divStyle = { width: '400px' };

    return (
      <div className='w3-container' style={divStyle}>
        <h4>Login</h4>

        <div className='w3-margin'>
          <form className='w3-container' onSubmit={this.handleSubmit}>
            <div className='w3-section'>
              <input className='w3-input w3-border w3-round' placeholder='Email' ref={(email) => this.email = email} />
              <label className='w3-label'>Email</label>
            </div>
            <div className='w3-section'>
              <input className='w3-input w3-border w3-round' placeholder='Password' ref={(pw) => this.pw = pw} type='password' />
              <label className='w3-label'>Password</label>
            </div>
            <button type='submit' className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;