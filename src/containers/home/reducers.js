import {
  DISPLAY_CVS
} from './action-types';

const initialState = {
  lastCvs: null,
  lastCvsLoading: true
}
export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_CVS:
      return {
        lastCvs: action.payload,
        lastCvsLoading: false
      }
    default:
      return state;

  }

}