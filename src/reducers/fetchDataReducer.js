import {
  GET_ATTENDANCES,
  GET_ATTENDANCE,
  ADD_ATTENDANCE,
  DELETE_ATTENDANCE,
  EDIT_ATTENDANCE,
  ATTENDANCES_LOADING,
  ATTENDANCE_LOADING,
  TOGGLE_EDIT_ATT_MODAL,
  TOGGLE_VIEW_ATT_MODAL,
  ADD_ATT_SUCCESS,
  ADD_ATT_FAIL,
  RESET_ADD_ATT,
  RESET_EDIT_ATT,
  RESET_DELETE_ATT,
  DELETE_ATT_SUCCESS,
  DELETE_ATT_FAIL,
  EDIT_ATT_SUCCESS,
  EDIT_ATT_FAIL,
  GET_CAMP_MEETINGS,
  GET_CAMP_MEETING,
  ADD_CAMP_MEETING,
  DELETE_CAMP_MEETING,
  EDIT_CAMP_MEETING,
  CAMP_MEETINGS_LOADING,
  CAMP_MEETING_LOADING,
  TOGGLE_EDIT_CM_MODAL,
  TOGGLE_VIEW_CM_MODAL,
  ADD_CM_SUCCESS,
  ADD_CM_FAIL,
  RESET_ADD_CM,
  RESET_EDIT_CM,
  RESET_DELETE_CM,
  DELETE_CM_SUCCESS,
  DELETE_CM_FAIL,
  EDIT_CM_SUCCESS,
  EDIT_CM_FAIL,
  GET_CAMP_MEETING_REGS,
  GET_CAMP_MEETING_REG,
  ADD_CAMP_MEETING_REG,
  DELETE_CAMP_MEETING_REG,
  EDIT_CAMP_MEETING_REG,
  CAMP_MEETING_REGS_LOADING,
  CAMP_MEETING_REG_LOADING,
  TOGGLE_EDIT_CM_REG_MODAL,
  TOGGLE_VIEW_CM_REG_MODAL,
  ADD_CM_REG_SUCCESS,
  ADD_CM_REG_FAIL,
  RESET_ADD_CM_REG,
  RESET_EDIT_CM_REG,
  RESET_DELETE_CM_REG,
  DELETE_CM_REG_SUCCESS,
  DELETE_CM_REG_FAIL,
  EDIT_CM_REG_SUCCESS,
  EDIT_CM_REG_FAIL,
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
  GET_MINISTRY_ARMS,
  GET_MINISTRY_ARM,
  ADD_MINISTRY_ARM,
  DELETE_MINISTRY_ARM,
  EDIT_MINISTRY_ARM,
  MINISTRY_ARMS_LOADING,
  MINISTRY_ARM_LOADING,
  TOGGLE_EDIT_MA_MODAL,
  TOGGLE_VIEW_MA_MODAL,
  ADD_MA_SUCCESS,
  ADD_MA_FAIL,
  RESET_ADD_MA,
  RESET_EDIT_MA,
  RESET_DELETE_MA,
  DELETE_MA_SUCCESS,
  DELETE_MA_FAIL,
  EDIT_MA_SUCCESS,
  EDIT_MA_FAIL,
  GET_WORKERS,
  GET_WORKER,
  ADD_WORKER,
  EDIT_WORKER,
  RESTORE_WORKER,
  DELETE_WORKER,
  WORKERS_LOADING,
  WORKER_LOADING,
  TOOGLE_EDIT_WORKER_MODAL,
  TOOGLE_VIEW_WORKER_MODAL,
  ADD_WORKER_SUCCESS,
  ADD_WORKER_FAIL,
  EDIT_WORKER_SUCCESS,
  EDIT_WORKER_FAIL,
  RESTORE_WORKER_SUCCESS,
  RESTORE_WORKER_FAIL,
  DELETE_WORKER_SUCCESS,
  DELETE_WORKER_FAIL,
  RESET_ADD_WORKER,
  RESET_EDIT_WORKER,
  RESET_DELETE_WORKER,
  RESET_RESTORE_WORKER,
} from "../actions/types";

