import React, { Component } from 'react';
import moment from 'moment';
import './style.css';

class ScoreInput extends Component {

 constructor ( props ) {

   super( props );

   /* // Player Model
   {
      player1: '',
      player2: '',
      winner: null
    }
   */
      
    this.state = {
        matches: [
           {
              player1: 'Josh Freeman',
              player2: 'Claudio Ranieri',
              winner: 1,
              date: new moment()
           },
           {
              player1: 'Josh Freeman',
              player2: 'Claudio Ranieri',
              winner: 2,
              date: new moment()
           },
           {
              player1: 'Josh Freeman',
              player2: 'Banksy',
              winner: 1,
              date: new moment()
           }
        ],
        users: [],
        results: []
    }
 }


addMatchDetails(){
  const p1 = this.refs.player1.value;
  const p2 = this.refs.player2.value;
  // create temp array to duplicate state
  const matches = this.state.matches;
  matches.push({
      player1: p1,
      player2: p2,
      winner: 1,
      date: new moment()
    });

  this.setState({
    matches: matches
  });
}

render() {
    return (
      <div className="score-input">
        <div className="content-inner">
          <h2 className="title">Add New Game:</h2>
          <div className='winnerTitle'>Winner:</div>
          <div><input ref='player1' placeholder={'Player 1 Name'} /> <input className='radio' type="radio" name="winner" value={1}  /> </div>
          <div style={{marginTop:-20}}><input ref='player2' placeholder={'Player 2 Name'} /> <input className='radio' type="radio" name="winner" value={2} /> </div>
          
          <button className='submit' onClick={this.addMatchDetails.bind(this)}>Add Game Details</button>

          <h2>Recent Games:</h2>
          { this.state.matches.map((match, i)=>{
            return(
              <div key={i} className='match'>
                <div>Player 1 : {match.player1} {match.winner === 1 ? <span className='tag-winner'>WINNER</span> : null}</div>
                <div>Player 2 : {match.player2} {match.winner === 2 ? <span className='tag-winner'>WINNER</span> : null}</div>
                <div>Played: {match.date.format('MMMM Do YYYY, h:mm:ss a')} </div>

              </div>
            )
          })}
          
        </div>
      </div>
    );
  }
}

export default ScoreInput;
