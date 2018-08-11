import { createReducer } from "../common/util/reducerUtil";
//import { ADD_EVENT } from "../actions/actionTypes";
import Store from "../store/event";
import { ADD_EVENT, FETCH_EVENTS } from "../../src/actions/actionTypes";

//export const initialState = Store;
const initialState = {
  events: []
};

//mport Store from '../store/member';

//export const initialState = Store;

export default function eventReducer(state = initialState, action) {
  console.log(" inside event reducer action: ", action.type);
  console.log(" inside event reducer state: ", state);
  switch (action.type) {
    case ADD_EVENT: {
      //  console.log('add event action inside reducer: ' , action.eventData);
      if (action.eventData) {
        //console.log("inside reducer event. state ", state);
        return {
          ...state,
          events: state.events.concat({
            id: Math.random(),
            title: action.eventData.title,
            startDatetime: action.eventData.startDatetime
          })
        };
      }
      return initialState;
    }

    case FETCH_EVENTS:
    console.log('inside reducer fetch events: ',action.type);
    
      fetch("http://localhost:60278/ParentSharingService.svc/GetAllEvents/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: "1"
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('events from server: ', responseJson);
          
          return responseJson.movies;
        })
        .catch(error => {
          console.error(error);
        });

      break;
    default:
      return state;
  }
}


/* 


export const createEvent = (state=initialState, payload) => {
  console.log('inside reducer: ' , payload);
  
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
  [ADD_EVENT]: createEvent,

});
 */
