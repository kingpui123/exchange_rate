// Historical Data displayed in Line Chart
// path : '/historical'
import React, { Component } from 'react';
// Chart Component
import Chart from './Chart';
import app_id from '../const/id';
// loading currency options, ie their names and symbols
import Options from './Options';


class Historical extends Component {

    /*
        data : the data returned from API
        date : date string of the starting day user select
        error : error message from API or AJAX
        firstLoad : true until any API call made
        symbol : the currency symbol the user selects
        today : day string of today, for binding range of date picker
    */
    constructor(){
        super();
        // get today's date
        var day = new Date();
        var dayString = this.getDate(day);
        this.state = {
            data : null,
            date : dayString,
            error : null,
            firstLoad : true,
            symbol : 'HKD',  
            today : dayString
        }

        // bind all event listener
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getData = this.getData.bind(this, 'submit');
       
    }

    // update the currency symbol selected by user on change 
    handleCurrencyChange(event){
        this.setState({symbol : event.target.value});
        
    }

     // update the date selected by user on change 
    handleDateChange(event){
        this.setState({date : event.target.value});
        
    }

    getDate(date){
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return year + '-' + month + '-' + day;
    }

    // get data from API
    getData(event){
        // clear old data and set firstLoad to false
        this.setState({data : null, firstLoad : false}, () => {
            
            // store the days to be searched 
            var daysSearched = [];
            // format the starting day
            var param = new Date(this.state.date);
            // meta data for making chart
            var data = [{date : this.state.date, symbol : this.state.symbol}];
            // no of days from the starting day
            var noOfDays = 7;
            // loop for at most noOfDays times
            for (var i = 0; i < noOfDays; i++){
                var d = param;
                // if meet current day, ie today
                if (this.getDate(d) === this.state.today){
                    // push and break the loop
                    daysSearched.push(this.getDate(d));
                    break;
                }else{
                    // push and add the day by one day
                    daysSearched.push(this.getDate(d));
                    param.setDate(param.getDate() + 1);
                }
            }
            
            // making API calls for daysSearched.length time, ie get data day by day
            daysSearched.map(async (day, i) => {

                fetch(`https://openexchangerates.org/api/historical/${day}.json?app_id=${app_id}&symbols=${encodeURIComponent(this.state.symbol)}`, {
                method: 'GET'
                })
                .then(response => response.json())
                .then(json => {
                    if (json.error === undefined){
                        // push to temp data
                        data.push({
                            date : day,
                            rate : json.rates[this.state.symbol]
                        });
                        
                        // if all API calls finished
                        if (data.length === daysSearched.length+1){
                            // sort the data by their date
                            data.sort(function(a, b){
                                return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
                            });
                            // save it to state
                            this.setState({data : data});
                        }
                    }else {
                        // catch error from API
                        this.setState({
                            error : json.description
                          })
                    }
                })
                 // catch error from AJAX
                .catch(error => this.setState({error : error.toString()}))


            });
           
            
        });
        
    }



    
  render() {
    // Display error if any. If no, when page first load, display guide, else display the chart when have valid data and loading otherwise.
    var chart =  this.state.error !== null ? <div class="alert alert-danger" role="alert">{this.state.error}</div> :this.state.data !== null ? <Chart data={this.state.data} /> : this.state.firstLoad ? <div>Please select the currency and starting date</div> : <div>Loading...</div>;
    return (
      <div className='container'>
        <h1 className='page-header'>Historical Exchange Rate</h1>
        <div className='form-group row'>
            
            <label className="col-3 col-form-label">Currency</label>
            <div className='col-9 no-padding'>
                <select className='form-control' value={this.state.symbol} onChange={this.handleCurrencyChange}>
                    <Options />
                </select>
            </div>
        </div>
        <div className='form-group row'>
            <label className="col-3 col-form-label">Start Date</label>
            <input className='form-control col-9' type='date' min='1999-01-01' max={this.state.today} value={this.state.date} format='yyyy-mm-dd' onChange={this.handleDateChange}></input>
        </div>
        <div className='row justify-content-end'> 
            <button className='btn btn-primary form-control bottom col-3' onClick={this.getData} key='submit'>Get Chart</button>
        </div>
        <p className='bold'>* At maximum 7 days of data provided (including starting day). Data provided by <a href='https://openexchangerates.org/'>Open Exchange Rates. </a></p>

        <div>{chart}</div>
      </div>
    );
    
       
    
    
  }
}

export default Historical;