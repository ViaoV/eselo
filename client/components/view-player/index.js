import React, { Component } from 'react'
import PlayerInfo from './info';
import { connect } from 'react-redux';
import { getPlayer } from '../../actions/players';
import { loadPlayerGames } from '../../actions/games';
import GameList from '../games-list'; 
import Panel from '../panel';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import NoData from '../no-data';

class ViewPlayer extends Component {
  componentDidMount() {
    this.props.getPlayer(this.props.params.id);
    this.props.loadPlayerGames({ID: this.props.params.id})
  }
  render() {
    const { player, games } = this.props
    return (
      <div>
        <Panel header="Player Information">
          <PlayerInfo player={ player } games={ games } />
        </Panel>
        <Panel header="Games">
          <GameList games={this.props.games} />
        </Panel>
        <Panel header="Elo Over Time">
          <PlayerEloGraph games={this.props.games} playerId={ this.props.params.id } />
        </Panel>
      </div>
    )
  }
}

const mapState = (store) => ({
  player: store.players.player,
  games: store.games.all
})

const mapActions = {
  getPlayer,
  loadPlayerGames
}

export default connect(mapState, mapActions)(ViewPlayer);



class PlayerEloGraph extends Component {

  graphConfig() {
    return {
      rangeSelector: {
        selected: 1
      },
      series: [{
        name: 'Elo',
        data: this.graphData(),
        tooltip: {
          valueDecimals: 2
        }
      }]
    };
  }

  graphData() {
    return this.props.games.map(g => {
      const metric = [new Date(g.CreatedAt).getTime()]
      console.log(g, this.props.playerId);
      if (g.whitePlayerId.toString() === this.props.playerId.toString()) {
        metric.push(g.whiteEndingElo);
      }
      if (g.blackPlayerId.toString() === this.props.playerId.toString()) {
        metric.push(g.blackEndingElo);
      }
      return metric;
    });
  }
  render() {
    if (this.props.games.length < 2) {
      return (
        <NoData message="Not enough data to graph" />
      )
    }
    return (
      <ReactHighstock config={ this.graphConfig() } />
    )
  }
}
