import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className='w3-container'>
        <h3>About</h3>
        <p>
          This application is used to aid in the collection of receipts and expenses and allows 
          importing and exporting data with reporting capabilites. It's built on an react 15.4.1
          framework using w3.css styles, react-route, react-modal and moment.js.
          Additionally, the data is stored on a Google database with firebase.
        </p>
        <p>
          Please click on the menu above to continue.
        </p>
      </div>
    )
  }
}

export default About;