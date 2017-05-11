import React, { Component } from 'react'
import { auth } from '../helpers/authorization'

class Register extends Component {

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   auth(this.email.value, this.pw.value)
  // }

  handleSubmit(e) {
    e.preventDefault();
    login(this.email.value, this.pw.value);
  }

  render() {
    const divStyle = { width: '400px' };

    return (
      <div className='w3-container' style={divStyle}>
        <h4>Register</h4>

        <div className='w3-margin'>
          <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
            <div className='w3-section'>
              <input className='w3-input w3-border w3-round' placeholder='Email' ref={(email) => this.email = email} />
              <label className='w3-label'>Email</label>
            </div>
            <div className='w3-section'>
              <input className='w3-input w3-border w3-round' placeholder='Password' ref={(pw) => this.pw = pw} type='password' />
              <label className='w3-label'>Password</label>
            </div>
            <button type='submit' className='w3-button w3-padding-small w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>Register</button>
          </form>
        </div>
      </div>
    )
  }
}


export default Register