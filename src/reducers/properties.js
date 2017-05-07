import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up

const init = { inProgress: true, property: null, properties: null };

export default function (state = init, action) {

  switch (action.type) {

    case ActionTypes.PropertiesUpdated:
      return Object.assign({}, state, {
        inProgress: false,
        property: null,
        properties: action.payload
      });

    default:
      return state;
  }
}