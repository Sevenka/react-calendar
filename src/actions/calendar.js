import {
  SET_TODAY,
  SET_CURRENT_DATE_POINT,
  SET_CURRENT_VIEW
} from './types';

export const setToday = () => ({
  type: SET_TODAY
});

export const setCurrentDatePoint = (direction) => ({
  type: SET_CURRENT_DATE_POINT,
  payload: { direction }
});

export const setCurrentView = () => ({
  type: SET_CURRENT_VIEW
});

export function initCalendar() {
  return dispatch => {
    dispatch(setToday());
    dispatch(setCurrentDatePoint());
    dispatch(setCurrentView());
  }
}

export function moveMonthForward() {
  return dispatch => {
    dispatch(setCurrentDatePoint('forward'));
    dispatch(setCurrentView());
  }
}

export function moveMonthBackward() {
  return dispatch => {
    dispatch(setCurrentDatePoint('backward'));
    dispatch(setCurrentView());
  }
}
