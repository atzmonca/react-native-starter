import { createReducer } from "../common/util/reducerUtil";
//import { ADD_EVENT } from "../actions/actionTypes";
import Store from "../store/event";
import { UPDATE_EVENT, FETCH_EVENTS ,CREATE_EVENT,DELETE_EVENT} from "../../src/actions/actionTypes";

//export const initialState = Store;
const initialState = [
    {
      id: '1',
      title: 'Trip to Tower of London',
      startDate: '2018-08-27T11:00:00+00:00',
      endDate: '2018-08-27T12:00:00+00:00',
      allDay:false,
      recurrence:'none',//daily, weekly, monthly, yearly or none
      recurrenceRule:{
        frequency:'weekly', //daily, weekly, monthly, yearly
        endDate:new Date(),
        occurrence:2, //Number of event occurrences.
        interval: 3,
      },
      isDetached:true,  //ndicates whether an event is a detached instance of a repeating event.
      url:'',
      location:'netanya',
      notes:'just more notes...',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    
      hostedBy: 'Bob',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
      ]
    },
    {
      id: '2',
      title: 'Trip to Greece',
      startDate: '2018-08-28T11:00:00+00:00',
      endDate: '2018-08-28T12:00:00+00:00',
      allDay:false,
      recurrence:'none',//daily, weekly, monthly, yearly or none
      recurrenceRule:{
        frequency:'weekly', //daily, weekly, monthly, yearly
        endDate:new Date(),
        occurrence:2, //Number of event occurrences.
        interval: 3,
      },
      isDetached:true,  //ndicates whether an event is a detached instance of a repeating event.
      url:'',
      location:'tel aviv',
      notes:'just more notes...',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    
      hostedBy: 'Bob',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
      ]
    }
   
  ];

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

