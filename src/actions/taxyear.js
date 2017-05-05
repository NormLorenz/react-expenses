import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const changeTaxyearAction = (taxYear) => {
  return dispatch => {
    dispatch(changeTaxyearDispatch(taxYear));
    database.ref('taxYear').set(taxYear);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'taxyear record updated',
      position: 'br'
    }));
  }
}

function changeTaxyearDispatch(taxYear) {
  return {
    type: ActionTypes.ChangeTaxYear,
    payload: taxYear
  };
}

export const watchTaxyearEvent = (dispatch) => {
  database.ref('taxYear').on('value', (snap) => {
    dispatch(watchTaxyearAction(snap.val()));
  });
}

function watchTaxyearAction(taxYear) {
  return {
    type: ActionTypes.TaxYearUpdated,
    payload: taxYear
  };
}
