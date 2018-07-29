// building rows in table
import React, { Component } from 'react';

class TableRow extends Component {
    constructor(props){
        super(props);

        /*
            full : full name of currency
            short : symbol of currency
            value : rate of that currency to USD
         */

        this.state = {
            full : props.full,
            short : props.short,
            value : props.value
        }
    }

    render(){
        return(
            <tr>
                <td>{this.state.short} - {this.state.full}</td>
                <td>{this.state.value}</td>
            </tr>
        );
       
    }
}

export default TableRow;