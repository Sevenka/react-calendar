import { combineReducers } from 'redux';
import calendar from './calendar';
import events from './events';

export default combineReducers({
  calendar,
  events
});
