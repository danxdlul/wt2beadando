import React, {Component} from 'react';
import uuid from 'uuid';
import shutterActions from '../shutterActions';
import { Button } from 'react-bootstrap';
import ManagerData from './ManagerData';

class Manager extends Component{
    state = {date:null};
    onDateSubmit = ()=>{
        shutterActions.modifyDate(this.props.order._id,this.state.date)
    };
    onDatePickerChanged = (e)=>{
        this.setState({date: e.target.value})
    };

    render(){
        console.log(this.props.order);
        return(
            <tr>
                <thead>
                <tr>
                    <th>Material</th>
                    <th>Position</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Work complete</th>
                    <th>Paid</th>
                </tr>
                </thead>
                {this.props.order.order.order.map((job) =>(
                    <ManagerData key={uuid.v4()} orderPaid = {this.props.order.order.isPaid} order={job}/>
                ))}
                <td>
                    <input type="date" id="date-picker" onChange={this.onDatePickerChanged} name="install-date"/>
                    <Button onClick={this.onDateSubmit}>Schedule Installation</Button>
                </td>
            </tr>
        );
    }
}export default Manager;