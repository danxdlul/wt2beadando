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
                <Table>
                    <thead>
                    <tr>
                        <th>Plastic</th>
                        <th>Metal</th>
                        <th>Paper</th>
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