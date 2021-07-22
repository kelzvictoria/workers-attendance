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
} from "../actions/types";

const initialState = {
    workers: [],
    worker: [],
    workers_loading: false,
    worker_loading: false,
    isEditStudentModalOpen: false,
    isViewStudentModalOpen: false,
    editStudentSuccess: false,
    restoreStudentSuccess: false,
    deleteStudentSuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case WORKERS_LOADING:
            return {
                ...state,
                workers_loading: true
            }

        case WORKER_LOADING:
            return {
                ...state,
                worker_loading: true
            }

        case GET_WORKERS:
            return {
                ...state,
                workers: action.payload,
                workers_loading: false
            }

        case GET_WORKER:
            console.log("action.payload", action.payload);
            console.log("state.workers", state.workers);
            return {
                ...state,
                worker: state.workers.filter(worker => worker.id == action.payload),
                worker_loading: false
            }

        case EDIT_WORKER:
        case RESTORE_WORKER:
            console.log("action.payload.id", action.payload.id);
            return {
                ...state,
                workers: [
                    action.payload,
                    ...state.workers.filter(
                        (worker) => worker.id != action.payload.id
                    )
                ]
            }

        case DELETE_WORKER:
            return {
                ...state,
                workers: state.workers.filter(
                    (stud) => stud._id !== action.payload
                ),
            };

        case TOOGLE_EDIT_WORKER_MODAL:
            return {
                ...state,
                isEditStudentModalOpen: !state.isEditStudentModalOpen
            }

        case TOOGLE_VIEW_WORKER_MODAL:
            return {
                ...state,
                isViewStudentModalOpen: !state.isViewStudentModalOpen
            }

        case EDIT_WORKER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                editStudentSuccess: true
            }

        case EDIT_WORKER_FAIL:
            return {
                ...state,
                ...action.payload,
                editStudentSuccess: false
            }

        case RESTORE_WORKER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                restoreStudentSuccess: true
            }

        case RESTORE_WORKER_FAIL:
            return {
                ...state,
                ...action.payload,
                restoreStudentSuccess: false
            }

        case DELETE_WORKER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                deleteStudentSuccess: true
            }

        case DELETE_WORKER_FAIL:
            return {
                ...state,
                ...action.payload,
                deleteStudentSuccess: false
            }

        case RESET_EDIT_WORKER:
            return {
                ...state,
                ...action.payload,
                editStudentSuccess: false
            }

        case RESET_RESTORE_WORKER:
            return {
                ...state,
                ...action.payload,
                restoreStudentSuccess: false
            }

        case RESET_DELETE_WORKER:
            return {
                ...state,
                ...action.payload,
                deleteStudentSuccess: false
            }


        default:
            return state

    }
}