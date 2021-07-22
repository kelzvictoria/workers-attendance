import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { Icon } from 'antd';
import { Icon } from "@ant-design/compatible";
import ReactLoading from 'react-loading';

const customLoading = () => {
    return (
        <svg
            width='160'
            height='160'
            viewBox='0 0 44 44'
            xmlns='http://www.w3.org/2000/svg'
            stroke='#d65a31'
        >
            <g fill='none' fillRule='evenodd' strokeWidth='2'>
                <circle cx='22' cy='22' r='1'>
                    <animate
                        attributeName='r'
                        begin='0s'
                        dur='1.8s'
                        values='1; 20'
                        calcMode='spline'
                        keyTimes='0; 1'
                        keySplines='0.165, 0.84, 0.44, 1'
                        repeatCount='indefinite'
                    />
                    <animate
                        attributeName='stroke-opacity'
                        begin='0s'
                        dur='1.8s'
                        values='1; 0'
                        calcMode='spline'
                        keyTimes='0; 1'
                        keySplines='0.3, 0.61, 0.355, 1'
                        repeatCount='indefinite'
                    />
                </circle>
                <circle cx='22' cy='22' r='1'>
                    <animate
                        attributeName='r'
                        begin='-0.9s'
                        dur='1.8s'
                        values='1; 20'
                        calcMode='spline'
                        keyTimes='0; 1'
                        keySplines='0.165, 0.84, 0.44, 1'
                        repeatCount='indefinite'
                    />
                    <animate
                        attributeName='stroke-opacity'
                        begin='-0.9s'
                        dur='1.8s'
                        values='1; 0'
                        calcMode='spline'
                        keyTimes='0; 1'
                        keySplines='0.3, 0.61, 0.355, 1'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
        </svg>
    );
};

class ProtectedRoute extends Component {
    state = {
        loading: true
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggleLoader() {
        this.setState({
            loading: !this.state.loading
        })
    }

    render() {
        const Component = this.props.component;
        // const { universities } = this.props.university && this.props.university;
        // const { students } = this.props.student && this.props.student;
        //  const { posts } = this.props.post && this.props.post;
        const isAuthenticated = this.props.isAuthenticated;

        return isAuthenticated === null
            // || students === null
            // || universities === null
            // || posts === null
            ?
            <div className='loading-container'>
                <Icon
                    className='loading-icon'
                    component={customLoading}
                />
            </div>

            //<ReactLoading type="blank" color="blue" height={'20%'} width={'20%'} />

            : isAuthenticated ?
                (
                    <Component />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.post,
    university: state.university,
    student: state.student
});

export default connect(mapStateToProps, {

})(ProtectedRoute);