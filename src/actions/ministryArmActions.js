import {
  GET_MINISTRY_ARMS,
  GET_MINISTRY_ARM,
  ADD_MINISTRY_ARM,
  DELETE_MINISTRY_ARM,
  EDIT_MINISTRY_ARM,

  MINISTRY_ARMS_LOADING,
  MINISTRY_ARM_LOADING,
  TOGGLE_EDIT_MA_MODAL,
  TOGGLE_VIEW_MA_MODAL,

  ADD_MA_SUCCESS,
  ADD_MA_FAIL,
  RESET_ADD_MA,
  RESET_EDIT_MA,
  RESET_DELETE_MA,

  DELETE_MA_SUCCESS,
  DELETE_MA_FAIL,
  EDIT_MA_SUCCESS,
  EDIT_MA_FAIL,


} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";
import { string } from "prop-types";

const API_Server = process.env.REACT_APP_BASE_URL;

export const getMinistryArms = () => (dispatch, getState) => {
  dispatch(setMinistryArmsLoading());
  axios
    .get(`${API_Server}/ministry_arms`, tokenConfig(getState))
    .then((res) => {
      //console.log("res.data", res.data);
      dispatch({
        type: GET_MINISTRY_ARMS,
        payload: res.data,
      });
    })
    .catch((err) =>
      err.response && dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const addMinistryArm = (ministryArm) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append("name", ministryArm.name);
  formData.append("abbr", ministryArm.abbr);
  formData.append("status", ministryArm.status);
  formData.append("city", ministryArm.city);
  if (ministryArm.logo && ministryArm.logo.name) {
    formData.append("logo",
      ministryArm.logo,
      ministryArm.logo.name
    )
  } else if (typeof ministryArm.logo == string) {
    formData.append("logo", ministryArm.logo);
  }

  axios
    .post(`${API_Server}/ministry_arms`, formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_MINISTRY_ARM,
        payload: res.data,
      })
      dispatch({
        type: ADD_MA_SUCCESS
      })
    }

    )
    .catch((err) => {

      dispatch(returnErrors(err.response.data, err.response.status, "ADD_MA_FAIL"))
      dispatch({
        type: ADD_MA_FAIL,
      })
    }
    );
};

export const resetAddMA = () => {
  return {
    type: RESET_ADD_MA
  }
}

export const resetEditMA = () => {
  return {
    type: RESET_EDIT_MA
  }
}

export const resetDeleteMA = () => {
  return {
    type: RESET_DELETE_MA
  }
}

export const deleteMinistryArm = (id) => (dispatch, getState) => {
  axios
    .delete(`${API_Server}/ministry_arms/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_MINISTRY_ARM,
        payload: id,
      });
      dispatch({
        type: DELETE_MA_SUCCESS,

      })

    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "DELETE_MA_FAIL"))

      dispatch({
        type: DELETE_MA_FAIL,

      })
    }
    );
};

export const getMinistryArm = (id) => (dispatch) => {
  dispatch(setMinistryArmLoading());

  dispatch({
    type: GET_MINISTRY_ARM,
    payload: id,
  });
};

export const editMinistryArm = (id, ministryArm) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append("name", ministryArm.name);
  formData.append("abbr", ministryArm.abbr);
  formData.append("status", ministryArm.status);
  formData.append("city", ministryArm.city);
  if (ministryArm.logo && ministryArm.logo.name) {
    formData.append("logo",
      ministryArm.logo,
      ministryArm.logo.name
    )
  } else if (typeof ministryArm.logo == string) {
    formData.append("logo", ministryArm.logo);
  }

  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  axios
    .post(`${API_Server}/ministry_arms/${id}`, formData,
      //config,
      tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_MINISTRY_ARM,
        payload: res.data,
      })
      dispatch({
        type: EDIT_MA_SUCCESS,

      })

    }

    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "EDIT_MA_FAIL"))

      dispatch({
        type: EDIT_MA_FAIL,

      })
    }
    );
};

export const setMinistryArmsLoading = () => {
  return {
    type: MINISTRY_ARMS_LOADING,
  };
};

export const setMinistryArmLoading = () => {
  return {
    type: MINISTRY_ARM_LOADING
  }
}

export const toggleEditMAModal = (data) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_EDIT_MA_MODAL,
    payload: data
  });
};

export const toggleViewMAModal = (id) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_VIEW_MA_MODAL,
    payload: id
  });
};