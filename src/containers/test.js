import { connect } from 'react-redux';
import { changeTextAction, watchTextEvent } from '../actions/test';
import TestComponent from '../components/test';


function mapStateToProps(state) {
  return {
    text: state.test.text,
    inProgress: state.test.inProgress
  };
}

function mapDispatchToProps(dispatch) {
  watchTextEvent(dispatch);
  return {
    onAddText: (text) => dispatch(changeTextAction(text))
  }
}

const TestContainer = connect(mapStateToProps, mapDispatchToProps)(TestComponent);

export default TestContainer;
