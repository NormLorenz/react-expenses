import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editExpense = (expense) => {
  return (dispatch) => {
    database.ref('expenses').child(expense.key).update(expense.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'expense record updated',
      position: 'br'
    }));
  }
}

export const insertExpense = (expense) => {
  return (dispatch) => {
    database.ref('expenses').push(expense.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'expense record inserted',
      position: 'br'
    }));
  }
}

export const deleteExpense = (expense) => {
  return (dispatch) => {
    database.ref('expenses').child(expense.key).remove();
    dispatch(Notifications.info({
      title: 'Info',
      message: 'expense record deleted',
      position: 'br'
    }));
  }
}

export const fetchExpenses = (dispatch) => {
  let taxYear = 2015;
  const expensesRef = database.ref('expenses').orderByChild('taxYear').equalTo(taxYear);
  expensesRef.on('value', snap => {
    let expenses = [];
    snap.forEach(function (data) {
      let expense = {
        key: data.key,
        data: {
          date: data.val().date,
          description: data.val().description,
          category: data.val().category,
          property: data.val().property,
          isDebit: data.val().isDebit,
          amount: data.val().amount,
          taxYear: data.val().taxYear
        }
      }
      expenses.push(expense);
    });
    dispatch({
      type: ActionTypes.ExpensesUpdated,
      payload: expenses
    });
  });
}