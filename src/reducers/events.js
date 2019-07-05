import {
  GET_EVENTS_BEGIN,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const stateFactory = {
  [GET_EVENTS_BEGIN]: onGetEventsBegin,
  [GET_EVENTS_SUCCESS]: onGetEventsSuccess,
  [GET_EVENTS_FAILURE]: onGetEventsFailure
};

function onGetEventsBegin (state) {
  return {
    ...state,
    loading: true,
    error: null
  };
}

function onGetEventsSuccess (state, action) {
  return {
    ...state,
    loading: false,
    items: action.payload.events
  };
}

function onGetEventsFailure (state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload.error
  };
}

export default function events(state = initialState, action) {
  if (stateFactory[action.type]) {
    return stateFactory[action.type](state, action);
  }

  return state;
};
