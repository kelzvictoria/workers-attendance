import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class LogOut extends Component {
  state = {};
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.logout();
    //this.props.history.push("/login");
  }
  render() {
    return (
      //   <Fragment>
      //     <NavLink onClick=
      <div>Logout</div>

      //     href="#">
      //       Logout
      //     </NavLink>
      //   </Fragment>
    );
  }
}

export default connect(null, { logout })(LogOut);
