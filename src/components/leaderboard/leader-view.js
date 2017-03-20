import React, { Component } from 'react';
import './style.css';

class LeaderView extends Component {

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

    }
 }

  render() {

    const {matches} = this.props;
    return (
      <div className="leaderboard">
        <div className="content-inner">
          <h2 className="title">leader view</h2>
          <h2>Matches Played:</h2>
          { matches && matches.map((match, i)=>{
            return(
              <div key={i} className='match'>
                <div>Player 1 : {match.player1} {match.winner === 1 ? <span className='tag-winner'>WINNER</span> : null}</div>
                <div>Player 2 : {match.player2} {match.winner === 2 ? <span className='tag-winner'>WINNER</span> : null}</div>
              </div>
            )
          })}

        </div>
      </div>
    );
  }
}

export default LeaderView;
