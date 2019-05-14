import React, { Component } from 'react';
import Store from '../Store/Store';
import shutterActions from '../shutterActions';
import {Table} from 'react-bootstrap';
import uuid from 'uuid';
import Manager from '../components/Manager';

class ManagerPage extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            orders: null
        };
    }
    onChange(){
        this.setState({orders: Store.orderlist});
    }
    componentDidMount(){
        Store.addChangeListener(this.onChange);
        shutterActions.listAllOrders();
    }
    componentWillUnmount(){
        Store.removeChangeListener(this.onChange);
    }

    render(){
        if(this.state.orders == null){
            return(
                <div></div>
            )
        }
        return(
            <div>
                {this.state.orders.map((order)=>(
                    <Table key={uuid.v4()}>
                        <tbody>
                        <tr>
                            <td>Buyer Name: {order.order.customerid}</td>
                            <td>Buyer Number: {order.order.phoneNumber}</td>
                        </tr>
                        <Manager key={order._id} order={order} finishJob={this.finishJob}/>
                        </tbody>
                    </Table>
                ))}
            </div>
        )
    }


}
export default ManagerPage;