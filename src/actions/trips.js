import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export function editTrip(trip) {
  return (dispatch) => {
    database.ref('trips').child(trip.key).update(trip.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'trip record updated',
      position: 'br'
    }));
  }
}

export function insertTrip(trip) {
  return (dispatch) => {
    database.ref('trips').push(trip.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'trip record inserted',
      position: 'br'
    }));
  }
}

export function deleteTrip(trip) {
  return (dispatch) => {
    database.ref('trips').child(trip.key).remove();
    dispatch(Notifications.info({
      title: 'Info',
      message: 'trip record deleted',
      position: 'br'
    }));
  }
}

export function fetchTrips() {
  return dispatch => {
    database.ref('taxYear').on('value', snap => {
      const tripsRef = database.ref('trips').orderByChild('taxYear').equalTo(snap.val());
      tripsRef.on('value', snap => {
        let trips = [];
        snap.forEach(function (data) {
          let trip = {
            key: data.key,
            data: {
              date: data.val().date,
              purpose: data.val().purpose,
              wayPoints: data.val().wayPoints,
              mileage: data.val().mileage,
              taxYear: data.val().taxYear
            }
          }
          trips.push(trip);
        });
        dispatch({
          type: ActionTypes.TripsUpdated,
          payload: trips
        });
      });
    });
  };
}