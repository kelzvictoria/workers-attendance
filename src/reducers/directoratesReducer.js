import {
    GET_DIRECTORATES,
    GET_DIRECTORATE,
    ADD_DIRECTORATE,
    ADD_DIRECTORATE_SUCCESS,
    ADD_DIRECTORATE_FAIL,
    DELETE_DIRECTORATE,
    DELETE_DIRECTORATE_SUCCESS,
    DELETE_DIRECTORATE_FAIL,
    EDIT_DIRECTORATE,
    EDIT_DIRECTORATE_SUCCESS,
    EDIT_DIRECTORATE_FAIL,

    DIRECTORATES_LOADING,
    DIRECTORATE_LOADING,
    TOGGLE_EDIT_DIRECTORATE_MODAL,
    TOGGLE_VIEW_DIRECTORATE_MODAL,

    RESET_ADD_DIRECTORATE,
    RESET_EDIT_DIRECTORATE,
    RESET_DELETE_DIRECTORATE,


} from "../actions/types";

const initialState = {
    directorate: [],
    directorates: [],
    loading: false,
    directorate_loading: false,

    isEditDirectorateModalOpen: false,
    isViewDirectorateModalOpen: false,

    editDirectorateSuccess: false,
    addDirectorateSuccess: false,
    deleteDirectorateSuccess: false,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DIRECTORATES:
            //console.log(action.payload);
            return {
                ...state,
                directorates: action.payload,
                loading: false,
            };

        case DELETE_DIRECTORATE:
            return {
                ...state,
                directorates: state.directorates.filter(
                    (directorate) => directorate._id !== action.payload
                ),
            };

        case ADD_DIRECTORATE:
            return {
                ...state,
                directorates: [action.payload, ...state.directorates],
            };

        case EDIT_DIRECTORATE:
            return {
                ...state,
                directorates: [
                    action.payload,
                    ...state.directorates.filter(
                        (directorate) => directorate._id != action.payload._id
                    )],

            };

        case GET_DIRECTORATE:
            console.log("action.payload", action.payload);
            return {
                ...state,
                directorate: state.directorates.filter(
                    (directorate) => directorate.id == action.payload
                ),
                directorate_loading: false,
            };

        case DIRECTORATES_LOADING:
            return {
                ...state,
                loading: true,
            };

        case DIRECTORATE_LOADING:
            return {
                ...state,
                directorate_loading: true
            }

        case TOGGLE_EDIT_DIRECTORATE_MODAL:
            return {
                ...state,
                isEditDirectorateModalOpen: !state.isEditDirectorateModalOpen
            }

        case TOGGLE_VIEW_DIRECTORATE_MODAL:
            return {
                ...state,
                isViewDirectorateModalOpen: !state.isViewDirectorateModalOpen
            }

        case ADD_DIRECTORATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                addDirectorateSuccess: true
            }

        case ADD_DIRECTORATE_FAIL:
            return {
                ...state,
                ...action.payload,
                addDirectorateSuccess: false
            }

        case DELETE_DIRECTORATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                deleteDirectorateSuccess: true
            }

        case DELETE_DIRECTORATE_FAIL:
            return {
                ...state,
                ...action.payload,
                deleteDirectorateSuccess: false
            }

        case EDIT_DIRECTORATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                editDirectorateSuccess: true
            }

        case EDIT_DIRECTORATE_FAIL:
            return {
                ...state,
                ...action.payload,
                editDirectorateSuccess: false
            }

        case RESET_ADD_DIRECTORATE:
            return {
                ...state,
                ...action.payload,
                addDirectorateSuccess: false
            }

        case RESET_EDIT_DIRECTORATE:
            return {
                ...state,
                ...action.payload,
                editDirectorateSuccess: false
            }

        case RESET_DELETE_DIRECTORATE:
            return {
                ...state,
                ...action.payload,
                deleteDirectorateSuccess: false
            }

        default:
            return state;
    }
}
