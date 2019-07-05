import {
  GET_EVENTS_BEGIN,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const stateFactory = {
  [GET_EVENTS_BEGIN]: onGetEventsBegin,
  [GET_EVENTS_SUCCESS]: onGetEventsSuccess,
  [GET_EVENTS_FAILURE]: onGetEventsFailure,
  [DELETE_EVENT_BEGIN]: onDeleteEventBegin,
  [DELETE_EVENT_SUCCESS]: onDeleteEventSuccess,
  [DELETE_EVENT_FAILURE]: onDeleteEventFailure
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

function onDeleteEventBegin (state) {
  return {
    ...state,
    loading: true,
    error: null
  };
}

function onDeleteEventSuccess (state, action) {
  let items = state.items.filter(item => item._id === action.payload.id);
  return {
    ...state,
    items,
    loading: false
  };
}

function onDeleteEventFailure (state, action) {
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
