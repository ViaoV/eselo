import React, { Component }  from 'react';
import Panel from '../panel';
import GamesList from '../games-list';
import { connect } from 'react-redux';
import { loadGames } from '../../actions/games'; 

class ViewGames extends Component {
  componentDidMount() {
    this.props.loadGames();
  }
  render() {
    return (
      <Panel header="Games"> 
        <GamesList games={ this.props.games }/>
      </Panel>
    )
  }
}

const mapProps = (store) => ({
  games: store.games.all
})

const mapActions = {
  loadGames
}

export default connect(mapProps, mapActions)(ViewGames)
