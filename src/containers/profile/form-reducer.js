import {SET_CV_IMAGE } from "./action-types";

const initialState = {
  cvImage: null
};
export default function FormReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CV_IMAGE:
      return {
        cvImage: action.payload
      }
    default:
      return state;
  }
}
