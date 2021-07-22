import {
  GET_ATTENDANCES,
  GET_ATTENDANCE,
  ADD_ATTENDANCE,
  ADD_ATT_SUCCESS,
  ADD_ATT_FAIL,
  DELETE_ATTENDANCE,
  DELETE_ATT_SUCCESS,
  DELETE_ATT_FAIL,
  EDIT_ATTENDANCE,
  EDIT_ATT_SUCCESS,
  EDIT_ATT_FAIL,

  ATTENDANCES_LOADING,
  ATTENDANCE_LOADING,
  TOGGLE_EDIT_ATT_MODAL,
  TOGGLE_VIEW_ATT_MODAL,

  RESET_ADD_ATT,
  RESET_EDIT_ATT,
  RESET_DELETE_ATT,


} from "../actions/types";

const initialState = {
  attendance: [],
  attendances: [],
  loading: false,
  attendance_loading: false,

  isEditAttModalOpen: false,
  isViewAttModalOpen: false,

  editAttSuccess: false,
  addAttSuccess: false,
  deleteAttSuccess: false,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ATTENDANCES:
      //console.log(action.payload);
      return {
        ...state,
        attendances: action.payload,
        loading: false,
      };

    case DELETE_ATTENDANCE:
      return {
        ...state,
        attendances: state.attendances.filter(
          (attendance) => attendance._id !== action.payload
        ),
      };

    case ADD_ATTENDANCE:
      return {
        ...state,
        attendances: [action.payload, ...state.attendances],
      };

    case EDIT_ATTENDANCE:
      return {
        ...state,
        attendances: [
          action.payload,
          ...state.attendances.filter(
            (attendance) => attendance._id != action.payload._id
          )],

      };

    case GET_ATTENDANCE:
      console.log("action.payload", action.payload);
      return {
        ...state,
        attendance: state.attendances.filter(
          (attendance) => attendance.id == action.payload
        ),
        attendance_loading: false,
      };

    case ATTENDANCES_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ATTENDANCE_LOADING:
      return {
        ...state,
        attendance_loading: true
      }

    case TOGGLE_EDIT_ATT_MODAL:
      return {
        ...state,
        isEditAttModalOpen: !state.isEditAttModalOpen
      }

    case TOGGLE_VIEW_ATT_MODAL:
      return {
        ...state,
        isViewAttModalOpen: !state.isViewAttModalOpen
      }

    case ADD_ATT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addAttSuccess: true
      }

    case ADD_ATT_FAIL:
      return {
        ...state,
        ...action.payload,
        addAttSuccess: false
      }

    case DELETE_ATT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteAttSuccess: true
      }

    case DELETE_ATT_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteAttSuccess: false
      }

    case EDIT_ATT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editAttSuccess: true
      }

    case EDIT_ATT_FAIL:
      return {
        ...state,
        ...action.payload,
        editAttSuccess: false
      }

    case RESET_ADD_ATT:
      return {
        ...state,
        ...action.payload,
        addAttSuccess: false
      }

    case RESET_EDIT_ATT:
      return {
        ...state,
        ...action.payload,
        editAttSuccess: false
      }

    case RESET_DELETE_ATT:
      return {
        ...state,
        ...action.payload,
        deleteAttSuccess: false
      }

    default:
      return state;
  }
}
