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
    RESET_RESTORE_WORKER,

    ADD_WORKER,
    ADD_WORKER_SUCCESS,
    ADD_WORKER_FAIL,
    RESET_ADD_WORKER
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";
import { string } from "prop-types";

const API_Server = process.env.REACT_APP_BASE_URL;

export const getAttendances = () => async (dispatch, getState) => {
    // dispatch(setAttendancesLoading());
    await dispatch(getWorkers());
    let workers = getState().fetchData.workers;

    let attendances = [];
    console.log("workers", workers);
    axios
        .get(`${API_Server}/attendance`, tokenConfig(getState))
        .then((res) => {
            // console.log("res.data", res.data);
            attendances = res.data;

            // for (let i = 0; i < attendances.length; i++) {
            //     let workerID = attendances[i].worker_id;
            //     //  console.log("workerID", workerID);
            //     let worker_details = workers.filter(w => w._id === workerID);
            //     console.log("worker_details", worker_details);
            //     if (worker_details.length) {
            //         attendances[i]["worker_details"] = worker_details[0];
            //     }

            // }

            dispatch({
                type: GET_ATTENDANCES,
                payload: attendances,
            });
        })
        .catch((err) =>
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const addAttendance = (attendance) => (dispatch, getState) => {
    axios
        .post(`${API_Server}/attendance`, attendance, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_ATTENDANCE,
                payload: res.data,
            })
            dispatch({
                type: ADD_ATT_SUCCESS
            })
        }

        )
        .catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status, "ADD_ATT_FAIL"))
            dispatch({
                type: ADD_ATT_FAIL,
            })
        }
        );
};

export const resetAddAtt = () => {
    return {
        type: RESET_ADD_ATT
    }
}

export const resetEditAtt = () => {
    return {
        type: RESET_EDIT_ATT
    }
}

export const resetDeleteAtt = () => {
    return {
        type: RESET_DELETE_ATT
    }
}

export const deleteAttendance = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/attendance/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_ATTENDANCE,
                payload: id,
            });
            dispatch({
                type: DELETE_ATT_SUCCESS,

            })

        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_ATT_FAIL"))

            dispatch({
                type: DELETE_ATT_FAIL,

            })
        }
        );
};

export const getAttendance = (id) => (dispatch) => {
    dispatch(setAttendanceLoading());

    dispatch({
        type: GET_ATTENDANCE,
        payload: id,
    });
};

export const editAttendance = (id, attendance) => (dispatch, getState) => {
    let formData = new FormData();
    formData.append("name", attendance.name);
    formData.append("abbr", attendance.abbr);
    formData.append("status", attendance.status);
    formData.append("city", attendance.city);
    if (attendance.logo && attendance.logo.name) {
        formData.append("logo",
            attendance.logo,
            attendance.logo.name
        )
    } else if (typeof attendance.logo == string) {
        formData.append("logo", attendance.logo);
    }

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    axios
        .post(`${API_Server}/attendance/${id}`, formData,
            //config,
            tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_ATTENDANCE,
                payload: res.data,
            })
            dispatch({
                type: EDIT_ATT_SUCCESS,

            })

        }

        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_ATT_FAIL"))

            dispatch({
                type: EDIT_ATT_FAIL,

            })
        }
        );
};

export const setAttendancesLoading = () => {
    return {
        type: ATTENDANCES_LOADING,
    };
};

export const setAttendanceLoading = () => {
    return {
        type: ATTENDANCE_LOADING
    }
}

export const toggleEditAttModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_EDIT_ATT_MODAL,
        payload: data
    });
};

export const toggleViewAttModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_VIEW_ATT_MODAL,
        payload: id
    });
};


export const addWorker = (worker) => (dispatch, getState) => {
    axios
        .post(`${API_Server}/workers`, worker, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_WORKER,
                payload: res.data,
            })
            dispatch({
                type: ADD_WORKER_SUCCESS
            })
        }

        )
        .catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status, "ADD_WORKER_FAIL"))
            dispatch({
                type: ADD_WORKER_FAIL,
            })
        }
        );
};

