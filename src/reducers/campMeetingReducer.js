import {
  GET_CAMP_MEETINGS,
  GET_CAMP_MEETING,
  ADD_CAMP_MEETING,
  ADD_CM_SUCCESS,
  ADD_CM_FAIL,
  DELETE_CAMP_MEETING,
  DELETE_CM_SUCCESS,
  DELETE_CM_FAIL,
  EDIT_CAMP_MEETING,
  EDIT_CM_SUCCESS,
  EDIT_CM_FAIL,
  CAMP_MEETINGS_LOADING,
  CAMP_MEETING_LOADING,
  TOGGLE_EDIT_CM_MODAL,
  TOGGLE_VIEW_CM_MODAL,
  RESET_ADD_CM,
  RESET_EDIT_CM,
  RESET_DELETE_CM,
} from "../actions/types";

const initialState = {
  campMeeting: [],
  campMeetings: [],
  loading: false,
  campMeeting_loading: false,

  isEditCMModalOpen: false,
  isViewCMModalOpen: false,

  editCMSuccess: false,
  addCMSuccess: false,
  deleteCMSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CAMP_MEETINGS:
      //console.log(action.payload);
      return {
        ...state,
        campMeetings: action.payload,
        loading: false,
      };

    case DELETE_CAMP_MEETING:
      return {
        ...state,
        campMeetings: state.campMeetings.filter(
          (campMeeting) => campMeeting._id !== action.payload
        ),
      };

    case ADD_CAMP_MEETING:
      return {
        ...state,
        campMeetings: [action.payload, ...state.campMeetings],
      };

    case EDIT_CAMP_MEETING:
      return {
        ...state,
        campMeetings: [
          action.payload,
          ...state.campMeetings.filter(
            (campMeeting) => campMeeting._id != action.payload._id
          ),
        ],
      };

    case GET_CAMP_MEETING:
      console.log("action.payload", action.payload);
      return {
        ...state,
        campMeeting: state.campMeetings.filter(
          (campMeeting) => campMeeting.id == action.payload
        ),
        campMeeting_loading: false,
      };

    case CAMP_MEETINGS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CAMP_MEETING_LOADING:
      return {
        ...state,
        campMeeting_loading: true,
      };

    case TOGGLE_EDIT_CM_MODAL:
      return {
        ...state,
        isEditCMModalOpen: !state.isEditCMModalOpen,
      };

    case TOGGLE_VIEW_CM_MODAL:
      return {
        ...state,
        isViewCMModalOpen: !state.isViewCMModalOpen,
      };

    case ADD_CM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addCMSuccess: true,
      };

    case ADD_CM_FAIL:
      return {
        ...state,
        ...action.payload,
        addCMSuccess: false,
      };

    case DELETE_CM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteCMSuccess: true,
      };

    case DELETE_CM_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteCMSuccess: false,
      };

    case EDIT_CM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editCMSuccess: true,
      };

    case EDIT_CM_FAIL:
      return {
        ...state,
        ...action.payload,
        editCMSuccess: false,
      };

    case RESET_ADD_CM:
      return {
        ...state,
        ...action.payload,
        addCMSuccess: false,
      };

    case RESET_EDIT_CM:
      return {
        ...state,
        ...action.payload,
        editCMSuccess: false,
      };

    case RESET_DELETE_CM:
      return {
        ...state,
        ...action.payload,
        deleteCMSuccess: false,
      };

    default:
      return state;
  }
}
