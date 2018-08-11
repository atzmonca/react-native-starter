import statusMessage from './status';
import { Translations, DEFAULT_LOCALE } from '../i18n';
import ErrorMessages from '../constants/errors';
import { ADD_EVENT,FETCH_EVENTS ,CREATE_EVENT} from './actionTypes'

export const addEvent = (eventData) => {
  console.log('event inside action: ' , eventData);
  
  return {
    type: ADD_EVENT,
    eventData: eventData
  }
}

export const fetchEvents = () => {
  console.log('events inside fetch action');
  return {
    type: 'FETCH_EVENTS',
    payload:{
      
    }
  }

}

export const createEvent = event => {
  console.log('inside createEvent action', event);
  
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

export const fetchEvents11111 = events => {
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

