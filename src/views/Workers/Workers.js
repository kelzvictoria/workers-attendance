import React, { Component } from "react";
import { Select, Radio } from 'antd';

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
  getWorkers,
  deleteWorker,
  addWorker,
  getWorker,
  editWorker,
  toggleEditWorkerModal,
  toggleViewWorkerModal,
  resetAddWorker,
  resetEditWorker,
  resetDeleteWorker
} from "../../actions/fetchDataActions";

import {
  showAddWorkerSuccessToast,
  showEditWorkerSuccessToast,
  showDeleteWorkerSuccessToast,
  showAddWorkerFailToast,
  showEditWorkerFailToast,
  showDeleteWorkerFailToast,

  showFailToast,
  showSuccessToast
} from "../../actions/toastActions";
import Toast from "../../components/toast/Toast"

import logo from "../../assets/img/logo.png"
const { Option } = Select;

class Workers extends Component {
  state = {
    openTab: "all-workers",
    isAddWorkerModalOpen: false,
    worker: '',
    worker_id: "",
    ministry_arms_children: [],
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_num: "",
    role: "",
    email_address: "",
    ministry_arms: []
  };

  constructor(props) {
    super(props);
    this.toggleActionsDropdown = this.toggleActionsDropdown.bind(this);
  }

  handleSelectedMinistryArms = (value) => {
    console.log(`Selected: ${value}`, typeof value);
    if (value) {
      this.setState({
        ministry_arms: value.includes(",") ? value.split(",") : value
      })
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onChangeTab = (id) => {
    this.setState({
      openTab: id,
    });
  };

  toggleAddWorkerModal = () => {
    this.setState({
      isAddWorkerModalOpen: !this.state.isAddWorkerModalOpen,
    });
  };

  toggleEditWorkerModal = async () => {
    //if (!this.state.ministry_arms_children.length) {
    //this.handleMinistryArmMultiSelect();
    // }
    this.props.toggleEditWorkerModal();
  };

  toggleViewWorkerModal = () => {
    this.props.toggleViewWorkerModal();
  };

  roles = ["Worker", "Ministry head", "Director"];

  handleSelectedRole = (e) => {
    this.setState({
      role: [e.target.value]
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

  addWorker = async (e) => {
    console.log("here");
    e.preventDefault();
    // let worker_d =
    //   await this.props.worker.workers.filter(w => w._id === this.state.worker)[0];
    // console.log("worker_d", worker_d);
    console.log("this.props.logged_in_user", this.props.logged_in_user);
    const newWorker = {
      worker: '',
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      phone_num: this.state.phone_num,
      ministry_arm: this.state.ministry_arms,
      role: this.state.role,
      email_address: this.state.email_address,
      user_id: this.props.logged_in_user._id ? this.props.logged_in_user._id : this.props.logged_in_user.id,
    };

    if (newWorker.first_name && newWorker.last_name
      //&& newWorker.phone_num
      // && newWorker.ministry_arm.length 
      && newWorker.role
    ) {
      this.props.addWorker(newWorker);
    }
    //this.toggleAddWorkerModal();
  };

  componentDidMount() {
    if (this.props.worker.worker.length > 0) {
      let worker = this.props.worker.worker[0];
      console.log("worker", worker);
      this.setState({
        first_name: worker.first_name,
        middle_name: worker.middle_name,
        last_name: worker.last_name,
        phone_num: worker.phone_num,
        ministry_arms: worker.ministry_arm,
        role: worker.role,
        email_address: worker.email_address,
        user_id: this.props.logged_in_user,
      })
    }



  }

  async UNSAFE_componentWillMount() {
    //await this.props.getWorkers();
    //await this.props.getWorkers();
  }

  resetFields = () => {
    this.setState({
      first_name: "",
      middle_name: "",
      last_name: "",
      phone_num: "",
      role: "",
      email_address: "",
      ministry_arms: []
    })
  }

  editWorker = async (e) => {
    e.preventDefault();

    const user = {
      worker: '',
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      phone_num: this.state.phone_num,
      ministry_arm: this.state.ministry_arms,
      role: this.state.role,
      email_address: this.state.email_address,
      user_id: this.props.logged_in_user._id ? this.props.logged_in_user._id : this.props.logged_in_user.id,
    };
    console.log("this.state.worker_id", this.state.worker_id);
    this.props.editWorker(this.state.worker_id, user);
  };



  async componentDidUpdate(prevProps) {
    if (toggleEditWorkerModal) {
      await this.handleMinistryArmMultiSelect()
    }
    if (prevProps.worker.worker != this.props.worker.worker) {
      let worker = this.props.worker.worker[0];
      console.log("worker", worker);
      this.setState({
        worker_id: worker._id,
        first_name: worker.first_name,
        middle_name: worker.middle_name,
        last_name: worker.last_name,
        phone_num: worker.phone_num,
        ministry_arms: worker.ministry_arm,
        role: worker.role,
        email_address: worker.email_address,
        user_id: this.props.logged_in_user,
      })
    }

    const { error, addWorkerSuccess, deleteWorkerSuccess, editWorkerSuccess } = this.props;

    if (error !== prevProps.error) {
      console.log("error", error);
      if (error.id
      ) {
        this.props.showFailToast(error.msg.msg)
      }
    }

    if (addWorkerSuccess) {
      console.log("in here");
      this.props.resetAddWorker();
      this.props.getWorkers();
      this.toggleAddWorkerModal();
      this.props.showAddWorkerSuccessToast();
    }
    if (deleteWorkerSuccess) {
      this.props.resetDeleteWorker();
      this.props.getWorkers();
      this.props.showDeleteWorkerSuccessToast()
    }
    if (editWorkerSuccess) {
      this.toggleEditWorkerModal();
      this.props.resetEditWorker();
      this.props.getWorkers();
      this.props.showEditWorkerSuccessToast()
    }
  }

  handleMinistryArmMultiSelect() {
    console.log("this.props.ministry_arm", this.props.ministry_arm);
    let ministry_arms = this.props.ministry_arm
      ? this.props.ministry_arm.map(m => m.name) : [];

    if (ministry_arms.length > 0) {
      for (let i = 0; i < ministry_arms.length; i++) {
        console.log("ministry_arms[i]", ministry_arms[i]);
        this.state.ministry_arms_children.push(<Option key={ministry_arms[i]}>{ministry_arms[i]}</Option>);
      }
    }
  }

  render() {
    const { workers, isEditWorkerModalOpen, isViewWorkerModalOpen, worker } = this.props.worker;
    // const { workers } = this.props.worker;
    const allWorkerProps = {
      workers,
      isAuthenticated: this.props.isAuthenticated,
      workers
    };

    let worker_to_edit = worker ? worker[0] : "";

    console.log("this.state", this.state);
    // console.log("this.props.logged_in_user", this.props.logged_in_user);
    console.log("this.props", this.props);
    console.log("this.state.ministry_arms_children", this.state.ministry_arms_children);

    return (
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>

          <div className="row workers-row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <Button
                className={
                  `btn btn-primary btn-workers font-size--14 ${this.state.openTab === "all-workers" && "active-btn"}`
                }
                onClick={() => {
                  this.toggleAddWorkerModal();
                  this.handleMinistryArmMultiSelect()
                }
                }
                id="all-workers"
              >
                Add Worker
              </Button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
            </div>
          </div>

          <Card>
            <CardBody> {
              workers.length > 0 &&
              <AllWorkers
                allWorkerProps={allWorkerProps}
              />
            }

            </CardBody>
          </Card>
        </GridItem>
        <Modal
          open={this.state.isAddWorkerModalOpen}
          onClose={this.toggleAddWorkerModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="add-worker-paper paper modal-style">
            <MDBModalHeader>Add Worker</MDBModalHeader>
            <button onClick={this.toggleAddWorkerModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-worker-form mt-15" onSubmit={this.addWorker}>
              <div className="row">
                <div className="col-md-12">
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Please select ministry arm(s)"
                    // defaultValue={['a10', 'c12']}
                    onChange={this.handleSelectedMinistryArms}
                    style={{ width: '100%' }}
                    getPopupContainer={node => node.parentNode}
                  >
                    {this.state.ministry_arms_children}
                  </Select>
                </div>

              </div>

              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" name="first_name" id="first_name"
                    placeholder="Enter First Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <input className="form-control" name="middle_name" id="middle_name"
                    placeholder="Enter Middle Name"
                    onChange={this.handleChange} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" name="last_name" id="last_name"
                    placeholder="Enter Last Name"
                    onChange={this.handleChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" name="email_address" id="email_address"
                    placeholder="Enter Email Address"
                    onChange={this.handleChange} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" name="phone_num" id="phone_num"
                    placeholder="Enter Phone Number"
                    onChange={this.handleChange} />
                </div>
                <div className="col-md-4">

                  <select
                    name="worker"
                    id="worker-worker"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedRole(e);

                    }
                    }
                    value={this.state.role ?
                      this.state.role
                      : ""
                    }
                  >
                    <option value="">
                      Select role
                    </option>

                    {this.roles.map(w => <option value={w}>
                      {w}
                    </option>)}
                  </select>

                </div>
              </div>

              <div className="col-md-12 row mt-15 btns-row">
                <button
                  className="add btn-save btn-primary mr-5
        "
                  type="submit"
                >
                  Add
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={() => {
                    this.toggleAddWorkerModal()
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
          open={isEditWorkerModalOpen}
          onClose={this.toggleEditWorkerModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Edit Worker</MDBModalHeader>
            <button onClick={this.toggleEditWorkerModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-worker-form" onSubmit={this.editWorker}>

              <div className="row">
                <div className="col-md-12">
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Please select ministry arm(s)"
                    value={this.state.ministry_arms}
                    onChange={
                      this.handleSelectedMinistryArms
                    }
                    style={{ width: '100%' }}
                    getPopupContainer={node => node.parentNode}
                  >
                    {this.state.ministry_arms_children}
                  </Select>
                </div>

              </div>

              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" name="first_name" id="first_name"
                    placeholder="Enter First Name"
                    value={this.state.first_name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <input className="form-control" name="middle_name" id="middle_name"
                    placeholder="Enter Middle Name"
                    value={this.state.middle_name}
                    onChange={this.handleChange} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" name="last_name" id="last_name"
                    placeholder="Enter Last Name"
                    value={this.state.last_name}
                    onChange={this.handleChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" name="email_address" id="email_address"
                    placeholder="Enter Email Address"
                    value={this.state.email_address}
                    onChange={this.handleChange} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" name="phone_num" id="phone_num"
                    placeholder="Enter Phone Number"
                    value={this.state.phone_num}
                    onChange={this.handleChange} />
                </div>
                <div className="col-md-4">

                  <select
                    name="worker"
                    id="worker-worker"
                    defaultValue={this.state.role}
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedRole(e);

                    }
                    }
                    value={this.state.role ?
                      this.state.role
                      : ""
                    }
                  >
                    <option value="">
                      Select role
                    </option>

                    {this.roles.map(w => <option value={w}>
                      {w}
                    </option>)}
                  </select>

                </div>
              </div>

              <div className="col-md-12 row mt-15 btns-row">
                <button
                  className="add btn-save btn-primary mr-5
        "
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={() => {
                    this.toggleEditWorkerModal()
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
          open={isViewWorkerModalOpen}
          onClose={this.toggleViewWorkerModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>View Worker</MDBModalHeader>
            <button onClick={this.toggleViewWorkerModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-worker-form" onSubmit={this.editWorker}>
              <div className="worker-badge-div">
                <div className="worker-badge">
                  <label htmlFor="file">
                    <img
                      id="badge-img"
                      alt="badge"
                      src={worker_to_edit ? worker_to_edit.iconUrl : CameraIcon}
                    />

                  </label>
                </div>
                <h5>Worker Badge</h5>
              </div>
              <div className="row">
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Worker Name</label>
                  <input
                    className="form-control"
                    placeholder="Worker Name"
                    name="name"
                    value={worker_to_edit ? worker_to_edit.name : ""}
                    readOnly={true}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Display Name</label>
                  <input
                    className="form-control"
                    placeholder="Worker Name"
                    name="abbr"
                    value={worker_to_edit ? worker_to_edit.abbr : ""}
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
                    value={worker_to_edit ? worker_to_edit.city : ""}
                  />

                </div>

                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Status</label>
                  <select
                    name="worker-status"
                    id="worker-status"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedRole(e);
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
                      this.toggleViewWorkerModal();
                      this.toggleEditWorkerModal();
                    }
                  }

                  type="submit"
                >
                  Edit
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={this.toggleViewWorkerModal}
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

const AllWorkers = ({ allWorkerProps }) => {
  const { isAuthenticated } = allWorkerProps;
  let workersArray = allWorkerProps.workers;

  let data = workersArray.map((worker) => {
    return {
      first_name: `${worker.first_name}`,
      middle_name: worker.middle_name,
      last_name: worker.last_name,
      phone_num: worker.phone_num,
      role: worker.role,
      ministry_arms: `${worker.ministry_arm.map(m => m, ",  ")}`,

      action: isAuthenticated ? (
        <ActionButton data={{ id: worker._id, url: "/workers/" }} />
      ) : null,
    };
  });

  const datatable = {
    columns: [
      {
        label: "First Name",
        field: "first_name",
        width: 150,
        workerributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Middle Name",
        field: "middle_name",
        width: 150,
        workerributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Last Name",
        field: "last_name",
        width: 150,
        workerributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Phone Num",
        field: "phone_num",
        width: 270,
      },
      {
        label: "Role",
        field: "role",
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
  worker: state.fetchData,
  ministry_arm: state.fetchData.ministryArms,
  isAuthenticated: state.auth.isAuthenticated,
  worker: state.fetchData,
  error: state.error,
  toast: state.toast,
  logged_in_user: state.auth.user,
  addWorkerSuccess: state.fetchData.addWorkerSuccess,
  editWorkerSuccess: state.fetchData.editWorkerSuccess,
  deleteWorkerSuccess: state.fetchData.deleteWorkerSuccess
});

export default connect(mapStateToProps, {
  getWorkers,
  getWorker,
  editWorker,
  deleteWorker,
  addWorker,
  toggleEditWorkerModal,
  toggleViewWorkerModal,
  getWorkers,

  resetAddWorker,
  resetEditWorker,
  resetDeleteWorker,

  showAddWorkerSuccessToast,
  showEditWorkerSuccessToast,
  showDeleteWorkerSuccessToast,
  showAddWorkerFailToast,
  showEditWorkerFailToast,
  showDeleteWorkerFailToast,

  showFailToast,
  showSuccessToast

})(Workers);