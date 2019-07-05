import {
  SET_TODAY,
  SET_CURRENT_DATE_POINT,
  SET_CURRENT_VIEW,
  SET_CALENDAR_MODE
} from '../actions/types';

const initialState = {
  today: null,
  currentDatePoint: null,
  currentView: [],
  mode: 'month'
};

const stateFactory = {
  [SET_TODAY]: onSetToday,
  [SET_CURRENT_DATE_POINT]: onSetCurrentDatePoint,
  [SET_CURRENT_VIEW]: onSetCurrentView,
  [SET_CALENDAR_MODE]: onSetCalendarMode
};

function onSetToday(state) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    ...state,
    today
  }
}

function onSetCurrentDatePoint(state, action) {
  let currentDatePoint = state.currentDatePoint ? new Date(state.currentDatePoint) : new Date(state.today.getTime());

  if (action.payload.direction === 'today') {
    currentDatePoint = new Date(state.today);
  }

  if (state.mode === 'month') {
    currentDatePoint.setDate(1);
  }

  const extendedDirection = `${action.payload.direction} ${state.mode}`

  switch (extendedDirection) {
    case 'forward month':
      currentDatePoint.setMonth(currentDatePoint.getMonth() + 1);
      break;
    case 'backward month':
      currentDatePoint.setMonth(currentDatePoint.getMonth() - 1);
      break;
    case 'forward week':
      currentDatePoint.setDate(currentDatePoint.getDate() + 7);
      break;
    case 'backward week':
      currentDatePoint.setDate(currentDatePoint.getDate() - 7);
      break;
    default:
      break;
  }
  return {
    ...state,
    currentDatePoint
  }
}

function onSetCurrentView(state, action) {
  let currentView = [];

  switch (state.mode) {
    case 'month':
      let firstDayOfMonth = new Date(state.currentDatePoint.getFullYear(), state.currentDatePoint.getMonth(), 1);
      let lastDayOfMonth = new Date(state.currentDatePoint.getFullYear(), state.currentDatePoint.getMonth() + 1, 0);

      for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
        currentView.push({ date: new Date(day) });
      }

      let firstDayWeekDay = currentView[0].date.getDay();
      let lastDayWeekDay = currentView[currentView.length - 1].date.getDay();

      if (firstDayWeekDay !== 0) {
        let day = firstDayOfMonth;
        day.setMonth(firstDayOfMonth.getMonth() - 1);
        day.setDate(0);
        while (firstDayWeekDay !== 0) {
          currentView.unshift({ date: new Date(day) });
          day.setDate(day.getDate() - 1);
          firstDayWeekDay--;
        }
      }

      if (lastDayWeekDay !== 6) {
        for (let day = lastDayOfMonth; lastDayWeekDay !== 6; lastDayWeekDay++) {
          day.setDate(day.getDate() + 1)
          currentView.push({ date: new Date(day) });
        }
      }
      break;
    case 'week':
      const currentPointWeekDay = state.currentDatePoint.getDay();
      let firstWeekDay = new Date(state.currentDatePoint);
      let lastWeekDay = new Date(state.currentDatePoint);
      firstWeekDay.setDate(firstWeekDay.getDate() - currentPointWeekDay);
      lastWeekDay.setDate(lastWeekDay.getDate() + (6 - currentPointWeekDay));

      for (let day = firstWeekDay; day <= lastWeekDay; day.setDate(day.getDate() + 1)) {
        currentView.push({ date: new Date(day) });
      }
    default:
      break;
  }

  return {
    ...state,
    currentView
  }
}

function onSetCalendarMode(state, action) {
  return {
    ...state,
    mode: action.payload.mode
  }
}

export default function calendar(state = initialState, action) {
  if (stateFactory[action.type]) {
    return stateFactory[action.type](state, action);
  }

  return state;
};
