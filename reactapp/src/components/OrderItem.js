import React, { Component } from 'react';
import uuid from "uuid";
import {Button} from "react-bootstrap";
import shutterActions from '../shutterActions';
import Store from '../Store/Store';

class OrderItem extends Component{
    payForShutter = ()=>{
        console.log(this.props.order);
        shutterActions.payOrder(this.props.order._id);
        shutterActions.getUsersOrders(Store.currentUser);
        Store.emitChange();
    };
    render(){
        if(this.props.shoppingcartitem){
            return(
                <tr>
                    <td>{this.props.order.shutterType}</td>
                    <td>{this.props.order.position}</td>
                    <td>{this.props.order.width}</td>
                    <td>{this.props.order.height}</td>
                    <td>{this.props.order.Finished}</td>
                </tr>
            );
        }
        else if(this.props.order.order.isPaid === "true"){
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