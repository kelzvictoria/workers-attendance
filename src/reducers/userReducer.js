import {
    GET_USERS,
    GET_USER,
    EDIT_USER,
    DELETE_USER,
    USERS_LOADING,
    USER_LOADING,
    TOGGLE_EDIT_USER_MODAL,
    TOGGLE_VIEW_USER_MODAL,

    GET_USER_ROLES,
    RESET_EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    RESET_DELETE_USER,

    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER,
} from "../actions/types";

const initialState = {
    user: [],
    users: [],
    loading: false,
    user_loading: false,
    isEditUserModalOpen: false,
    isViewUserModalOpen: false,
    addUserSuccess: false,
    editUserSuccess: false,
    deleteUserSuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case REGISTER_SUCCESS:
            console.log("state", state);
            console.log("action.payload", action.payload);
            return {
                ...state,
                users: [
                    action.payload, ...state.users
                ],
                registerSuccess: true
            }

        //   case RESET_REGISTER_SUCCESS:
        //     return {
        //       ...state,
        //       ...action.payload,
        //       registerSuccess: false
        //     }

        case REGISTER_FAIL:
        case RESET_REGISTER:
            return {
                ...state,
                ...action.payload,
                registerSuccess: false
            }

        case GET_USERS:
            //console.log("action.payload", action.payload);
            return {
                ...state,
                users: action.payload,
                loading: false,
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user._id !== action.payload
                ),
            };

        // case ADD_USER:
        //     return {
        //         ...state,
        //         users: [action.payload, ...state.users],
        //     };

        case EDIT_USER:
            return {
                ...state,
                users: [
                    action.payload,
                    ...state.users.filter(
                        (user) => user._id != action.payload._id
                    )]
            };

        case GET_USER:
            return {
                ...state,
                user: state.users.filter(
                    (user) => user._id == action.payload
                ),
                user_loading: false
            }

        case USERS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case USER_LOADING:
            return {
                ...state,
                user_loading: true
            }

        case TOGGLE_EDIT_USER_MODAL:
            return {
                ...state,
                isEditUserModalOpen: !state.isEditUserModalOpen
            }

        case TOGGLE_VIEW_USER_MODAL:
            return {
                ...state,
                isViewUserModalOpen: !state.isViewUserModalOpen
            }

        case GET_USER_ROLES:
            return {
                ...state,
                roles: action.payload,
            };

        // case ADD_USER_SUCCESS:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         addUserSuccess: true
        //     }

        // case ADD_USER_FAIL:
        // case RESET_ADD_USER:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         addUserSuccess: false
        //     }

        case EDIT_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                editUserSuccess: true
            }

        case EDIT_USER_FAIL:
        case RESET_EDIT_USER:
            return {
                ...state,
                ...action.payload,
                editUserSuccess: false
            }

        case DELETE_USER_SUCCESS:

            return {
                ...state,
                ...action.payload,
                deleteUserSuccess: true
            }

        case DELETE_USER_FAIL:
        case RESET_DELETE_USER:
            return {
                ...state,
                ...action.payload,
                deleteUserSuccess: false
            }



        default:
            return state;
    }
}