const initialState = {
  attendance: [],
  attendances: [],
  attendance_loading: false,

  isEditAttModalOpen: false,
  isViewAttModalOpen: false,

  editAttSuccess: false,
  addAttSuccess: false,
  deleteAttSuccess: false,

  campMeeting: [],
  campMeetings: [],
  campMeeting_loading: false,

  isEditCMModalOpen: false,
  isViewCMModalOpen: false,

  editCMSuccess: false,
  addCMSuccess: false,
  deleteCMSuccess: false,

  campMeetingRegs: [],
  campMeetingReg: [],
  campMeetingReg_loading: false,

  isEditCMRegModalOpen: false,
  isViewCMRegModalOpen: false,

  editCMRegSuccess: false,
  addCMRegSuccess: false,
  deleteCMRegSuccess: false,

  directorate: [],
  directorates: [],
  directorate_loading: false,
  directorate_ministries: [],

  ministryArm: [],
  ministryArms: [],
  loading: false,
  ministryArm_loading: false,
  ministry_arm_workers: [],

  isEditDirectorateModalOpen: false,
  isViewDirectorateModalOpen: false,

  editDirectorateSuccess: false,
  addDirectorateSuccess: false,
  deleteDirectorateSuccess: false,

  //

  isEditMAModalOpen: false,
  isViewMAModalOpen: false,

  editMASuccess: false,
  addMASuccess: false,
  deleteMASuccess: false,

  //
  workers: [],
  worker: [],
  workers_loading: false,
  worker_loading: false,
  isEditWorkerModalOpen: false,
  isViewWorkerModalOpen: false,
  addWorkerSuccess: false,
  editWorkerSuccess: false,
  restoreWorkerSuccess: false,
  deleteWorkerSuccess: false,
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
          ),
        ],
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
        attendance_loading: true,
      };

    case TOGGLE_EDIT_ATT_MODAL:
      return {
        ...state,
        isEditAttModalOpen: !state.isEditAttModalOpen,
      };

    case TOGGLE_VIEW_ATT_MODAL:
      return {
        ...state,
        isViewAttModalOpen: !state.isViewAttModalOpen,
      };

    case ADD_ATT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addAttSuccess: true,
      };

    case ADD_ATT_FAIL:
      return {
        ...state,
        ...action.payload,
        addAttSuccess: false,
      };

    case DELETE_ATT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteAttSuccess: true,
      };

    case DELETE_ATT_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteAttSuccess: false,
      };

    case EDIT_ATT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editAttSuccess: true,
      };

    case EDIT_ATT_FAIL:
      return {
        ...state,
        ...action.payload,
        editAttSuccess: false,
      };

    case RESET_ADD_ATT:
      return {
        ...state,
        ...action.payload,
        addAttSuccess: false,
      };

    case RESET_EDIT_ATT:
      return {
        ...state,
        ...action.payload,
        editAttSuccess: false,
      };

    case RESET_DELETE_ATT:
      return {
        ...state,
        ...action.payload,
        deleteAttSuccess: false,
      };

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

    case GET_CAMP_MEETING_REGS:
      //console.log(action.payload);
      return {
        ...state,
        campMeetingRegs: action.payload,
        loading: false,
      };

    case DELETE_CAMP_MEETING_REG:
      console.log("state.campMeetingReg", state.campMeetingReg);
      return {
        ...state,
        campMeetingRegs: state.campMeetingRegs.filter(
          (campMeetingReg) =>
            campMeetingReg.worker_details._id !== action.payload
        ),
      };

    case ADD_CAMP_MEETING_REG:
      return {
        ...state,
        campMeetingReg: [action.payload, ...state.campMeetingReg],
      };

    case EDIT_CAMP_MEETING_REG:
      return {
        ...state,
        campMeetingReg: [
          action.payload,
          ...state.campMeetingReg.filter(
            (campMeetingReg) => campMeetingReg._id != action.payload._id
          ),
        ],
      };

    case GET_CAMP_MEETING_REG:
      console.log("action.payload", action.payload);
      return {
        ...state,
        campMeetingReg: state.campMeetingReg.filter(
          (campMeetingReg) => campMeetingReg.id == action.payload
        ),
        campMeetingReg_loading: false,
      };

    case CAMP_MEETING_REGS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CAMP_MEETING_REG_LOADING:
      return {
        ...state,
        campMeetingReg_loading: true,
      };

    case TOGGLE_EDIT_CM_REG_MODAL:
      return {
        ...state,
        isEditCMRegModalOpen: !state.isEditCMRegModalOpen,
      };

    case TOGGLE_VIEW_CM_REG_MODAL:
      return {
        ...state,
        isViewCMRegModalOpen: !state.isViewCMRegModalOpen,
      };

    case ADD_CM_REG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addCMRegSuccess: true,
      };

    case ADD_CM_REG_FAIL:
      return {
        ...state,
        ...action.payload,
        addCMRegSuccess: false,
      };

    case DELETE_CM_REG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteCMRegSuccess: true,
      };

    case DELETE_CM_REG_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteCMRegSuccess: false,
      };

    case EDIT_CM_REG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editCMRegSuccess: true,
      };

    case EDIT_CM_REG_FAIL:
      return {
        ...state,
        ...action.payload,
        editCMRegSuccess: false,
      };

    case RESET_ADD_CM_REG:
      return {
        ...state,
        ...action.payload,
        addCMRegSuccess: false,
      };

    case RESET_EDIT_CM_REG:
      return {
        ...state,
        ...action.payload,
        editCMRegSuccess: false,
      };

    case RESET_DELETE_CM_REG:
      return {
        ...state,
        ...action.payload,
        deleteCMRegSuccess: false,
      };

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
          ),
        ],
      };

    case GET_DIRECTORATE:
      console.log("action.payload", action.payload);
      let directorate = state.directorates.filter(
        (d) => d._id === action.payload
      );

      console.log("directorate", directorate);

      let directorate_name = directorate[0].name;
      console.log("directorate_name", directorate_name);
      console.log("state.ministryArms", state.ministryArms);
      let directorate_ministries = state.ministryArms.filter(
        (m) => m.directorate_details.name === directorate_name
      );

      for (let i = 0; i < directorate_ministries.length; i++) {
        directorate_ministries[i].workers = state.workers.filter((w) =>
          w.ministry_arm.includes(directorate_ministries[i].name)
        );
      }

      console.log("directorate_ministries", directorate_ministries);

      return {
        ...state,
        directorate: directorate,
        directorate_loading: false,
        directorate_ministries: directorate_ministries,
      };

    case DIRECTORATES_LOADING:
      return {
        ...state,
        loading: true,
      };

    case DIRECTORATE_LOADING:
      return {
        ...state,
        directorate_loading: true,
      };

    case TOGGLE_EDIT_DIRECTORATE_MODAL:
      return {
        ...state,
        isEditDirectorateModalOpen: !state.isEditDirectorateModalOpen,
      };

    case TOGGLE_VIEW_DIRECTORATE_MODAL:
      return {
        ...state,
        isViewDirectorateModalOpen: !state.isViewDirectorateModalOpen,
      };

    case ADD_DIRECTORATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addDirectorateSuccess: true,
      };

    case ADD_DIRECTORATE_FAIL:
      return {
        ...state,
        ...action.payload,
        addDirectorateSuccess: false,
      };

    case DELETE_DIRECTORATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteDirectorateSuccess: true,
      };

    case DELETE_DIRECTORATE_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteDirectorateSuccess: false,
      };

    case EDIT_DIRECTORATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editDirectorateSuccess: true,
      };

    case EDIT_DIRECTORATE_FAIL:
      return {
        ...state,
        ...action.payload,
        editDirectorateSuccess: false,
      };

    case RESET_ADD_DIRECTORATE:
      return {
        ...state,
        ...action.payload,
        addDirectorateSuccess: false,
      };

    case RESET_EDIT_DIRECTORATE:
      return {
        ...state,
        ...action.payload,
        editDirectorateSuccess: false,
      };

    case RESET_DELETE_DIRECTORATE:
      return {
        ...state,
        ...action.payload,
        deleteDirectorateSuccess: false,
      };

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
          ),
        ],
      };

    case GET_MINISTRY_ARM:
      console.log("action.payload", action.payload);
      let ministry_arm = state.ministryArms.filter(
        (ministryArm) => ministryArm._id == action.payload
      );
      console.log("ministry_arm", ministry_arm);
      let ministry_arm_name = ministry_arm[0].name;
      console.log("ministry_arm_name", ministry_arm_name);
      console.log("state.workers", state.workers);
      let ministry_arm_workers = state.workers.filter((w) =>
        w.ministry_arm.includes(ministry_arm_name)
      );

      console.log("ministry_arm_workers", ministry_arm_workers);

      return {
        ...state,
        ministryArm: ministry_arm,
        ministryArm_loading: false,
        ministry_arm_workers: ministry_arm_workers,
      };

    case MINISTRY_ARMS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case MINISTRY_ARM_LOADING:
      return {
        ...state,
        ministryArm_loading: true,
      };

    case TOGGLE_EDIT_MA_MODAL:
      return {
        ...state,
        isEditMAModalOpen: !state.isEditMAModalOpen,
      };

    case TOGGLE_VIEW_MA_MODAL:
      return {
        ...state,
        isViewMAModalOpen: !state.isViewMAModalOpen,
      };

    case ADD_MA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addMASuccess: true,
      };

    case ADD_MA_FAIL:
      return {
        ...state,
        ...action.payload,
        addMASuccess: false,
      };

    case DELETE_MA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteMASuccess: true,
      };

    case DELETE_MA_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteMASuccess: false,
      };

    case EDIT_MA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editMASuccess: true,
      };

    case EDIT_MA_FAIL:
      return {
        ...state,
        ...action.payload,
        editMASuccess: false,
      };

    case RESET_ADD_MA:
      return {
        ...state,
        ...action.payload,
        addMASuccess: false,
      };

    case RESET_EDIT_MA:
      return {
        ...state,
        ...action.payload,
        editMASuccess: false,
      };

    case RESET_DELETE_MA:
      return {
        ...state,
        ...action.payload,
        deleteMASuccess: false,
      };

    case WORKERS_LOADING:
      return {
        ...state,
        workers_loading: true,
      };

    case WORKER_LOADING:
      return {
        ...state,
        worker_loading: true,
      };

    case GET_WORKERS:
      return {
        ...state,
        workers: action.payload,
        workers_loading: false,
      };

    case GET_WORKER:
      console.log("action.payload", action.payload);
      console.log("state.workers", state.workers);
      return {
        ...state,
        worker: state.workers.filter((worker) => worker._id == action.payload),
        worker_loading: false,
      };

    case ADD_WORKER:
      return {
        ...state,
        workers: [action.payload, ...state.workers],
      };

    case EDIT_WORKER:
    case RESTORE_WORKER:
      console.log("action.payload.id", action.payload.id);
      return {
        ...state,
        workers: [
          action.payload,
          ...state.workers.filter((worker) => worker.id != action.payload.id),
        ],
      };

    case DELETE_WORKER:
      return {
        ...state,
        workers: state.workers.filter((stud) => stud._id !== action.payload),
      };

    case TOOGLE_EDIT_WORKER_MODAL:
      return {
        ...state,
        isEditWorkerModalOpen: !state.isEditWorkerModalOpen,
      };

    case TOOGLE_VIEW_WORKER_MODAL:
      return {
        ...state,
        isViewWorkerModalOpen: !state.isViewWorkerModalOpen,
      };

    case EDIT_WORKER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        editWorkerSuccess: true,
      };

    case EDIT_WORKER_FAIL:
      return {
        ...state,
        ...action.payload,
        editWorkerSuccess: false,
      };

    case RESTORE_WORKER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        restoreWorkerSuccess: true,
      };

    case RESTORE_WORKER_FAIL:
      return {
        ...state,
        ...action.payload,
        restoreWorkerSuccess: false,
      };

    case ADD_WORKER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        addWorkerSuccess: true,
      };

    case ADD_WORKER_FAIL:
      return {
        ...state,
        ...action.payload,
        addWorkerSuccess: false,
      };

    case DELETE_WORKER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        deleteWorkerSuccess: true,
      };

    case DELETE_WORKER_FAIL:
      return {
        ...state,
        ...action.payload,
        deleteWorkerSuccess: false,
      };

    case RESET_ADD_WORKER:
      return {
        ...state,
        ...action.payload,
        addWorkerSuccess: false,
      };

    case RESET_EDIT_WORKER:
      return {
        ...state,
        ...action.payload,
        editWorkerSuccess: false,
      };

    case RESET_RESTORE_WORKER:
      return {
        ...state,
        ...action.payload,
        restoreWorkerSuccess: false,
      };

    case RESET_DELETE_WORKER:
      return {
        ...state,
        ...action.payload,
        deleteWorkerSuccess: false,
      };

    default:
      return state;
  }
}
