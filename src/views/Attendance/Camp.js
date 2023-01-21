import React, { Component, useState } from "react";

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

import { DatePicker, Space, Popconfirm, AutoComplete } from "antd";

import NaijaStates from "naija-state-local-government";
import {
  getCampMeetings,
  deleteCampMeeting,
  addCampMeeting,
  getCampMeeting,
  editCampMeeting,
  toggleEditCMModal,
  toggleViewCMModal,
  resetAddCM,
  resetEditCM,
  resetDeleteCM,
  getWorkers,
  getCampMeetingRegs,
  deleteCampMeetingReg,
  addCampMeetingReg,
  getCampMeetingReg,
  editCampMeetingReg,
  toggleEditCMRegModal,
  toggleViewCMRegModal,
  resetAddCMReg,
  resetEditCMReg,
  resetDeleteCMReg,
} from "../../actions/fetchDataActions";

import {
  showAddCMSuccessToast,
  showEditCMSuccessToast,
  showDeleteCMSuccessToast,
  showAddCMFailToast,
  showEditCMFailToast,
  showDeleteCMFailToast,
  showAddCMRegSuccessToast,
  showEditCMRegSuccessToast,
  showDeleteCMRegSuccessToast,
  showAddCMRegFailToast,
  showEditCMRegFailToast,
  showDeleteCMRegFailToast,
  showFailToast,
  showSuccessToast,
} from "../../actions/toastActions";
import Toast from "../../components/toast/Toast";

import logo from "../../assets/img/logo.png";
import generatePDF from "views/Reporting/Generator";

const { RangePicker } = DatePicker;

const { Option } = AutoComplete;

class CampMeetings extends Component {
  state = {
    openTab: "all-campMeetings",
    isAddCMModalOpen: false,
    worker: "",
    reg_worker: "",
    searchRes: [],
    searchRegRes: [],
    selectedWorker: undefined,
    selecetedRegWorker: undefined,
    workersIDs: [],
    regWorkersIDs: [],
    isAllView: false,
    isAddCMRegModalOpen: false,
  };

  constructor(props) {
    super(props);
    this.toggleActionsDropdown = this.toggleActionsDropdown.bind(this);
  }

  printCampMeeting = (day) => {
    window.location.reload();
    let data;
    console.log("day", day);
    if (typeof day === "object") {
      console.log("day is object", day);
      let start_date = new Date(day[0]._id).getTime;
      let end_date = new Date(day[1]._id).getTime;

      data = this.props.campMeeting.campMeetings.filter((a) => {
        let d = new Date(a).getTime;
        return d >= start_date && d <= end_date;
      });

      console.log("data", data);

      if (data.length) {
        generatePDF("campMeeting-range", data);
      }
    } else {
      let date1 = new Date().toISOString().split("T")[0];
      let date2;

      if (day == "today") {
        date2 = date1;
      } else {
        date2 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
      }

      data = this.props.campMeeting.campMeetings.filter((a) => {
        //console.log("a", a);
        return a.date_created.split("T")[0] === date2;
      });
      if (data.length) {
        generatePDF("campMeeting-range", data, date1);
      }
    }
  };

  onChangeTab = (id) => {
    this.setState({
      openTab: id,
    });
  };

  toggleAddCMModal = () => {
    this.setState({
      isAddCMModalOpen: !this.state.isAddCMModalOpen,
    });
  };

  toggleAddCMRegModal = () => {
    this.setState({
      isAddCMRegModalOpen: !this.state.isAddCMRegModalOpen,
    });
  };

  toggleEditCMModal = () => {
    this.props.toggleEditCMModal();
  };

  toggleViewCMModal = () => {
    this.props.toggleViewCMModal();
  };

  handleSelectedWorker = (e) => {
    console.log("selected worker", e);
    const { workers } = this.props.worker;
    let selected_worker = workers.filter((w) => w._id == e);
    if (selected_worker.length) {
      this.setState({
        selectedWorker: selected_worker[0],
      });
    }
    this.setState({
      worker: e, //e.target.value,
    });
  };

