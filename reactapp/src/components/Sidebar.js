import React, { Component } from 'react';
import Logo from '../images/stockshutter.png';
import shutterActions from "../shutterActions";
import {LinkContainer} from 'react-router-bootstrap';
import { FormControl, Button} from 'react-bootstrap';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            activeUser: "",
        };
    }
    toggleNavbar(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    onUserChanged = (e)=>{
        e.preventDefault();
        this.setState({activeUser: e.target.value});
    };
    onSubmit = (e)=>{
        e.preventDefault();
        shutterActions.changeUser(this.state.activeUser);
    };
    render(){
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return(

                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                    <span className="navbar-brand js-scroll-trigger">
                        <LinkContainer to="/">
                            <span className="d-block d-lg-none">StockShutter</span>
                        </LinkContainer>
                        <LinkContainer to="/">
                        <span className="d-none d-lg-block">
                        <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={Logo}
                         alt=""/>
                        </span>
                        </LinkContainer>
                    </span>

                    <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${classOne}`} id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <LinkContainer to="/Order">
                                <span className="nav-link js-scroll-trigger">Order a shutter</span>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/Worker">
                                <span className="nav-link js-scroll-trigger">Work on shutters</span>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/Manager">
                                <span className="nav-link js-scroll-trigger">Manage shutter company</span>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/Stats">
                                    <span className="nav-link js-scroll-trigger">Check shutter statistics</span>
                                </LinkContainer>
                            </li>
                            <li className="login-textbox">
                                <FormControl required type="text" placeholder="Enter your name" className="mr-sm-2" onChange={this.onUserChanged.bind(this)} />
                            </li>
                            <li>
                                <Button variant="outline-success" onClick={this.onSubmit.bind(this)}>Login</Button>
                            </li>
                        </ul>
                    </div>


                </nav>

        );
    }
}
export default Sidebar;
