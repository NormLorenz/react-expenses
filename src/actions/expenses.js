import ActionTypes from '../constants/actionTypes';
import database from '..constants/database';

export const newExpenseAction = (expense) => {
  return dispatch => {
    dispatch(newExpenseDispatch());
    const expensesRef = database.ref('/expenses');
    expensesRef.push(expense);
  }
}

function newExpenseDispatch(expense) {
  return {
    type: ActionTypes.NewExpense,
    payload: expense
  };
}

export const editExpenseAction = (expense) => {
  return dispatch => {
    dispatch(editExpenseDispatch());
    const expensesRef = database.ref('/expenses').child(expense.key);
    expensesRef.update(expense);
  }
}

function editExpenseDispatch(expense) {
  return {
    type: ActionTypes.EditExpense,
    payload: expense
  };
}

export const deleteExpenseAction = (expense) => {
  return dispatch => {
    dispatch(deleteExpenseDispatch());
    const expensesRef = database.ref('/expenses').child(expense.key);
    expensesRef.remove();
  }
}

function deleteExpenseDispatch(expense) {
  return {
    type: ActionTypes.DeleteExpense,
    payload: expense
  };
}

export const watchExpensesEvent = (dispatch) => {
  database.ref('/expenses').on('value', (snap) => {
    dispatch(watchExpensesAction(snap.val()));
  });
}

function watchExpensesAction(expenses) {
  return {
    type: ActionTypes.ExpensesUpdated,
    payload: expenses
  };
}