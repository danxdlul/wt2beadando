import React, { Component } from 'react';
import CompanyName from '../components/CompanyName';

class IndexPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <CompanyName/>
            </div>
        )
    }
}
export default IndexPage;