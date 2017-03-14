import ActionTypes from '../constants/actionTypes';
/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 */

// 'state = null' is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
  switch (action.type) {
    // case 'ADD_EXPENSE':
    //   return action.payload;
    //   break;
    // case 'EDIT_EXPENSE':
    //   return action.payload;
    //   break;
    // case 'DELETE_EXPENSE':
    //   return action.payload;
    //   break;
    case ActionTypes.NewExpense:
      break;
    case ActionTypes.ExpensesUpdated: {
      const newState = Object.assign({}, state);
      newState.expenses = newState.expenses || [];
      newState.expenses = newState.expenses.slice();
      newState.expenses.push(action.payload.expenses);
      return newState;
      break;
    }
    default:
      return state;
      break;
  }
}