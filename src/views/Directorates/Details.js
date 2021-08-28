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

class DirectorateDetails extends Component {
    constructor(props){
        super(props)
    }
   
    ministryArmsArray = this.props.ministry_arms;
    
    data = this.ministryArmsArray.map((ministry_arm) => {
        return {
          name: `${ministry_arm.name}`,
          ministry_head: `${ministry_arm.ministry_head_details.first_name + " " + ministry_arm.ministry_head_details.last_name} `,
          num_of_workers: ministry_arm.workers.length,
          
    
          action: 
         // isAuthenticated ? (
            <ActionButton data={{ id: ministry_arm._id, url: "/ministry-arms/" }} />
         // ) : null,
        };
      });
    datatable = {
        columns: [
          {
            label: "Ministry Name",
            field: "name",
            width: 150,
            ministry_armributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },

          {
            label: "Ministry Head",
            field: "ministry_head",
            width: 150,
            ministry_armributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },

          {
            label: "No. of Workers",
            field: "num_of_workers",
            width: 150,
            ministry_armributes: {
              "aria-controls": "DataTable",
              "aria-label": "Name",
            },
          },
          // {
          //   label: "Middle Name",
          //   field: "middle_name",
          //   width: 150,
          //   ministry_armributes: {
          //     "aria-controls": "DataTable",
          //     "aria-label": "Name",
          //   },
          // },
         
    
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
        const {directorate_to_view} = this.props
      console.log("directorate_to_view", directorate_to_view);
        return (
            <GridContainer>
                {this.props.directorate_to_view ? 
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            <h1 className="details_heading">{directorate_to_view && directorate_to_view.name}</h1>
                        <h3 className="details_heading"> Head: { directorate_to_view && (directorate_to_view.director_details.first_name + " " + directorate_to_view.director_details.last_name)}</h3>
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
    ministry_arms: state.fetchData.directorate_ministries,
    directorate_to_view: state.fetchData.directorate[0]
})

export default connect(mapStateToProps, {

}) (DirectorateDetails);