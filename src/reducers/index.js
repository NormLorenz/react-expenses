import { combineReducers } from 'redux';
import CharitiesReducer from './charities';
import CategoryReducer from './categories';
import ExpenseReducer from './expenses';
import PropertyReducer from './properties';
import TaxyearReducer from './taxyear';
import DonationReducer from './donations';
import {reducer as notifications} from 'react-notification-system-redux';

// we combine all reducers into a single object before updated data is dispatched (sent) to store
// your entire applications state (store) is just whatever gets returned from all your reducers

// manage separate data domains

const allReducers = combineReducers({
  charityObject: CharitiesReducer,
  categoryObject: CategoryReducer,
  expenseObject: ExpenseReducer,
  propertyObject: PropertyReducer,
  taxyearObject: TaxyearReducer,
  donationObject: DonationReducer,
  notifications
});

export default allReducers