import { combineReducers } from "redux";
import attendanceReducer from "./attendanceReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import actionsButtonReducer from "./actionsButtonReducer";
import userReducer from "./userReducer";
import workerReducer from "./workerReducer";
import ministryArmReducer from "./ministryArmReducer";
import directoratesReducer from "./directoratesReducer";
import toastReducer from "./toastReducer";
import fetchDataReducer from "./fetchDataReducer";
import campMeetingReducer from "./campMeetingReducer";

export default combineReducers({
  // attendance: attendanceReducer,
  error: errorReducer,
  auth: authReducer,
  actionsBtn: actionsButtonReducer,
  user: userReducer,
  // worker: workerReducer,
  // ministryArm: ministryArmReducer,
  // directorate: directoratesReducer,
  toast: toastReducer,
  fetchData: fetchDataReducer,
  // campMeetingReducer,
});
