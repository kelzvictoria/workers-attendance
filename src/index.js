import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'antd/dist/antd.css';

import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import "assets/css/custom.css";

import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/authActions";

// import { getWorkers } from "./actions/workerActions";
// import { getAttendances } from "./actions/attendanceActions";

// import { getMinistryArms } from "./actions/ministryArmActions";
// import { getDirectorates } from "./actions/directorateActions"
import { getUsers } from "./actions/userActions";

import {
  getWorkers,
  getAttendances,
  getMinistryArms,
  getDirectorates
} from "./actions/fetchDataActions"

import Register from "components/auth/Register";
import Workers from "views/Reporting/Workers";
import LogIn from "components/auth/LogIn";

import ProtectedRoute from "views/ProtectedRoute"
import Details  from "views/MinistryArm/Details"

const hist = createBrowserHistory();

export class App extends React.Component {
  state = {
    isAuthenticated: false,
  };

  async UNSAFE_componentWillMount() {
    await store.dispatch(loadUser());
    // await store.dispatch(getWorkers());
    await store.dispatch(getAttendances());
    await store.dispatch(getMinistryArms())
    await store.dispatch(getDirectorates());
  }

  async componentDidMount() {

  }
  render() {
    return (
      <Router history={hist}>
        <Provider store={store}>
          <Switch>
            <ProtectedRoute path="/admin" component={Admin} />
            <Route exact={true} path="/login" component={LogIn} />
            <Route exact={true} path="/ministry-arm/:id" component={Details} />
            <Redirect from="/admin" to="/admin/dashboard" />
            <Redirect from="/" to="/admin/dashboard" />
            {/* <Route exact={true} path="/report/workers" component={Workers} /> */}
          </Switch>
        </Provider>
      </Router>
    );

  }
}

ReactDOM.render(<App />, document.getElementById("root"));
