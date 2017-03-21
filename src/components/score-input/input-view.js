import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import moment from 'moment';
import {TweenMax} from "gsap";

import './style.css';

class ScoreInput extends Component {

 constructor ( props ) {

   super( props );

   /* // Player Model
   {
      team1: [''],
      team2: [''],
      winner: null,
      date: moment
    }
   */
      
    this.state = {
        matches: [
           {
              team1: ['Josh Freeman', 'Ronnie Roo'],
              team2: ['Claudio Ranieri'],
              winner: 1,
              date: new moment()
           }
        ],
        team1: [''],
        team2: [''],
        results: [],
        errormsg: null
    }
 }


addMatchDetails(){
  
  // Get all player values per team.
  let teamArray1 = [],
      teamArray2 = [];

  for (let i = 0; i < this.state.team1.length; i++) { 
      const inputfield = document.getElementById('team1_player_' + (i+1));
      if(inputfield.value != null || inputfield.value != '')
        teamArray1.push(inputfield.value);
  }
  for (let i = 0; i < this.state.team2.length; i++) { 
      const inputfield = document.getElementById('team2_player_' + (i+1));
      if(inputfield.value != null || inputfield.value != '')
        teamArray2.push(inputfield.value);
  }
  console.log('teams - ', teamArray1, teamArray2)

  // Check for selected winner
  let winner = null;
  if (document.getElementById('radio1').checked) {
     winner = document.getElementById('radio1').value;
  } else if (document.getElementById('radio2').checked) {
     winner = document.getElementById('radio2').value;
  }
  
  // Validate the submission details
  if(!winner) {
    this.setState({
      errormsg: 'You must select a winning team'
    });
    return false;
  }

  if(document.getElementById('team1_player_1').value == '' || document.getElementById('team2_player_1').value == '' ) {
    this.setState({
      errormsg: 'Each team must have at least 1 player'
    });
    return false;
  } else {
     this.setState({ errormsg: '' });
  }

  // create temp array to duplicate state
  const matches = this.props.results;
  matches.push({
      team1: teamArray1,
      team2: teamArray2,
      winner: parseInt(winner),
      date: new moment(),
      errormsg: ''
    });
  
  // Update storage and reset local state
  document.getElementById('team1_player_1').value = null;
  document.getElementById('team2_player_1').value = null;
  this.setState({
    team1: [''],
    team2: ['']
  });
  // Update Global app state
  this.props.onUpdateResults(matches);
}

addTeamMember(team) {
  if(team === 1) {
    //push new team member object
    const team = this.state.team1;
    team.push({});
    this.setState({
      team1: team
    })
  } else {
    const team = this.state.team2;
    team.push({});
    this.setState({
      team2: team
    })
  }
}

componentDidMount(){
    TweenMax.fromTo(this.refs.col1, .3, {autoAlpha:0}, {autoAlpha:1, delay:0.1})
    TweenMax.fromTo(this.refs.col2, .3, {autoAlpha:0}, {autoAlpha:1, delay:0.2})
}

render() {
    return (
      <div className="score-input">
        <div className="content-inner">

          <div className="section-wrap">
          
          <section className="col-1" ref='col1'>
            <h2 className="title">Add New Game:</h2>
            <div className='winnerTitle'>Winner:</div>
            <section>
              <div className="team-head color-blue">
                Team 1 <input id='radio1' className='radio' type="radio" name="winner" value={1}  /> 
              </div>

              { this.state.team1.map((member, i)=>{
                  const inputId = 'team1_player_' + (i+1);
                  return(<div key={i}>
                    <TextField
                      hintText="Player Name"
                      floatingLabelText="Player Name"
                      id={inputId}
                      inputStyle={{color:'white'}}
                    />
                   </div>)
                })
              }
              <RaisedButton 
                backgroundColor='#2c9ffb'
                className='add-member bounce' label="Add Member" onTouchTap={this.addTeamMember.bind(this, 1)}/>
            </section>

            <section style={{marginTop:20}}>
              <div className="team-head color-red">Team 2 
                <input id='radio2' className='radio' type="radio" name="winner" value={2}  /> 
              </div>
              
              { this.state.team2.map((member, i)=>{
                const inputId = 'team2_player_' + (i+1);
                return(<div key={i}>
                    <TextField
                      hintText="Player Name"
                      floatingLabelText="Player Name"
                      id={inputId}
                      inputStyle={{color:'white'}}
                      floatingLabelFocusStyle={{color:'#e45354'}}
                      underlineFocusStyle={{borderColor:'#e45354'}}
                    />
                  </div>)
                })
              }
              <RaisedButton 
                backgroundColor='#e45354'
                className='add-member bounce' label="Add Member" onTouchTap={this.addTeamMember.bind(this, 2)}/>
              </section>

            <RaisedButton 
              backgroundColor='#23f686'
              className='input-submit bounce' onTouchTap={this.addMatchDetails.bind(this)} label='Submit Game Details'/>
              <div className='input-error'>{this.state.errormsg}</div>
          </section>

          <section className="col-2" ref='col2'>
            <h2 className="title">Recent Games:</h2>
            { [...this.props.results].reverse().map((match, i)=>{
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

export default ScoreInput;
