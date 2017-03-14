import ActionTypes from '../constants/actionTypes';
import database from '..constants/database';

// export function watchExpensesEvent(dispatch) {
//   database.ref('/expenses').on('value', (snap) => {
//     dispatch(watchExpensesAction(snap.val()));
//   });
// }

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


// export const addExpense = (expense) => {
//     console.log("You added an expense: ", expense.first);
//     return {
//         type: 'ADD_EXPENSE',
//         payload: expense
//     }
// };


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
    const expensesRef = database.ref('/expenses');
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
    const expensesRef = database.ref('/expenses');
    expensesRef.remove();
  }
}

function deleteExpenseDispatch(expense) {
  return {
    type: ActionTypes.DeleteExpense,
    payload: expense
  };
}

// export function addExpenseAction(expense) {
//   return dispatch => {
//     dispatch(dispatchExpenseAction());
//     const expensesRef = database.ref('/expenses');
//     expensesRef.push({
//       expense
//     });
//   }
// }