import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editProperty = (property) => {
  return (dispatch) => {
    database.ref('properties').child(property.key).update(property.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'property record updated',
      position: 'br'
    }));
  }
}

export const insertProperty = (property) => {
  return (dispatch) => {
    database.ref('properties').push(property.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'property record inserted',
      position: 'br'
    }));
  }
}

export const fetchProperties = (dispatch) => {
  database.ref('properties').on('value', snap => {
    let properties = [];
    snap.forEach(function (data) {
      let property = {
        key: data.key,
        data: {
          description: data.val().description,
          isActive: data.val().isActive
        }
      }
      properties.push(property);
    });

    dispatch({
      type: ActionTypes.PropertiesUpdated,
      payload: properties
    });
  });
}