import statusMessage from './status';
import { Translations, DEFAULT_LOCALE } from '../i18n';
import ErrorMessages from '../constants/errors';
import { ADD_EVENT } from './actionTypes'

export const addEvent = (event) => {
  return {
    type: ADD_EVENT,
    event: event
  }
}
