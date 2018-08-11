import { createReducer } from '../common/util/reducerUtil';
import { ADD_EVENT } from "../actions/actionTypes";
import Store from '../store/event';


 //export const initialState = Store;
 const initialState = {
  events: []
};

 //mport Store from '../store/member';

//export const initialState = Store;

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EVENT': {
      console.log('add event action inside reducer: ' , action.eventData);
      
      if (action.eventData) {
        console.log("inside reducer event. state ", state);
        
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