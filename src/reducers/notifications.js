import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up

const init = { message: 'it went horribly wrong', level: 'error' };

export default function (state = init, action) {

  switch (action.type) {

    case ActionTypes.AddNotification:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level
      });

    default:
      return state;
  }
}