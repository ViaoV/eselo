import React, { Component } from 'react';
import GameForm from '../game-form';
import Panel from '../panel';
import { connect } from 'react-redux';
import { createGame, loadGames } from '../../actions/games';
import { browserHistory } from 'react-router';

class CreateGame extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    values.blackPlayerId = parseInt(values.blackPlayerId);
    values.whitePlayerId = parseInt(values.whitePlayerId);
    this.props.createGame(values)
      .then((game) => browserHistory.push(`/games/${game.ID}`));
  }
  render() {
    this.props.loadGames();
    return (
      <div>
        <Panel header="Record Game">
          <GameForm onSubmit={ this.submit } />
        </Panel>
      </div>
    )
  }
}

const mapProps = (store) => ({ })

const mapActions = {
  createGame,
  loadGames
}

export default connect(mapProps, mapActions)(CreateGame)
