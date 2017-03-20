import ActionTypes from '../constants/actionTypes';

export const changeTestAction = (test) => {
  return dispatch => {
    dispatch(changeTestDispatch(test));
  }
}

function changeTestDispatch(test) {
  return {
    type: ActionTypes.changeTestAction,
    payload: test
  };
}

