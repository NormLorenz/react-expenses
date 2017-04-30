import { combineReducers } from 'redux';
import CategoryReducer from './categories';
import ExpenseReducer from './expenses';
import PropertyReducer from './properties';
import TaxyearReducer from './taxyear';
import {reducer as notifications} from 'react-notification-system-redux';

// we combine all reducers into a single object before updated data is dispatched (sent) to store
// your entire applications state (store) is just whatever gets returned from all your reducers

// manage separate data domains

const allReducers = combineReducers({
  categoryObject: CategoryReducer,
  expenseObject: ExpenseReducer,
  propertyObject: PropertyReducer,
  taxyearObject: TaxyearReducer,
  notifications
});

export default allReducers