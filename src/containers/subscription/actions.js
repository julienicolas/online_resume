import { SET_AUTHENTIFICATION, RECEIVED_ERROR } from "./action-types";
import {DISPLAY_ERROR} from '../errors/action-types';
const axios = require('axios');
const config = require('../../config');

export function setAuthentification(isLoggedIn) {
  return {
    type: SET_AUTHENTIFICATION,
    payload: isLoggedIn
  };
}

export function displayError(error){
  return {
    type: DISPLAY_ERROR,
    payload: error
  };
}

export function setError(error){
  return {
    type: RECEIVED_ERROR,
    payload: error
  };
}

export function signupUser({ email, password, confirmationPassword }, history) {
  return function(dispatch) {
    axios
    .post(`${config.BASE_URL}/signup`, {
      email,
      password,
      confirmationPassword
    })
    .then(response => {
      localStorage.setItem("token", response.data.token);
      dispatch(setAuthentification(true));
      //dispatch(setUser(response.data.user));
      history.push("/profile");
    })
    .catch(error => {
      dispatch(displayError(error.response.data.error));
    });
  }
}