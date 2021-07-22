import * as ToastTypes from "../actions/types";
import { showToast } from "../components/toast/utils"

export const showAddAttSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_ATT_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Attendance has been recorded successfully."),

    })
}

export const showEditAttSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_ATT_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Attendance has been updated successfully."),
    })
}

export const showDeleteAttSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_ATT_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Attendance has been deleted successfully."),

    })
}

export const showAddAttFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_ATT_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showEditAttFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_ATT_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showDeleteAttFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_ATT_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showAddUserSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_USER_SUCCESS_TOAST,
        payload: showToast("success", "Success", "User has been added successfully."),
    })
}

export const showAddUserFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_USER_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),
    })
}

export const showDeleteUserSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_USER_SUCCESS_TOAST,
        payload: showToast("success", "Success", "User has been deleted successfully."),
    })
}

export const showDeleteUserFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_USER_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),
    })
}

export const showEditUserSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_USER_SUCCESS_TOAST,
        payload: showToast("success", "Success", "User has been updated successfully."),
    })
}

export const showEditUserFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_USER_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),
    })
}

export const showEditWorkerSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_WORKER_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Worker has been updated successfully."),
    })
}

export const showEditWorkerFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_WORKER_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showFailToast = (error) => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_FAIL_TOAST,
        payload: showToast("danger", "Error", error),

    })
}

export const showSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_SUCCESS_TOAST,
        payload: showToast("success", "Action completed successfully."),

    })
}

export const showRestoreWorkerSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_RESTORE_WORKER_SUCCESS_TOAST,
        payload: showToast("success", "Worker restored successfully."),

    })
}

export const showRestoreWorkerFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_RESTORE_WORKER_FAIL_TOAST,
        payload: showToast("success", "An error occurred."),

    })
}

export const showAddWorkerSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_WORKER_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Worker has been added successfully."),

    })
}

// export const showEditWorkerSuccessToast = () => (dispatch, getState) => {
//     dispatch({
//         type: ToastTypes.SHOW_EDIT_WORKER_SUCCESS_TOAST,
//         payload: showToast("success", "Success", "Worker details has been updated successfully."),
//     })
// }

export const showDeleteWorkerSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_WORKER_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Worker has been deleted successfully."),

    })
}

export const showAddWorkerFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_WORKER_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

// export const showEditWorkerFailToast = () => (dispatch, getState) => {
//     dispatch({
//         type: ToastTypes.SHOW_EDIT_WORKER_FAIL_TOAST,
//         payload: showToast("danger", "Error", "An error occured"),

//     })
// }

export const showDeleteWorkerFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_WORKER_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

//

export const showRestoreMASuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_RESTORE_MA_SUCCESS_TOAST,
        payload: showToast("success", "Ministry Arm restored successfully."),

    })
}

export const showRestoreMAFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_RESTORE_MA_FAIL_TOAST,
        payload: showToast("success", "An error occurred."),

    })
}

export const showAddMASuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_MA_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Ministry Arm has been added successfully."),

    })
}

export const showEditMASuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_MA_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Ministry Arm has been updated successfully."),
    })
}

export const showDeleteMASuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_MA_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Ministry has been deleted successfully."),

    })
}

export const showAddMAFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_MA_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showDeleteMAFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_MA_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showEditMAFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_MA_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

//
export const showAddDirectorateSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_DIRECTORATE_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Directorate has been added successfully."),

    })
}

export const showEditDirectorateSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_DIRECTORATE_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Directorate has been updated successfully."),
    })
}

export const showDeleteDirectorateSuccessToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_DIRECTORATE_SUCCESS_TOAST,
        payload: showToast("success", "Success", "Directorate has been deleted successfully."),

    })
}

export const showAddDirectorateFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_ADD_DIRECTORATE_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showDeleteDirectorateFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_DELETE_DIRECTORATE_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}

export const showEditDirectorateFailToast = () => (dispatch, getState) => {
    dispatch({
        type: ToastTypes.SHOW_EDIT_DIRECTORATE_FAIL_TOAST,
        payload: showToast("danger", "Error", "An error occured"),

    })
}
//