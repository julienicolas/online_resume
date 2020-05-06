import { setUser } from '../user/actions';
import { displayError } from '../errors/actions';
import { SET_CURRENT_CV, SET_CV_FORM_DISPLAY, SET_CV_IMAGE, SET_CURRENT_FORM_STEP } from './action-types';

const axios = require('axios');
const config = require('../../config');

export function createCV({ title }, history) {
  console.log('CREATE CV', title);
  return function (dispatch) {
    axios
      .post(`${config.BASE_URL}/create_cv`, { title }, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        console.log('CREATE CV SUCCESS', response.data);
        dispatch(setUser(response.data.user));
        dispatch(setCvFormDisplay(false));
      })
      .catch(error => {
        if (error.response && error.response.data === 'Unauthorized') {
          error.response.data = { message: 'Vous avez été déconnecté' }
        }
        dispatch(displayError(error.response ? error.response.data.message : error));
      });
  };
}

export function updateCV(cv, history) {
  console.log('UPDATE CV', cv);
  return function (dispatch) {
    axios
      .post(`${config.BASE_URL}/update_cv`, cv, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        console.log('CREATE CV SUCCESS', response.data);
        dispatch(setUser(response.data.user));
        dispatch(setCvFormDisplay(false));
      })
      .catch(error => {
        console.log('UPDATE CV ERROR, ', error.response)
        if (error.response && error.response.data === 'Unauthorized') {
          error.response.data = { message: 'Vous avez été déconnecté' }
        }
        dispatch(displayError(error.response ? error.response.data.message : error));
      });
  };
}

export function setCurrentCv(cv) {
  console.log('ACTION setCUrrentCv', cv);
  return {
    type: SET_CURRENT_CV,
    payload: cv
  };
}

export function setCvFormDisplay(display) {
  console.log('ACTION setCvFormDisplay', display);
  return {
    type: SET_CV_FORM_DISPLAY,
    payload: display
  }
}

export function showForm(cv, display) {
  return function (dispatch) {
    console.log('DISPATCH', dispatch);
    dispatch({
      type: SET_CV_FORM_DISPLAY,
      payload: display
    }).then(() => {
      dispatch({
        type: SET_CURRENT_CV,
        payload: cv
      });
    });

  }
}

export function deleteCv(cv) {
  console.log('DELETE CV', cv);
  const data = {
    _id: cv._id,
  }
  return function (dispatch) {
    axios
      .post(`${config.BASE_URL}/delete_cv`, data, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        console.log('Delete CV SUCCESS', response.data);
        dispatch(setUser(response.data.user));
      })
      .catch(error => {
        console.log('Delete CV ERROR, ', error.response)
        if (error.response && error.response.data === 'Unauthorized') {
          error.response.data = { message: 'Vous avez été déconnecté' }
        }
        dispatch(displayError(error.response ? error.response.data.message : error));
      });
  };
}


export function updateUser(user) {
  return function (dispatch) {
    axios
      .post(`${config.BASE_URL}/update_user`, user, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        console.log('UPDATE USER SUCCESS', response.data);
        dispatch(setUser(response.data.user));
      })
      .catch(error => {
        console.log('UPDATE USER ERROR, ', error.response)
        if (error.response && error.response.data === 'Unauthorized') {
          error.response.data = { message: 'Vous avez été déconnecté' }
        }
        dispatch(displayError(error.response ? error.response.data.message : error));
      });
  };
}

export function setCvImage(image) {
  console.log('YOUHOU', image)
  return function (dispatch) {
    dispatch((() => {
      return {
        type: SET_CV_IMAGE,
        payload: image
      }
    })())

  }
}

  export function setCurrentFormStep(index) {
    return function (dispatch) {
      dispatch({
        type: SET_CURRENT_FORM_STEP,
        payload: index
      })
    }

  }