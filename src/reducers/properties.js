import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up
export default function (state = null, action) {

  switch (action.type) {

    case ActionTypes.NewProperty:
      const newState = Object.assign({}, state, {
        inProgress: true,
        success: 'Added property pending',
        error: null
      });
      return newState;

    case ActionTypes.EditProperty:
      const newState = Object.assign({}, state, {
        inProgress: true,
        success: 'Updated property pending',
        error: null
      });
      return newState;

    case ActionTypes.DeleteProperty:
      const newState = Object.assign({}, state, {
        inProgress: true,
        success: 'Deleted property pending',
        error: null
      });
      return newState;

    case ActionTypes.PropertysUpdated:
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Update properties complete',
        error: null,
        // properties: Object.keys(action.payload.properties).map(k => properties[k])
        properties: action.payload
      });
      return newState;

    default:
      return state;
  }
}