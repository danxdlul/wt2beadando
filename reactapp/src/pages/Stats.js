import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {
            plastic: 0,
            metal: 0,
            paper: 0
        }
    }
    componentWillMount(){
        this.initStats();
    }
    initStats(){
        axios.get('/stats/Plastic').then(res=>{this.setState({plastic : res.data})}).catch(e=>{alert(e)});
        axios.get('/stats/Metal').then(res=>{this.setState({metal : res.data})}).catch(e=>{alert(e)});
        axios.get('/stats/Paper').then(res=>{this.setState({paper : res.data})}).catch(e=>{alert(e)});
    }

    render(){
        return(
            <div>
                <div className="container-fluid p-0">

                    <section className="p-3 p-lg-5 d-flex" id="about">
                        <div className="w-100">
                            <h1 className="mb-0">Check
                                <span className="text-primary">Stats</span>
                            </h1>
                        </div>
                    </section>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Plastic shutters ordered</th>
                        <th>Metal shutters ordered</th>
                        <th>Paper shutters ordered</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.plastic}</td>
                        <td>{this.state.metal}</td>
                        <td>{this.state.paper}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Stats;