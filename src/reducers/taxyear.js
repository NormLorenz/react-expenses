import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up
export default function (state = null, action) {

  switch (action.type) {

    case ActionTypes.EditTaxYear:
      return Object.assign({}, state, {
        inProgress: true,
        success: 'Change tax year pending',
        error: null
      });

    case ActionTypes.ExpensesUpdated:
      return Object.assign({}, state, {
        inProgress: false,
        success: 'Update taxYear complete',
        error: null,
        //taxYear: Object.keys(action.payload.expenses).map(k => expenses[k])
        taxYear: action.payload
      });

    default:
      return state;
  }
}