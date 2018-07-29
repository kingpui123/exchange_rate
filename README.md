# exchange_rate - AfterShip Coding Challenge

This service is 

## Description of the problem and solution
The challenge selected is Exchange Rate, which is to build a service giving the latest and historical exchange rate for the currency.

The API used is [Open Exchange Rate](https://openexchangerates.org/).

## Latest Exchange Rate
There is a call that gives the latest exchange rate.
```
https://openexchangerates.org/api/latest.json
```
Here is a demo response:
```
{
    disclaimer: "https://openexchangerates.org/terms/",
    license: "https://openexchangerates.org/license/",
    timestamp: 1449877801,
    base: "USD",
    rates: {
        AED: 3.672538,
        AFN: 66.809999,
        ALL: 125.716501,
        AMD: 484.902502,
        ANG: 1.788575,
        AOA: 135.295998,
        ARS: 9.750101,
        AUD: 1.390866,
        /* ... */
    }
}
```
### Solution 
The request is made when the page is loaded. With no currency specified in parameters, the API will return the rates of all currencies. As there are more than hundred rows of data, a search function is built.

Users can key in currency symbol or their fullname to search of the currency desired. 

```
Object.keys(this.state.data).map((key, i) =>{
    if (key.toLowerCase().indexOf(this.props.search) !== -1 ||                                 currency[key].toLowerCase().indexOf(this.props.search) !== -1){
        return (
        <TableRow key={i} short={key} full={currency[key]} value={this.state.data[key]} />
        )  
    }
})
```
## Historical Rates
Again there is a call that gives a time-series data.
```
https://openexchangerates.org/api/time-series.json
```
However, this is not available to free-tier user. As an alternative, another call which gives the historical data of one day is used.
```
https://openexchangerates.org/api/historical/:date.json
```
This is a huge limitation as it affects much on the presentation of data as well as on the performance.
### Solution
There are two ways of presenation for this functions. One is making the request once and list the data in a table with the search function, like what has been done in latest rates.

However this presnetation looks dull. A time-series data gives more insight to users like the trend. So another way to do is to let user pick a starting day. Then we make requests for consecutive days of data and display it in a line chart. 

For drawing charts, chart.js is used as it is more straight-forward so that I feel confortable to use.

Comparing two approaches, they both have advantages over each other. The first one is a more realistic solution as the limitation of API is there, while the second one gives more information to users while sacrificing some performance of the app.

## Bouns Feature - Currency Converter
As a normal person, knowing the rate alone is not informative enough. The most needed function is converting between currencies. There is a call for this function but it is again not availale to free-tier users. But this function can be done with free call.

### Solution
We use the call that gives the latest exchange rate again. After getting the latest exchange of the currency selected by user, we multiply it by the amount the user keys in. Then a equivalent amount of target currency is obtained. Then it is returned to user.

## Tradeoffs made

The major tradeoff made is on the functionality. The API is really a limitation. Besides the time-series data mentioned above, the inability to change the base is another huge limitation. The base is limited to USD for free-tier user. So all the results in this service are with the base of USD. 

## Things to Improve if time allows
Firstly, the UI design can be improved as I am not a good designer. 

Secondly, if the premium calls are availale, or there are other APIs with such functions, we can strike for a better balance between performance and data presenation. But in this challenge, no other API are taken into account as research needs time.

Finally, I am not a expert of using React. There should be some more precise or clean expression in code. 

## My CV
[https://drive.google.com/file/d/125kMbQZuUs6njb1X37NzqRG5lX24qWQX/view?usp=sharing](https://drive.google.com/file/d/125kMbQZuUs6njb1X37NzqRG5lX24qWQX/view?usp=sharing)

