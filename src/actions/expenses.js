import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editExpenseAction = (expense) => {
  return dispatch => {
    dispatch(editExpenseDispatch(expense));
    database.ref('expenses').child(expense.key).update(expense.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'expense record updated',
      position: 'br'
    }));
  }
}

function editExpenseDispatch(expense) {
  return {
    type: ActionTypes.EditExpense,
    payload: expense
  };
}

export const insertExpenseAction = (expense) => {
  return dispatch => {
    dispatch(insertExpenseDispatch(expense));
    database.ref('expenses').push(expense.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'expense record inserted',
      position: 'br'
    }));
  }
}

function insertExpenseDispatch(expense) {
  return {
    type: ActionTypes.InsertExpense,
    payload: expense
  };
}

export const deleteExpenseAction = (expense) => {
  return dispatch => {
    dispatch(deleteExpenseDispatch(expense));
    database.ref('expenses').child(expense.key).remove();
    dispatch(Notifications.info({
      title: 'Info',
      message: 'expense record deleted',
      position: 'br'
    }));
  }
}

function deleteExpenseDispatch(expense) {
  return {
    type: ActionTypes.deleteExpense,
    payload: expense
  };
}

export const watchExpensesEvent = (dispatch) => {
  // get taxYear first
  // block until it returns
  // then get expenses
  let taxYear = 2015; //this.store.taxYearObject.taxYear;
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

    dispatch(watchExpensesAction(expenses));
  });
}

function watchExpensesAction(expenses) {
  return {
    type: ActionTypes.ExpensesUpdated,
    payload: expenses
  };
}