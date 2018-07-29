import React, { Component } from 'react';

// NavItem for each link
import NavItem from './NavItem';

// loading the navs constants
import navs from '../const/navs';

class Nav extends Component {
  render() {
    
    return (
      <div className='nav-wrapper'>
        <ul className="nav flex-column nav-pills">
            {
                navs.map((nav, i) => {
                    return (
                        <NavItem key={i} name={nav.name} icon={nav.icon} path={nav.path} />
                    )
                })
            }    
        </ul>
      </div>
    );
  }
}

export default Nav;