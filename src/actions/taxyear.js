import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editTaxYear = (taxYear) => {
  return (dispatch) => {
    database.ref('taxYear').set(taxYear);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'tax year record updated',
      position: 'br'
    }));
  }
}

export const fetchTaxYear = (dispatch) => {
  database.ref('taxYear').on('value', snap => {
    dispatch({
      type: ActionTypes.TaxYearUpdated,
      payload: snap.val()
    });
  });
}