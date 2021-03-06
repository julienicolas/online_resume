import {setAuthentification}  from '../subscription/actions';
import {setUser}              from '../user/actions';
import {displayError}         from '../errors/actions';

const axios = require('axios');
const config = require('../../config');

export function signinByToken(token){
  return function(dispatch) {
    axios
      .get(`${config.BASE_URL}/me`, {
        headers: { authorization: token }
      })
      .then(response => {
        dispatch(setAuthentification(true));
        dispatch(setUser(response.data.user));
      })
      .catch(error => {
        dispatch(displayError(error.response ? error.response.data.message : 'unknown error'));
      });
  };
}