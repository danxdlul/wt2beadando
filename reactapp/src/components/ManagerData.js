import React, { Component } from 'react';

class ManagerData extends Component{
    onDataClick= (e)=>{
        e.preventDefault();
    };
    render(){
        return(
            <tr onClick={this.onDataClick}>
                <td>{this.props.order.shutterType}</td>
                <td>{this.props.order.position}</td>
                <td>{this.props.order.width}</td>
                <td>{this.props.order.height}</td>
                <td>{this.props.order.Finished}</td>
                <td>{this.props.orderPaid}</td>
            </tr>
        )
    }
}
export default ManagerData;