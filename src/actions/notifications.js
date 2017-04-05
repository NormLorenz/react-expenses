import ActionTypes from '../constants/actionTypes';

export const changeTextAction = (message, level) => {
  return dispatch => {
    dispatch(addNotificationDispatch(message, level));
  };
}

function addNotificationDispatch(message, level) {
  return {
    type: ActionTypes.AddNotification,
    message,
    level
  };
}
