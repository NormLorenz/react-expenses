import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className='w3-container'>
        <h3>About</h3>
        <p>
          This application is used to aid in the collection of receipts and expenses and allows 
          importing and exporting data with reporting capabilites. It's built on an ember 
          framework using w3.css styles, ember-modal-dialog, ember-power-select, ember-moment
          and ember-radio-buttons add-ons. Additionally, the data is stored on a Google
          database with emberfire.
        </p>
        <p>
          Please click on the menu above to continue.
        </p>
      </div>
    )
  }
}

export default About;