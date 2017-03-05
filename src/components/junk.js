// <li className='w3-right w3-medium'>
//   {this.state.authed ?
//     <button
//       style={{ border: 'none', background: 'transparent', position: 'relative', top: '7px' }}
//       onClick={() => {
//         logout();
//         this.setState({ authed: false });
//         router.transitionTo('/');
//       } }
//       className='w3-hover-none w3-hover-text-blue w3-text-grey'>Logout</button>
//     :
//     <Link to='/login' className='w3-hover-none w3-hover-text-blue w3-text-grey'>Login</Link>
//   }
// </li>

// function MatchWhenAuthed({component: Component, authed, ...rest}) {

//   var secretUserInfo = {
//     name: 'Jack Franklin',
//     favouriteColour: 'blue'
//   };

//   return (
//     <Match
//       {...rest}
//       render={(props) => authed === true
//         ? <Component user={secretUserInfo} {...props} />
//         : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
//       />
//   )
// }

// function MatchWhenUnauthed({component: Component, authed, ...rest}) {
//   return (
//     <Match
//       {...rest}
//       render={(props) => authed === false
//         ? <Component {...props} />
//         : <Redirect to='/summary' />}
//       />
//   )
// }

