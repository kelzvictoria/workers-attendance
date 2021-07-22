import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import logo from "../../assets/img/culconnect.png";

import { register, resetRegister } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";
import { Route, withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",

    msg: null,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };


  componentDidUpdate(prevProps) {
    const { error, isAuthenticated, registerSuccess } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (registerSuccess) {
      this.props.history.push("/admin/users");
      this.props.resetRegister();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;

    const newUser = {
      username,
      email,
      password,
    };

    this.props.register(newUser);
  };

  onChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="register-div">
        <form className="register-form" onSubmit={this.onSubmit}>
          <div className="col-md-12 row">
            <img src={logo} className="logo" alt="logo" />

            <h3 className="name">CulConnect</h3>
          </div>
          <div className="col-md-12">
            {this.state.msg ? <h5 className="err">{this.state.msg}</h5> : null}
            <label for="email">Email Address</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={this.onChange}
            />
          </div>
          <div className="col-md-12">
            <label for="username">Username</label>
            <input
              className="form-control"
              name="username"
              type="text"
              placeholder="Choose your username"
              onChange={this.onChange}
            />
          </div>
          <div className="col-md-12">
            <label for="password">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Create your password"
              onChange={this.onChange}
            />
          </div>

          <div className="col-md-12">
            <label>Enter password again</label>
            <input
              className="form-control"
              name="password-confirmation"
              type="password"
              placeholder="Retype your password"
              onBlur={this.comparePasswords}
            />
          </div>
          <div className="col-md-12">
            <button className="btn btn-primary" type="submit">
              Register
            </button>

            <a href="/login" className="link">
              Existing User? Login
            </a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerSuccess: state.auth.registerSuccess,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors, resetRegister })(withRouter(Register));
