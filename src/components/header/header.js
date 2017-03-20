import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './style.css';

class App extends Component {
  render() {
    return (
      <div className='header-nav'>
        <div className='header-title'>Foosball Ranking System</div>
        <ul>
            {/*<li style={{marginRight:30}}><Link to="/home">Home</Link></li>*/}
            <li style={{marginRight:30}}><Link to="/input">Score Input</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
      </div>
    );
  }
}

export default App;