export const getDirectorates = () => (dispatch, getState) => {
    dispatch(setDirectoratesLoading());
    axios
        .get(`${API_Server}/directorates`, tokenConfig(getState))
        .then((res) => {
            // console.log("res.data", res.data);
            dispatch({
                type: GET_DIRECTORATES,
                payload: res.data,
            });
        })
        .catch((err) =>
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const addDirectorate = (directorate) => (dispatch, getState) => {
    axios
        .post(`${API_Server}/directorates`, directorate, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_DIRECTORATE,
                payload: res.data,
            })
            dispatch({
                type: ADD_DIRECTORATE_SUCCESS
            })
        }

        )
        .catch((err) => {

            dispatch(returnErrors(err.response.data, err.response.status, "ADD_DIRECTORATE_FAIL"))
            dispatch({
                type: ADD_DIRECTORATE_FAIL,
            })
        }
        );
};

export const resetAddDirectorate = () => {
    return {
        type: RESET_ADD_DIRECTORATE
    }
}

export const resetEditDirectorate = () => {
    return {
        type: RESET_EDIT_DIRECTORATE
    }
}

export const resetDeleteDirectorate = () => {
    return {
        type: RESET_DELETE_DIRECTORATE
    }
}

export const deleteDirectorate = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/directorates/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_DIRECTORATE,
                payload: id,
            });
            dispatch({
                type: DELETE_DIRECTORATE_SUCCESS,

            })

        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_DIRECTORATE_FAIL"))

            dispatch({
                type: DELETE_DIRECTORATE_FAIL,

            })
        }
        );
};

export const getDirectorate = (id) => (dispatch) => {
    dispatch(setDirectorateLoading());

    dispatch({
        type: GET_DIRECTORATE,
        payload: id,
    });
};

export const editDirectorate = (id, directorate) => (dispatch, getState) => {
    let formData = new FormData();
    formData.append("name", directorate.name);
    formData.append("abbr", directorate.abbr);
    formData.append("status", directorate.status);
    formData.append("city", directorate.city);
    if (directorate.logo && directorate.logo.name) {
        formData.append("logo",
            directorate.logo,
            directorate.logo.name
        )
    } else if (typeof directorate.logo == string) {
        formData.append("logo", directorate.logo);
    }

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    axios
        .post(`${API_Server}/directorates/${id}`, formData,
            //config,
            tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_DIRECTORATE,
                payload: res.data,
            })
            dispatch({
                type: EDIT_DIRECTORATE_SUCCESS,

            })

        }

        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_DIRECTORATE_FAIL"))

            dispatch({
                type: EDIT_DIRECTORATE_FAIL,

            })
        }
        );
};

export const setDirectoratesLoading = () => {
    return {
        type: DIRECTORATES_LOADING,
    };
};

export const setDirectorateLoading = () => {
    return {
        type: DIRECTORATE_LOADING
    }
}

export const toggleEditDirectorateModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_EDIT_DIRECTORATE_MODAL,
        payload: data
    });
};

export const toggleViewDirectorateModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_VIEW_DIRECTORATE_MODAL,
        payload: id
    });
};

export const getMinistryArms = () => (dispatch, getState) => {
    dispatch(setMinistryArmsLoading());
    axios
        .get(`${API_Server}/ministry_arms`, tokenConfig(getState))
        .then((res) => {
            //console.log("res.data", res.data);
            dispatch({
                type: GET_MINISTRY_ARMS,
                payload: res.data,
            });
        })
        .catch((err) =>
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const addMinistryArm = (ministryArm) => (dispatch, getState) => {
    axios
        .post(`${API_Server}/ministry_arms`, ministryArm, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_MINISTRY_ARM,
                payload: res.data,
            })
            dispatch({
                type: ADD_MA_SUCCESS
            })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "ADD_MA_FAIL"))
            dispatch({
                type: ADD_MA_FAIL,
            })
        });
};

export const resetAddMA = () => {
    return {
        type: RESET_ADD_MA
    }
}

