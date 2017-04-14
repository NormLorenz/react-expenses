import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editCategoryAction = (category) => {
  return dispatch => {
    dispatch(editCategoryDispatch(category));
    database.ref('categories').child(category.key).update(category.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'category record updated',
      position: 'br'
    }));
  }
}

function editCategoryDispatch(category) {
  return {
    type: ActionTypes.EditCategory,
    payload: category
  };
}

export const insertCategoryAction = (category) => {
  return dispatch => {
    dispatch(insertCategoryDispatch(category));
    database.ref('categories').push(category.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'category record inserted',
      position: 'br'
    }));
  }
}

function insertCategoryDispatch(category) {
  return {
    type: ActionTypes.InsertCategory,
    payload: category
  };
}

export const watchCategoriesEvent = (dispatch) => {
  database.ref('categories').on('value', snap => {
    let categories = [];
    snap.forEach(function (data) {
      let category = {
        key: data.key,
        data: {
          description: data.val().description,
          isActive: data.val().isActive
        }
      }
      categories.push(category);
    });

    dispatch(watchCategoriesAction(categories));
  });
}

function watchCategoriesAction(categories) {
  return {
    type: ActionTypes.CategoriesUpdated,
    payload: categories
  };
}


