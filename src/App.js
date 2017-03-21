import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderNav from './components/header/header';
import HomeView from './components/home/home-view';
import InputView from './components/score-input/input-view';
import LeaderView from './components/leaderboard/leader-view';
import './style/App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  constructor ( props ) {

    super( props );

    this.state = {
        results: [],
    }
 }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
        <div>

          <HeaderNav />

          <Route exact path="/" component={HomeView}/>
          <Route exact path="/home" component={HomeView}/>
          <Route path="/input" component={InputView}/>
          <Route path="/leaderboard" component={LeaderView}/>
        </div>
      </Router>
    </MuiThemeProvider>
    );
  }
}

export default App;
