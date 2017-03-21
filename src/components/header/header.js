import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

class Header extends Component {
  render() {
    return (
      <div className='header-nav'>
        <div className='header-title'>Foosball Ranking System</div>
        <ul>
            {/*<li style={{marginRight:30}}><Link to="/home">Home</Link></li>*/}
            <li style={{marginRight:30}}><Link to="/input"><RaisedButton className='nav-btn' backgroundColor='#23f686' label="Game Input" /></Link></li>
            <li><Link to="/leaderboard"><RaisedButton className='nav-btn' backgroundColor='#23f686' label="Results" /></Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
