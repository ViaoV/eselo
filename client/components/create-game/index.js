import React, { Component } from 'react';
import GameForm from '../game-form';
import Panel from '../panel';
import { connect } from 'react-redux';
import { createGame, loadGames } from '../../actions/games';
import { browserHistory } from 'react-router';
import { error } from './styles';

class CreateGame extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.state = {};
  }
  submit(values) {
    values.blackPlayerId = parseInt(values.blackPlayerId);
    values.whitePlayerId = parseInt(values.whitePlayerId);

    if (!(values.blackPlayerId >= 0)) {
      this.setState({ error: 'No black player' });
      return
    }

    if (!(values.whitePlayerId >= 0)) {
      this.setState({ error: 'No white player' });
      return
    }

    if (values.outcome === undefined || values.outcome === '') {
      this.setState({ error: 'No outcome' });
      return
    }

    if (values.whitePlayerId === values.blackPlayerId) {
      this.setState({ error: 'Thats just silly' });
      return
    }

    this.props.createGame(values)
      .then((game) => browserHistory.push(`/games/${game.ID}`));
  }
  render() {
    this.props.loadGames();
    return (
      <div>
        <Panel header="Record Game">
          { this.state.error && 
              <div className={ error }>
                { this.state.error }
              </div>
          }
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
