import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

// convert an array of mapPoints to a collection of objects
// https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
// https://ilikekillnerds.com/2017/05/convert-firebase-database-snapshotcollection-array-javascript/

// let wayPoints = trip.wayPoints;
// remove.wayPoints;
// let key = trip.key;
// remove.key;
 
// NEW TRIP
// push parent values
// push child values
// push child values
// etc.
 
// UPDATE TRIP
// set parent values (clears wayPoints automatically or null for wayPoint clears wayPoints)
// push child values
// push child values
// etc.

export function editTrip(trip) {
  let key = trip.key;
  trip.remove('key');
  //let mapPoints = trip.mapPoints;

  // let mapPointsObject = reduce((obj, item) => {
  //   obj[item.key] = item
  //   return obj
  // }, {});

  // convert wayPoints to collection of objects
  //value.wayPoints = 

  return (dispatch) => {
    database.ref('trips').child(key).update(trip);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'trip record updated',
      position: 'br'
    }));
  }
}

export function insertTrip(trip) {
  //let key = trip.key;
  //let value = trip;
  //value.remove('key');

  return (dispatch) => {
    database.ref('trips').push(trip);
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