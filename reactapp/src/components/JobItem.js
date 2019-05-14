import React, { Component } from 'react';
import uuid from "uuid";
import JobData from './JobData';

class JobItem extends Component{
    render(){
        return this.props.order.order.order.map((order,index)=>(
            <JobData key={uuid.v4()} datalocator={this.props.order._id} index={index} order={order} finishJob={this.props.finishJob}/>
        ));
    }
}export default JobItem;