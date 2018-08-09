import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";


export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  };
};

export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  };
};

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
};

export const fetchEvents = events => {
  console.log('events inside fetch action', events);
  
  return {
    type:FETCH_EVENTS,
    payload: {
      events
    }
  }
}

export const loadEvents = () => {
  console.log('start load events action');
  
  return async dispatch => {
    try {
      console.log('before action start');
      dispatch(asyncActionStart())
      console.log('after action start');
      
      let events = await fetchSampleData();
      console.log('after action fetchSampleData',events);
      dispatch(fetchEvents(events.events))
      console.log('after action fetchEvents');
      dispatch(asyncActionFinish())
      console.log('after action asyncActionFinish');
    } catch (error) {
      console.log('error: ', error)

      dispatch(asyncActionError())
    }
  }
}
