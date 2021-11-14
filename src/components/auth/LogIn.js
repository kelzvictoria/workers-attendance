import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
    loading: false,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
  };

  goToPreviousPath = () => {
    let history = useHistory();
    history.goBack();
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        let err_message;

        if (error.msg.msg.msg) {
          err_message = error.msg.msg.msg;
        } else if (error.msg.msg) {
          err_message = error.msg.msg;
        }
        this.setState({ msg: err_message });
      } else {
        this.setState({ msg: null });
      }
      this.hideLoading();
    }

    if (isAuthenticated) {
      // console.log("prevProps.history.goBack()", prevProps.history.goBack())
      // if (prevProps.history.goBack() !== undefined) {
      //   prevProps.history.goBack();
      // }
      // else {
      this.props.history.push("/admin/dashboard");
      // }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    if ((email, password)) {
      //this.showLoading();
      this.setState({
        loading: true,
      });
    }

    this.props.login(user);
  };

  onChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  }

  showLoding = () => {
    this.setState({
      loading: true,
    });
  };

  hideLoading = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <div className="text-center md-login-dv login-dv">
        <form className="login-frm" onSubmit={this.onSubmit}>
          <img src={logo} className="mb-4" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">
            Workers Meeting Attendance
          </h1>
          {this.state.msg ? <h5 className="err">{this.state.msg}</h5> : null}

          <input
            className="form-control top"
            name="email"
            type="email"
            placeholder="Username"
            onChange={(e) => {
              this.onChange(e);

              this.hideLoading();
            }}
          />

          <input
            className="form-control bottom"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              this.onChange(e);
              this.hideLoading();
            }}
          />
          <button
            className={`btn btn-lg btn-primary btn-block btn-login`}
            disabled={
              this.state.loading || this.state.password.length < 4
                ? true
                : false
            }
            type="submit"
          >
            {this.state.loading ? "Please wait..." : "Log In"}
          </button>

          <p class="mt-5 mb-3 text-muted">&copy; TREM Ejigbo</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LogIn);
