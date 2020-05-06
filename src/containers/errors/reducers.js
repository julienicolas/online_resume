import { DISPLAY_ERROR } from "./action-types";

const initialState = {
  message: null
};
export default function ErrorsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ERROR:
      return {
        message: action.payload
      };
    
    default:
      return state;
  }
}
