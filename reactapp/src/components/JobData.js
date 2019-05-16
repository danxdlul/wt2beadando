import React, { Component } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';

class JobData extends Component{
    constructor(props){
        super(props);
        this.state = {
            parts:{
                material: "",
                nails: "",
                shutterrectangles: ""
            }
        };
    }
    componentWillMount(){
        this.loadData();
    }

    loadData() {
        console.log(this.props.order);
        this.listAllParts(this.props.order.shutterType,this.props.order.width,this.props.order.height);
    };
    listAllParts = (shutterType,width, height)=>{
        axios.get(`/getReqParts/${shutterType}/${width}/${height}`).then(res => {this.setState({parts: res.data});console.log(res.data)}).catch(e=>{alert(e)});
    };
    onDataClick=(e)=>{
        e.preventDefault();

        if(this.props.order.Finished != "true"){
            console.log(this.props.datalocator);
            this.props.finishJob(this.props.datalocator,this.props.index);

        }
    }
    render(){
        if(!this.state.parts){
            return(
                <div/>
            )
        }
        return(
            <tr>
                <td>{this.props.order.shutterType}</td>
                <td>{this.props.order.position}</td>
                <td>{this.props.order.width}</td>
                <td>{this.props.order.height}</td>
                <td>{this.state.parts.nails} number of nails, {this.state.parts.shutterrectangles} number of {this.state.parts.material} rectangles</td>
                <td>{this.props.date}</td>
                <td>{this.props.order.Finished}</td>
                <td><Button onClick={this.onDataClick.bind(this)} style={this.props.order.Finished === "true" ? {display: 'none'} : {}}>Build</Button></td>
            </tr>
        );
    }
}export default JobData;