import status from "./status";
import member from "./member";
import recipes from "./recipes";
import locale from "./locale";
//import event from "./event";
import events from "./event";

const rehydrated = (state = false, action) => {
  // console.log('inside rehydrated in index.js', state);

  switch (action.type) {
    case "persist/REHYDRATE":
      return true;
    case "ADD_EVENT":
      return true;
 //   case "FETCH_EVENTS":
   //   return true;
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
  events
};
