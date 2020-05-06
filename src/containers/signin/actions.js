import {DISPLAY_ERROR} from '../errors/action-types';
import {setAuthentification, displayError} from '../subscription/actions';
import {setUser} from '../user/actions';

const axios = require('axios');
const config = require('../../config');

export function signinUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post(`${config.BASE_URL}/signin`, {
        email,
        password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch(setAuthentification(true));
        dispatch(setUser(response.data.user));
        history.push("/profile");
      })
      .catch(error => {
        dispatch(displayError(error.response.data.message));
      });
  };
}