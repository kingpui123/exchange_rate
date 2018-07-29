import React, { Component } from 'react';

// building links
import { Link } from 'react-router-dom';

class NavItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            name : props.name,
            path : props.path,
            icon : props.icon
        }
    }

    render(){
        return(
            <li className="nav-item">
                <Link to={`/${this.state.path}`}>
                    <div className='icon'>
                        <i className={`fas fa-fw fa-${this.state.icon} icon`}></i> 
                    </div>
                    {this.state.name}
                </Link>
            </li>
        )
    }
}

export default NavItem;