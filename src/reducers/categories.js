import ActionTypes from '../constants/actionTypes';

// all reducers get two parameters passed in, state and action that occurred - state
// isn't entire apps state, only the part of state that this reducer is responsible for

// 'state = null' is set so that we don't throw an error when app first boots up
export default function (state = null, action) {

  switch (action.type) {

    case ActionTypes.NewCategory:
      return Object.assign({}, state, {
        inProgress: true,
        success: 'Added category pending',
        error: null
      });

    case ActionTypes.EditCategory:
      return Object.assign({}, state, {
        inProgress: true,
        success: 'Updated category pending',
        error: null
      });

    case ActionTypes.DeleteCategory:
      return Object.assign({}, state, {
        inProgress: true,
        success: 'Deleted category pending',
        error: null
      });

    case ActionTypes.CategoriesUpdated:
      return Object.assign({}, state, {
        inProgress: false,
        success: 'Update categories complete',
        error: null,
        //categories: Object.keys(action.payload.categories).map(k => categories[k])
        categories: action.payload
      });

    default:
      return state;
  }
}