import {
    GET_WORKERS,
    GET_WORKER,
    EDIT_WORKER,
    RESTORE_WORKER,
    DELETE_WORKER,
    WORKERS_LOADING,
    WORKER_LOADING,
    TOOGLE_EDIT_WORKER_MODAL,
    TOOGLE_VIEW_WORKER_MODAL,
    EDIT_WORKER_SUCCESS,
    EDIT_WORKER_FAIL,
    RESTORE_WORKER_SUCCESS,
    RESTORE_WORKER_FAIL,
    DELETE_WORKER_SUCCESS,
    DELETE_WORKER_FAIL,
    RESET_EDIT_WORKER,
    RESET_DELETE_WORKER,
    RESET_RESTORE_WORKER
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";

const API_Server = process.env.REACT_APP_BASE_URL;

export const setWorkersLoading = () => {
    return {
        type: WORKERS_LOADING
    }
}

export const setWorkerLoading = () => {
    return {
        type: WORKER_LOADING
    }
}

export const getWorkers = () => (dispatch, getState) => {
    dispatch(setWorkersLoading());
    axios.get(
        `${API_Server}/workers`, tokenConfig(getState)
    ).then(res => {
        // console.log("res.data", res.data);
        dispatch({
            type: GET_WORKERS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const getWorker = (id) => (dispatch, getState) => {
    dispatch(setWorkerLoading());

    dispatch({
        type: GET_WORKER,
        payload: id
    })
}

export const editWorker = (id, worker) => (dispatch, getState) => {
    axios.put(`${API_Server}/workers/${id}`, worker, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_WORKER,
                payload: res.data,
            })

            dispatch({
                type: EDIT_WORKER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_WORKER_FAIL"));

            dispatch({
                type: EDIT_WORKER_FAIL
            })
        })
}

export const deleteWorker = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/workers/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_WORKER,
                payload: id,
            });

            dispatch({
                type: DELETE_WORKER_SUCCESS
            })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_WORKER_FAIL"));

            dispatch({
                type: DELETE_WORKER_FAIL
            })
        });
};

export const toggleEditWorkerModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOOGLE_EDIT_WORKER_MODAL,
        payload: data
    })
}

export const toggleViewWorkerModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOOGLE_VIEW_WORKER_MODAL,
        payload: id
    })
}