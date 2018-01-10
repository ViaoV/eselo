import React, { Component }  from 'react';
import Panel from '../panel';
import GamesList from '../games-list';
import { connect } from 'react-redux';
import { loadGames, clearGames } from '../../actions/games'; 
import Loading from '../loading';

class ViewGames extends Component {
	componentWillMount() {
    this.props.loadGames();
	}
  componentDidMount() {
    this.props.loadGames();
  }
  render() {
    if (this.props.games === false) {
      return (
        <Panel header="Games"> 
					<Loading />
        </Panel>
      );
    }
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
  loadGames,
  clearGames
}

export default connect(mapProps, mapActions)(ViewGames)
