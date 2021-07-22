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
  getDirectorates,
  deleteDirectorate,
  addDirectorate,
  getDirectorate,
  editDirectorate,
  toggleEditDirectorateModal,
  toggleViewDirectorateModal,
  resetAddDirectorate,
  resetEditDirectorate,
  resetDeleteDirectorate
} from "../../actions/fetchDataActions";

import {
  showAddDirectorateSuccessToast,
  showEditDirectorateSuccessToast,
  showDeleteDirectorateSuccessToast,
  showAddDirectorateFailToast,
  showEditDirectorateFailToast,
  showDeleteDirectorateFailToast,

  showFailToast,
  showSuccessToast
} from "../../actions/toastActions";
import Toast from "../../components/toast/Toast"

import logo from "../../assets/img/logo.png"
const { Option } = Select;

class Directorates extends Component {
  state = {
    openTab: "all-directorates",
    isAddDirectorateModalOpen: false,
    name: "",
    directorate_id: "",
    director: "",
    directorate_details: "",
    director_details: ""
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

  toggleAddDirectorateModal = () => {
    this.setState({
      isAddDirectorateModalOpen: !this.state.isAddDirectorateModalOpen,
    });
  };

  toggleEditDirectorateModal = async () => {
    //if (!this.state.directorates_children.length) {
    //this.handleDirectorateMultiSelect();
    // }
    this.props.toggleEditDirectorateModal();
  };

  toggleViewDirectorateModal = () => {
    this.props.toggleViewDirectorateModal();
  };


  handleSelectedDirector = (e) => {
    this.setState({
      director: e.target.value,
      director_details: this.props.workers
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

  addDirectorate = async (e) => {
    console.log("here");
    e.preventDefault();
    console.log("this.props.logged_in_user", this.props.logged_in_user);
    const newDirectorate = {
      name: this.state.name,
      director: this.state.director,
      director_details: this.state.director_details,

      user_id: this.props.logged_in_user._id ? this.props.logged_in_user._id : this.props.logged_in_user.id,
    };

    if (newDirectorate.name && newDirectorate.director) {
      this.props.addDirectorate(newDirectorate);
    }
  };

  componentDidMount() {
    if (this.props.directorate.length > 0) {
      let directorate = this.props.directorate[0];
      this.setState({
        name: this.state.name,
        director: this.state.director,
        director_details: this.state.director_details,
        user_id: this.props.logged_in_user
      })
    }
  }

  async UNSAFE_componentWillMount() {
    //await this.props.getDirectorates();
    //await this.props.getDirectorates();
  }

  resetFields = () => {
    this.setState({
      name: "",
      director: "",
    })
  }

  editDirectorate = async (e) => {
    e.preventDefault();

    const directorate = {
      name: this.state.name,
      director: this.state.director,
      director_details: this.state.director_details,
      user_id: this.props.logged_in_user
    };

    console.log("this.state.directorate_id", this.state.directorate_id);
    this.props.editDirectorate(this.state.directorate_id, directorate);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.directorate != this.props.directorate) {
      let directorate = this.props.directorate[0];
      console.log("directorate", directorate);
      this.setState({
        name: this.state.name,
        director: this.state.director,
        director_details: this.state.director_details,
        user_id: this.props.logged_in_user
      })
    }

    const { error, addDirectorateSuccess, deleteDirectorateSuccess, editDirectorateSuccess } = this.props;

    if (error !== prevProps.error) {
      console.log("error", error);
      if (error.id
      ) {
        this.props.showFailToast(error.msg.msg)
      }
    }

    if (addDirectorateSuccess) {
      console.log("in here");
      this.props.resetAddDirectorate();
      this.props.getDirectorates();
      this.toggleAddDirectorateModal();
      this.props.showAddDirectorateSuccessToast();
    }
    if (deleteDirectorateSuccess) {
      this.props.resetDeleteDirectorate();
      this.props.getDirectorates();
      this.props.showDeleteDirectorateSuccessToast()
    }
    if (editDirectorateSuccess) {
      this.toggleEditDirectorateModal();
      this.props.resetEditDirectorate();
      this.props.getDirectorates();
      this.props.showEditDirectorateSuccessToast()
    }
  }

  render() {
    const { directorates, isEditDirectorateModalOpen, isViewDirectorateModalOpen, directorate } = this.props;
    // const { directorates } = this.props.directorate;
    const allDirectorateProps = {
      directorates,
      isAuthenticated: this.props.isAuthenticated,
      directorates
    };

    let directorate_to_edit = directorate ? directorate[0] : "";

    console.log("this.state", this.state);
    // console.log("this.props.logged_in_user", this.props.logged_in_user);
    console.log("this.props", this.props);

    return (
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>

          <div className="row directorates-row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <Button
                className={
                  `btn btn-primary btn-directorates font-size--14 ${this.state.openTab === "all-directorates" && "active-btn"}`
                }
                onClick={() => {
                  this.toggleAddDirectorateModal();
                }
                }
                id="all-directorates"
              >
                Add Directorate
              </Button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
            </div>
          </div>

          <Card>
            <CardBody> {
              directorates.length > 0 &&
              <AllDirectorates
                allDirectorateProps={allDirectorateProps}
              />
            }

            </CardBody>
          </Card>
        </GridItem>
        <Modal
          open={this.state.isAddDirectorateModalOpen}
          onClose={this.toggleAddDirectorateModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="add-directorate-paper paper modal-style">
            <MDBModalHeader>Add Directorate</MDBModalHeader>
            <button onClick={this.toggleAddDirectorateModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-directorate-form mt-15" onSubmit={this.addDirectorate}>
              <div className="row">
                <div className="col-md-6">
                  <input className="form-control" name="name" id="name"
                    placeholder="Enter Directorate Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-6">

                  <select
                    name="director"
                    id="director"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedDirector(e);
                    }}
                  >
                    <option value="">
                      Select director
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
                    this.toggleAddDirectorateModal()
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
          open={isEditDirectorateModalOpen}
          onClose={this.toggleEditDirectorateModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>Edit Directorate</MDBModalHeader>
            <button onClick={this.toggleEditDirectorateModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-directorate-form" onSubmit={this.editDirectorate}>
              <div className="row">
                <div className="col-md-6">
                  <input className="form-control" name="name" id="name"
                    placeholder="Enter Directorate Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-6">

                  <select
                    name="director"
                    id="director"
                    className="form-control"
                    onChange={(e) => {
                      this.handleSelectedDirector(e);

                    }
                    }
                    value={this.state.director ?
                      this.state.director
                      : ""
                    }
                  >
                    <option value="">
                      Select director
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
                    this.toggleEditDirectorateModal()
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
          open={isViewDirectorateModalOpen}
          onClose={this.toggleViewDirectorateModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="paper modal-style">
            <MDBModalHeader>View Directorate</MDBModalHeader>
            <button onClick={this.toggleViewDirectorateModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
            <form className="add-directorate-form" onSubmit={this.editDirectorate}>
              <div className="directorate-badge-div">
                <div className="directorate-badge">
                  <label htmlFor="file">
                    <img
                      id="badge-img"
                      alt="badge"
                      src={directorate_to_edit ? directorate_to_edit.iconUrl : CameraIcon}
                    />

                  </label>
                </div>
                <h5>Directorate Badge</h5>
              </div>
              <div className="row">
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Directorate Name</label>
                  <input
                    className="form-control"
                    placeholder="Directorate Name"
                    name="name"
                    value={directorate_to_edit ? directorate_to_edit.name : ""}
                    readOnly={true}
                  />
                </div>
                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Display Name</label>
                  <input
                    className="form-control"
                    placeholder="Directorate Name"
                    name="abbr"
                    value={directorate_to_edit ? directorate_to_edit.abbr : ""}
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
                    value={directorate_to_edit ? directorate_to_edit.city : ""}
                  />

                </div>

                <div className="col-md-6 padding-bottom--16">
                  <label className="form-label">Status</label>
                  <select
                    name="directorate-status"
                    id="directorate-status"
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
                      this.toggleViewDirectorateModal();
                      this.toggleEditDirectorateModal();
                    }
                  }

                  type="submit"
                >
                  Edit
                </button>
                <button
                  className="btn-cancel btn btn-primary"
                  onClick={this.toggleViewDirectorateModal}
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

const AllDirectorates = ({ allDirectorateProps }) => {
  const { isAuthenticated } = allDirectorateProps;
  let directoratesArray = allDirectorateProps.directorates;

  let data = directoratesArray.map((directorate) => {
    return {
      name: `${directorate.name}`,
      director: directorate.director_details ? directorate.director_details.first_name + " " + directorate.director_details.last_name : "",

      action: isAuthenticated ? (
        <ActionButton data={{ id: directorate._id, url: "/directorates/" }} />
      ) : null,
    };
  });

  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        directorateributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Head",
        field: "director",
        width: 150,
        directorateributes: {
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


const mapStateToProps = (state) => ({
  directorates: state.fetchData.directorates,
  directorate: state.fetchData.directorate,
  isAuthenticated: state.auth.isAuthenticated,
  directorates: state.fetchData.directorates,
  workers: state.fetchData.workers,
  error: state.error,
  toast: state.toast,
  logged_in_user: state.auth.user,
  addDirectorateSuccess: state.fetchData.addDirectorateSuccess,
  editDirectorateSuccess: state.fetchData.editDirectorateSuccess,
  deleteDirectorateSuccess: state.fetchData.deleteDirectorateSuccess
});

export default connect(mapStateToProps, {
  getDirectorates,
  getDirectorate,
  editDirectorate,
  deleteDirectorate,
  addDirectorate,
  toggleEditDirectorateModal,
  toggleViewDirectorateModal,
  getDirectorates,

  resetAddDirectorate,
  resetEditDirectorate,
  resetDeleteDirectorate,

  showAddDirectorateSuccessToast,
  showEditDirectorateSuccessToast,
  showDeleteDirectorateSuccessToast,
  showAddDirectorateFailToast,
  showEditDirectorateFailToast,
  showDeleteDirectorateFailToast,

  showFailToast,
  showSuccessToast

})(Directorates);