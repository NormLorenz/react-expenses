import { connect } from 'react-redux';
import { changeTestAction } from '../actions/test';
import TestComponent from '../components/test';

function mapStateToProps(state) {
  return {
    //invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(changeTestAction())
    }
  }
}

const TestContainer = connect(mapStateToProps, mapDispatchToProps)(TestComponent);

export default TestContainer;
