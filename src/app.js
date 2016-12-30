import React, { Component } from 'react';
import './app.css';
//import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Link } from 'react-router'

//http://stackoverflow.com/questions/38203430/links-rendered-outside-of-a-router-context-cannot-handle-clicks
//https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.vqjawjgpi

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/summary'>Summary</Link></li>
          <li><Link to='/expenses'>Expenses</Link></li>
          <li><Link to='/properties'>Properites</Link></li>
          <li><Link to='/categories'>Categories</Link></li>
          <li><Link to='/reports'>Reports</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
        {this.props.children}
      </div>

      // <div className='App'>
      //   <div className='App-header'>
      //     <img src={logo} className='App-logo' alt='logo' />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className='App-intro'>
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>



    );
  }
}

export default App;

// import React from 'react';

// import LinkContainer from './LinkContainer';

// // Don't use a stateless function, to allow users to set a ref.
// /* eslint-disable react/prefer-stateless-function */
// export default class IndexLinkContainer extends React.Component {
//   render() {
//     return (
//       <LinkContainer {...this.props} onlyActiveOnIndex />
//     );
//   }
// }
// /* eslint-enable react/prefer-stateless-function */