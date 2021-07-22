import React, { Component } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { MDBDataTableV5, MDBModalHeader } from "mdbreact";
import Modal from "@material-ui/core/Modal";

import ActionButton from "../Actions";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { register, resetRegister } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";

import {
    getUsers,
    //addUser,
    deleteUser,
    editUser,
    getUser,
    toggleEditUserModal,
    toggleViewUserModal,
    getUserRoles,
    resetEditUser,
    resetDeleteUser,
}
    from "../../actions/userActions";

import { login } from "../../actions/authActions";

import {
    showAddUserSuccessToast,
    showEditUserSuccessToast,
    showDeleteUserSuccessToast,
    showFailToast,
} from "../../actions/toastActions";

import Toast from "../../components/toast/Toast"

class Users extends Component {
    state = {
        isAddUserModalOpen: false,
        isActionsOpen: false,
        username: "",
        email: "",
        role: "",
        password: "",
        msg: null,
        id: ""
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        getUsers: PropTypes.func,
        getUser: PropTypes.func,
        user: PropTypes.object,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.toggleActionsDropDown = this.toggleActionsDropDown.bind(this)
    }

    roles = [
        "superadmin",
        "admin",
        "worker"
    ]
    toggleAddUserModal = () => {
        this.setState({
            isAddUserModalOpen: !this.state.isAddUserModalOpen
        })
    };

    toggleEditUserModal = () => {
        this.props.toggleEditUserModal();
    }

    toggleViewUserModal = () => {
        this.props.toggleViewUserModal();
    }

    toggleActionsDropDown() {
        this.setState({
            isActionsOpen: !this.state.isActionsOpen
        })
    }

    onChange = (e) => {
        console.log("e", e)
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    editUser = async (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        };
        console.log("this.state.id", this.state.id);
        this.props.editUser(this.state.id, user);
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, role } = this.state;

        const newUser = {
            username,

            password,
            role
        };
        console.log("newUser", newUser);

