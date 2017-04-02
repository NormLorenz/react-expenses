import { combineReducers } from 'redux';
import CategoriesReducer from './categories';
import ExpensesReducer from './expenses';
import PropertiesReducer from './properties';
import TaxYearReducer from './taxyear';
import TestReducer from './test';

// we combine all reducers into a single object before updated data is dispatched (sent) to store
// your entire applications state (store) is just whatever gets returned from all your reducers

// manage separate data domains

const allReducers = combineReducers({
  categories: CategoriesReducer,
  expenses: ExpensesReducer,
  properties: PropertiesReducer,
  taxYear: TaxYearReducer,
  readMe: TestReducer
});

export default allReducers