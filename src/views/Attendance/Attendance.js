import React, { Component } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { MDBDataTableV5, MDBModalHeader } from "mdbreact";
import Modal from "@material-ui/core/Modal";

import ActionButton from "../Actions";
import CameraIcon from "assets/svgs/camera.svg";
import { connect } from "react-redux";

import NaijaStates from "naija-state-local-government";
import {
  getAttendances,
  deleteAttendance,
  addAttendance,
  getAttendance,
  editAttendance,
  toggleEditAttModal,
  toggleViewAttModal,
  resetAddAtt,
  resetEditAtt,
  resetDeleteAtt,
  getWorkers
} from "../../actions/fetchDataActions";

import {
  showAddAttSuccessToast,
  showEditAttSuccessToast,
  showDeleteAttSuccessToast,
  showAddAttFailToast,
  showEditAttFailToast,
  showDeleteAttFailToast,

  showFailToast,
  showSuccessToast
} from "../../actions/toastActions";
import Toast from "../../components/toast/Toast"

import logo from "../../assets/img/logo.png"


class Attendances extends Component {
  state = {
    openTab: "all-attendances",
    isAddAttModalOpen: false,
    worker: ''
  };

  constructor(props) {
    super(props);
    this.toggleActionsDropdown = this.toggleActionsDropdown.bind(this);
  }

  onChangeTab = (id) => {
    this.setState({
      openTab: id,
    });
  };

  toggleAddAttModal = () => {
    this.setState({
      isAddAttModalOpen: !this.state.isAddAttModalOpen,
    });
  };

  toggleEditAttModal = () => {
    this.props.toggleEditAttModal();
  };

  toggleViewAttModal = () => {
    this.props.toggleViewAttModal();
  };

  handleSelectedWorker = (e) => {
    this.setState({
      worker: e.target.value
    })
  }

  toggleActionsDropdown() {
    this.setState({ isActionsOpen: !this.state.isActionsOpen });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addAttendance = async (e) => {
    console.log("here");
    e.preventDefault();

    let worker_d =
      await this.props.worker.workers.filter(w => w._id === this.state.worker)[0];
    console.log("worker_d", worker_d);

    const newAttendance = {
      user_id: this.props.logged_in_user._id ? this.props.logged_in_user._id : this.props.logged_in_user.id,
      worker_id: this.state.worker,
      date_created: new Date().toISOString(),
      worker_details: worker_d
    };
    console.log("newAttendance", newAttendance);
    this.props.addAttendance(newAttendance);

    //this.toggleAddAttModal();
  };

  componentDidMount() {
    if (this.props.attendance.attendance.length > 0) {
      let attendance = this.props.attendance.attendance[0];
      this.setState({
        user_id: attendance.user_id,
        worker_id: attendance.worker_id,
        date_created: attendance.date_created,
        worker_details: attendance.worker_details
      })
    }
  }

  async UNSAFE_componentWillMount() {
    //await this.props.getWorkers();
    //await this.props.getAttendances();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.attendance.attendance != this.props.attendance.attendance) {
      let attendance = this.props.attendance.attendance[0];

      this.setState({
        user_id: attendance.worker_id,
        worker_id: attendance.worker_id,
        date_created: attendance.date_created,
        worker_details: attendance.worker_details
      })
    }

    const { error, addAttSuccess, deleteAttSuccess, editAttSuccess } = this.props;

    if (error !== prevProps.error) {
      console.log("error", error);
      if (error.id
      ) {
        this.props.showFailToast(error.msg.msg)

      }

    }

    if (addAttSuccess) {
      console.log("in here");
      this.props.resetAddAtt();
      this.props.getAttendances();
      this.toggleAddAttModal();
      this.props.showAddAttSuccessToast();
    }
    if (deleteAttSuccess) {
      this.props.resetDeleteAtt();
      this.props.getAttendances();
      this.props.showDeleteAttSuccessToast()
    }
    if (editAttSuccess) {
      this.toggleEditAttModal();
      this.props.resetEditAtt();
      this.props.getAttendances();
      this.props.showEditAttSuccessToast()
    }
  }

