import { SET_CURRENT_CV, SET_CV_FORM_DISPLAY, SET_CV_IMAGE, SET_CURRENT_FORM_STEP } from "./action-types";

const initialState = {
  currentCV: null,
  displayCvForm: false,
  currentFormStep: 0
};
export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CV:
      return {
        currentCV: action.payload,
        displayCvForm: true
      };
    case SET_CV_FORM_DISPLAY:
      return {
        displayCvForm: action.payload
      }
    case SET_CURRENT_FORM_STEP:
      return {
        ...state,
        currentFormStep: action.payload
      }
    default:
      return state;
  }
}
