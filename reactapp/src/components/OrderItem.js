import React, { Component } from 'react';
import uuid from "uuid";
import {Button} from "react-bootstrap";
import shutterActions from '../shutterActions';

class OrderItem extends Component{
    payForShutter = ()=>{
        console.log(this.props.order);
        shutterActions.payOrder(this.props.order._id);
    };
    render(){
        if(this.props.order.order.isPaid === "true"){
            return this.props.order.order.order.map(jobs =>(
                <tr key={uuid.v4()}>
                    <td>{jobs.shutterType}</td>
                    <td>{jobs.position}</td>
                    <td>{jobs.width}</td>
                    <td>{jobs.height}</td>
                    <td>{jobs.Finished}</td>
                </tr>
            ))
        }else{
            return this.props.order.order.order.map(jobs =>(
                <tr key={uuid.v4()}>
                    <td>{jobs.shutterType}</td>
                    <td>{jobs.position}</td>
                    <td>{jobs.width}</td>
                    <td>{jobs.height}</td>
                    <td>{jobs.Finished}</td>
                    <td><Button onClick={this.payForShutter}>Pay</Button></td>
                </tr>
            ))
        }

    }
}export default OrderItem;