  render() {
    let attendances = this.props.attendance.attendances;
    const { isEditAttModalOpen, isViewAttModalOpen, attendance } = this.props.attendance;
    let today = new Date().toISOString().split("T")[0];

    attendances = attendances.filter(a => a.date_created.split("T")[0] === today)
    const { workers } = this.props.worker;
    const allAttProps = {
      attendances,
      isAuthenticated: this.props.isAuthenticated,
      workers
    };

    let att_to_edit = attendance ? attendance[0] : "";
    console.log("this.state", this.state);
    console.log("this.props.logged_in_user", this.props.logged_in_user);
    return (
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>

          <div className="row attendances-row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <Button
                className={
                  `btn btn-primary btn-attendances font-size--14 ${this.state.openTab === "all-attendances" && "active-btn"}`
                }
                onClick={() => {
                  this.toggleAddAttModal();
                }
                }
                id="all-attendances"
              >
                Mark Attendance
              </Button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
            </div>
          </div>

          <Card>
            <CardBody> {
              attendances.length > 0 &&
              <AllAttendances
                allAttProps={allAttProps}
              />
            }

            </CardBody>
          </Card>
        </GridItem>
        <Modal
          open={this.state.isAddAttModalOpen}
          onClose={this.toggleAddAttModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Add Attendance</MDBModalHeader>
            <button onClick={this.toggleAddAttModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-att-form mt-15" onSubmit={this.addAttendance}>
              <div className="row">
                <div className="ttendance padding-bottom--16">
                  <div className="ttendance-logo col-md-3">
                    <img src={logo} />
                  </div>
                  <div className="ttendance-content col-md-9">
                    <h3>{new Date().toDateString() + " " + new Date().toLocaleTimeString()}</h3>
                    <select
                      name="worker"
                      id="att-worker"
                      className="form-control"
                      onChange={(e) => {
                        this.handleSelectedWorker(e);

                      }
                      }
                      value={this.state.worker ?
                        this.state.worker
                        : ""
                      }
                    >
                      <option value="">
                        Select worker
                      </option>

                      {workers.map(w => <option value={w._id}>
                        {w.first_name + " " + w.last_name}
                      </option>)}
                    </select>

                  </div>
                </div>

              </div>
              <div className="col-md-12 row mt-15 btns-row">
                <button
                  className="add btn-save btn-primary mr-5
        "
                  disabled={this.state.worker === "" ? true : false}
                  type="submit"
                >
                  Add
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={() => {
                    this.toggleAddAttModal()
                    this.setState({
                      msg: null
                    })
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          open={isEditAttModalOpen}
          onClose={this.toggleEditAttModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Edit Attendance</MDBModalHeader>
            <button onClick={this.toggleEditAttModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-att-form" onSubmit={this.editAttendance}>
              <div className="att-badge-div">
                <div className="att-badge">
                  <label htmlFor="file">
                    <img
                      id="badge-img"
                      alt="badge"
                      src={this.state.preview ? this.state.preview : this.state.iconUrl}
                    />
                    <input
                      type="file"
                      id="file"
                      className="att-badge-input"
                      name="image"
                      accept="image/gif,image/jpeg,image/jpg,image/png"
                      multiple=""
                      data-original-title="upload photos"
                      onChange={(e) => {
                        this.handleFileChange(e);
                      }}
                    />
                  </label>
                </div>
                <h5>Upload Attendance Badge</h5>
              </div>
              <div className="row">
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Attendance Name</label>
                  <input
                    className="form-control"
                    placeholder="Attendance Name"
                    value={this.state.name ? this.state.name : ""}
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Display Name</label>
                  <input
                    className="form-control"
                    placeholder="Attendance Name"
                    name="abbr"
                    value={this.state.abbr ? this.state.abbr : ""}
                    onChange={this.onChange}
                  />
                </div>

                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">City</label>
                  <input
                    name="city"
                    id="lga"
                    className="form-control select-lga"
                    onChange={this.onChange}
                    value={this.state.city ? this.state.city : ""}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Status</label>
                  <select
                    name="att-status"
                    id="att-status"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedWorker(e);
                    }}
                    value={this.state.worker ?
                      this.state.worker
                      : ""
                    }
                  >
                    <option value="">
                      - Select -
                    </option>
                    <option value="approved">
                      Approved
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>

                  </select>
                </div>
              </div>

              <div className="col-md-12 row mt-15 btns-row">
                <button
                  className="add btn-save btn-primary mr-5"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={this.toggleEditAttModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          open={isViewAttModalOpen}
          onClose={this.toggleViewAttModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>View Attendance</MDBModalHeader>
            <button onClick={this.toggleViewAttModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-att-form" onSubmit={this.editAttendance}>
              <div className="att-badge-div">
                <div className="att-badge">
                  <label htmlFor="file">
                    <img
                      id="badge-img"
                      alt="badge"
                      src={att_to_edit ? att_to_edit.iconUrl : CameraIcon}
                    />

                  </label>
                </div>
                <h5>Attendance Badge</h5>
              </div>
              <div className="row">
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Attendance Name</label>
                  <input
                    className="form-control"
                    placeholder="Attendance Name"
                    name="name"
                    value={att_to_edit ? att_to_edit.name : ""}
                    readOnly={true}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Display Name</label>
                  <input
                    className="form-control"
                    placeholder="Attendance Name"
                    name="abbr"
                    value={att_to_edit ? att_to_edit.abbr : ""}
                    readOnly={true}
                  />
                </div>

                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">City</label>
                  <input
                    name="city"
                    id="lga"
                    className="form-control select-lga"
                    readOnly={true}
                    value={att_to_edit ? att_to_edit.city : ""}
                  />

                </div>

                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Status</label>
                  <select
                    name="att-status"
                    id="att-status"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedWorker(e);
                    }}
                    disabled={true}
                    value={this.state.req_status ?
                      this.state.req_status
                      : ""
                    }
                  >
                    <option value="" defaultValue="selected">
                      - Select -
                    </option>
                    <option value="approve">
                      Approve
                    </option>

                    <option value="reject">
                      Reject
                    </option>

                  </select>
                </div>
              </div>
              <div className="col-md-12 row mt-15 btns-row">
                <button
                  className="add btn-save btn-primary mr-5"
                  onClick={
                    () => {
                      this.toggleViewAttModal();
                      this.toggleEditAttModal();
                    }
                  }

                  type="submit"
                >
                  Edit
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={this.toggleViewAttModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Toast
          toastList={this.props.toast.list}
          position="top-right"
          autoDelete={true}
          dismissTime={5000}
        />
      </GridContainer>
    );
  }
}

const AllAttendances = ({ allAttProps }) => {
  const { isAuthenticated } = allAttProps;
  let attendancesArray = allAttProps.attendances;

  let data = attendancesArray.map((att) => {
    return {
      name: `${att.worker_details.first_name} ${att.worker_details.middle_name} ${att.worker_details.last_name}`,
      time_in: new Date(`${att.date_created}`).toLocaleTimeString(),
      ministry_arms: `${att.worker_details.ministry_arm.map(m => m, ",  ")}`,

      action: isAuthenticated ? (
        <ActionButton data={{ id: att._id, url: "/attendances/" }} />
      ) : null,
    };
  });

  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Time In",
        field: "time_in",
        width: 270,
      },
      {
        label: "Ministry Arm(s)",
        field: "ministry_arms",
        width: 200,
      },

      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ],
    rows: data,
  };

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={25}
      pchangesamount={4}
      data={datatable}
      pagingTop
      searchTop
      searchBottom={false}
    />
  );
};


const mapStateToProps = (state) => ({
  attendance: state.fetchData,
  isAuthenticated: state.auth.isAuthenticated,
  worker: state.fetchData,
  error: state.error,
  toast: state.toast,
  logged_in_user: state.auth.user,
  addAttSuccess: state.fetchData.addAttSuccess,
  editAttSuccess: state.fetchData.editAttSuccess,
  deleteAttSuccess: state.fetchData.deleteAttSuccess
});

export default connect(mapStateToProps, {
  getAttendances,
  getAttendance,
  editAttendance,
  deleteAttendance,
  addAttendance,
  toggleEditAttModal,
  toggleViewAttModal,
  getWorkers,

  resetAddAtt,
  resetEditAtt,
  resetDeleteAtt,

  showAddAttSuccessToast,
  showEditAttSuccessToast,
  showDeleteAttSuccessToast,
  showAddAttFailToast,
  showEditAttFailToast,
  showDeleteAttFailToast,

  showFailToast,
  showSuccessToast

})(Attendances);