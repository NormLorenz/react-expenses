import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editPropertyAction = (property) => {
  return dispatch => {
    let key = property.key;
    delete property.key;
    dispatch(editPropertyDispatch(property));
    database.ref('properties').child(key).update(property);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'property record updated',
      position: 'br'
    }));
  }
}

function editPropertyDispatch(property) {
  return {
    type: ActionTypes.EditProperty,
    payload: property
  };
}

export const insertPropertyAction = (property) => {
  return dispatch => {
    delete property.key;
    dispatch(insertPropertyDispatch(property));
    database.ref('properties').push(property);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'property record inserted',
      position: 'br'
    }));
  }
}

function insertPropertyDispatch(property) {
  return {
    type: ActionTypes.InsertProperty,
    payload: property
  };
}

export const watchPropertiesEvent = (dispatch) => {
  database.ref('properties').on('value', snap => {
    let properties = [];
    snap.forEach(function (data) {
      let property = {
        key: data.key,
        description: data.val().description,
        isActive: data.val().isActive
      }
      properties.push(property);
    });

    dispatch(watchPropertiesAction(properties));
  });
}

function watchPropertiesAction(properties) {
  return {
    type: ActionTypes.PropertiesUpdated,
    payload: properties
  };
}


