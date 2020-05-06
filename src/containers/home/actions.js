import { DISPLAY_CVS } from "./action-types";
import {displayError} from '../errors/actions';

const axios = require('axios');
const config = require('../../config');

export function displayCvs(cvs){
  return {
    type: DISPLAY_CVS,
    payload: cvs
  }
}

export function getLastCvs(){
  return function(dispatch) {
    axios
      .get(`${config.BASE_URL}/cvs`, {})
      .then(response => {
        dispatch(displayCvs(response.data.cvs));
      })
      .catch(error => {
        dispatch(displayError(error.response ? error.response.data.message : error.toString()));
      });
  };
}