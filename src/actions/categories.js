import ActionTypes from '../constants/actionTypes';
import { database } from '../constants/database';
import Notifications from 'react-notification-system-redux';

export const editCategory = (category) => {
  return (dispatch) => {
    database.ref('categories').child(category.key).update(category.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'category record updated',
      position: 'br'
    }));
  }
}

export const insertCategory = (category) => {
  return (dispatch) => {
    database.ref('categories').push(category.data);
    dispatch(Notifications.info({
      title: 'Info',
      message: 'category record inserted',
      position: 'br'
    }));
  }
}

export const fetchCategories = (dispatch) => {
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

    dispatch({
      type: ActionTypes.CategoriesUpdated,
      payload: categories
    });
  });
}