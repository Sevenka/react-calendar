import { SET_TODAY, SET_CURRENT_VIEW } from './types';

export const setToday = () => ({
  type: SET_TODAY
});

export const setCurrentView = () => ({
  type: SET_CURRENT_VIEW
});

export function initCalendar() {
  return dispatch => {
    dispatch(setToday());
    dispatch(setCurrentView());
  }
}
