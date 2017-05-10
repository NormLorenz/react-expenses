import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up

const init = { isLoaded: false, categories: null };

export default function (state = init, action) {

  switch (action.type) {

    case ActionTypes.CategoriesUpdated:
      return Object.assign({}, state, {
        isLoaded: true,
        categories: action.payload
      });

    default:
      return state;
  }
}