import React, { Component } from 'react';
import './App.css';
//import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { Router, Route, Link, hashHistory } from 'react-router'

import summary from './Summary'
import about from './About'

//http://stackoverflow.com/questions/38203430/links-rendered-outside-of-a-router-context-cannot-handle-clicks
//https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.vqjawjgpi

class App extends Component {
  render() {

    return (

      <div>
        <Router history={hashHistory}>
          <Route path="/about" component={about} />
          <Route path="/summary" component={summary} />
        </Router>
        <h1>App</h1>
        <ul>
          <li><Link to="about">About</Link></li>
          <li><Link to="summary">Summary</Link></li>
        </ul>
      </div>

      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
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