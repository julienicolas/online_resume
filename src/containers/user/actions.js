import { SET_USER } from "./action-types";

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}