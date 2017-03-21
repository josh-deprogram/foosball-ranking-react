import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
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

  render() {

    const {results} = this.state;
    let win_t1 = 0;
    let win_t2 = 0;

    for(let i=0; i < results.length; i++){
      if(results[i].winner === 1){
        win_t1 = win_t1 + 1;
      } else {
        win_t2 = win_t2 + 1;
      }
    }
    

    return (
      <div className="leaderboard">
        <div className="content-inner">
          
          <div className="section-wrap">
            <section className="col-1" ref='col1'>
              <h2 className="title">Stats:</h2>
              <div className='stats'>
                <div>Number of games played: {results.length}</div>
                <div>Team 1 Wins: {win_t1}</div>
                <div>Team 2 Wins: {win_t2}</div>
                <div>Number of players: </div>
                <div>Most Valuable Player: </div>
              </div>
    
               <h2 className="title">Filter:</h2>
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
