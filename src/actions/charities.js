import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export function editCharity(charity) {
  return (dispatch) => {
    database.ref('charities').child(charity.key).update(charity.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'charity record updated',
      position: 'br'
    }));
  };
}

export function insertCharity(charity) {
  return (dispatch) => {
    database.ref('charities').push(charity.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'charity record inserted',
      position: 'br'
    }));
  };
}

export function fetchCharities() {
  return (dispatch) => {
    database.ref('charities').on('value', (snap) => {
      let charities = [];
      snap.forEach(function (data) {
        let charity = {
          key: data.key,
          data: {
            description: data.val().description,
            isActive: data.val().isActive
          }
        };
        charities.push(charity);
      });

      dispatch({
        type: ActionTypes.CharitiesUpdated,
        payload: charities
      });
    });
  };
}