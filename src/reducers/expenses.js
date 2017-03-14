import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
  switch (action.type) {
    case ActionTypes.NewExpense:
      const newState = Object.assign({}, state, {
        inProgress: true,
        success: 'Added new expense',
        error: null
      });
      return newState;

    case ActionTypes.EditExpense:
      const newState = Object.assign({}, state, {
        inProgress: true,
        success: 'Updated existing expense',
        error: null
      });
      return newState;

    case ActionTypes.DeleteExpense:
      const newState = Object.assign({}, state, {
        inProgress: true,
        success: 'Deleted existing expense',
        error: null
      });
      return newState;

    case ActionTypes.ExpensesUpdated: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Watched existing expenses',
        error: null,
        expenses: Object.keys(action.payload.expenses).map(k => expenses[k])
      });
      return newState;
    }
    
    default:
      return state;
  }
}