import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import BookingCalendar from 'react-booking-calendar';

import { connect } from "react-redux";

import {
  getAttendances,
  getWorkers,
  getDirectorates,
  getMinistryArms
} from "../../actions/fetchDataActions";

import {
  donutChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import event from "assets/svgs/event.svg"
import wrkers from "assets/svgs/workers.svg";
import ministryarm from "assets/svgs/ministryarm.svg";
import drectorates from "assets/svgs/directorates.svg";

const useStyles = makeStyles(styles);

function mapStateToProps(state) {
  return {
    attendance: state.fetchData,
    worker: state.fetchData,
    isAuthenticated: state.auth.isAuthenticated,
    ministryArm: state.fetchData,
    directorate: state.fetchData
  }
}

function Dashboard(props) {
  useEffect(() => {
    props.getWorkers();
    props.getAttendances();
    props.getMinistryArms()
    props.getDirectorates();
  }
    , []
  );

  const { attendances } = props.attendance;
  const { workers } = props.worker;
  const { ministryArms } = props.ministryArm;
  const { directorates } = props.directorate;
  const { isAuthenticated } = props.isAuthenticated;

  const bookings = [
    new Date(2021, 7, 17),
  ];

  console.log("props.attendance", props.attendance);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <img src={event} />
              </CardIcon>
              <p className="cardCategory">ATTENDANCE</p>
              <h3 className="cardTitle">
                {attendances.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className="stats">
                {/* <Danger>
                  <Warning />
                </Danger> */}
                <a
                  href="/admin/attendance"
                // onClick={(e) => e.preventDefault()}
                >
                  ATTENDANCE
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <img src={wrkers} />
              </CardIcon>
              <p className="cardCategory">WORKERS</p>
              <h3 className="cardTitle">{workers.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className="stats">
                {/* <DateRange /> */}
                <a
                  href="/admin/workers">WORKERS</a>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <img src={ministryarm} />
              </CardIcon>
              <p className="cardCategory">MINISTRY ARMS</p>
              <h3 className="cardTitle">{ministryArms.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className="stats">
                {/* <LocalOffer /> */}
                <a
                  href="/admin/ministry-arms">MINISTRY ARMS</a>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <img src={drectorates} />
              </CardIcon>
              <p className="cardCategory">DIRECTORATES</p>
              <h3 className="cardTitle">{directorates.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className="stats">
                {/* <Update /> */}
                <a
                  href="/admin/directorates">DIRECTORATES</a>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer className="cont">
        <GridItem xs={16} sm={16} md={8} className="ai">
          <GridItem xs={24} sm={24} md={12} className="check">
            <Card>
              <BookingCalendar bookings={bookings} />
            </Card>
          </GridItem></GridItem>
        <GridItem xs={8} sm={8} md={4}>
          <GridItem xs={24} sm={24} md={12}>
            <Card chart>
              <CardHeader color="">
                <ChartistGraph
                  className="ct-chart-donut"
                  data={donutChart.data}
                  type="Pie"
                  options={donutChart.options}
                // listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className="cardTitle">Workers present</h4>
                <p className="cardCategory">
                  <span className="online"></span>
                  <span>Present</span>
                  <br />
                  <span className="offline"></span>
                  <span>Absent</span>
                </p>
              </CardBody>
              <CardFooter chart>
                <div className="stats">
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </GridItem>
      </GridContainer>

    </div>
  );
}

export default connect(mapStateToProps, {
  getAttendances,
  getWorkers,
  getMinistryArms,
  getDirectorates
})(Dashboard);