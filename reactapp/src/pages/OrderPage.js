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
            orders: null
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
                <Table>
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