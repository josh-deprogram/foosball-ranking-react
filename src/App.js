import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderNav from './components/header/header';
import Footer from './components/footer/footer';
import HomeView from './components/home/home-view';
import InputView from './components/score-input/input-view';
import ResultsView from './components/leaderboard/leader-view';
import moment from 'moment';
import './style/App.css';

// Needed for onTouchTap
injectTapEventPlugin();

class App extends Component {

  constructor ( props ) {

    super( props );

    this.state = {
        results: [
           {
              team1: ['Josh Freeman', 'Ronnie Roo'],
              team2: ['Claudio Ranieri'],
              winner: 1,
              date: new moment()
           }
        ],
    }
 }

  updateResults(results) {
    this.setState({
      results
    })
  }

  resultsView() {
    return (<ResultsView results={this.state.results} />)
  }

  inputView() {
    return (<InputView results={this.state.results} onUpdateResults={this.updateResults.bind(this)} />)
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
        <div>

          <HeaderNav />

          <Route exact path="/" component={HomeView}/>
          <Route exact path="/home" component={HomeView}/>
          <Route path="/input" component={this.inputView.bind(this)}/>
          <Route path="/leaderboard" component={this.resultsView.bind(this)}/>

          <Footer />
        </div>
      </Router>
    </MuiThemeProvider>
    );
  }
}

export default App;
