import { SET_TODAY, SET_CURRENT_VIEW } from '../actions/types';

const initialState = {
  today: null,
  currentView: []
};

const stateFactory = {
  [SET_TODAY]: onSetToday,
  [SET_CURRENT_VIEW]: onSetCurrentView
};

function onSetToday(state) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    ...state,
    today
  }
}

function onSetCurrentView(state) {
  let currentView = [];
  let firstDayOfMonth = new Date(state.today.getFullYear(), state.today.getMonth(), 1);
  let lastDayOfMonth = new Date(state.today.getFullYear(), state.today.getMonth() + 1, 0);

  for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    currentView.push(new Date(day));
  }

  let firstDayWeekDay = currentView[0].getDay();
  let lastDayWeekDay = currentView[currentView.length - 1].getDay();

  if (firstDayWeekDay !== 0) {
    let day = firstDayOfMonth;
    day.setMonth(firstDayOfMonth.getMonth() - 1);
    day.setDate(0);
    while (firstDayWeekDay !== 0) {
      currentView.unshift(new Date(day));
      day.setDate(day.getDate() - 1);
      firstDayWeekDay--;
    }
  }

  if (lastDayWeekDay !== 6) {
    for (let day = lastDayOfMonth; lastDayWeekDay !== 6; lastDayWeekDay++) {
      day.setDate(day.getDate() + 1)
      currentView.push(new Date(day));
    }
  }

  return {
    ...state,
    currentView
  }
}

export default function calendar(state = initialState, action) {
  if (stateFactory[action.type]) {
    return stateFactory[action.type](state, action);
  }

  return state;
};
