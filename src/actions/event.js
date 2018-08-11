import statusMessage from './status';
import { Translations, DEFAULT_LOCALE } from '../i18n';
import ErrorMessages from '../constants/errors';
import { FETCH_EVENTS ,CREATE_EVENT,UPDATE_EVENT,DELETE_EVENT} from './actionTypes'

/* export const addEvent = (eventData) => {
  console.log('event inside action: ' , eventData);
  
  return {
    type: ADD_EVENT,
    eventData: eventData
  }
}
 */
export const fetchEvents = () => {
  console.log('events inside fetch action');
  return {
    type: FETCH_EVENTS ,
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


