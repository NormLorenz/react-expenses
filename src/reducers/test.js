import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up
export default function (state = null, action) {

  switch (action.type) {

    case ActionTypes.ChangeTest:
      return Object.assign({}, state, {
        inProgress: false,
        success: 'Change test',
        error: null
      });

    default:
      return state;
  }
}