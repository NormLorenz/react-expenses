import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export function editDonation(donation) {
  return (dispatch) => {
    database.ref('donations').child(donation.key).update(donation.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'donation record updated',
      position: 'br'
    }));
  };
}

export function insertDonation(donation) {
  return (dispatch) => {
    database.ref('donations').push(donation.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'donation record inserted',
      position: 'br'
    }));
  };
}

export function deleteDonation(donation) {
  return (dispatch) => {
    database.ref('donations').child(donation.key).remove();
    dispatch(Notifications.info({
      title: 'Info',
      message: 'donation record deleted',
      position: 'br'
    }));
  };
}

export function fetchDonations() {
  return (dispatch) => {
    database.ref('taxYear').on('value', (snap) => {
      const donationsRef = database.ref('donations').orderByChild('taxYear').equalTo(snap.val());
      donationsRef.on('value', (snap) => {
        let donations = [];
        snap.forEach(function (data) {
          let donation = {
            key: data.key,
            data: {
              date: data.val().date,
              charity: data.val().charity,
              amount: data.val().amount,
              taxYear: data.val().taxYear
            }
          };
          donations.push(donation);
        });
        dispatch({
          type: ActionTypes.DonationsUpdated,
          payload: donations
        });
      });
    });
  };
}