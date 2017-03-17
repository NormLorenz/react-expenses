import { connect } from 'react-redux';
import { Redux as ReduxComponent } from '../components/redux';

function mapStateToProps(state) {
  console.log(state);
  return {
    //invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  // watchGuestAddedEvent(dispatch);
  // return {
  //   onGetInvite: () => dispatch(getInvite()),
  //   onAddToInvite: (name) => dispatch(addToInvite(name))
  // };
}

const Redux = connect(mapStateToProps, mapDispatchToProps)(ReduxComponent);

export default Redux;
