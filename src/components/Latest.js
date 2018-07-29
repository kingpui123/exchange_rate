// Latest Rate Page
// path : '/latest'
import React, { Component } from 'react';

// Table for showing results
import Table from './Table';
// loading API key
import app_id from '../const/id';


class Latest extends Component {
    constructor(){
        super();
        /* 
            data : the data returned from API
            date : latest update time
            error : error message from API or AJAX
            search : the search input of currency from user
        */
        this.state = {
            data : null,
            date : '',
            error : null,
            search : ''
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        // call API when page loaded
        this.getData();
    }
    
    getData(){
        // get latest data
        
        fetch(`https://openexchangerates.org/api/latest.json?app_id=${app_id}`, {
        method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            // if no error returned from API
            if (json.error === undefined){
                // get latest update time of data
                var last = new Date(json.timestamp*1000);
                // save rates and timestamp returned
                this.setState({date : last.toString(), data : json.rates});
            }else {
                // catch error from API
                this.setState({
                    error : json.description
                })
            }
           
            
            
        })
        //catch error in AJAX
        .catch(error => this.setState({error : error.toString()}))


    }

    // update the search input of currency from user on change
    handleSearch(event){
        this.setState({search : event.target.value.toLowerCase()});
    }

    render() {
        // table headers
        var headers = ['Currency', 'Value (for 1 USD)'];
        
        // init variables
        var table = null;
        var updateTime = null;

        // if get valid data from API 
        if (this.state.data !== null){
            table = <Table search={this.state.search} data={this.state.data} headers={headers} />;
        }
        
        // if get valid last update time from API
        if (this.state.date !== ''){
            updateTime = <p className='bold'>* Data updated at {this.state.date}, provided by <a href='https://openexchangerates.org/'>Open Exchange Rates</a></p>
        }

        // if have any error, display to user
        if (this.state.error !== null){
            table =<div class="alert alert-danger" role="alert">{this.state.error}</div>
        }

        return (
            <div className='container'>
                <h1 className='page-header'>Latest Exchange Rate</h1>
                <input className='search form-control' placeholder='Search for Symbol/ Currency Name'type='text' onChange={this.handleSearch}></input>
                {updateTime}
                {table}
            </div>
        );
    }
}

export default Latest;