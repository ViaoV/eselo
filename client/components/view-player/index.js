import React, { Component } from 'react'
import PlayerInfo from './info';
import { connect } from 'react-redux';
import { getPlayer } from '../../actions/players';

class ViewPlayer extends Component {
  componentDidMount() {
    this.props.getPlayer(this.props.params.id);
  }
  render() {
    const { player } = this.props
    return (
      <div>
        <PlayerInfo player={ player } />
      </div>
    )
  }
}

const mapState = (store) => ({
  player: store.players.player
})

const mapActions = {
  getPlayer
}

export default connect(mapState, mapActions)(ViewPlayer);