  toggleActionsDropdown() {
    this.setState({ isActionsOpen: !this.state.isActionsOpen });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addCampMeeting = async (e) => {
    console.log("here");
    e.preventDefault();

    let worker_d = await this.props.worker.workers.filter(
      (w) => w._id === this.state.worker
    )[0];
    console.log("worker_d", worker_d);

    const newCampMeeting = {
      user_id: this.props.logged_in_user._id
        ? this.props.logged_in_user._id
        : this.props.logged_in_user.id,
      worker_id: this.state.worker,
      date_created: new Date().toISOString(),
      worker_details: worker_d,
    };
    console.log("newCampMeeting", newCampMeeting);
    this.props.addCampMeeting(newCampMeeting);

    //this.toggleAddCMModal();
  };

  addCampMeetingReg = async (e) => {
    console.log("here");
    e.preventDefault();

    let worker_d = await this.props.worker.workers.filter(
      (w) => w._id === this.state.worker
    )[0];
    console.log("worker_d", worker_d);

    const newCampMeetingReg = {
      user_id: this.props.logged_in_user._id
        ? this.props.logged_in_user._id
        : this.props.logged_in_user.id,
      worker_id: this.state.worker,
      date_created: new Date().toISOString(),
      worker_details: worker_d,
    };
    console.log("newCampMeetingReg", newCampMeetingReg);
    this.props.addCampMeetingReg(newCampMeetingReg);

    //this.toggleAddCMModal();
  };

  componentDidMount() {
    if (this.props.campMeeting.campMeeting.length > 0) {
      let campMeeting = this.props.campMeeting.campMeeting[0];
      this.setState({
        user_id: campMeeting.user_id,
        worker_id: campMeeting.worker_id,
        date_created: campMeeting.date_created,
        worker_details: campMeeting.worker_details,
      });
    }
  }

  async UNSAFE_componentWillMount() {
    //await this.props.getWorkers();
    //await this.props.getCampMeetings();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.campMeeting.campMeeting != this.props.campMeeting.campMeeting
    ) {
      let campMeeting = this.props.campMeeting.campMeeting[0];

      this.setState({
        user_id: campMeeting.worker_id,
        worker_id: campMeeting.worker_id,
        date_created: campMeeting.date_created,
        worker_details: campMeeting.worker_details,
      });
    }

    // if (
    //   prevProps.campMeeting.campMeetingReg !=
    //   this.props.campMeeting.campMeetingReg
    // ) {
    //   let campMeetingReg = this.props.campMeeting.campMeetingReg[0];

    //   this.setState({
    //     user_id: campMeetingReg.worker_id,
    //     worker_id: campMeetingReg.worker_id,
    //     date_created: campMeetingReg.date_created,
    //     worker_details: campMeetingReg.worker_details,
    //   });
    // }

    const {
      error,
      addCMSuccess,
      deleteCMSuccess,
      editCMSuccess,
      addCMRegSuccess,
      deleteCMRegSuccess,
      editCMRegSuccess,
    } = this.props;

    console.log(
      `
    error,
    addCMSuccess,
    deleteCMSuccess,
    editCMSuccess,
    addCMRegSuccess,
    deleteCMRegSuccess,
    editCMRegSuccess,
    `,
      error,
      addCMSuccess,
      deleteCMSuccess,
      editCMSuccess,
      addCMRegSuccess,
      deleteCMRegSuccess,
      editCMRegSuccess
    );

    if (error !== prevProps.error) {
      console.log("error", error);
      if (error.id) {
        this.props.showFailToast(error.msg.msg);
      }
    }

    if (addCMSuccess) {
      console.log("in here");
      this.props.resetAddCM();
      this.props.getCampMeetings();
      this.toggleAddCMModal();
      this.props.showAddCMSuccessToast();
    }
    if (deleteCMSuccess) {
      this.props.resetDeleteCM();
      this.props.getCampMeetings();
      this.props.showDeleteCMSuccessToast();
    }
    if (editCMSuccess) {
      this.toggleEditCMModal();
      this.props.resetEditCM();
      this.props.getCampMeetings();
      this.props.showEditCMSuccessToast();
    }

    if (addCMRegSuccess) {
      // console.log("in here");
      this.props.resetAddCMReg();
      this.props.getCampMeetingRegs();
      this.toggleAddCMRegModal();
      this.props.showAddCMRegSuccessToast();
    }
    if (deleteCMRegSuccess) {
      this.props.resetDeleteCMReg();
      this.props.getCampMeetingRegs();
      this.props.showDeleteCMRegSuccessToast();
    }
    // if (editCMRegSuccess) {
    //   this.toggleEditCMRegModal();
    //   this.props.resetEditCMReg();
    //   this.props.getCampMeetingRegs();
    //   this.props.showEditCMRegSuccessToast();
    // }
  }

