import React, {Component} from 'react';
import {Button, Form, Col, Row} from "react-bootstrap";
import Store from "../Store/Store";
import shutterActions from "../shutterActions";

export class OrderAdder extends Component{
    state = {
        variants: [],
        currentUser: "",
        phoneNumber: "",
        address: "",
        currentOrder:{
            shutterType: "Metal",
            height: "",
            width: "",
            position: "Internal",
            amount: "",
            Finished:"false"
        },
        order:[],
        readytosubmit : false
    };

    submitOrder = (e)=>{
        e.preventDefault();
        if(Store.currentUser == null || Store.currentUser === ""){
            alert("You need to enter your name before ordering");
        }
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.persist();
        this.setState({order: [...this.state.order, this.state.currentOrder]});
        document.getElementById("orderForm").reset();
    };

    onChange = (e)=>{
        e.persist();
        this.setState(prevState => ({currentOrder: {...prevState.currentOrder,[e.target.name]: e.target.value}}));
    };

    componentDidMount(){
        console.log("trying at least");
        fetch('/listShutterTypes',{headers: {
            "Content-Type" : "application/json", "Accept" : "application/json"
            }}).then(response =>{return response.json();console.log(response)}).then((result =>{this.setState({variants: result});}));
        console.log(this.state.variants);
    }

    onSubmitFormChange = (e)=>{
        e.persist();
        this.setState({[e.target.name] : e.target.value});
    };

    onOrderSubmitted = (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if(Store.currentUser == null || Store.currentUser === ""){
            alert("You need to enter your name before ordering");
            return;
        }
        var order ={ order: {
                customerid: Store.currentUser,
                phoneNumber: this.state.phoneNumber,
                date: "awaiting approval",
                address: this.state.address,
                order: this.state.order,
                isPaid: "false"
            }};
        shutterActions.createOrder(order);
    };

    SubmitMode = (e) => {
        e.preventDefault();
        this.setState({readytosubmit: true});
    };

    render(){
        if(!this.state.variants.material || !this.state.variants.position){
            return <div/>
        }
        return(

        <div>
            <Form id="orderForm" onSubmit={e=>this.submitOrder(e)} style={this.state.readytosubmit ? {display: 'none'} : {}}>
                <Form.Group as={Row} controlId="width">
                    <Form.Label column sm="2">Enter width of window: </Form.Label>
                    <Col sm="10">
                        <Form.Control required type="number" name="width" onChange={this.onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="height">
                    <Form.Label column sm="2">Enter height of window: </Form.Label>
                    <Col sm="10">
                        <Form.Control required type="number" name="height" onChange={this.onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="position">
                    <Form.Label column sm = "2">Select shutter position: </Form.Label>
                    <Col sm="10">
                        <Form.Control required as="select" name="position" onChange={this.onChange}>
                            {this.state.variants.position.map((pos)=>(
                                <option>{pos}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="material">
                    <Form.Label column sm="2">Select shutter material: </Form.Label>
                    <Col sm="10">
                        <Form.Control required as="select" name="material" onChange={this.onChange}>
                            {this.state.variants.material.map((mat)=>(
                                <option>{mat}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="amount">
                    <Form.Label column sm="2">Enter amount of shutters: </Form.Label>
                    <Col sm="10">
                        <Form.Control required type="number" onChange={this.onChange} name="amount"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="button">
                    <Button column sm="2" type="submit">Add shutter</Button>
                    <Col sm="10">
                        <Button onClick={this.SubmitMode}>Next</Button>
                    </Col>
                </Form.Group>
            </Form>
            <Form onSubmit={e => this.onOrderSubmitted(e)} style={this.state.readytosubmit ? {} : {display: 'none'}}>
                <Form.Group as={Row} controlId="phoneNumber">
                    <Form.Label column sm="2">Enter Phone Number: </Form.Label>
                    <Col sm="10">
                        <Form.Control required onChange={this.onSubmitFormChange} name="phoneNumber"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="address">
                    <Form.Label column sm="2">Enter Street Address: </Form.Label>
                    <Col sm="10">
                        <Form.Control required onChange={this.onSubmitFormChange} name="address"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="phoneNumber">
                    <Button variant="success" type="submit">Submit Order</Button>
                </Form.Group>
            </Form>
        </div>
        )
    }
}
export default OrderAdder;