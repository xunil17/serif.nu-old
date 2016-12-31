import { fromJS } from 'immutable';

const initialSnackbar = fromJS({
  open: false,
  message: ''
});

function snackbar(state = initialSnackbar, action) {
  switch (action.type) {
    case 'ADD_COURSE':
    case 'ADD_COURSE_SEARCH':
      return state.set('open', true).set('message', 'Section added.');
    case 'ADD_COMPONENT':
    case 'ADD_COMPONENT_SEARCH':
    case 'ADD_COMPONENT_CART':
      return state.set('open', true).set('message', 'Component added.');
    case 'REMOVE':
      return state.set('open', true).set('message', 'Class removed.');
    case 'SWAP_COMPONENT':
      return state.set('open', true).set('message', 'Component swapped.');
    case 'ADD_CALENDAR':
      return state.set('open', true).set('message', 'Calendar added.');
    case 'REMOVE_CALENDAR':
      return state.set('open', true).set('message', 'Calendar removed.');
    case 'REMOVE_ALL':
      return state.set('open', true).set('message', 'All classes removed.');
    case 'GOOGLE_CALENDAR':
      return state.set('open', true).set('message', 'Classes saved to Google Calendar.');
    case 'CLOSE_SNACKBAR':
      return state.set('open', false);
    default:
      return state;
  }
}

export default snackbar;