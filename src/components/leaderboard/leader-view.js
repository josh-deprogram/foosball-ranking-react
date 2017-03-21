import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import Chart from 'chart.js'
import {TweenMax} from "gsap";
import './style.css';

class LeaderView extends Component {

  constructor ( props ) {
    super( props );
    this.state = {
      results: props.results,
      playerFilter: ''
    }
 }

  componentDidMount(){
    // Create Graph data
    const ctx = document.getElementById("chart").getContext("2d");
    const data = {
        labels: this.playerNames,
        datasets: [
            {
                label: "Player Wins",
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255,99,132,1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1,
                data: this.playerWins,
            }
        ]
    };

    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      // options: options
    });

    TweenMax.fromTo(this.refs.col1, .3, {autoAlpha:0}, {autoAlpha:1, delay:0.1})
    TweenMax.fromTo(this.refs.col2, .3, {autoAlpha:0}, {autoAlpha:1, delay:0.2})
  }

  handlePlayerChange(ev, val){
    const value = this.playerNames[val]
    console.log('New Value', value);
    this.setState({
      playerFilter: value
    })
  }

  render() {

    const {results} = this.state;
    let win_t1 = 0;
    let win_t2 = 0;
    let mvp = '';
    
    this.playerNames = [];
    this.playerPlayed = [];
    this.playerWins = [];
    let topPlayers = [];
    let currentPlayer = '';
    let currentPlayerPlayed = 0;
    let currentPlayerWins = 0;

    // calculate wins
    for(let i=0; i < results.length; i++){
      if(results[i].winner === 1){
        win_t1 = win_t1 + 1;
      } else {
        win_t2 = win_t2 + 1;
      }
    }

    // calculate players
    for (let p = 0; p < results.length; p++) {
      for (let r = 0; r < results[p].team1.length; r++) {
        const inArrayT1 = this.playerNames.indexOf(results[p].team1[r]);
        if(inArrayT1 === -1 && results[p].team1[r] != '') {
          this.playerNames.push(results[p].team1[r]);
          this.playerWins.push(0);
          this.playerWins.push(0);
        };
      }
      for (let t = 0; t < results[p].team2.length; t++) {
        const inArrayT2 = this.playerNames.indexOf(results[p].team2[t])
        if(inArrayT2 === -1 && results[p].team2[t] != '') {
          this.playerNames.push(results[p].team2[t])
          this.playerWins.push(0);
      };
      }
    }

    // Calculate the number of games played by each
   // !TODO - this is messy as!, storing the win values in player objects would of been a better solution.
   // Get rid of the for loops and use _

    for (let i = 0; i < results.length; i++) {
      for (let x = 0; x < results[i].team1.length; x++) {
        if(results[i].team1[x] === this.state.playerFilter) {
          currentPlayerPlayed = currentPlayerPlayed + 1
        }
      }

      for (let y = 0; y < results[i].team2.length; y++) {
          if(results[i].team2[y] === this.state.playerFilter) {
            currentPlayerPlayed = currentPlayerPlayed + 1
          }
      }
    }

    // Loop through all players, then assign wins if they where on the winning team.
    // !TODO - this is messy as!, storing the win values in player objects would of been a better solution.
    // Get rid of the for loops and use _
    
    for (let w = 0; w < this.playerNames.length; w++) {

      for (let i = 0; i < results.length; i++) {

        for (let x = 0; x < results[i].team1.length; x++) {
          if(results[i].winner === 1  && this.playerNames[w] === results[i].team1[x]) {
            this.playerWins[w] = this.playerWins[w] + 1;
          }         
        }

        for (let y = 0; y < results[i].team2.length; y++) {
          if(results[i].winner === 2  && this.playerNames[w] === results[i].team2[y]) {
            this.playerWins[w] = this.playerWins[w] + 1;
          }   
        }
      }
      
      const playerPostion = this.playerNames.indexOf(this.state.playerFilter)
      currentPlayerWins = this.playerWins[playerPostion];
    }

     // Arrange Players into Top down order of Rank
    for (var i = 0; i < this.playerNames.length; i++) {
      topPlayers.push({
        name: this.playerNames[i],
        won: this.playerWins[i]
      })
    }

    const topPlayersOrdered = topPlayers.sort(function(a,b) {
      return a.won - b.won;
    })
    
    return (
      <div className="leaderboard">
        <div className="content-inner">
          <div className='chart'><canvas id="chart"></canvas></div>
        </div>
        <div className="content-inner">
          <div className="section-wrap">
            <section className="col-1" ref='col1'>
              <h2 className="title">Stats:</h2>
              <div className='stats'>
                <div className='stat-title'>Total games played: <span className='stat-count'>{results.length}</span></div>
                <div className='stat-title'>Team 1 Wins: <span className='stat-count'>{win_t1}</span></div>
                <div className='stat-title'>Team 2 Wins: <span className='stat-count'>{win_t2}</span></div>
                <div className='stat-title'>Number of players: <span className='stat-count'>{this.playerNames.length}</span></div>
                <div className='stat-title'>Top (5) Players: 
                  {
                    [...topPlayersOrdered].reverse().map((player, i)=>{
                      if(i > 4) { return false }
                      return(<div className='stat-count' key={i}>{i+1} . {player.name} <div className='won'>won {player.won}</div></div>)
                    })
                  }
                  <span className='stat-count'>{mvp}</span></div>

              </div>
    
               <h2 className="title" style={{marginTop:40}}>Filter Player:</h2>

               <SelectField
                  floatingLabelText=""
                  label={'Choose Player'}
                  floatingLabelStyle={{textAlign:'left'}}
                  onChange={this.handlePlayerChange.bind(this)}
                >
                {
                  this.playerNames.map((player, i)=>{
                    return(<MenuItem key={i} value={i} primaryText={player} />)
                  })
                } 
               </SelectField>
               { this.state.playerFilter !== '' ?
               <div className='stats'>
                <div className={'stat-title stat-player'}>Name: <span className='stat-count'>{this.state.playerFilter}</span></div>
                <div className={'stat-title stat-played'}>Played: <span className='stat-count'>{currentPlayerPlayed}</span></div>
                <div className={'stat-title stat-played'}>Won: <span className='stat-count'>{currentPlayerWins}</span></div>
               </div>
               : null }
            </section>

            <section className="col-2" ref='col2'>
              <h2 className="title">Results:</h2>
              { [...results].reverse().map((match, i)=>{
                return(
                  <div key={i} className='match'>
                    <div className='match-title color-blue'>Team 1 : {match.winner === 1 ? <span className='tag-winner'>WINNER</span> : null} 
                    <div>
                      { match.team1.map((member, i)=>{
                        return(<div className="team-member" key={i}>{member}</div>)
                      })
                    }</div>
                  </div>
                    
                    <div className='match-title color-red' style={{marginTop:20}}>Team 2 : {match.winner === 2 ? <span className='tag-winner'>WINNER</span> : null}
                    <div>
                      { match.team2.map((member, i)=>{
                        return(<div className="team-member" key={i}>{member}</div>)
                      })
                    }</div>
                  </div>
                    <div className='match-date'>Played: {match.date.format('MMMM Do YYYY, h:mm:ss a')} </div>

                  </div>
                )
              })}
            </section>
          </div>

        </div>
      </div>
    );
  }
}

export default LeaderView;
