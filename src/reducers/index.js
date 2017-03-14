import { combineReducers } from 'redux';
import CategoriesReducer from './categories';
import ExpensesReducer from './expenses';
import PropertiesReducer from './properties';
import TaxYearReducer from './taxyear';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 */

const allReducers = combineReducers({
  categories: CategoriesReducer,
  expenses: ExpensesReducer,
  properties: PropertiesReducer,
  taxYear: TaxYearReducer
});

export default allReducers