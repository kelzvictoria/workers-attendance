import {
  GET_ATTENDANCES,
  GET_ATTENDANCE,
  ADD_ATTENDANCE,
  DELETE_ATTENDANCE,
  EDIT_ATTENDANCE,

  ATTENDANCES_LOADING,
  ATTENDANCE_LOADING,
  TOGGLE_EDIT_ATT_MODAL,
  TOGGLE_VIEW_ATT_MODAL,

  ADD_ATT_SUCCESS,
  ADD_ATT_FAIL,
  RESET_ADD_ATT,
  RESET_EDIT_ATT,
  RESET_DELETE_ATT,

  DELETE_ATT_SUCCESS,
  DELETE_ATT_FAIL,
  EDIT_ATT_SUCCESS,
  EDIT_ATT_FAIL,


} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { getWorkers } from "./workerActions";

import axios from "axios";
import { string } from "prop-types";

const API_Server = process.env.REACT_APP_BASE_URL;

export const getAttendances = () => async (dispatch, getState) => {
  // dispatch(setAttendancesLoading());
  //await dispatch(getWorkers());
  let workers = getState().worker.workers;

  let attendances = [];
  console.log("workers", workers);
  axios
    .get(`${API_Server}/attendance`, tokenConfig(getState))
    .then((res) => {
      // console.log("res.data", res.data);
      attendances = res.data;

      for (let i = 0; i < attendances.length; i++) {
        let workerID = attendances[i].worker_id;
        //  console.log("workerID", workerID);
        let worker_details = workers.filter(w => w._id === workerID);
        console.log("worker_details", worker_details);
        if (worker_details.length) {
          attendances[i]["worker_details"] = worker_details[0];
        }

      }

      dispatch({
        type: GET_ATTENDANCES,
        payload: attendances,
      });
    })
    .catch((err) =>
      err.response && dispatch(returnErrors(err.response.data, err.response.status))
    );
};




export const resetAddAtt = () => {
  return {
    type: RESET_ADD_ATT
  }
}

export const resetEditAtt = () => {
  return {
    type: RESET_EDIT_ATT
  }
}

export const resetDeleteAtt = () => {
  return {
    type: RESET_DELETE_ATT
  }
}

export const deleteAttendance = (id) => (dispatch, getState) => {
  axios
    .delete(`${API_Server}/attendance/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_ATTENDANCE,
        payload: id,
      });
      dispatch({
        type: DELETE_ATT_SUCCESS,

      })

    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "DELETE_ATT_FAIL"))

      dispatch({
        type: DELETE_ATT_FAIL,

      })
    }
    );
};

export const getAttendance = (id) => (dispatch) => {
  dispatch(setAttendanceLoading());

  dispatch({
    type: GET_ATTENDANCE,
    payload: id,
  });
};

export const editAttendance = (id, attendance) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append("name", attendance.name);
  formData.append("abbr", attendance.abbr);
  formData.append("status", attendance.status);
  formData.append("city", attendance.city);
  if (attendance.logo && attendance.logo.name) {
    formData.append("logo",
      attendance.logo,
      attendance.logo.name
    )
  } else if (typeof attendance.logo == string) {
    formData.append("logo", attendance.logo);
  }

  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  axios
    .post(`${API_Server}/attendance/${id}`, formData,
      //config,
      tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_ATTENDANCE,
        payload: res.data,
      })
      dispatch({
        type: EDIT_ATT_SUCCESS,

      })

    }

    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "EDIT_ATT_FAIL"))

      dispatch({
        type: EDIT_ATT_FAIL,

      })
    }
    );
};

export const setAttendancesLoading = () => {
  return {
    type: ATTENDANCES_LOADING,
  };
};

export const setAttendanceLoading = () => {
  return {
    type: ATTENDANCE_LOADING
  }
}

export const toggleEditAttModal = (data) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_EDIT_ATT_MODAL,
    payload: data
  });
};

export const toggleViewAttModal = (id) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_VIEW_ATT_MODAL,
    payload: id
  });
};