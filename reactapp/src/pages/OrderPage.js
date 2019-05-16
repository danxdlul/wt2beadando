import React, { Component } from 'react';
import OrderItem from '../components/OrderItem';
import {Table} from "react-bootstrap"
import Store from '../Store/Store';
import shutterActions from '../shutterActions';
import OrderAdder from "../components/OrderAdder";

class OrderPage extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            orders: []
        }
    }

    onChange(){
        this.setState({orders: Store.orderlist});
        console.log("onchange fired" + this.state.orders);
    }

    componentDidMount(){
        Store.addChangeListener(this.onChange);
        shutterActions.getUsersOrders(Store.currentUser);
    }
    componentWillUnmount(){
        Store.removeChangeListener(this.onChange);
    }

    render(){
        if(Store.currentUser ===""){
            return(
                <div/>
            )
        }
        return(
            <div>
                <div className="container-fluid p-0" style={this.state.orders.length  === 0 ? {display: 'none'} : {}}>

                    <section className="p-3 p-lg-5 d-flex" id="about">
                        <div className="w-100">
                            <h1 className="mb-0">Order
                                <span className="text-primary">History</span>
                            </h1>
                        </div>
                    </section>
                </div>
                <Table style={this.state.orders.length === 0 ? {display: 'none'} : {}}>
                    <thead>
                    <tr>
                        <th>Shutter Material</th>
                        <th>Shutter Position</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>Installed</th>
                    </tr>
                    </thead>
                    <tbody>

                    {Store.orderlist.map((order) =>(
                        <OrderItem key={order._id} order={order}/>
                    ))}
                    </tbody>
                </Table>
                <OrderAdder/>
            </div>
        )
    }

}
export default OrderPage;