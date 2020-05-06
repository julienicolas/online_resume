import { DISPLAY_ERROR } from "./action-types";

export function displayError(error) {
  return {
    type: DISPLAY_ERROR,
    payload: error
  };
}

export function resetError() {
  return {
    type: DISPLAY_ERROR,
    payload: null
  };
}