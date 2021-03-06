import React, { Component } from 'react';
import {Table} from "react-bootstrap";
import Store from '../Store/Store';
import shutterActions from '../shutterActions';
import JobItem from '../components/JobItem';

class WorkerPage extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = { orders: null};
    }
    onChange = ()=>{
        this.setState({orders: Store.orderlist});
        console.log("onchange fired "+this.state.orders);
    };
    componentDidMount(){
        console.log("mounted");
        Store.addChangeListener(this.onChange);
        shutterActions.listAllOrders();
        console.log(this.state.orders);
    }
    componentWillUnmount(){
        console.log("asd");
        Store.removeChangeListener(this.onChange);
    }

    render(){
        if(this.state.orders == null || this.state.orders === undefined){
            return <div/>
        }else{
            return(
            <div>
                <div className="container-fluid p-0">

                    <section className="p-3 p-lg-5 d-flex" id="about">
                        <div className="w-100">
                            <h1 className="mb-0">Build
                                <span className="text-primary">Shutters</span>
                            </h1>
                        </div>
                    </section>
                </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Shutter Material</th>
                        <th>Shutter Position</th>
                        <th>Window Width</th>
                        <th>Window Height</th>
                        <th>Parts Needed</th>
                        <th>Date</th>
                        <th>Assembled</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map((order)=>(
                        <JobItem key={order._id} order={order} finishJob={shutterActions.finishJob}/>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
        }


    }
}
export default WorkerPage;