import { SET_USER } from "./action-types";

const initialState = {
  isLoggedIn: false
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload
      };
    default:
      return state;
  }
}
