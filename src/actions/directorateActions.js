import {
    GET_DIRECTORATES,
    GET_DIRECTORATE,
    ADD_DIRECTORATE,
    DELETE_DIRECTORATE,
    EDIT_DIRECTORATE,

    DIRECTORATES_LOADING,
    DIRECTORATE_LOADING,
    TOGGLE_EDIT_DIRECTORATE_MODAL,
    TOGGLE_VIEW_DIRECTORATE_MODAL,

    ADD_DIRECTORATE_SUCCESS,
    ADD_DIRECTORATE_FAIL,
    RESET_ADD_DIRECTORATE,
    RESET_EDIT_DIRECTORATE,
    RESET_DELETE_DIRECTORATE,

    DELETE_DIRECTORATE_SUCCESS,
    DELETE_DIRECTORATE_FAIL,
    EDIT_DIRECTORATE_SUCCESS,
    EDIT_DIRECTORATE_FAIL,


} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";
import { string } from "prop-types";

const API_Server = process.env.REACT_APP_BASE_URL;

export const getDirectorates = () => (dispatch, getState) => {
    dispatch(setDirectoratesLoading());
    axios
        .get(`${API_Server}/directorates`, tokenConfig(getState))
        .then((res) => {
            // console.log("res.data", res.data);
            dispatch({
                type: GET_DIRECTORATES,
                payload: res.data,
            });
        })
        .catch((err) =>
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const addDirectorate = (directorate) => (dispatch, getState) => {
    let formData = new FormData();
    formData.append("name", directorate.name);
    formData.append("abbr", directorate.abbr);
    formData.append("status", directorate.status);
    formData.append("city", directorate.city);
    if (directorate.logo && directorate.logo.name) {
        formData.append("logo",
            directorate.logo,
            directorate.logo.name
        )
    } else if (typeof directorate.logo == string) {
        formData.append("logo", directorate.logo);
    }

    axios
        .post(`${API_Server}/directorates`, formData, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_DIRECTORATE,
                payload: res.data,
            })
            dispatch({
                type: ADD_DIRECTORATE_SUCCESS
            })
        }

        )
        .catch((err) => {

            dispatch(returnErrors(err.response.data, err.response.status, "ADD_DIRECTORATE_FAIL"))
            dispatch({
                type: ADD_DIRECTORATE_FAIL,
            })
        }
        );
};

export const resetAddAtt = () => {
    return {
        type: RESET_ADD_DIRECTORATE
    }
}

export const resetEditAtt = () => {
    return {
        type: RESET_EDIT_DIRECTORATE
    }
}

export const resetDeleteAtt = () => {
    return {
        type: RESET_DELETE_DIRECTORATE
    }
}

export const deleteDirectorate = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/directorates/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_DIRECTORATE,
                payload: id,
            });
            dispatch({
                type: DELETE_DIRECTORATE_SUCCESS,

            })

        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_DIRECTORATE_FAIL"))

            dispatch({
                type: DELETE_DIRECTORATE_FAIL,

            })
        }
        );
};

export const getDirectorate = (id) => (dispatch) => {
    dispatch(setDirectorateLoading());

    dispatch({
        type: GET_DIRECTORATE,
        payload: id,
    });
};

export const editDirectorate = (id, directorate) => (dispatch, getState) => {
    let formData = new FormData();
    formData.append("name", directorate.name);
    formData.append("abbr", directorate.abbr);
    formData.append("status", directorate.status);
    formData.append("city", directorate.city);
    if (directorate.logo && directorate.logo.name) {
        formData.append("logo",
            directorate.logo,
            directorate.logo.name
        )
    } else if (typeof directorate.logo == string) {
        formData.append("logo", directorate.logo);
    }

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    axios
        .post(`${API_Server}/directorates/${id}`, formData,
            //config,
            tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_DIRECTORATE,
                payload: res.data,
            })
            dispatch({
                type: EDIT_DIRECTORATE_SUCCESS,

            })

        }

        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_DIRECTORATE_FAIL"))

            dispatch({
                type: EDIT_DIRECTORATE_FAIL,

            })
        }
        );
};

export const setDirectoratesLoading = () => {
    return {
        type: DIRECTORATES_LOADING,
    };
};

export const setDirectorateLoading = () => {
    return {
        type: DIRECTORATE_LOADING
    }
}

export const toggleEditAttModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_EDIT_DIRECTORATE_MODAL,
        payload: data
    });
};

export const toggleViewAttModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_VIEW_DIRECTORATE_MODAL,
        payload: id
    });
};