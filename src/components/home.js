import React, { Component } from 'react';
import ReactImage from '../logo.svg';
import packageJson from '../../package.json';

const imageStyle = {
  width: '70px',
  float: 'left'
};

class Home extends Component {

  render() {
    return (
      <div className='w3-container'>
        <h4>Home</h4>
        <p>
          <img src={ReactImage} alt='react' className='w3-circle' style={imageStyle} />
          This application is built with React js and is used to aid in the collection of receipts and expenses
            and allows importing and exporting data with reporting capabilites. It&apos;s built on an react 15.4.2
            framework using w3.css 4.04, react-router 4.0.0-beta.8, react-modal 1.6.5 and moment.js 2.17.1.
            Additionally, the data is stored on a Google Firebase using the 3.6.7 libaries. Google Firebase data
            access is built using a redux store. Redux is version 3.6.0, redux-logger: 2.8.2, redux-thunk: 2.2.0
            and react-redux: 5.0.3.
        </p>
        <p>
          Please click on the menu above to continue.
        </p>
        <div className='w3-panel w3-leftbar w3-light-grey'>
          <p style={{ fontFamily: 'courier' }}>Version {packageJson.version} (master branch)</p>
        </div>
      </div>
    );
  }
}

export default Home;