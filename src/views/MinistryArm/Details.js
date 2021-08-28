import React, { Component } from "react";
import { Select } from 'antd';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { MDBDataTableV5 } from "mdbreact";

import ActionButton from "../Actions";
import { connect } from "react-redux";

const { Option } = Select;

class Details extends Component {
    constructor(props){
        super(props)
    }
   
    workersArray = this.props.workers;
    data = this.workersArray.map((worker) => {
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
    datatable = {
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
        rows: this.data,
      };

      goBack = () => {
          this.props.history.push("/admin/dashboard")
      }

    render() {
        console.log(
            "this.props", this.props
        );
        const {ministry_arm_to_view} = this.props
        return (
            <GridContainer>
                {this.props.ministry_arm_to_view ? 
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            <h1 className="details_heading">{ministry_arm_to_view && ministry_arm_to_view.name}</h1>
                        <h3 className="details_heading"> Head: { ministry_arm_to_view && (ministry_arm_to_view.ministry_head_details.first_name + " " + ministry_arm_to_view.ministry_head_details.last_name)}</h3>
                            <MDBDataTableV5
                            hover
                            entriesOptions={[5, 20, 25]}
                            entries={10}
                            pchangesamount={4}
                            data={this.datatable}
                            pagingTop
                            searchTop
                            searchBottom={false}
                            />
                        </CardBody>
                    </Card>
                </GridItem> : this.goBack()
            }</GridContainer>
            
          );
    }
}

const mapStateToProps = (state) => ({
    workers: state.fetchData.ministry_arm_workers,
    ministry_arm_to_view: state.fetchData.ministryArm[0]
})

export default connect(mapStateToProps, {

}) (Details);