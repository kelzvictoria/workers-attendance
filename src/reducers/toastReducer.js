import * as ToastTypes from "../actions/types";

const initialState = {
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ToastTypes.SHOW_ADD_ATT_SUCCESS_TOAST:
    case ToastTypes.SHOW_EDIT_ATT_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_ATT_SUCCESS_TOAST:
    case ToastTypes.SHOW_ADD_ATT_FAIL_TOAST:
    case ToastTypes.SHOW_EDIT_ATT_FAIL_TOAST:
    case ToastTypes.SHOW_DELETE_ATT_FAIL_TOAST:

    case ToastTypes.SHOW_ADD_CM_SUCCESS_TOAST:
    case ToastTypes.SHOW_EDIT_CM_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_CM_SUCCESS_TOAST:
    case ToastTypes.SHOW_ADD_CM_FAIL_TOAST:
    case ToastTypes.SHOW_EDIT_CM_FAIL_TOAST:
    case ToastTypes.SHOW_DELETE_CM_FAIL_TOAST:

    case ToastTypes.SHOW_ADD_CM_REG_SUCCESS_TOAST:
    case ToastTypes.SHOW_EDIT_CM_REG_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_CM_REG_SUCCESS_TOAST:
    case ToastTypes.SHOW_ADD_CM_REG_FAIL_TOAST:
    case ToastTypes.SHOW_EDIT_CM_REG_FAIL_TOAST:
    case ToastTypes.SHOW_DELETE_CM_REG_FAIL_TOAST:

    case ToastTypes.SHOW_ADD_USER_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_USER_SUCCESS_TOAST:
    case ToastTypes.SHOW_EDIT_USER_SUCCESS_TOAST:
    case ToastTypes.SHOW_ADD_WORKER_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_WORKER_SUCCESS_TOAST:
    case ToastTypes.SHOW_EDIT_WORKER_SUCCESS_TOAST:
    case ToastTypes.SHOW_SUCCESS_TOAST:
    case ToastTypes.SHOW_FAIL_TOAST:
    case ToastTypes.SHOW_RESTORE_WORKER_SUCCESS_TOAST:
    case ToastTypes.SHOW_RESTORE_WORKER_FAIL_TOAST:
    case ToastTypes.SHOW_ADD_MA_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_MA_SUCCESS_TOAST:
    case ToastTypes.SHOW_ADD_DIRECTORATE_SUCCESS_TOAST:
    case ToastTypes.SHOW_DELETE_DIRECTORATE_SUCCESS_TOAST:
      console.log("action.payload", action.payload);
      return {
        list: [action.payload],
      };

    default:
      return state;
  }
}
