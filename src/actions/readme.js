import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const changeTextAction = (text) => {
  return dispatch => {
    dispatch(changeTextDispatch(text));
    database.ref('readMe').set(text);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'readme record updated',
      position: 'br'
    }));
  }
}

function changeTextDispatch(text) {
  return {
    type: ActionTypes.ChangeText,
    payload: text
  };
}

export const watchTextEvent = (dispatch) => {
  database.ref('readMe').on('value', (snap) => {
    dispatch(watchTextAction(snap.val()));
  });
}

function watchTextAction(text) {
  return {
    type: ActionTypes.TextUpdated,
    payload: text
  };
}


