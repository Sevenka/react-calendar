import {
  GET_EVENTS_BEGIN,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  ADD_EVENT_BEGIN,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  SET_EDITED_EVENT,
  EDIT_EVENT_BEGIN,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null,
  editedEvent: null
};

const stateFactory = {
  [GET_EVENTS_BEGIN]: onActionBegin,
  [GET_EVENTS_SUCCESS]: onGetEventsSuccess,
  [GET_EVENTS_FAILURE]: onActionFailure,
  [ADD_EVENT_BEGIN]: onActionBegin,
  [ADD_EVENT_SUCCESS]: onChangeEventSuccess,
  [ADD_EVENT_FAILURE]: onActionFailure,
  [SET_EDITED_EVENT]: onSetEditedEvent,
  [EDIT_EVENT_BEGIN]: onActionBegin,
  [EDIT_EVENT_SUCCESS]: onChangeEventSuccess,
  [EDIT_EVENT_FAILURE]: onActionFailure,
  [DELETE_EVENT_BEGIN]: onActionBegin,
  [DELETE_EVENT_SUCCESS]: onDeleteEventSuccess,
  [DELETE_EVENT_FAILURE]: onActionFailure
};

function onActionBegin(state, action) {
  return {
    ...state,
    loading: true,
    error: null
  };
};

function onActionFailure(state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload.error
  };
};

function onGetEventsSuccess (state, action) {
  return {
    ...state,
    loading: false,
    items: action.payload.events
  };
}

function onSetEditedEvent(state, action) {
  return {
    ...state,
    editedEvent: action.payload.eventItem
  };
};

function onChangeEventSuccess (state, action) {
  return {
    ...state,
    loading: false,
    editedEvent: null
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

export default function events(state = initialState, action) {
  if (stateFactory[action.type]) {
    return stateFactory[action.type](state, action);
  }

  return state;
};
