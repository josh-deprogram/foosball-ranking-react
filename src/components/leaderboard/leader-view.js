import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import {TweenMax} from "gsap";
import './style.css';

class LeaderView extends Component {

  constructor ( props ) {
    super( props );
    this.state = {
      results: props.results
    }
 }

  componentDidMount(){
    TweenMax.fromTo(this.refs.col1, .3, {autoAlpha:0}, {autoAlpha:1, delay:0.1})
    TweenMax.fromTo(this.refs.col2, .3, {autoAlpha:0}, {autoAlpha:1, delay:0.2})
  }

  render() {

    const {results} = this.state;
    let win_t1 = 0;
    let win_t2 = 0;
    let mvp = '';
    let playerNames = [];
    let currentPlayer = '';
    let currentPlayerPlayed = 0;
    
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
        const inArrayT1 = playerNames.indexOf(results[p].team1[r])
        if(inArrayT1 === -1 && results[p].team1[r] != '') playerNames.push(results[p].team1[r]);
      }
      for (let t = 0; t < results[p].team2.length; t++) {
        const inArrayT2 = playerNames.indexOf(results[p].team2[t])
        if(inArrayT2 === -1 && results[p].team2[t] != '') playerNames.push(results[p].team2[t]);
      }
    }

    // console.log('players.. ', playerNames)
    // calculate MVP
    

    return (
      <div className="leaderboard">
        <div className="content-inner">
          
          <div className="section-wrap">
            <section className="col-1" ref='col1'>
              <h2 className="title">Stats:</h2>
              <div className='stats'>
                <div className='stat-title'>Number of games played: <span className='stat-count'>{results.length}</span></div>
                <div className='stat-title'>Team 1 Wins: <span className='stat-count'>{win_t1}</span></div>
                <div className='stat-title'>Team 2 Wins: <span className='stat-count'>{win_t2}</span></div>
                <div className='stat-title'>Number of players: <span className='stat-count'>{playerNames.length}</span></div>
                <div className='stat-title'>Most Valuable Player: <span className='stat-count'>{mvp}</span></div>
              </div>
    
               <h2 className="title" style={{marginTop:40}}>Filter:</h2>

               <SelectField
                  floatingLabelText="Player"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                {
                  playerNames.map((player, i)=>{
                    return(<MenuItem key={i} value={i} primaryText={player} />)
                  })
                } 
               </SelectField>

               <div className={'stat-player'}>{currentPlayer}</div>
               <div className={'stat-played'}>{currentPlayerPlayed}</div>
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
