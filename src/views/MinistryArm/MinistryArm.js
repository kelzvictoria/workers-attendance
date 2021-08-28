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
  getMinistryArms,
  deleteMinistryArm,
  addMinistryArm,
  getMinistryArm,
  editMinistryArm,
  toggleEditMAModal,
  toggleViewMAModal,
  resetAddMA,
  resetEditMA,
  resetDeleteMA
} from "../../actions/fetchDataActions";

import {
  showAddMASuccessToast,
  showEditMASuccessToast,
  showDeleteMASuccessToast,
  showAddMAFailToast,
  showEditMAFailToast,
  showDeleteMAFailToast,

  showFailToast,
  showSuccessToast
} from "../../actions/toastActions";
import Toast from "../../components/toast/Toast"

import Details from "./Details";

import logo from "../../assets/img/logo.png"
const { Option } = Select;

class MinistryArms extends Component {
  state = {
    openTab: "all-ministry_arms",
    isAddMinistryArmModalOpen: false,
    isViewMAModalOpen: false,
    name: "",
    directorate_id: "",
    ministry_head: "",
    ministry_arm_id: "",
    directorate_details: "",
    ministry_head_details: ""
  };

  constructor(props) {
    super(props);
    this.toggleActionsDropdown = this.toggleActionsDropdown.bind(this);
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

  toggleAddMinistryArmModal = () => {
    this.setState({
      isAddMinistryArmModalOpen: !this.state.isAddMinistryArmModalOpen,
    });
  };

  toggleEditMAModal = async () => {
    //if (!this.state.ministry_arms_children.length) {
    //this.handleMinistryArmMultiSelect();
    // }
    this.props.toggleEditMAModal();
  };

  toggleViewMAModal = () => {
    this.props.toggleViewMAModal();
  };

  handleSelectedDirectorate = (e) => {
    this.setState({
      directorate_id: e.target.value,
      directorate_details: this.props.directorates
        .filter(d => d._id === e.target.value)[0]
    })
  }

  handleSelectedMinistryHead = (e) => {
    this.setState({
      ministry_head: e.target.value,
      ministry_head_details: this.props.workers
        .filter(w => w._id === e.target.value)[0]
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

  addMinistryArm = async (e) => {
    console.log("here");
    e.preventDefault();
    console.log("this.props.logged_in_user", this.props.logged_in_user);
    const newMinistryArm = {
      name: this.state.name,
      ministry_head: this.state.ministry_head,
      ministry_head_details: this.state.ministry_head_details,
      directorate_id: this.state.directorate_id,
      directorate_details: this.state.directorate_details,
      user_id: this.props.logged_in_user._id ? this.props.logged_in_user._id : this.props.logged_in_user.id,
    };

    if (newMinistryArm.name && newMinistryArm.ministry_head && newMinistryArm.directorate_id) {
      this.props.addMinistryArm(newMinistryArm);
    }
    //this.toggleAddMinistryArmModal();
  };

  componentDidMount() {
    if (this.props.ministry_arm.length > 0) {
      let ministry_arm = this.props.ministry_arm[0];
      this.setState({
        name: this.state.name,
        ministry_head: this.state.ministry_head,
        ministry_head_details: this.state.ministry_head_details,
        directorate_details: this.state.directorate_details,
        directorate_id: this.state.directorate_id,
        directorate_details: this.state.directorate_details,
        user_id: this.props.logged_in_user
      })
    }
  }

  async UNSAFE_componentWillMount() {
    //await this.props.getMinistryArms();
    //await this.props.getMinistryArms();
  }

  resetFields = () => {
    this.setState({
      name: "",
      ministry_head: "",
      directorate: "",
    })
  }

  editMinistryArm = async (e) => {
    e.preventDefault();

    const ministry_arm = {
      name: this.state.name,
      directorate_id: this.state.directorate_id,
      ministry_head: this.state.ministry_head,
      user_id: this.props.logged_in_user._id ? this.props.logged_in_user._id : this.props.logged_in_user.id,
      ministry_head_details: this.state.ministry_head_details,
      directorate_details: this.state.directorate_details,
    };

    console.log("this.state.ministry_arm_id", this.state.ministry_arm_id);
    this.props.editMinistryArm(this.state.ministry_arm_id, ministry_arm);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.ministry_arm != this.props.ministry_arm) {
      let ministry_arm = this.props.ministry_arm[0];
      console.log("ministry_arm", ministry_arm);
      this.setState({
        name: this.state.name,
        directorate_id: this.state.directorate_id,
        ministry_head: this.state.ministry_head,
        user_id: this.props.logged_in_user,
        ministry_head_details: this.state.ministry_head_details,
        directorate_details: this.state.directorate_details,
      })
    }

    const { error, addMASuccess, deleteMASuccess, editMASuccess } = this.props;

    if (error !== prevProps.error) {
      console.log("error", error);
      if (error.id
      ) {
        this.props.showFailToast(error.msg.msg)
      }
    }

    if (addMASuccess) {
      console.log("in here");
      this.props.resetAddMA();
      this.props.getMinistryArms();
      this.toggleAddMinistryArmModal();
      this.props.showAddMASuccessToast();
    }
    if (deleteMASuccess) {
      this.props.resetDeleteMA();
      this.props.getMinistryArms();
      this.props.showDeleteMASuccessToast()
    }
    if (editMASuccess) {
      this.toggleEditMAModal();
      this.props.resetEditMA();
      this.props.getMinistryArms();
      this.props.showEditMASuccessToast()
    }
  }

  render() {
    const { ministry_arms, isEditMinistryArmModalOpen, isViewMAModalOpen, ministry_arm, ministry_arm_workers } = this.props;
    // const { ministry_arms } = this.props.ministry_arm;
    const allMinistryArmProps = {
      ministry_arms,
      isAuthenticated: this.props.isAuthenticated,
      ministry_arms
    };

    let ministry_arm_to_view = ministry_arm ? ministry_arm[0] : "";
    console.log("ministry_arm_workers", ministry_arm_workers);

    console.log("this.state", this.state);
    // console.log("this.props.logged_in_user", this.props.logged_in_user);
    console.log("this.props", this.props);

    return (
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>

          <div className="row ministry_arms-row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <Button
                className={
                  `btn btn-primary btn-ministry_arms font-size--14 ${this.state.openTab === "all-ministry_arms" && "active-btn"}`
                }
                onClick={() => {
                  this.toggleAddMinistryArmModal();
                }
                }
                id="all-ministry_arms"
              >
                Add MinistryArm
              </Button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
            </div>
          </div>

          <Card>
            <CardBody> {
              ministry_arms.length > 0 &&
              <AllMinistryArms
                allMinistryArmProps={allMinistryArmProps}
              />
            }

            </CardBody>
          </Card>
        </GridItem>
        <Modal
          open={this.state.isAddMinistryArmModalOpen}
          onClose={this.toggleAddMinistryArmModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="add-ministry_arm-paper paper modal-style">
            <MDBModalHeader>Add MinistryArm</MDBModalHeader>
            <button onClick={this.toggleAddMinistryArmModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-ministry_arm-form mt-15" onSubmit={this.addMinistryArm}>
              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" name="name" id="name"
                    placeholder="Enter Ministry Arm Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-4">

                  <select
                    name="directorate_id"
                    id="directorate_id"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedDirectorate(e);

                    }
                    }


                  >
                    <option value="">
                      Select directorate
                    </option>

                    {this.props.directorates.map(d => <option value={d._id}>
                      {d.name}
                    </option>)}
                  </select>

                </div>
                <div className="col-md-4">

                  <select
                    name="ministry_head"
                    id="ministry_head"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedMinistryHead(e);
                    }}
                  >
                    <option value="">
                      Select ministry head
                    </option>

                    {this.props.workers.map(w => <option value={w._id}>
                      {w.first_name + " " + w.last_name}
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
                    this.toggleAddMinistryArmModal()
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
          open={isEditMinistryArmModalOpen}
          onClose={this.toggleEditMAModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Edit MinistryArm</MDBModalHeader>
            <button onClick={this.toggleEditMAModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-ministry_arm-form" onSubmit={this.editMinistryArm}>
              <div className="row">
                <div className="col-md-4">
                  <input className="form-control" name="name" id="name"
                    placeholder="Enter Ministry Arm Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-4">

                  <select
                    name="directorate_id"
                    id="directorate_id"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedDirectorate(e);

                    }
                    }
                    value={this.state.directorate_id ?
                      this.state.directorate_id
                      : ""
                    }
                  >
                    <option value="">
                      Select directorate
                    </option>

                    {this.props.directorates.map(d => <option value={d._id}>
                      {d.name}
                    </option>)}
                  </select>

                </div>
                <div className="col-md-4">

                  <select
                    name="ministry_head"
                    id="ministry_head"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedMinistryHead(e);

                    }
                    }
                    value={this.state.ministry_head ?
                      this.state.ministry_head
                      : ""
                    }
                  >
                    <option value="">
                      Select ministry head
                    </option>

                    {this.props.workers.map(w => <option value={w._id}>
                      {w.first_name + " " + w.last_name}
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
                    this.toggleEditMAModal()
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

const AllMinistryArms = ({ allMinistryArmProps }) => {
  const { isAuthenticated } = allMinistryArmProps;
  let ministry_armsArray = allMinistryArmProps.ministry_arms;

  let data = ministry_armsArray.map((ministry_arm) => {
    return {
      name: `${ministry_arm.name}`,
      directorate: ministry_arm.directorate_details.name,
      ministry_head: ministry_arm.ministry_head_details.first_name + " " + ministry_arm.ministry_head_details.last_name,

      action: isAuthenticated ? (
        <ActionButton data={{ id: ministry_arm._id, url: "/ministry-arms/" }} />
      ) : null,
    };
  });

  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        ministry_armributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Head",
        field: "ministry_head",
        width: 150,
        ministry_armributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Directorate",
        field: "directorate",
        width: 150,
        ministry_armributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
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

const MinistryArmWorkers = ({workers}) => {
  console.log("workers", workers);
  let workersArray = workers;

  let data = workersArray.map((worker) => {
    return {
      first_name: `${worker.first_name}`,
      middle_name: worker.middle_name,
      last_name: worker.last_name,
      phone_num: worker.phone_num,
      role: worker.role,
      ministry_arms: `${worker.ministry_arm.map(m => m, ",  ")}`,

      action: 
     // isAuthenticated ? (
        <ActionButton data={{ id: worker._id, url: "/workers/" }} />
     // ) : null,
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
      entries={10}
      pchangesamount={4}
      data={datatable}
      pagingTop
      searchTop
      searchBottom={false}
    />
  );
};


const mapStateToProps = (state) => ({
  ministry_arms: state.fetchData.ministryArms,
  ministry_arm: state.fetchData.ministryArm,
  isAuthenticated: state.auth.isAuthenticated,
  directorates: state.fetchData.directorates,
  workers: state.fetchData.workers,
  error: state.error,
  toast: state.toast,
  isViewMAModalOpen: state.fetchData.isViewMAModalOpen,
  logged_in_user: state.auth.user,
  addMASuccess: state.fetchData.addMASuccess,
  editMASuccess: state.fetchData.editMASuccess,
  deleteMASuccess: state.fetchData.deleteMASuccess,
  ministry_arm_workers: state.fetchData.ministry_arm_workers
});

export default connect(mapStateToProps, {
  getMinistryArms,
  getMinistryArm,
  editMinistryArm,
  deleteMinistryArm,
  addMinistryArm,
  toggleEditMAModal,
  toggleViewMAModal,
  getMinistryArms,

  resetAddMA,
  resetEditMA,
  resetDeleteMA,

  showAddMASuccessToast,
  showEditMASuccessToast,
  showDeleteMASuccessToast,
  showAddMAFailToast,
  showEditMAFailToast,
  showDeleteMAFailToast,

  showFailToast,
  showSuccessToast

})(MinistryArms);