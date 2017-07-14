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

        console.log('snap', snap.child('wayPoints'));
        snap.child('wayPoints').forEach(function(hey) {
          console.log('hey', hey.val());
        });

        let trips = [];
        snap.forEach(function (data) {

          let wayPoints = [];
          Object.keys(data.val().wayPoints).forEach(function (key) {
            let wayPoint = {
              key: key,
              data: {
                order: data.val().wayPoints[key].order,
                place: data.val().wayPoints[key].place
              }
            }
            wayPoints.push(wayPoint);
          });

          let trip = {
            key: data.key,
            data: {
              date: data.val().date,
              purpose: data.val().purpose,
              wayPoints: wayPoints,
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