        this.props.register(newUser);
    };

    componentDidUpdate(prevProps) {

        if (prevProps.user.user != this.props.user.user) {
            let user = this.props.user.user[0];
            this.setState({
                username: user.username,

                role: user.role,
                password: user.password,
                id: user._id
            })
        }

        const { error, registerSuccess, deleteUserSuccess, editUserSuccess } = this.props;
        if (error !== prevProps.error) {
            if (error.id
            ) {
                this.props.showFailToast(error.msg.msg)
            }
        }

        if (registerSuccess) {
            this.props.resetRegister();
            this.props.getUsers();
            this.toggleAddUserModal();
            this.props.showAddUserSuccessToast();
        }

        if (editUserSuccess) {
            this.toggleEditUserModal();
            this.props.resetEditUser();
            this.props.getUsers();
            this.props.showEditUserSuccessToast();
        }

        if (deleteUserSuccess) {
            this.props.resetDeleteUser();
            this.props.getUsers();
            this.props.showDeleteUserSuccessToast()
        }

    }

    handleSelectedRole = (e) => {
        console.log("e.target.value", e.target.value);
        this.setState({
            role: e.target.value
        })
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getUserRoles();
    }

    render() {
        const { users, isEditUserModalOpen, isViewUserModalOpen, user, roles } = this.props.user;

        const userProps = {
            users,
            isAuthenticated: this.props.isAuthenticated
        }

        let user_selected = user ? user[0] : "";

        console.log("roles", roles)

        return (
            <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader className="uni-header" color="primary">
                            <h4 className="cardTitleWhite">Simple Table</h4>
                            <p className="">Here is a subtitle for this table</p>
                        </CardHeader>
                        <CardBody>
                            <div className="row universities-row users-row">
                                <div className="col-xs-6 col-sm-6 col-md-6 add-user">
                                    {this.props.auth.user != null && this.props.auth.user.role != undefined
                                        ?
                                        this.props.auth.user.role[0] == "superadmin" && (
                                            <Button
                                                className="btn btn-primary btn-add"
                                                id="add-uni"
                                                onClick={() => {
                                                    this.toggleAddUserModal();
                                                }}
                                            >
                                                Add User
                                            </Button>
                                        )
                                        // : (
                                        //         <h4 className="mb-3 ml-4">Please login to manage users</h4>
                                        //     )
                                        : console.log("this.props.auth.user is either null or does not have defined role",
                                            this.props.auth.user)}

                                </div>
                            </div>
                            <AllUsers
                                userProps={userProps}
                            />

                        </CardBody>
                    </Card>
                </GridItem>
                <Modal
                    open={this.state.isAddUserModalOpen}
                    onClose={this.toggleAddUserModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="paper modal-style">
                        <MDBModalHeader>Add User</MDBModalHeader>
                        <button onClick={this.toggleAddUserModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
                        <form className="add-uni-form" onSubmit={this.onSubmit}>
                            <div className="row padding-top--16">
                                {this.state.msg ? <h5 className="err">{this.state.msg}</h5> : null}

                                <div className="col-md-6 padding-bottom--16">
                                    <label className="form-label">Username</label>
                                    <input
                                        className="form-control"
                                        placeholder="Username"
                                        name="username"
                                        type="text"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-md-6 padding-bottom--16">
                                    <label className="form-label">Role</label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="form-control"
                                        onChange={(e) => this.handleSelectedRole(e)}
                                        value={this.state.role ?
                                            this.state.role
                                            : ""
                                        }

                                    >
                                        <option value="">
                                            - Select -
                                        </option>

                                        {this.roles && this.roles.map(role => {
                                            return <option value={role}>{role}</option>
                                        })}


                                    </select>
                                </div>

                                <div className="col-md-6 padding-bottom--16">
                                    <label for="password">Password</label>
                                    <input
                                        className="form-control"
                                        name="password"
                                        type="password"
                                        placeholder="Create your password"
                                        onChange={this.onChange}
                                    />
                                </div>

                            </div>
                            <div className="col-md-12 row mt-15 btns-row">
                                <button
                                    className="add btn-save btn-primary mr-5"
                                    type="submit"
                                >
                                    Add</button>
                                <button
                                    className="btn-cancel btn btn-primary"
                                    onClick={
                                        () => {
                                            this.toggleAddUserModal();
                                            this.setState({
                                                msg: null
                                            })
                                        }
                                    }
                                    type="button"
                                >
                                    Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <Modal
                    open={isEditUserModalOpen}
                    onClose={this.toggleEditUserModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="paper modal-style">
                        <MDBModalHeader>Edit User</MDBModalHeader>
                        <button onClick={this.toggleEditUserModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
                        <form className="add-uni-form" onSubmit={this.editUser}>
                            <div className="row padding-top--16">
                                {this.state.msg ? <h5 className="err">{this.state.msg}</h5> : null}

                                <div className="col-md-6 padding-bottom--16">
                                    <label className="form-label">Username</label>
                                    <input
                                        className="form-control"
                                        placeholder="Username"
                                        name="username"
                                        type="text"
                                        value={this.state.username ? this.state.username : ""}
                                        onChange={this.onChange}
                                    />
                                </div>
                                {this.props.auth.user.role[0] == "superadmin" &&
                                    <div className="col-md-6 padding-bottom--16">
                                        <label className="form-label">Role</label>
                                        <select
                                            name="role"
                                            id="role"
                                            className="form-control"
                                            onChange={(e) => this.handleSelectedRole(e)}

                                            value={this.state.role ? this.state.role : ""}
                                            onChange={(e) => {
                                                this.onChange(e);
                                            }}
                                        >
                                            <option value="" defaultValue="selected">
                                                - Select -
                                            </option>

                                            {this.roles && this.roles.map(role => {
                                                return <option value={role}>{role}</option>
                                            })}
                                        </select>
                                    </div>
                                }
                                {/* <div className="col-md-6">
                                    <label for="password">Password</label>
                                    <input
                                        className="form-control"
                                        name="password"
                                        type="password"
                                        placeholder="Create your password"
                                        onChange={this.onChange}
                                    />
                                </div> */}

                            </div>
                            <div className="col-md-12 row mt-15 btns-row">
                                <button
                                    className="add btn-save btn-primary mr-5"
                                    type="submit"
                                >
                                    Update</button>
                                <button
                                    className="btn-cancel btn btn-primary"
                                    onClick={
                                        () => {
                                            this.toggleEditUserModal();
                                            this.setState({
                                                msg: null
                                            })
                                        }
                                    }
                                    type="button"
                                >
                                    Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal
                    open={isViewUserModalOpen}
                    onClose={this.toggleViewUserModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="paper modal-style">
                        <MDBModalHeader>View User</MDBModalHeader>
                        <button onClick={this.toggleViewUserModal} type="button" class="close"><span aria-hidden="true" className="x">×</span><span class="sr-only">Close</span></button>
                        <form className="add-uni-form">
                            <div className="row padding-top--16">
                                {this.state.msg ? <h5 className="err">{this.state.msg}</h5> : null}
                                <div className="col-md-6 padding-bottom--16">

                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-control"
                                        placeholder="Email Address"
                                        name="email"
                                        type="email"
                                        value={user_selected ? user_selected.email : ""}
                                        readOnly={true}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-md-6 padding-bottom--16">
                                    <label className="form-label">Username</label>
                                    <input
                                        className="form-control"
                                        placeholder="Username"
                                        name="username"
                                        type="text"
                                        value={user_selected ? user_selected.username : ""}
                                        readOnly={true}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-md-6 padding-bottom--16">
                                    <label className="form-label">Role</label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="form-control"
                                        value={user_selected ? user_selected.role : ""}
                                        readOnly={true}
                                        onChange={(e) => this.handleSelectedRole(e)}

                                    // onChange={() => {
                                    //   this.onChange();
                                    // }}
                                    >
                                        <option value="" defaultValue="selected">
                                            - Select -
                                        </option>
                                        {roles && roles.map(role => {
                                            return <option value={role.name}>{role.title}</option>
                                        })}
                                    </select>
                                </div>

                            </div>
                            <div className="col-md-12 row mt-15 btns-row">
                                <button
                                    className="add btn-save btn-primary mr-5"
                                    type="button"
                                    onClick={this.toggleViewUserModal}
                                >
                                    Cancel</button>

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
};

const AllUsers = ({ userProps }) => {

    const { isAuthenticated } = userProps;
    let usersArray = userProps.users;
    let data = usersArray.map((user) => {

        return {
            username: user.username,
            role: user.role[0],
            action:
                isAuthenticated ? (
                    <ActionButton data={{ id: user._id, url: "/users/" }} />
                ) : null

        }
    });

    let datatable = {
        columns: [

            {
                label: "Username",
                field: "username",
                width: 150
            },
            {
                label: "Role",
                field: "role",
                width: 150
            },
            {
                label: "Action",
                field: "action",
                sort: "disabled",
                width: 100,
            },
        ],
        rows: data
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


}

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    //registerSuccess: state.auth.registerSuccess,
    registerSuccess: state.user.registerSuccess,
    editUserSuccess: state.user.editUserSuccess,
    deleteUserSuccess: state.user.deleteUserSuccess,
    error: state.error,
    toast: state.toast
});

export default connect(mapStateToProps, {
    getUsers,
    getUser,
    deleteUser,
    //addUser,
    editUser,
    register,
    clearErrors,
    resetRegister,
    resetDeleteUser,
    resetEditUser,
    toggleEditUserModal,
    toggleViewUserModal,
    getUserRoles,
    showAddUserSuccessToast,
    showEditUserSuccessToast,
    showDeleteUserSuccessToast,
    showFailToast,
})(Users);