import {
    GET_MINISTRY_ARMS,
    GET_MINISTRY_ARM,
    ADD_MINISTRY_ARM,
    ADD_MA_SUCCESS,
    ADD_MA_FAIL,
    DELETE_MINISTRY_ARM,
    DELETE_MA_SUCCESS,
    DELETE_MA_FAIL,
    EDIT_MINISTRY_ARM,
    EDIT_MA_SUCCESS,
    EDIT_MA_FAIL,

    MINISTRY_ARMS_LOADING,
    MINISTRY_ARM_LOADING,
    TOGGLE_EDIT_MA_MODAL,
    TOGGLE_VIEW_MA_MODAL,

    RESET_ADD_MA,
    RESET_EDIT_MA,
    RESET_DELETE_MA,


} from "../actions/types";

const initialState = {
    ministryArm: [],
    ministryArms: [],
    loading: false,
    ministryArm_loading: false,

    isEditDirectorateModalOpen: false,
    isViewDirectorateModalOpen: false,

    editDirectorateSuccess: false,
    addDirectorateSuccess: false,
    deleteDirectorateSuccess: false,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MINISTRY_ARMS:
            //console.log(action.payload);
            return {
                ...state,
                ministryArms: action.payload,
                loading: false,
            };

        case DELETE_MINISTRY_ARM:
            return {
                ...state,
                ministryArms: state.ministryArms.filter(
                    (ministryArm) => ministryArm._id !== action.payload
                ),
            };

        case ADD_MINISTRY_ARM:
            return {
                ...state,
                ministryArms: [action.payload, ...state.ministryArms],
            };

        case EDIT_MINISTRY_ARM:
            return {
                ...state,
                ministryArms: [
                    action.payload,
                    ...state.ministryArms.filter(
                        (ministryArm) => ministryArm._id != action.payload._id
                    )],

            };

        case GET_MINISTRY_ARM:
            console.log("action.payload", action.payload);
            return {
                ...state,
                ministryArm: state.ministryArms.filter(
                    (ministryArm) => ministryArm.id == action.payload
                ),
                ministryArm_loading: false,
            };

        case MINISTRY_ARMS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case MINISTRY_ARM_LOADING:
            return {
                ...state,
                ministryArm_loading: true
            }

        case TOGGLE_EDIT_MA_MODAL:
            return {
                ...state,
                isEditDirectorateModalOpen: !state.isEditDirectorateModalOpen
            }

        case TOGGLE_VIEW_MA_MODAL:
            return {
                ...state,
                isViewDirectorateModalOpen: !state.isViewDirectorateModalOpen
            }

        case ADD_MA_SUCCESS:
            return {
                ...state,
                ...action.payload,
                addDirectorateSuccess: true
            }

        case ADD_MA_FAIL:
            return {
                ...state,
                ...action.payload,
                addDirectorateSuccess: false
            }

        case DELETE_MA_SUCCESS:
            return {
                ...state,
                ...action.payload,
                deleteDirectorateSuccess: true
            }

        case DELETE_MA_FAIL:
            return {
                ...state,
                ...action.payload,
                deleteDirectorateSuccess: false
            }

        case EDIT_MA_SUCCESS:
            return {
                ...state,
                ...action.payload,
                editDirectorateSuccess: true
            }

        case EDIT_MA_FAIL:
            return {
                ...state,
                ...action.payload,
                editDirectorateSuccess: false
            }

        case RESET_ADD_MA:
            return {
                ...state,
                ...action.payload,
                addDirectorateSuccess: false
            }

        case RESET_EDIT_MA:
            return {
                ...state,
                ...action.payload,
                editDirectorateSuccess: false
            }

        case RESET_DELETE_MA:
            return {
                ...state,
                ...action.payload,
                deleteDirectorateSuccess: false
            }

        default:
            return state;
    }
}
