// Converter Page
// path : '/converter'
import React, { Component } from 'react';
// loading currency options, ie their names and symbols
import Options from './Options';
// API key
import app_id from '../const/id';

class Converter extends Component {
    constructor(){
        super();

        /*
            amount : the amount of USD to convert from the user
            date : latest update time of data form API
            error : error message from API or AJAX
            result : the object with the search result, including:
                        amount : amount to convert
                        rate : the rate returned from API
                        result : the equivalent amount of target currency
                        symbol : the symbol searched
            symbol : the currency symbol the user selects
        */
        this.state = {
            amount : 1,
            date : null,
            error : null,
            result : null,
            symbol : 'HKD'
        }

        // bind all event listener
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.getData = this.getData.bind(this, 'submit');
    }

    // update the currency symbol selected by user on change 
    handleCurrencyChange(event){
        this.setState({symbol : event.target.value});
        
    }

     // update the amount of USD to convert selected by user on change 
    handleAmount(event){
        // get the absolute to prevent negative input
        this.setState({amount : Math.abs(parseFloat(event.target.value))});
        
    }

    // get data from API
    getData(){
        // clear old data
        this.setState({result : null}, () =>{
            // save symbol and amount in current search
            var amount = this.state.amount;
            var symbol = this.state.symbol;
            fetch(`https://openexchangerates.org/api/latest.json?app_id=${app_id}&symbols=${encodeURIComponent(this.state.symbol)}`, {
            method: 'GET'
            })
            .then(response => response.json())
            .then(json => {
                // if no error from API
                if (json.error === undefined){
                    // format timestamp
                    var last = new Date(json.timestamp*1000);
                    // save result
                    this.setState({
                        result : {
                            amount : amount,
                            rate : json.rates[symbol], 
                            result : json.rates[symbol]*amount,
                            symbol : symbol
                            
                        },
                        date : last.toString()
                    });
                }else{
                    // catch error from API
                    this.setState({
                        error : json.description
                    })
                }
            })
            // catch error from AJAX
            .catch(error => this.setState({error : error}))
        });


    }

    render() {

        // init variable
        var result = null;
        
        // if no result, ie no request has been made or request loading
        if (this.state.result === null){
            // if no request has been made
            if (this.state.date === null){
                result = 'Select currency and amount to convert';
            }else {
                // if request loading
                result = 'Loading...';
            }
        }else {
            // show conversion result
            result = `${this.state.result.amount} USD = ${this.state.result.result} ${this.state.result.symbol} \n`;
        }

        // display error if any
        if (this.state.error !== null){
            result = <div class="alert alert-danger" role="alert">{this.state.error}</div> 
        }
        // show data latest update time
        var updateDate = this.state.date === null ? null : `Data updated at ${this.state.date}`;
        return (
            <div className='container'>
                <h1 className='page-header'>Converter</h1>
                <div className='row form-group'>
                    <input className='form-control col-5' placeholder='Amount' type='number' min="0" onChange={this.handleAmount.bind(this)}></input>
                    <label className="col-2 col-form-label text-center"> USD to </label>
                    <select className='form-control col-5' value={this.state.symbol} onChange={this.handleCurrencyChange}>
                        <Options />   
                    </select>
                </div>
                <div className='row justify-content-end'>
                    <button className='btn btn-primary form-control col-3 bottom' onClick={this.getData} key='submit'>Calculate</button>
                </div>
                <p className='bold'>* Data provided by <a href='https://openexchangerates.org/'>Open Exchange Rates. </a></p>

                <div className='card-group'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" id='card-result'>{result}</h5>
                            <h6 className='card-subtitle'>{updateDate}</h6>
                        </div>
                     </div>
                 </div>
            </div>
        )
    }
}

export default Converter;