  handleSearch = (search_val) => {
    const { workers } = this.props.worker;

    // console.log("workers", workers);

    let workersIDs = workers.map((w) => w._id);
    const options = workers.map((w) => {
      return {
        value: w._id,
        label: w.first_name + " " + w.last_name,
      };
    });

    console.log("workersIDs", workersIDs);

    let res;

    if (search_val) {
      res = options.filter(
        (option) =>
          option.label.toUpperCase().indexOf(search_val.toUpperCase()) !== -1
      );
    } else {
      res = options;
    }

    console.log(" workersIDs ", workersIDs);

    this.setState({
      searchRes: res,
      workersIDs: workersIDs,
    });
  };

  handleRegSearch = (search_val) => {
    let workers = this.props.worker.workers;

    let allRegs = this.props.campMeeting.campMeetingRegs.map(
      (r) => r.worker_details
    );
    console.log("allRegs", allRegs);

    workers = allRegs;

    console.log("workers", workers);

    let regWorkersIDs = workers.map((w) => w._id);
    const options = workers.map((w) => {
      return {
        value: w._id,
        label: w.first_name + " " + w.last_name,
      };
    });

    let res;

    if (search_val) {
      res = options.filter(
        (option) =>
          option.label.toUpperCase().indexOf(search_val.toUpperCase()) !== -1
      );
    } else {
      res = options;
    }

    // console.log(" workersIDs ", workersIDs);

    this.setState({
      searchRegRes: res,
      regWorkersIDs,
    });
  };

  toggleAllView = () => {
    this.setState({
      isAllView: !this.state.isAllView,
    });
  };

  registerWorker = () => {
    this.toggleAddCMModal();
    this.toggleAddCMRegModal();
    // this.props.history.push("/admin/workers");
  };

  render() {
    //console.log("selectedWorker", this.state.selectedWorker);
    let campMeetings, allCampMeeting, allRegs;

    allCampMeeting = this.props.campMeeting.campMeetings;
    allRegs = this.props.campMeeting.campMeetingRegs;

    console.log("allRegs", allRegs);

    this.state.selectedWorker &&
      console.log("this.state.selectedWorker", this.state.selectedWorker);
    this.state.selectedWorker &&
      console.log(
        "this.state.workersIDs.includes(this.state.selectedWorker._id)",
        this.state.workersIDs.includes(this.state.selectedWorker._id)
      );
    // console.log(
    //   "this.props.campMeeting.campMeetings",
    //   this.props.campMeeting.campMeetings
    // );
    //console.log("allCampMeeting", allCampMeeting);
    let campMeetingDays = [
      ...new Set(allCampMeeting.map((a) => a.date_created.split("T")[0])),
    ];
    // console.log("campMeetingDays", campMeetingDays);

    const {
      isEditCMModalOpen,
      isViewCMModalOpen,
      campMeeting,
    } = this.props.campMeeting;
    let today = new Date().toISOString().split("T")[0];

    campMeetings = allRegs; //.filter( (a) => a.date_created.split("T")[0] === today);
    const { workers } = this.props.worker;
    const allCMRegProps = {
      campMeetings,
      isAuthenticated: this.props.isAuthenticated,
      workers,
    };

    const listProps = {
      allCampMeeting,
      allRegs,
      campMeetingDays,
      isAuthenticated: this.props.isAuthenticated,
      deleteCampMeeting: this.props.deleteCampMeeting,
      user: this.props.logged_in_user,
    };

    let cw_to_edit = campMeeting ? campMeeting[0] : "";
    //  console.log("workersIDs", this.state.workersIDs);
    // const workersMapping = workers.map((w) => {
    //   return {
    //     value: w._id,
    //     label: w.first_name + " " + w.last_name,
    //   };
    // });

    // console.log("options", options);
    //console.log("this.state", this.state);
    //console.log("this.props.logged_in_user", this.props.logged_in_user);
    console.log("this.state.isAllView", this.state.isAllView);
    console.log("campMeetings", campMeetings);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <div className="desktop-view row campMeetings-row"> */}
          <div className="row campMeetings-row">
            {/* <div className="col-xs-12 col-sm-5 col-md-6 display--flex"> */}
            <div className="col-xs-12 col-sm-6 col-md-6 display--flex">
              <Button
                className={`btn btn-primary btn-print-workers font-size--14 margin-right_0_5 
                `}
                onClick={() => {
                  this.toggleAddCMRegModal();
                }}
                id="all-campMeetings"
              >
                Register Worker
              </Button>

