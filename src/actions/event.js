import statusMessage from './status';
import { Translations, DEFAULT_LOCALE } from '../i18n';
import ErrorMessages from '../constants/errors';
import { ADD_EVENT } from './actionTypes'

export const addEvent = (eventData) => {
  console.log('event inside action: ' , eventData);
  
  return {
    type: ADD_EVENT,
    eventData: eventData
  }
}

