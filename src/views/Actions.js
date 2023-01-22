import React, { Component } from "react";
import {
  deleteAttendance,
  getAttendance,
  toggleEditAttModal,
  toggleViewAttModal,
  deleteCampMeeting,
  deleteCampMeetingReg,
} from "../actions/fetchDataActions";

import {
  getMinistryArm,
  toggleViewMAModal,
  getDirectorate,
} from "../actions/fetchDataActions";

import {
  deleteUser,
  getUser,
  toggleEditUserModal,
  toggleViewUserModal,
} from "../actions/userActions";

import {
  getWorker,
  toggleViewWorkerModal,
  toggleEditWorkerModal,
  //addWorker,
  deleteWorker,
  editWorker,
} from "../actions/workerActions";

import {
  deleteMinistryArm,
  deleteDirectorate,
} from "../actions/fetchDataActions";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import onClickOutside from "react-onclickoutside";
import { Popconfirm } from "antd";

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActionsOpen: false,
      loadAtt: false,
      actionList: [],
    };
  }

  handleClickOutside = () => {
    this.handleBlur();
  };

  toggleActionsDropdown = () => {
    this.setState({
      isActionsOpen: !this.state.isActionsOpen,
    });
  };

  handleView = (id, url) => {
    switch (url) {
      case "/attendances/":
        this.handleBlur();
        break;

      case "/dash-workers/":
        this.goToWorkers();
        this.props.getWorker(id);
        this.props.toggleViewWorkerModal(id);
        break;

      case "/dash-attendances/":
        this.goToAttendances();
        this.props.getAttendance(id);
        this.props.toggleViewAttModal(id);
        break;

      case "/ministry-arms/":
        this.handleViewMA(id);
        break;

      case "/directorates/":
        this.handleViewDirectorate(id);
        break;

      default:
        console.log("view was clicked");
        break;
    }
  };

  handleEdit = (id, url) => {
    switch (url) {
      case "/attendances/":
        this.handleBlur();
        break;

      case "/users/":
        this.props.getUser(id);
        this.props.toggleEditUserModal(this.props.user);
        break;

      case "/workers/":
        this.props.getWorker(id);
        this.props.toggleEditWorkerModal(this.props.worker);
        break;

      case "/dash-workers/":
        this.goToWorkers();
        this.props.getWorker(id);
        this.props.toggleEditWorkerModal(id);
        break;

      case "/dash-attendances/":
        this.goToAttendances();
        this.props.getAttendance(id);
        this.props.toggleEditAttModal(id);
        break;

      default:
        console.log("Edit was clicked");
        break;
    }
  };

  handleDelete = (id, url) => {
    console.log("id", id);

    switch (url) {
      case "/attendances/":
        this.props.deleteAttendance(id);
        this.handleBlur();
        break;

      case "/users/":
        this.props.deleteUser(id);
        this.handleBlur();
        break;

      case "/workers/":
        this.props.deleteWorker(id);
        this.handleBlur();
        break;

      case "/dash-workers/":
        this.props.deleteWorker(id);
        this.handleBlur();
        break;

      case "/dash-attendances/":
        this.props.deleteAttendance(id);
        this.handleBlur();
        break;
      case "/ministry-arms/":
        this.props.deleteMinistryArm(id);
        this.handleBlur();
        break;
      case "/directorates/":
        this.props.deleteDirectorate(id);
        this.handleBlur();
        break;
      case "/camp-reg/":
        this.props.deleteCampMeetingReg(id);
        this.handleBlur();
        break;
        case "/camp-meeting/":
          this.props.deleteCampMeeting(id);
          this.handleBlur();
          break;
      default:
        console.log("delete was clicked");
        break;
    }
  };

  handleBlur = () => {
    //console.log("is-blur");
    this.setState({
      isActionsOpen: false,
    });
  };

  handleViewAtt(id) {
    this.props.getAttendance(id);
  }

  handleViewMA(id) {
    this.props.getMinistryArm(id);
    this.goToMinistryArms(id);
  }

  handleViewDirectorate(id) {
    this.props.getDirectorate(id);
    this.goToDirectorates(id);
  }

  handleViewUser(id) {
    this.props.getUser(id);
  }

  handleViewWorker(id) {
    this.props.getWorker(id);
  }

  goToWorkers = () => {
    this.props.history.push({
      pathname: "/admin/workers",
    });
  };

  goToAttendances = () => {
    this.props.history.push({
      pathname: "/admin/attendances",
    });
  };

  goToMinistryArms = (id) => {
    this.props.history.push({
      pathname: `/admin/ministry-arm-details/${id}`,
    });
  };

  goToDirectorates = (id) => {
    this.props.history.push({
      pathname: `/admin/directorate-details/${id}`,
    });
  };

  // handleEditUser(id) {
  //   this.props.editUser(id)
  // }

  // handleEditAtt(id) {
  //   this.props.editAttendance(id)
  // }

  // handleEditWorker(id) {
  //   this.props.editWorker(id)
  // }

  render() {
    //console.log("this.state", this.state);
    //console.log("this.props", this.props);
    let user_role = this.props.auth.user.role;
    //console.log("user_role", user_role);
    const { id, url } = this.props.data;
    // console.log("id", id);

    return (
      <div
        className={
          this.state.isActionsOpen
            ? "btn-group btn-action open"
            : "btn-group btn-action"
        }
        onBlur={() => this.handleBlur()}
      >
        <a
          className="btn btn-icon-only
         btn-xs btn-row-action"
          id=""
          onClick={this.toggleActionsDropdown}
        >
          <span className="md-click-circle md-click-animate"></span>
          <i className="fa fa-ellipsis-v font-grey-cascade"></i>{" "}
        </a>
        <ul className="dropdown-menu pull-left">
          <li>
            <a
              id=""
              className=""
              onMouseDown={this.handleView.bind(this, id, url)}
            >
              View
            </a>
          </li>
          <li>
            <a
              id=""
              className=""
              onMouseDown={this.handleEdit.bind(this, id, url)}
            >
              Edit
            </a>
          </li>
          {
            user_role[0] === "superadmin" && (
              // <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <li>
                <a
                  id=""
                  className=""
                  onMouseDown={this.handleDelete.bind(this, id, url)}
                >
                  Delete
                </a>
              </li>
            )
            // </Popconfirm>
          }{" "}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  test: state,
  attendance: state.attendance,
  user: state.user,
  worker: state.worker,
  auth: state.auth,
  ministry_arm: state.ministry_arm,
});

export default withRouter(
  connect(mapStateToProps, {
    deleteAttendance,
    toggleEditAttModal,
    toggleViewAttModal,
    getAttendance,
    deleteCampMeeting,
    deleteCampMeetingReg,
    deleteUser,
    toggleEditUserModal,
    toggleViewUserModal,
    getUser,
    getWorker,
    editWorker,
    deleteWorker,
    toggleEditWorkerModal,
    toggleViewWorkerModal,
    deleteMinistryArm,
    deleteDirectorate,
    getMinistryArm,
    toggleViewMAModal,
    getDirectorate,
    // getAttendances,
  })(onClickOutside(ActionButton))
);
