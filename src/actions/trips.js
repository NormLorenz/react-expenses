import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

// https://firebase.google.com/docs/database/web/read-and-write
// https://firebase.google.com/docs/database/web/lists-of-data
// https://firebase.google.com/docs/reference/js/firebase.database.Reference

export function editTrip(trip) {
  let key = trip.key;
  delete trip.key;
  let wayPoints = trip.wayPoints;
  delete trip.wayPoints;

  return (dispatch) => {

    database.ref('trips').child(key).set(trip);
    wayPoints.forEach((wayPoint) => {
      database.ref('trips').child(key).child('wayPoints').push({
        index: wayPoint.index,
        place: wayPoint.place
      });
    });

    dispatch(Notifications.info({
      title: 'Info',
      message: 'trip record updated',
      position: 'br'
    }));
  }
}

export function insertTrip(trip) {
  delete trip.key;
  let wayPoints = trip.wayPoints;
  delete trip.wayPoints;

  return (dispatch) => {

    let ref = database.ref('trips').push(trip);
    wayPoints.forEach((wayPoint) => {
      database.ref('trips').child(ref.key).child('wayPoints').push({
        index: wayPoint.index,
        place: wayPoint.place
      });
    });

    dispatch(Notifications.info({
      title: 'Info',
      message: 'trip record inserted',
      position: 'br'
    }));
  }
}

export function deleteTrip(trip) {
  let key = trip.key;
  delete trip.key;

  return (dispatch) => {

    database.ref('trips').child(key).remove();

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

          let wayPoints = [];
          data.child('wayPoints').forEach(function (data) {
            let wayPoint = data.val();
            wayPoint.key = data.key;
            wayPoints.push(wayPoint);
          });

          let trip = data.val();
          trip.key = data.key;
          trip.wayPoints = wayPoints;
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