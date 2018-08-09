import { createReducer } from '../common/util/reducerUtil';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT , FETCH_EVENTS } from "../native/components/event/eventConstants";


 const initialState =[];


export const createEvent = (state, payload) => {
  return [...state, Object.assign({}, payload.event)];
};

export const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event)
  ];
};

export const deleteEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.eventId),
    Object.assign({}, payload.event)
  ];
};

export const fetchEvents = (state, payload) => {
  console.log('reducer fetch events',payload.events);
  
  return payload.events;
};

export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent,
  [FETCH_EVENTS]:  fetchEvents
});
