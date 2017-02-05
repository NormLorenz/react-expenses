import React, { Component } from 'react';
import Image from '../logo.svg';

const imageStyle = {
  width: '70px'
}

class Home extends Component {

  render() {
    return (
      <div className='w3-container'>
        <h4>Home</h4>

        <div className='w3-layout-row'>
          <div className='w3-layout-cell'>
            <img src={Image} alt='react' className='w3-left w3-circle' style={imageStyle} />
          </div>
          <div className='w3-layout-cell'>
            <div className='w3-container'>
              <p>
                This application is built with React js and is used to aid in the collection of receipts and expenses and allows
                importing and exporting data with reporting capabilites. It's built on an react 15.4.2
                framework using w3.css, react-router 4.0.0-alpha.6, react-modal 1.6.5 and moment.js 2.17.1.
                Additionally, the data is stored on a Google Firebase using the 3.6.7 libaries.
              </p>
              <p>
                Please click on the menu above to continue.
              </p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;