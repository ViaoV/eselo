import React, { Component } from 'react';
import PlayerForm from '../player-form';
import Panel from '../panel';
import { createPlayer } from '../../actions/players';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class CreatePlayer extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    this.props.createPlayer(values).then((player) => {
      browserHistory.push(`/players/${player.ID}`);
    });
  }
  render() {
    return (
      <Panel header="Create Player">
        <PlayerForm  onSubmit={ this.submit }/>
      </Panel>
    )
  }
}

const mapActions = {
  createPlayer
}

export default connect(() => ({}), mapActions)(CreatePlayer)
