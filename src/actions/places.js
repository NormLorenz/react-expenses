import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export function editPlace(place) {
  return (dispatch) => {
    database.ref('places').child(place.key).update(place.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'place record updated',
      position: 'br'
    }));
  }
}

export function insertPlace(place) {
  return (dispatch) => {
    database.ref('places').push(place.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'place record inserted',
      position: 'br'
    }));
  }
}

export function fetchPlaces() {
  return dispatch => {
    database.ref('places').on('value', snap => {
      let places = [];
      snap.forEach(function (data) {
        let place = {
          key: data.key,
          data: {
            description: data.val().description,
            longitude: data.val().longitude,
            latitude: data.val().latitude,
            address: data.val().address,
            isActive: data.val().isActive
          }
        }
        places.push(place);
      });

      dispatch({
        type: ActionTypes.PlacesUpdated,
        payload: places
      });
    });
  };
}