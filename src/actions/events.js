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

export const getEventsBegin = () => ({
  type: GET_EVENTS_BEGIN
});

export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: { events }
});

export const getEventsFailure = error => ({
  type: GET_EVENTS_FAILURE,
  payload: { error }
});

export const addEventBegin = () => ({
  type: ADD_EVENT_BEGIN
});

export const addEventSuccess = item => ({
  type: ADD_EVENT_SUCCESS,
  payload: { item }
});

export const addEventFailure = error => ({
  type: ADD_EVENT_FAILURE,
  payload: { error }
});

export const setEditedEvent = eventItem => ({
  type: SET_EDITED_EVENT,
  payload: { eventItem }
});

export const editEventBegin = () => ({
  type: EDIT_EVENT_BEGIN
});

export const editEventSuccess = item => ({
  type: EDIT_EVENT_SUCCESS,
  payload: { item }
});

export const editEventFailure = error => ({
  type: EDIT_EVENT_FAILURE,
  payload: { error }
});

export const deleteEventBegin = () => ({
  type: DELETE_EVENT_BEGIN
});

export const deleteEventSuccess = id => ({
  type: DELETE_EVENT_SUCCESS,
  payload: { id }
});

export const deleteEventFailure = error => ({
  type: DELETE_EVENT_FAILURE,
  payload: { error }
});

const apiPath = 'http://localhost:8008/api/events';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getEvents() {
  return (dispatch, getState) => {
    dispatch(getEventsBegin());
    let filter = {
      month: getState().calendar.currentDatePoint.getMonth() + 1
    }
    return fetch(`${apiPath}/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(getEventsSuccess(json.items));
        return json.items;
      })
      .catch(error => dispatch(getEventsFailure(error)));
  }
}

export function addEvent(eventItem) {
  return dispatch => {
    dispatch(addEventBegin());
    return fetch(`${apiPath}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventItem)
    })
      .then(handleErrors)
      .then(() => {
        dispatch(addEventSuccess());
        dispatch(getEvents());
      })
      .catch(error => dispatch(addEventFailure(error)));
  }
}

export function editEvent(event) {
  return dispatch => {
    dispatch(editEventBegin());
    return fetch(`${apiPath}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(handleErrors)
      .then(() => {
        dispatch(editEventSuccess());
        dispatch(getEvents());
      })
      .catch(error => dispatch(editEventFailure(error)));
  }
}

export function onSetEditedEvent(event) {
  return dispatch => {
    dispatch(setEditedEvent(event));
  }
}

export function deleteEvent(id) {
  return dispatch => {
    dispatch(deleteEventBegin());
    return fetch(`${apiPath}/delete/${id}`)
      .then(handleErrors)
      .then(() => {
        dispatch(deleteEventSuccess());
        return;
      })
      .catch(error => dispatch(deleteEventFailure(error)));
  }
}
