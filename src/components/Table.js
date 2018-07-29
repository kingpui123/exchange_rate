// building table
import React, { Component } from 'react';
import TableRow from './TableRow';
import currency from '../const/currency';

class Table extends Component {

    constructor(props){
        super(props);
        
        /* 
            data : the data from API, in form of {symbol : rate}
            headers : the column names
            search : the search input of currency from user
        */
       //set state with the props 
        this.state = {
            data : this.props.data,
            headers : this.props.headers,
            search : this.props.search
        }
    }

    render(){
        return(
            <table className='table'>
                <thead>
                    <tr>
                        {
                            // loading all column names
                            this.state.headers.map((header, i) => {
                                return (
                                    <th scope="col" key={i}>{header}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    // handle search, filter out all rows with no match with keywords
                    Object.keys(this.state.data).map((key, i) =>{
                        if (key.toLowerCase().indexOf(this.props.search) !== -1 || currency[key].toLowerCase().indexOf(this.props.search) !== -1){
                            return (
                                <TableRow key={i} short={key} full={currency[key]} value={this.state.data[key]} />
                            )  
                        }
                    })
                }
                </tbody>
            </table>
        )
    }

}

export default Table;