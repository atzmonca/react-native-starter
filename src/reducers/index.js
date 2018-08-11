import status from './status';
import member from './member';
import recipes from './recipes';
import locale from './locale';
import event from './event';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
      case 'ADD_EVENT':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  recipes,
  locale,
  event
};