              <Button
                className={`btn btn-primary btn-print-workers btn-campMeetings font-size--14 
               
                `}
                onClick={() => {
                  this.toggleAddCMModal();
                }}
                id="all-campMeetings"
              >
                Take Attendance
              </Button>
            </div>
            {/* <div className="col-xs-12 col-sm-7 col-md-6 display--flex"> */}
            <div className="col-xs-12 col-sm-6 col-md-6 display--flex justify--right">
              <Popconfirm
                onConfirm={() => {
                  this.printCampMeeting("today");
                }}
                title="Proceed to print today's campMeeting？"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className={`btn btn-primary btn-print-workers font-size--14 margin-right_0_5`}
                  // onClick={() => {
                  //   this.printCampMeeting("today");
                  // }
                  // }
                  id="print-todays-campMeeting"
                >
                  Print Today's Attendance
                </Button>
              </Popconfirm>
              {/* <Button
                className={`btn btn-primary btn-print-workers font-size--14`}
                onClick={() => {
                  this.printCampMeeting("last-meeting");
                }}
                id="print-last-campMeeting"
              >
                Print Last CampMeeting
              </Button> */}

              <Button
                className={`btn btn-primary btn-print-workers font-size--14`}
                onClick={() => this.toggleAllView()}
                id="print-custom-campMeeting"
              >
                {this.state.isAllView
                  ? "View Registered Workers"
                  : "View All Attendance"}
              </Button>
              {/* <Space direction="vertical" size={12}>
                <RangePicker
                  className={`date-range-picker btn-print-workers font-size--14`}
                  style={{
                    color: "rgba(0, 0, 0, 0.87) !important;",
                  }}
                  onChange={this.printCampMeeting}
                />
              </Space> */}
            </div>
          </div>

          <div className="row campMeetings-row title_22">
            {this.state.isAllView
              ? "All Camp Meeting Attandance List"
              : "Workers Camp Meeting Registrations"}
          </div>
          {/* 
          <div className="mobile-view row campMeetings-row">
            <div className="col-xs-12 col-sm-5 col-md-6 display--flex">
              <Button
                className={`btn btn-primary btn-campMeetings font-size--14 ${
                  this.state.openTab === "all-campMeetings" && "active-btn"
                }`}
                onClick={() => {
                  this.toggleAddCMModal();
                }}
                id="all-campMeetings"
              >
                Mark CampMeeting
              </Button>
            </div>

            <div className="col-xs-12 col-sm-5 col-md-6 display--flex margin-y--1">
              <Popconfirm
                onConfirm={() => {
                  this.printCampMeeting("today");
                }}
                title="Proceed to print today's campMeeting？"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className={`btn btn-primary btn-print-workers font-size--14`}
                  // onClick={() => {
                  //   this.printCampMeeting("today");
                  // }
                  // }
                  id="print-todays-campMeeting"
                >
                  Print Today's CampMeeting
                </Button>
              </Popconfirm>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-6 display--flex margin-y--1">
              <Button
                className={`btn btn-primary btn-print-workers font-size--14`}
                onClick={() => {
                  this.printCampMeeting("last-meeting");
                }}
                id="print-todays-campMeeting"
              >
                Print Last's CampMeeting
              </Button>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-6 display--flex">
              <Space direction="vertical" size={12}>
                <RangePicker
                  className={`date-range-picker btn-print-workers font-size--14`}
                  style={{
                    color: "rgba(0, 0, 0, 0.87) !important;",
                  }}
                  onChange={this.printCampMeeting}
                />
              </Space>
            </div>
          </div> */}

          <Card>
            <CardBody>
              {" "}
              {!this.state.isAllView ? (
                campMeetings.length > 0 && (
                  <AllCampMeetings allCMRegProps={allCMRegProps} />
                )
              ) : (
                <List listProps={listProps} />
              )}
            </CardBody>
          </Card>
        </GridItem>

