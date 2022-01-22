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

export const getCampMeetings = () => async (dispatch, getState) => {
  // dispatch(setCampMeetingsLoading());
  //await dispatch(getWorkers());
  let workers = getState().worker.workers;

  let campMeetings = [];
  console.log("workers", workers);
  axios
    .get(`${API_Server}/campMeeting`, tokenConfig(getState))
    .then((res) => {
      // console.log("res.data", res.data);
      campMeetings = res.data;

      for (let i = 0; i < campMeetings.length; i++) {
        let workerID = campMeetings[i].worker_id;
        //  console.log("workerID", workerID);
        let worker_details = workers.filter((w) => w._id === workerID);
        console.log("worker_details", worker_details);
        if (worker_details.length) {
          campMeetings[i]["worker_details"] = worker_details[0];
        }
      }

      dispatch({
        type: GET_ATTENDANCES,
        payload: campMeetings,
      });
    })
    .catch(
      (err) =>
        err.response &&
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const resetAddAtt = () => {
  return {
    type: RESET_ADD_ATT,
  };
};

export const resetEditAtt = () => {
  return {
    type: RESET_EDIT_ATT,
  };
};

export const resetDeleteAtt = () => {
  return {
    type: RESET_DELETE_ATT,
  };
};

export const deleteCampMeeting = (id) => (dispatch, getState) => {
  axios
    .delete(`${API_Server}/campMeeting/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_ATTENDANCE,
        payload: id,
      });
      dispatch({
        type: DELETE_ATT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "DELETE_ATT_FAIL")
      );

      dispatch({
        type: DELETE_ATT_FAIL,
      });
    });
};

export const getCampMeeting = (id) => (dispatch) => {
  dispatch(setCampMeetingLoading());

  dispatch({
    type: GET_ATTENDANCE,
    payload: id,
  });
};

export const editCampMeeting = (id, campMeeting) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append("name", campMeeting.name);
  formData.append("abbr", campMeeting.abbr);
  formData.append("status", campMeeting.status);
  formData.append("city", campMeeting.city);
  if (campMeeting.logo && campMeeting.logo.name) {
    formData.append("logo", campMeeting.logo, campMeeting.logo.name);
  } else if (typeof campMeeting.logo == string) {
    formData.append("logo", campMeeting.logo);
  }

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  axios
    .post(
      `${API_Server}/campMeeting/${id}`,
      formData,
      //config,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: EDIT_ATTENDANCE,
        payload: res.data,
      });
      dispatch({
        type: EDIT_ATT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_ATT_FAIL")
      );

      dispatch({
        type: EDIT_ATT_FAIL,
      });
    });
};

export const setCampMeetingsLoading = () => {
  return {
    type: ATTENDANCES_LOADING,
  };
};

export const setCampMeetingLoading = () => {
  return {
    type: ATTENDANCE_LOADING,
  };
};

export const toggleEditAttModal = (data) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_EDIT_ATT_MODAL,
    payload: data,
  });
};

export const toggleViewAttModal = (id) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_VIEW_ATT_MODAL,
    payload: id,
  });
};
