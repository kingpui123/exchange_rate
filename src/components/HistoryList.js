// List of Rates in the past page
// path : '/list'
import React, { Component } from 'react';
// API key
import app_id from '../const/id';
import Table from './Table';    


class HistoryList extends Component {

  constructor(){
    super();
    // get today's date
    var day = new Date();
    var dayString = this.getDate(day);

    /*
      data : the data returned from API
      date : date string of the day user search/ select
      error : error message from API or AJAX
      search : the search input of currency from user
      today : day string of today, for binding range of date picker
    */
    this.state = {
        data : null,
        date : dayString,
        error : null,
        search : '',
        today : dayString
    }

    // bind all event listener
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getData = this.getData.bind(this, 'submit');
  }

  // update the date selected by user on change 
  handleDateChange(event){
    this.setState({date : event.target.value});
  }

  // update the search input of currency from user on change
  handleSearch(event){
    this.setState({search : event.target.value.toLowerCase()});
  }
  
  // get formatted day string in form of 'YYYY-MM-DD', required by the API
  getDate(date){
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + '-' + month + '-' + day;
  }


  // get data from API
  getData(){
    // clear the old data
    this.setState({data : null}, () =>{
      // request for new data
      fetch(`https://openexchangerates.org/api/historical/${this.state.date}.json?app_id=${app_id}`, {
      method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        // if no error from API
        if (json.error === undefined){
          // save rates returned
          this.setState({data : json.rates});
        }else {
          // catch error from API
          this.setState({
            error : json.description
          })
        }
      })
      //catch error in AJAX
      .catch(error => this.setState({error : error.toString()}))
    });
  }

  render() {

    // init variable
    var table = null;

    // if get valid data from API 
    if (this.state.data !== null){
      // table headers
      var headers = ['Currency', 'Value (for 1 USD)'];
      // build table by componment Table
      table = <Table search={this.state.search} data={this.state.data} headers={headers}/>
    }

     // if have any error, display to user
    if (this.state.error !== null){
      table =<div class="alert alert-danger" role="alert">{this.state.error}</div> 
    }

    return (
      <div className='container'>
        <h1 className='page-header'>Exchange Rate History</h1>
        <div className='form-group row'>
          <label className="col-3 col-form-label">Currency</label>
          <input className='form-control col-9' placeholder='Search for Symbol/ Currency Name' type='text' onChange={this.handleSearch}></input>
        </div>  
        <div className='form-group row'>
          <label className="col-3 col-form-label">Start Date</label>
          <input className='form-control col-9' type='date' min='1999-01-01' max={this.state.today} value={this.state.date} format='yyyy-mm-dd' onChange={this.handleDateChange}></input>
        </div> 
        <div className='row justify-content-end'> 
          <button className='btn btn-primary form-control bottom col-3' onClick={this.getData} key='submit'>Get Data</button>
        </div>
       <p className='bold'>* Data provided by <a href='https://openexchangerates.org/'>Open Exchange Rates</a></p>
        {table}
      </div>
    );
  }
}

export default HistoryList;