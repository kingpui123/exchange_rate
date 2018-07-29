// Home Page
// path : '/'
import React, { Component } from 'react';

// building cards of description of each page/ function
import HomeCard from './HomeCard';
// loading navs constant
import navs from '../const/navs';

class Home extends Component {
  render() {
    return (
      <div>
          <div>
            <h1 className='page-header'>Exchange Rate Checking Tool</h1>
          </div>

          <div className='card-group'>
            {
                // building cards of description of each page/ function
                navs.map((nav, i) => {
                    return (
                        <HomeCard key={i} name={nav.name} icon={nav.icon} description={nav.description} />
                    )
                })
            }
          </div> 
          <p className='guide'>Check out the above functions by clicking the tabs on the left.</p>
      </div>
    );
  }
}

export default Home;