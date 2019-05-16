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
                <div className="container-fluid p-0">

                    <section className="p-3 p-lg-5 d-flex" id="about">
                        <div className="w-100">
                            <h1 className="mb-0">Manage
                                <span className="text-primary">Company</span>
                            </h1>
                        </div>
                    </section>
                </div>
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