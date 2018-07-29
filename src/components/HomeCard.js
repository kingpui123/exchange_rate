// building cards of description of each page/ function
import React, { Component } from 'react';

class HomeCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : props.name,
            icon : props.icon,
            description : props.description
        }
    }

    render(){
        
        return (
            <div className="card">
                <div className="card-body">
                    <div>
                        <i className={`fas fa-fw card-icon fa-${this.state.icon}`}></i> 
                    </div>
                    <h5 className="card-title">{this.state.name}</h5>
                    <p className='card-text'>
                        {this.state.description}
                    </p>
                </div>
            </div>
        )
    };

}

export default HomeCard;