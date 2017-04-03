import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';

export const changeTextAction = (text) => {
  return dispatch => {
    dispatch(changeTextDispatch(text));
    database.ref('readMe').set(text);
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


