import { combineReducers } from 'redux';
import CategoriesReducer from './categories';
import ExpensesReducer from './expenses';
import PropertiesReducer from './properties';
import TaxyearReducer from './taxyear';
import ReadmeReducer from './readme';
import {reducer as notifications} from 'react-notification-system-redux';

// we combine all reducers into a single object before updated data is dispatched (sent) to store
// your entire applications state (store) is just whatever gets returned from all your reducers

// manage separate data domains

const allReducers = combineReducers({
  categories: CategoriesReducer,
  expenses: ExpensesReducer,
  properties: PropertiesReducer,
  taxyear: TaxyearReducer,
  readme: ReadmeReducer,
  notifications
});

export default allReducers