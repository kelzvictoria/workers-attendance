import {
    GET_USERS,
    GET_USER,
    //ADD_USER,
    EDIT_USER,
    DELETE_USER,
    USERS_LOADING,
    TOGGLE_EDIT_USER_MODAL,
    TOGGLE_VIEW_USER_MODAL,
    USER_LOADING,
    GET_USER_ROLES,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER,
    RESET_EDIT_USER,
    RESET_DELETE_USER,
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";

const API_Server = process.env.REACT_APP_BASE_URL;

export const register = ({ username, email, role, password }) => (dispatch) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const body = JSON.stringify({ username, email, role, password });
    //console.log("body", body);

    axios
        .post(`${API_Server}/users`, body, config)
        .then((res) =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            console.log("err", err);
            err.response && dispatch(
                returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
            );
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};


export const resetRegister = () => {
    return {
        type: RESET_REGISTER
    }
}

export const resetEditUser = () => {
    return {
        type: RESET_EDIT_USER
    }
}

export const resetDeleteUser = () => {
    return {
        type: RESET_DELETE_USER
    }
}

export const getUsers = () => (dispatch) => {
    dispatch(setUsersLoading());
    axios
        .get(`${API_Server}/users`)
        .then((res) => {
            console.log("res.data", res.data)
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getUser = (id) => (dispatch) => {
    dispatch(setUserLoading());

    dispatch({
        type: GET_USER,
        payload: id
    })
}

export const deleteUser = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/users/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_USER_SUCCESS,
            })
            dispatch({
                type: DELETE_USER,
                payload: id,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_USER_FAIL"));
            dispatch({
                type: DELETE_USER_FAIL
            })
        }
        );
};

export const editUser = (id, user) => (dispatch, getState) => {
    console.log("id", id);
    axios.put(`${API_Server}/users/${id}`, user, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_USER_SUCCESS
            })
            dispatch({
                type: EDIT_USER,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: EDIT_USER_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_USER_FAIL"))
        });
};

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING,
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    };
};

export const toggleEditUserModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_EDIT_USER_MODAL,
        payload: data
    });
};

export const toggleViewUserModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_VIEW_USER_MODAL,
        payload: id
    });
};

export const getUserRoles = () => (dispatch, getState) => {
    // dispatch(setUsersLoading());
    axios
        .get(`${API_Server}/admin/rbac/roles`, tokenConfig(getState))
        .then((res) => {
            console.log("res.data", res.data)
            dispatch({
                type: GET_USER_ROLES,
                payload: res.data.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};