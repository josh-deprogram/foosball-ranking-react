import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HeaderNav from './components/header/header';
import HomeView from './components/home/home-view';
import InputView from './components/score-input/input-view';
import LeaderView from './components/leaderboard/leader-view';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>

        <HeaderNav />

        <Route exact path="/" component={HomeView}/>
        <Route exact path="/home" component={HomeView}/>
        <Route path="/input" component={InputView}/>
        <Route path="/leaderboard" component={LeaderView}/>
      </div>
    </Router>
    );
  }
}

export default App;
