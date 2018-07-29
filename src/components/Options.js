// building the options of names of currency
import React, { Component } from 'react';
// loading the names of currency 
import currency from '../const/currency';

class Options extends Component{
    // currency in form of {symbol : fullname}
    render(){
        return (
            Object.keys(currency).map((key, i) =>{
                return (
                    <option key={i} value={key}>
                        {key} - {currency[key]}
                    </option>
                )  
                
            })
        )
    }
}

export default Options;