        <Modal
          open={this.state.isAddCMRegModalOpen}
          onClose={this.toggleAddCMRegModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Register Worker</MDBModalHeader>
            <button
              onClick={this.toggleAddCMRegModal}
              type="button"
              class="close"
            >
              <span aria-hidden="true" className="x">
                ×
              </span>
              <span className="sr-only">Close</span>
            </button>
            <form className="add-cw-form" onSubmit={this.addCampMeetingReg}>
              <div className="row">
                <div className="ttendance padding-bottom--16">
                  <div className="ttendance-logo col-md-3">
                    <img src={logo} />
                  </div>
                  <div className="ttendance-content col-md-12">
                    <h3>
                      {new Date().toDateString() +
                        " " +
                        new Date().toLocaleTimeString()}
                    </h3>

                    {this.state.selectedWorker &&
                    this.state.workersIDs.includes(
                      this.state.selectedWorker._id
                    ) ? (
                      <div className="worker-info">
                        <h3>
                          {`${this.state.selectedWorker.first_name} ${this.state.selectedWorker.last_name}`}
                        </h3>

                        <ul>
                          {this.state.selectedWorker.ministry_arm.map((m) => (
                            <li>{m}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* <select
                      name="worker"
                      id="cw-worker"
                      className="form-control"
                      onChange={(e) => {
                        this.handleSelectedWorker(e);
                      }}
                      value={this.state.worker ? this.state.worker : ""}
                    >
                      <option value="">Select worker</option>

                      {workers.map((w) => (
                        <option value={w._id}>
                          {w.first_name + " " + w.last_name}
                        </option>
                      ))}
                    </select> */}
                    <AutoComplete
                      allowClear={true}
                      style={{
                        width: 200,
                      }}
                      name="worker"
                      id="cw-worker"
                      className="form-control search-worker"
                      onChange={(e) => {
                        this.handleSelectedWorker(e);
                      }}
                      // options={options}
                      placeholder="Begin typing to find worker"
                      // filterOption={(inputValue, option) =>
                      //   option.label
                      //     .toUpperCase()
                      //     .indexOf(inputValue.toUpperCase()) !== -1
                      // }
                      getPopupContainer={(node) => node.parentNode}
                      // value={
                      //   this.state.workersIDs.includes(
                      //     this.state.selectedWorker
                      //   ) ??
                      //   `${this.state.selectedWorker.first_name} ${this.state.selectedWorker.last_name}`
                      // }
                      // value = {
                      //   this.state.selectedWorker
                      // }
                      onSearch={this.handleSearch}
                    >
                      {this.state.searchRes.map((r) => (
                        <Option
                          //onClick={(e) => this.handleSelectedWorker(e)}
                          key={r.value}
                          value={r.value}
                        >
                          {r.label}
                        </Option>
                      ))}
                    </AutoComplete>
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
                  Register
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={() => {
                    this.toggleAddCMRegModal();
                    this.setState({
                      msg: null,
                    });
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </div>

              <div className="col-md-12 row mt-15 btns-row">
                <a
                  href="#"
                  className="btn-link"
                  onClick={() => {
                    this.registerWorker();
                  }}
                  // id="all-campMeetings"
                >
                  Take Attendance
                </a>
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          open={this.state.isAddCMModalOpen}
          onClose={this.toggleAddCMModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Mark Camp Meeting Attendance</MDBModalHeader>
            <button onClick={this.toggleAddCMModal} type="button" class="close">
              <span aria-hidden="true" className="x">
                ×
              </span>
              <span className="sr-only">Close</span>
            </button>
            <form className="add-cw-form" onSubmit={this.addCampMeeting}>
              <div className="row">
                <div className="ttendance padding-bottom--16">
                  <div className="ttendance-logo col-md-3">
                    <img src={logo} />
                  </div>
                  <div className="ttendance-content col-md-12">
                    <h3>
                      {new Date().toDateString() +
                        " " +
                        new Date().toLocaleTimeString()}
                    </h3>

                    {this.state.selectedWorker ? (
                      // && this.state.workersIDs.includes(
                      //    this.state.selectedWorker._id
                      //  )
                      <div className="worker-info">
                        <h3>
                          {`${this.state.selectedWorker.first_name} ${this.state.selectedWorker.last_name}`}
                        </h3>

                        <ul>
                          {this.state.selectedWorker.ministry_arm.map((m) => (
                            <li>{m}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* <select
                      name="worker"
                      id="cw-worker"
                      className="form-control"
                      onChange={(e) => {
                        this.handleSelectedWorker(e);
                      }}
                      value={this.state.worker ? this.state.worker : ""}
                    >
                      <option value="">Select worker</option>

                      {workers.map((w) => (
                        <option value={w._id}>
                          {w.first_name + " " + w.last_name}
                        </option>
                      ))}
                    </select> */}
                    <AutoComplete
                      allowClear={true}
                      style={{
                        width: 200,
                      }}
                      name="worker"
                      id="cw-worker"
                      className="form-control search-worker"
                      onChange={(e) => {
                        this.handleSelectedWorker(e);
                      }}
                      // options={options}
                      placeholder="Begin typing to find worker"
                      // filterOption={(inputValue, option) =>
                      //   option.label
                      //     .toUpperCase()
                      //     .indexOf(inputValue.toUpperCase()) !== -1
                      // }
                      getPopupContainer={(node) => node.parentNode}
                      // value={
                      //   this.state.workersIDs.includes(
                      //     this.state.selectedWorker
                      //   ) ??
                      //   `${this.state.selectedWorker.first_name} ${this.state.selectedWorker.last_name}`
                      // }
                      // value = {
                      //   this.state.selectedWorker
                      // }
                      onSearch={this.handleRegSearch}
                    >
                      {this.state.searchRegRes.map((r) => (
                        <Option
                          //onClick={(e) => this.handleSelectedWorker(e)}
                          key={r.value}
                          value={r.value}
                        >
                          {r.label}
                        </Option>
                      ))}
                    </AutoComplete>
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
                    this.toggleAddCMModal();
                    this.setState({
                      msg: null,
                    });
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </div>

              <div className="col-md-12 row mt-15 btns-row">
                <a
                  href="#"
                  className="btn-link"
                  onClick={() => {
                    this.registerWorker();
                  }}
                  // id="all-campMeetings"
                >
                  Worker Details not Found?
                </a>
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          open={isEditCMModalOpen}
          onClose={this.toggleEditCMModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Edit CampMeeting</MDBModalHeader>
            <button
              onClick={this.toggleEditCMModal}
              type="button"
              class="close"
            >
              <span aria-hidden="true" className="x">
                ×
              </span>
              <span class="sr-only">Close</span>
            </button>
            <form className="add-cw-form" onSubmit={this.editCampMeeting}>
              <div className="cw-badge-div">
                <div className="cw-badge">
                  <label htmlFor="file">
                    <img
                      id="badge-img"
                      alt="badge"
                      src={
                        this.state.preview
                          ? this.state.preview
                          : this.state.iconUrl
                      }
                    />
                    <input
                      type="file"
                      id="file"
                      className="cw-badge-input"
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
                <h5>Upload CampMeeting Badge</h5>
              </div>
              <div className="row">
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">CampMeeting Name</label>
                  <input
                    className="form-control"
                    placeholder="CampMeeting Name"
                    value={this.state.name ? this.state.name : ""}
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Display Name</label>
                  <input
                    className="form-control"
                    placeholder="CampMeeting Name"
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
                    name="cw-status"
                    id="cw-status"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedWorker(e);
                    }}
                    value={this.state.worker ? this.state.worker : ""}
                  >
                    <option value="">- Select -</option>
                    <option value="approved">Approved</option>

                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="col-md-12 row mt-15 btns-row">
                <button className="add btn-save btn-primary mr-5" type="submit">
                  Update
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={this.toggleEditCMModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          open={isViewCMModalOpen}
          onClose={this.toggleViewCMModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>View CampMeeting</MDBModalHeader>
            <button
              onClick={this.toggleViewCMModal}
              type="button"
              class="close"
            >
              <span aria-hidden="true" className="x">
                ×
              </span>
              <span class="sr-only">Close</span>
            </button>
            <form className="add-cw-form" onSubmit={this.editCampMeeting}>
              <div className="cw-badge-div">
                <div className="cw-badge">
                  <label htmlFor="file">
                    <img
                      id="badge-img"
                      alt="badge"
                      src={cw_to_edit ? cw_to_edit.iconUrl : CameraIcon}
                    />
                  </label>
                </div>
                <h5>CampMeeting Badge</h5>
              </div>
              <div className="row">
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">CampMeeting Name</label>
                  <input
                    className="form-control"
                    placeholder="CampMeeting Name"
                    name="name"
                    value={cw_to_edit ? cw_to_edit.name : ""}
                    readOnly={true}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Display Name</label>
                  <input
                    className="form-control"
                    placeholder="CampMeeting Name"
                    name="abbr"
                    value={cw_to_edit ? cw_to_edit.abbr : ""}
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
                    value={cw_to_edit ? cw_to_edit.city : ""}
                  />
                </div>

                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Status</label>
                  <select
                    name="cw-status"
                    id="cw-status"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedWorker(e);
                    }}
                    disabled={true}
                    value={this.state.req_status ? this.state.req_status : ""}
                  >
                    <option value="" defaultValue="selected">
                      - Select -
                    </option>
                    <option value="approve">Approve</option>

                    <option value="reject">Reject</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 row mt-15 btns-row">
                <button
                  className="add btn-save btn-primary mr-5"
                  onClick={() => {
                    this.toggleViewCMModal();
                    this.toggleEditCMModal();
                  }}
                  type="submit"
                >
                  Edit
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={this.toggleViewCMModal}
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

const AllCampMeetings = ({ allCMRegProps }) => {
  const { isAuthenticated } = allCMRegProps;
  let campMeetingsArray = allCMRegProps.campMeetings;

  console.log("campMeetingsArray", campMeetingsArray);

  let data = campMeetingsArray.map((cw) => {
    return {
      name: `${cw.worker_details.first_name} ${cw.worker_details.middle_name} ${cw.worker_details.last_name}`,
      //time_in: new Date(`${cw.date_created}`).toLocaleTimeString(),
      ministry_arms: `${cw.worker_details.ministry_arm.map((m) => m, ",  ")}`,

      action: isAuthenticated ? (
        <ActionButton data={{ id: cw._id, url: "/camp-reg/" }} />
      ) : null,
    };
  });

  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        cwributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      // {
      //   label: "Time In",
      //   field: "time_in",
      //   width: 270,
      // },
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

const List = ({ listProps }) => {
  const [isListItemView, setIsListItemView] = useState(false);
  // const [listItem, setListItem] = useState([]);
  // const [listItemData, setListItemData] = useState([]);
  const [listDataTable, setListDataTable] = useState({});
  const [date, setDate] = useState("");

  const {
    isAuthenticated,
    campMeetingDays,
    allCampMeeting,
    deleteCampMeeting,
    user,
  } = listProps;
  let group = [];

  console.log("campMeetingDays", campMeetingDays);
  let total_no = campMeetingDays.length;

  //let isListItemView = false;
  let listItem, listItemData; //listDataTable;

  if (total_no) {
    for (let i = 0; i < total_no; i++) {
      let obj = {
        date: campMeetingDays[i],
        campMeeting: allCampMeeting.filter(
          (a) => a.date_created.split("T")[0] === campMeetingDays[i]
        ),
      };

      group.push(obj);
    }
  }

  //let campMeetingsArray = listProps.allCampMeeting;

  const handleViewCMFromList = (date) => {
    setDate(date);
    toggleListView();
    console.log("group", group);
    let item = group.filter((g) => g.date === date);
    listItem = item;

    // setListItem(item);
    console.log("listItem", listItem);
    if (listItem.length) {
      let itemData = listItem[0].campMeeting.map((cw) => {
        return {
          name: `${cw.worker_details.first_name} ${cw.worker_details.middle_name} ${cw.worker_details.last_name}`,
          time_in: new Date(`${cw.date_created}`).toLocaleTimeString(),
          ministry_arms: `${cw.worker_details.ministry_arm.map(
            (m) => m,
            ",  "
          )}`,

          action: isAuthenticated ? (
            <ActionButton data={{ id: cw._id, url: "/campMeetings/" }} />
          ) : null,
        };
      });

      console.log("itemData", itemData);
      listItemData = itemData;
      //setListItemData(itemData);
      let dt = {
        columns: [
          {
            label: "Name",
            field: "name",
            width: 150,
            cwributes: {
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
        rows: listItemData,
      };
      // listDataTable = dt;
      setListDataTable(dt);
    }
  };

  const handlePrintCMFromList = (date) => {
    window.location.reload();
    let data = allCampMeeting.filter((a) => {
      //   console.log("a.date_created.split('T')[0]", a.date_created.split("T")[0]);
      return a.date_created.split("T")[0] === date;
    });
    if (data.length) {
      generatePDF("campMeeting-range", data, date);
    }
    //  console.log("date", date, "data",data);
  };

  const deleteCM = async (id) => {
    await deleteCampMeeting(id);
  };

  const handleDeleteCMFromList = (date) => {
    let data = allCampMeeting.filter((a) => {
      //   console.log("a.date_created.split('T')[0]", a.date_created.split("T")[0]);
      return a.date_created.split("T")[0] === date;
    });
    let ids = data.map((d) => d._id);

    for (let i = 0; i < ids.length; i++) {
      try {
        console.log(`deleting ${ids[i]}...`);
        deleteCM(ids[i]);
      } catch (err) {
        console.log(`failed to delete campMeeting: ${ids[i]}`);
      }
    }
  };

  const toggleListView = () => {
    // isListItemView = !isListItemView;
    setIsListItemView(!isListItemView);
  };

  let data = group.map((cw) => {
    return {
      date: new Date(cw.date).toDateString(),
      num_of_workers_present: cw.campMeeting.length,
      view: (
        <a
          className="links"
          //href=""
          onClick={() => {
            handleViewCMFromList(cw.date);
          }}
        >
          View
        </a>
      ),
      print: (
        <a
          className="links"
          onClick={() => handlePrintCMFromList(cw.date)}
          //href=""
        >
          Print
        </a>
      ),

      delete: user.role.includes("superadmin") ? (
        <Popconfirm
          onConfirm={() => {
            handleDeleteCMFromList(cw.date);
          }}
          title="Proceed to print delete campMeeting？"
          okText="Yes"
          cancelText="No"
        >
          <a
            className="links"
            //href="delete"
            // onClick={() => handleDeleteCMFromList(cw.date)}
          >
            Delete
          </a>
        </Popconfirm>
      ) : (
        ""
      ),
      // action: isAuthenticated ? (
      //   <ActionButton data={{ id: cw._id, url: "/campMeetings/" }} />
      // ) : null,
    };
  });

  const datatable = {
    columns: [
      {
        label: "Date",
        field: "date",
        width: 150,
        cwributes: {
          "aria-controls": "DataTable",
          "aria-label": "Date",
        },
      },
      {
        label: "No. of Workers Present",
        field: "num_of_workers_present",
        width: 150,
      },
      {
        label: "",
        field: "view",
        width: 150,
      },
      {
        label: "",
        field: "print",
        width: 150,
      },
      {
        label: "",
        field: "delete",
        width: 150,
      },
      // {
      //   label: "Action",
      //   field: "action",
      //   sort: "disabled",
      //   width: 100,
      // },
    ],
    rows: data,
  };

  console.log("isListItemView", isListItemView);

  console.log("listDataTable", listDataTable);

  return isListItemView ? (
    <div className="cw-list-view">
      <h1> CampMeeting List for {new Date(date).toDateString()}</h1>
      <h4 className="links back-to-list" onClick={() => toggleListView()}>
        Back to list
      </h4>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={25}
        pchangesamount={4}
        data={listDataTable}
        pagingTop
        searchTop
        searchBottom={false}
      />
    </div>
  ) : (
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
  campMeeting: state.fetchData,
  campMeetingReg: state.fetchData,
  isAuthenticated: state.auth.isAuthenticated,
  worker: state.fetchData,
  error: state.error,
  toast: state.toast,
  logged_in_user: state.auth.user,
  addCMSuccess: state.fetchData.addCMSuccess,
  editCMSuccess: state.fetchData.editCMSuccess,
  deleteCMSuccess: state.fetchData.deleteCMSuccess,

  addCMRegSuccess: state.fetchData.addCMRegSuccess,
  editCMRegSuccess: state.fetchData.editCMRegSuccess,
  deleteCMRegSuccess: state.fetchData.deleteCMRegSuccess,
});

export default connect(mapStateToProps, {
  getCampMeetings,
  getCampMeeting,
  editCampMeeting,
  deleteCampMeeting,
  addCampMeeting,
  toggleEditCMModal,
  toggleViewCMModal,

  getCampMeetingRegs,
  getCampMeetingReg,
  editCampMeetingReg,
  deleteCampMeetingReg,
  addCampMeetingReg,
  toggleEditCMRegModal,
  toggleViewCMRegModal,

  getWorkers,

  resetAddCM,
  resetEditCM,
  resetDeleteCM,

  showAddCMSuccessToast,
  showEditCMSuccessToast,
  showDeleteCMSuccessToast,
  showAddCMFailToast,
  showEditCMFailToast,
  showDeleteCMFailToast,

  resetAddCMReg,
  resetEditCMReg,
  resetDeleteCMReg,

  showAddCMRegSuccessToast,
  showEditCMRegSuccessToast,
  showDeleteCMRegSuccessToast,
  showAddCMRegFailToast,
  showEditCMRegFailToast,
  showDeleteCMRegFailToast,

  showFailToast,
  showSuccessToast,
})(CampMeetings);
