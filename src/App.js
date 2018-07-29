import React, { Component } from 'react';
import './style/style.css';

// routing between functions
import Router from './components/Router';

// side navbar
import Nav from './components/Nav';

class App extends Component {
  render() {
    /* ratio of side bar : main page:
        3:9 in small device, 2:10 in larger screen
    */
    return (
      <div className='container-fluid' id='wrapper'>
        <div className='row'>
          <div className='col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2' id='navbar'>
            <Nav />
          </div>
          <div className='col-9 offset-3 col-sm-9 offset-sm-3 col-md-10 offset-md-2 col-lg-10 offset-lg-2 col-xl-10 offset-xl-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-12 col-lg-12'>
                  <Router />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
