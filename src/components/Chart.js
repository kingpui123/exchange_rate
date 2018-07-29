// building chart
import React, { Component } from 'react';
// use chart.js for drawing charts
import { Line } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
        }
       
    }

    // do not re-render when the date and the symbol are the same
    shouldComponentUpdate(nextProps, nextState){
        return !(nextProps.data[0].date === this.props.data[0].date && nextProps.data[0].symbol === this.props.data[0].symbol);
    }
      
    // format the dataset for chart.js
    formatDataset(data){
        
        var title = `USD to ${data[0].symbol}`;
        var xs = [];
        var ys = [];
        data.map((point, i) => {
            if (point.rate){
                xs.push(point.date);
                ys.push(point.rate);
            }
        });

        return {
            title : title,
            labels : xs,
            data : ys
        };
    }

    render (){
        // format the dataset
        var formattedDataset = this.formatDataset(this.state.data);
        //  the dataset required by chart.js
        var chartData = {
            labels: formattedDataset.labels,
            datasets: [{
            label: formattedDataset.title,
            backgroundColor: 'rgb(0, 123, 255',
            borderColor: 'rgb(0, 123, 255',
            pointBackgroundColor : 'rgb(0, 123, 255)',
            pointBorderColor : 'rgb(0, 123, 255)',
            data: formattedDataset.data,
            fill : false
            }]
        };

        var options = {
            responsive: true,
            title: {
                display: true,
                text: formattedDataset.title,
                fontSize : 32
            },
            legend : {
                fontSize : 24,
                position: 'bottom',
                // stop clicking to hide the line
                onClick : (e) => e.stopPropagation()
            }
        };
        return (
            <div>
                <Line data={chartData} options={options} width={600} height={300} />
            </div>
        );
    }

}

export default Chart;