export const resetEditMA = () => {
    return {
        type: RESET_EDIT_MA
    }
}

export const resetDeleteMA = () => {
    return {
        type: RESET_DELETE_MA
    }
}

export const deleteMinistryArm = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/ministry_arms/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_MINISTRY_ARM,
                payload: id,
            });
            dispatch({
                type: DELETE_MA_SUCCESS,

            })

        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_MA_FAIL"))

            dispatch({
                type: DELETE_MA_FAIL,

            })
        }
        );
};

export const getMinistryArm = (id) => (dispatch) => {
    dispatch(setMinistryArmLoading());

    dispatch({
        type: GET_MINISTRY_ARM,
        payload: id,
    });
};

export const editMinistryArm = (id, ministryArm) => (dispatch, getState) => {
    let formData = new FormData();
    formData.append("name", ministryArm.name);
    formData.append("abbr", ministryArm.abbr);
    formData.append("status", ministryArm.status);
    formData.append("city", ministryArm.city);
    if (ministryArm.logo && ministryArm.logo.name) {
        formData.append("logo",
            ministryArm.logo,
            ministryArm.logo.name
        )
    } else if (typeof ministryArm.logo == string) {
        formData.append("logo", ministryArm.logo);
    }

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    axios
        .post(`${API_Server}/ministry_arms/${id}`, formData,
            //config,
            tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_MINISTRY_ARM,
                payload: res.data,
            })
            dispatch({
                type: EDIT_MA_SUCCESS,

            })

        }

        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_MA_FAIL"))

            dispatch({
                type: EDIT_MA_FAIL,

            })
        }
        );
};

export const setMinistryArmsLoading = () => {
    return {
        type: MINISTRY_ARMS_LOADING,
    };
};

export const setMinistryArmLoading = () => {
    return {
        type: MINISTRY_ARM_LOADING
    }
}

export const toggleEditMAModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_EDIT_MA_MODAL,
        payload: data
    });
};

export const toggleViewMAModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_VIEW_MA_MODAL,
        payload: id
    });
};
export const setWorkersLoading = () => {
    return {
        type: WORKERS_LOADING
    }
}

export const setWorkerLoading = () => {
    return {
        type: WORKER_LOADING
    }
}

export const getWorkers = () => async (dispatch, getState) => {
    dispatch(setWorkersLoading());
    await axios.get(
        `${API_Server}/workers`, tokenConfig(getState)
    ).then(res => {
        // console.log("res.data", res.data);
        dispatch({
            type: GET_WORKERS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const getWorker = (id) => (dispatch, getState) => {
    dispatch(setWorkerLoading());

    dispatch({
        type: GET_WORKER,
        payload: id
    })
}

export const editWorker = (id, worker) => (dispatch, getState) => {
    axios.put(`${API_Server}/workers/${id}`, worker, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_WORKER,
                payload: res.data,
            })

            dispatch({
                type: EDIT_WORKER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "EDIT_WORKER_FAIL"));

            dispatch({
                type: EDIT_WORKER_FAIL
            })
        })
}

export const deleteWorker = (id) => (dispatch, getState) => {
    axios
        .delete(`${API_Server}/workers/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_WORKER,
                payload: id,
            });

            dispatch({
                type: DELETE_WORKER_SUCCESS
            })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_WORKER_FAIL"));

            dispatch({
                type: DELETE_WORKER_FAIL
            })
        });
};

export const toggleEditWorkerModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOOGLE_EDIT_WORKER_MODAL,
        payload: data
    })
}

export const toggleViewWorkerModal = (id) => (dispatch, getState) => {
    dispatch({
        type: TOOGLE_VIEW_WORKER_MODAL,
        payload: id
    })
}

export const resetAddWorker = () => {
    return {
        type: RESET_ADD_WORKER
    }
}

export const resetEditWorker = () => {
    return {
        type: RESET_EDIT_WORKER
    }
}

export const resetDeleteWorker = () => {
    return {
        type: RESET_DELETE_WORKER
    }
}